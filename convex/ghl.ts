// @ts-nocheck
import { v } from "convex/values";
import { action, internalAction, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

// GHL Configuration - use env vars
const GHL_API_KEY = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "";
const GHL_BASE = "https://rest.gohighlevel.com/v1";
const GHL_V2 = "https://services.leadconnectorhq.com"; // V2 for some endpoints like memberships

// Helper: Make authenticated GHL request
async function ghlFetch(path: string, init: RequestInit = {}, useV2 = false) {
  const base = useV2 ? GHL_V2 : GHL_BASE;
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL API error ${res.status}: ${text}`);
  }
  return res.json();
}

// OUTBOUND: Sync or create contact in GHL + add tags
export const syncUserToGhl = action({
  args: {
    userId: v.id("users"),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { userId, tags = [] }) => {
    const user = await ctx.runQuery(internal.users.getUserByIdInternal, { userId });
    if (!user) throw new Error("User not found");

    const payload: any = {
      email: user.email,
      firstName: user.fullName?.split(" ")[0] || "",
      lastName: user.fullName?.split(" ").slice(1).join(" ") || "",
      phone: user.phone || "",
      address1: "",
      city: "Kelowna",
      state: "BC",
      country: "CA",
      tags: [...(user.ghlTags || []), ...tags],
    };

    let contactId = user.ghlContactId;

    try {
      if (contactId) {
        // Update
        await ghlFetch(`/contacts/${contactId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        // Create
        const created = await ghlFetch("/contacts/", {
          method: "POST",
          body: JSON.stringify({ ...payload, locationId: GHL_LOCATION_ID }),
        });
        contactId = created.contact?.id || created.id;
        if (contactId) {
          await ctx.runMutation(internal.users.updateGhlContactId, {
            userId,
            ghlContactId: contactId,
          });
        }
      }

      // Add any extra tags
      if (tags.length > 0 && contactId) {
        await ghlFetch(`/contacts/${contactId}/tags`, {
          method: "POST",
          body: JSON.stringify({ tags }),
        });
      }

      return { success: true, ghlContactId: contactId };
    } catch (e: any) {
      console.error("GHL sync failed", e);
      // Still succeed for user flow - GHL sync is best-effort + retryable
      await ctx.runMutation(internal.ghl.logGhlError, {
        userId,
        error: e.message,
      });
      return { success: false, error: e.message };
    }
  },
});

// Combined sync + grant access (for memberships after payment)
export const syncUserToGhlAndGrantAccess = internalAction({
  args: {
    userId: v.id("users"),
    event: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getUserByIdInternal, {
      userId: args.userId,
    });
    if (!user) return;

    // 1. Sync contact + tags
    await ctx.runAction(internal.ghl.syncUserToGhl, {
      userId: args.userId,
      tags: args.tags,
    });

    // 2. Grant membership for Accelerator alumni portal (GHL Memberships)
    // Note: GHL Memberships API varies by plan. Use V2 contacts + custom field or Memberships endpoint.
    if (args.event === "accelerator_payment_received" || user.acceleratorStatus === "paid") {
      try {
        // Example: Add to membership group or trigger workflow via tag
        // Real implementation would call GHL membership assign:
        // POST /memberships or update contact with membership field.
        // For now we simulate by tagging + webhook back.
        await ctx.runAction(internal.ghl.syncUserToGhl, {
          userId: args.userId,
          tags: ["kola-alumni-portal"],
        });

        // Optional: Call a GHL workflow via their API or just rely on tag trigger.
      } catch (e) {
        console.error("GHL membership grant issue", e);
      }
    }

    // 3. Mark synced
    await ctx.runMutation(internal.payments.markGhlSynced, { userId: args.userId });

    // 4. Fire a small outbound webhook to GHL if needed (some setups use GHL as receiver)
    // This is for advanced automation.
  },
});

// INBOUND from GHL (webhook handler)
export const handleGhlInboundWebhook = internalMutation({
  args: { payload: v.any() },
  handler: async (ctx, { payload }) => {
    const type = payload.type || payload.event || "unknown";

    await ctx.db.insert("auditLogs", {
      event: `ghl_inbound_${type}`,
      details: payload,
      createdAt: Date.now(),
    });

    if (type === "payment_received" || payload.event === "payment_received") {
      const email = payload.email || payload.contact?.email;
      const contactId = payload.contactId || payload.contact?.id;

      if (!email) return;

      const user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
        .first();

      if (user) {
        // Mark workshop attended if coming from Workshop payment workflow
        if (payload.product?.includes("workshop") || payload.tags?.includes("workshop")) {
          await ctx.db.patch(user._id, {
            workshopAttended: true,
            ghlContactId: contactId || user.ghlContactId,
            updatedAt: Date.now(),
          });
        }
      } else {
        // Create user from GHL payment
        await ctx.db.insert("users", {
          ghlContactId: contactId,
          email: email.toLowerCase(),
          workshopAttended: true,
          acceleratorStatus: "none",
          ghlTags: payload.tags || ["kola-paid"],
          consentMarketing: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    }

    if (type === "contact_created" || type === "contact.updated") {
      const email = payload.email || payload.contact?.email;
      const contactId = payload.id || payload.contact?.id;
      if (email) {
        const existing = await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
          .first();
        if (existing) {
          await ctx.db.patch(existing._id, {
            ghlContactId: contactId,
            updatedAt: Date.now(),
          });
        }
      }
    }
  },
});

// Mark payment GHL synced
export const markGhlSynced = internalMutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const payments = await ctx.db
      .query("payments")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    for (const p of payments) {
      if (!p.ghlSynced) {
        await ctx.db.patch(p._id, { ghlSynced: true, updatedAt: Date.now() });
      }
    }
  },
});

export const logGhlError = internalMutation({
  args: { userId: v.optional(v.id("users")), error: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("auditLogs", {
      event: "ghl_sync_error",
      userId: args.userId,
      details: { error: args.error },
      createdAt: Date.now(),
    });
  },
});

// Action to trigger GHL calendar booking link (for private Accelerator)
export const getGhlCalendarLink = action({
  args: { userId: v.id("users"), calendarId: v.optional(v.string()) },
  handler: async (ctx, { userId, calendarId }) => {
    const user = await ctx.runQuery(internal.users.getUserByIdInternal, { userId });
    if (!user?.ghlContactId) {
      // Return generic booking if no contact yet
      return `https://calendar.gohighlevel.com/${GHL_LOCATION_ID || "your-location"}`;
    }
    // In real GHL you append contactId or use prefilled link
    const base = `https://calendar.gohighlevel.com/${calendarId || GHL_LOCATION_ID}`;
    return `${base}?contactId=${user.ghlContactId}`;
  },
});
