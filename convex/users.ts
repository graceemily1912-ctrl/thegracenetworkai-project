// @ts-nocheck
import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Get or create user by email (for forms)
export const getOrCreateUser = mutation({
  args: {
    email: v.string(),
    fullName: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    consentMarketing: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();

    let user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      const id = await ctx.db.insert("users", {
        email,
        fullName: args.fullName,
        phone: args.phone,
        company: args.company,
        workshopAttended: false,
        acceleratorStatus: "none",
        ghlTags: [],
        consentMarketing: args.consentMarketing ?? true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      user = await ctx.db.get(id);
    }
    return user;
  },
});

// Public query for current user status (used in realtime gated pages)
export const getUserStatus = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const normalized = email.toLowerCase().trim();
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", normalized))
      .first();

    if (!user) return null;

    return {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      workshopAttended: user.workshopAttended,
      acceleratorStatus: user.acceleratorStatus,
      ghlContactId: user.ghlContactId,
      ghlMembershipId: user.ghlMembershipId,
    };
  },
});

// ADMIN only list (protected by caller)
export const listUsers = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 50 }) => {
    const users = await ctx.db.query("users").order("desc").take(limit);
    return users;
  },
});

// INTERNAL
export const getUserByEmailInternal = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
      .first();
  },
});

export const getUserByIdInternal = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => ctx.db.get(userId),
});

export const createUserInternal = internalMutation({
  args: {
    email: v.string(),
    fullName: v.optional(v.string()),
    phone: v.optional(v.string()),
    consentMarketing: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase();
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (existing) return existing._id;

    return await ctx.db.insert("users", {
      email,
      fullName: args.fullName,
      phone: args.phone,
      workshopAttended: false,
      acceleratorStatus: "none",
      ghlTags: [],
      consentMarketing: args.consentMarketing ?? true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateGhlContactId = internalMutation({
  args: { userId: v.id("users"), ghlContactId: v.string() },
  handler: async (ctx, { userId, ghlContactId }) => {
    await ctx.db.patch(userId, { ghlContactId, updatedAt: Date.now() });
  },
});

export const updateWorkshopAttendance = mutation({
  args: { userId: v.id("users"), attended: v.boolean() },
  handler: async (ctx, { userId, attended }) => {
    await ctx.db.patch(userId, {
      workshopAttended: attended,
      updatedAt: Date.now(),
    });
  },
});
