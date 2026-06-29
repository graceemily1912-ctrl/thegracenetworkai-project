// @ts-nocheck
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return ctx.db
      .query("progress")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

export const updateMilestone = mutation({
  args: {
    userId: v.id("users"),
    milestoneKey: v.string(),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    let prog = await ctx.db
      .query("progress")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    const now = Date.now();

    const milestone = { key: args.milestoneKey, label: args.milestoneKey, completed: args.completed, completedAt: args.completed ? now : undefined };

    if (!prog) {
      prog = {
        _id: "" as any,
        userId: args.userId,
        milestones: [milestone],
        updatedAt: now,
      } as any;
      await ctx.db.insert("progress", {
        userId: args.userId,
        milestones: [milestone],
        updatedAt: now,
      });
    } else {
      const existing = prog.milestones.findIndex((m) => m.key === args.milestoneKey);
      if (existing >= 0) prog.milestones[existing] = milestone;
      else prog.milestones.push(milestone);
      await ctx.db.patch(prog._id, { milestones: prog.milestones, updatedAt: now });
    }
    return true;
  },
});
