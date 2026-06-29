// @ts-nocheck
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import Stripe from "stripe";

const http = httpRouter();

// Stripe webhook endpoint
// POST /webhooks/stripe
http.route({
  path: "/webhooks/stripe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const signature = request.headers.get("stripe-signature");
    const body = await request.text();

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, stripeSecret);
    } catch (err: any) {
      console.error("Stripe signature verification failed", err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Hand off to internal mutation for safety
    try {
      await ctx.runMutation(internal.payments.handleStripeWebhookInternal, {
        event,
      });
      return new Response("OK", { status: 200 });
    } catch (error: any) {
      console.error("Stripe webhook handler failed", error);
      // Return 200 to Stripe to avoid retries for our logic errors, log instead
      return new Response("Handled with error", { status: 200 });
    }
  }),
});

// GoHighLevel inbound webhook (from their workflows)
// POST /webhooks/ghl
// Example payloads:
// { "type": "payment_received", "contactId": "...", "email": "...", "tags": [...] }
// { "type": "contact_created", ... }
http.route({
  path: "/webhooks/ghl",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Optional: Verify a shared secret header from GHL
    const ghlSecret = request.headers.get("x-ghl-webhook-secret");
    const expected = process.env.GHL_WEBHOOK_SECRET;

    if (expected && ghlSecret !== expected) {
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = await request.json();

    await ctx.runMutation(internal.ghl.handleGhlInboundWebhook, { payload });

    return new Response("OK", { status: 200 });
  }),
});

// Health check
http.route({
  path: "/health",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(JSON.stringify({ status: "ok", service: "thegracenetworkai-project" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;
