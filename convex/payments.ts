// @ts-nocheck
import { v } from "convex/values";
import { internalMutation, mutation, query, action } from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import Stripe from "stripe";

// PUBLIC: Create Stripe Checkout Session (called from client via action or server action)
export const createCheckoutSession = action({
  args: {
    email: v.string(),
    type: v.union(v.literal("workshop"), v.literal("accelerator")),
    workshopId: v.optional(v.id("workshops")),
    cohortId: v.optional(v.id("acceleratorCohorts")),
    successUrl: v.optional(v.string()),
    cancelUrl: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ url: string | null; sessionId: string }> => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });

    // Ensure user exists
    let user = await ctx.runQuery(internal.users.getUserByEmailInternal, {
      email: args.email.toLowerCase().trim(),
    });

    if (!user) {
      // Create minimal user on checkout initiation
      const userId = await ctx.runMutation(internal.users.createUserInternal, {
        email: args.email.toLowerCase().trim(),
        fullName: undefined,
        consentMarketing: true,
      });
      user = await ctx.runQuery(internal.users.getUserByIdInternal, { userId });
    }

    if (!user) throw new Error("Failed to create user");

    // Enforce business rules
    if (args.type === "accelerator") {
      const hasWorkshop = user.workshopAttended;
      if (!hasWorkshop) {
        throw new Error("ACCELERATOR_GATE: Must attend Workshop first");
      }
    }

    // Pricing
    let amount = 0;
    let description = "";

    if (args.type === "workshop") {
      if (!args.workshopId) throw new Error("workshopId required");
      const ws = await ctx.runQuery(internal.workshops.getWorkshopInternal, {
        id: args.workshopId,
      });
      if (!ws) throw new Error("Workshop not found");
      if (ws.spotsTaken >= ws.capacity) throw new Error("WORKSHOP_FULL");
      amount = ws.price;
      description = `KOLA AI Workshop - ${ws.tier}`;
    } else {
      amount = 10000; // CAD
      description = "KOLA AI Accelerator";
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thegracenetwork.ai";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: description,
              description: "Kelowna, BC | High-Leverage AI Implementation",
            },
            unit_amount: amount * 100, // cents
          },
          quantity: 1,
        },
      ],
      success_url:
        args.successUrl ||
        `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}&type=${args.type}`,
      cancel_url: args.cancelUrl || `${origin}/workshop`,
      metadata: {
        userId: user._id,
        type: args.type,
        workshopId: args.workshopId || "",
        cohortId: args.cohortId || "",
        email: user.email,
      },
    });

    // Create pending payment record
    await ctx.runMutation(internal.payments.createPendingPaymentInternal, {
      userId: user._id,
      type: args.type,
      stripeSessionId: session.id,
      amount,
      workshopId: args.workshopId,
      cohortId: args.cohortId,
    });

    return { url: session.url, sessionId: session.id };
  },
});

// Internal: record pending payment
export const createPendingPaymentInternal = internalMutation({
  args: {
    userId: v.id("users"),
    type: v.union(v.literal("workshop"), v.literal("accelerator")),
    stripeSessionId: v.string(),
    amount: v.number(),
    workshopId: v.optional(v.id("workshops")),
    cohortId: v.optional(v.id("acceleratorCohorts")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("payments", {
      userId: args.userId,
      type: args.type,
      stripeSessionId: args.stripeSessionId,
      amount: args.amount,
      currency: "cad",
      status: "pending",
      workshopId: args.workshopId,
      cohortId: args.cohortId,
      ghlSynced: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Handle Stripe event (called from http.ts)
export const handleStripeWebhookInternal = internalMutation({
  args: { event: v.any() },
  handler: async (ctx, { event }) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const payment = await ctx.db
        .query("payments")
        .withIndex("by_stripeSessionId", (q) => q.eq("stripeSessionId", session.id))
        .first();

      if (!payment) {
        console.warn("Payment record not found for session", session.id);
        return;
      }

      if (payment.status === "succeeded") return; // idempotent

      const userId = payment.userId;
      const user = await ctx.db.get(userId);
      if (!user) return;

      // Mark payment succeeded
      await ctx.db.patch(payment._id, {
        status: "succeeded",
        stripePaymentIntentId: session.payment_intent as string | undefined,
        updatedAt: Date.now(),
      });

      const type = (session.metadata?.type as "workshop" | "accelerator") || payment.type;

      if (type === "workshop") {
        // Mark workshop attended (qualifier)
        await ctx.db.patch(userId, {
          workshopAttended: true,
          workshopId: payment.workshopId,
          acceleratorStatus: user.acceleratorStatus === "none" ? "none" : user.acceleratorStatus,
          updatedAt: Date.now(),
        });

        // Increment workshop spots
        if (payment.workshopId) {
          const ws = await ctx.db.get(payment.workshopId);
          if (ws && ws.spotsTaken < ws.capacity) {
            await ctx.db.patch(payment.workshopId, { spotsTaken: ws.spotsTaken + 1 });
          }
        }

        // Trigger GHL sync + tag + membership prep
        await ctx.scheduler.runAfter(0, internal.ghl.syncUserToGhlAndGrantAccess, {
          userId,
          event: "workshop_payment_received",
          tags: ["kola-workshop-attendee", "kola-paid"],
        });
      } else if (type === "accelerator") {
        await ctx.db.patch(userId, {
          acceleratorStatus: "paid",
          updatedAt: Date.now(),
        });

        // Increment cohort
        if (payment.cohortId) {
          const cohort = await ctx.db.get(payment.cohortId);
          if (cohort && cohort.spotsTaken < cohort.capacity) {
            await ctx.db.patch(payment.cohortId, { spotsTaken: cohort.spotsTaken + 1 });
          }
        }

        await ctx.scheduler.runAfter(0, internal.ghl.syncUserToGhlAndGrantAccess, {
          userId,
          event: "accelerator_payment_received",
          tags: ["kola-accelerator", "kola-alumni", "kola-paid"],
        });
      }

      // Log
      await ctx.db.insert("auditLogs", {
        event: "stripe_payment_succeeded",
        userId,
        details: { sessionId: session.id, type, amount: payment.amount },
        createdAt: Date.now(),
      });
    }

    if (event.type === "checkout.session.expired" || event.type === "payment_intent.payment_failed") {
      // Handle failures gracefully
      const session = event.data.object as Stripe.Checkout.Session;
      const payment = await ctx.db
        .query("payments")
        .withIndex("by_stripeSessionId", (q) => q.eq("stripeSessionId", session.id))
        .first();
      if (payment && payment.status !== "succeeded") {
        await ctx.db.patch(payment._id, { status: "failed", updatedAt: Date.now() });
      }
    }
  },
});

// Query: Get payment status for thank you page (realtime)
export const getPaymentStatus = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const payment = await ctx.db
      .query("payments")
      .withIndex("by_stripeSessionId", (q) => q.eq("stripeSessionId", sessionId))
      .first();
    return payment;
  },
});
