// @ts-nocheck
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listAssets = query({
  args: { type: v.optional(v.union(v.literal("template"), v.literal("roadmap"), v.literal("agent"), v.literal("framework"), v.literal("roi_calculator"))) },
  handler: async (ctx, { type }) => {
    let q = ctx.db.query("assets").withIndex("by_isActive", (qq) => qq.eq("isActive", true));
    const all = await q.collect();
    return type ? all.filter((a) => a.type === type) : all;
  },
});

export const getAssetDownloadUrl = query({
  args: { assetId: v.id("assets") },
  handler: async (ctx, { assetId }) => {
    const asset = await ctx.db.get(assetId);
    if (!asset || !asset.isActive) return null;

    // In production use ctx.storage.getUrl(asset.storageId) if stored in Convex
    return asset.fileUrl || asset.storageId ? `/api/asset/${assetId}` : null;
  },
});

// Admin: seed assets (call once)
export const createAsset = mutation({
  args: {
    title: v.string(),
    type: v.union(v.literal("template"), v.literal("roadmap"), v.literal("agent"), v.literal("framework"), v.literal("roi_calculator")),
    description: v.string(),
    fileUrl: v.optional(v.string()),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("assets", {
      ...args,
      downloadCount: 0,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

export const incrementDownload = mutation({
  args: { assetId: v.id("assets") },
  handler: async (ctx, { assetId }) => {
    const a = await ctx.db.get(assetId);
    if (a) await ctx.db.patch(assetId, { downloadCount: (a.downloadCount || 0) + 1 });
  },
});
