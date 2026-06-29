// @ts-nocheck
import { v } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";

// Public: List open workshops
export const listOpenWorkshops = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("workshops")
      .withIndex("by_status", (q) => q.eq("status", "open"))
      .collect();
  },
});

// Public: Get workshop by id
export const getWorkshop = query({
  args: { id: v.id("workshops") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

// Internal
export const getWorkshopInternal = internalQuery({
  args: { id: v.id("workshops") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

// Admin seed / create workshop (use via dashboard)
export const createWorkshop = mutation({
  args: {
    name: v.string(),
    date: v.string(),
    location: v.string(),
    capacity: v.number(),
    price: v.number(),
    tier: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("workshops", {
      ...args,
      spotsTaken: 0,
      status: "open",
      createdAt: Date.now(),
    });
  },
});

// Admin: update capacity / close
export const updateWorkshop = mutation({
  args: {
    id: v.id("workshops"),
    capacity: v.optional(v.number()),
    status: v.optional(v.union(v.literal("open"), v.literal("closed"), v.literal("past"))),
    spotsTaken: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...patch } = args;
    await ctx.db.patch(id, patch as any);
    return await ctx.db.get(id);
  },
});

// List accelerator cohorts
export const listOpenCohorts = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db
      .query("acceleratorCohorts")
      .withIndex("by_status", (q) => q.eq("status", "open"))
      .collect();
  },
});

export const createCohort = mutation({
  args: {
    name: v.string(),
    date: v.string(),
    type: v.union(v.literal("group"), v.literal("private")),
    capacity: v.number(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("acceleratorCohorts", {
      ...args,
      spotsTaken: 0,
      status: "open",
      createdAt: Date.now(),
    });
  },
});

export const getCohort = query({
  args: { id: v.id("acceleratorCohorts") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});
