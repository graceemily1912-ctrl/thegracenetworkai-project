// @ts-nocheck
import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Qualification scoring function (strict business logic)
function calculateQualificationScore(answers: any): number {
  let score = 0;

  // Willingness to learn (heavily weighted - core criteria)
  const learn = Number(answers.willingnessToLearn) || 0;
  score += Math.min(learn, 5) * 12; // up to 60

  // Time commitment
  const tc = (answers.timeCommitment || "").toLowerCase();
  if (tc.includes("full") || tc.includes("day")) score += 15;
  else if (tc.includes("half")) score += 10;
  else if (tc.includes("flex")) score += 8;

  // Specific goals quality
  const goals = (answers.specificGoals || "").trim().length;
  if (goals > 120) score += 12;
  else if (goals > 60) score += 8;
  else if (goals > 20) score += 4;

  // Challenges articulated
  const challenges = (answers.currentChallenges || "").length;
  if (challenges > 150) score += 8;
  else if (challenges > 60) score += 5;

  // Business systems selected (shows existing ops)
  const systems = Array.isArray(answers.businessSystems) ? answers.businessSystems.length : 0;
  score += Math.min(systems, 4) * 3;

  // AI experience (not gate, but awareness)
  const exp = (answers.aiExperience || "").toLowerCase();
  if (exp.includes("inter") || exp.includes("adv")) score += 3;
  else if (exp.includes("begin")) score += 1;

  // Cap at 100
  return Math.min(Math.floor(score), 100);
}

export const submitApplication = mutation({
  args: {
    email: v.string(),
    fullName: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    type: v.union(v.literal("workshop"), v.literal("accelerator")),
    answers: v.object({
      businessSystems: v.array(v.string()),
      currentChallenges: v.string(),
      annualRevenueRange: v.optional(v.string()),
      teamSize: v.optional(v.string()),
      aiExperience: v.string(),
      willingnessToLearn: v.number(),
      timeCommitment: v.string(),
      specificGoals: v.string(),
      referralSource: v.optional(v.string()),
      utm: v.optional(v.object({
        source: v.optional(v.string()),
        medium: v.optional(v.string()),
        campaign: v.optional(v.string()),
      })),
    }),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();

    // Rate limit: max 3 applications per email per hour
    const rlKey = `apply:${email}`;
    const now = Date.now();
    const windowMs = 60 * 60 * 1000;
    let rl = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", rlKey))
      .first();

    if (rl && now - rl.windowStart < windowMs && rl.count >= 3) {
      throw new Error("RATE_LIMIT: Too many applications. Please wait.");
    }
    if (!rl || now - rl.windowStart > windowMs) {
      if (rl) await ctx.db.delete(rl._id);
      await ctx.db.insert("rateLimits", { key: rlKey, count: 1, windowStart: now });
    } else {
      await ctx.db.patch(rl._id, { count: rl.count + 1 });
    }

    // Get or create user
    let user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      const userId = await ctx.db.insert("users", {
        email,
        fullName: args.fullName,
        phone: args.phone,
        company: args.company,
        workshopAttended: false,
        acceleratorStatus: "none",
        ghlTags: [],
        consentMarketing: true,
        createdAt: now,
        updatedAt: now,
      });
      user = await ctx.db.get(userId);
    }
    if (!user) throw new Error("Could not create user");

    // Gating: Accelerator applications only if workshop attended or prior paid
    if (args.type === "accelerator" && !user.workshopAttended) {
      throw new Error("ACCELERATOR_GATE: Workshop attendance required before applying to Accelerator.");
    }

    // Calculate score
    const qualificationScore = calculateQualificationScore(args.answers);

    // Determine initial status
    let status: "submitted" | "reviewing" | "approved" = "submitted";
    if (qualificationScore >= 78) status = "reviewing"; // auto fast track high scores

    // Insert application
    const appId = await ctx.db.insert("applications", {
      userId: user._id,
      type: args.type,
      answers: args.answers,
      qualificationScore,
      status,
      createdAt: now,
      updatedAt: now,
    });

    // Update user status
    if (args.type === "accelerator") {
      await ctx.db.patch(user._id, {
        acceleratorStatus: "applied",
        updatedAt: now,
      });
    }

    // Log
    await ctx.db.insert("auditLogs", {
      event: "application_submitted",
      userId: user._id,
      details: { type: args.type, score: qualificationScore, appId },
      createdAt: now,
    });

    // Note: In real deployment you would trigger GHL contact + tag + workflow here
    // via internal.ghl.syncUserToGhl({ userId: user._id, tags: ["kola-applied"] })

    return {
      applicationId: appId,
      qualificationScore,
      status,
      userId: user._id,
    };
  },
});

// Get application status (realtime for thank you)
export const getApplicationStatus = query({
  args: { email: v.string(), type: v.optional(v.union(v.literal("workshop"), v.literal("accelerator"))) },
  handler: async (ctx, { email, type }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email.toLowerCase()))
      .first();
    if (!user) return null;

    let q = ctx.db
      .query("applications")
      .withIndex("by_userId", (qq) => qq.eq("userId", user._id));

    const apps = await q.collect();
    const filtered = type ? apps.filter((a) => a.type === type) : apps;
    return filtered.sort((a, b) => b.createdAt - a.createdAt)[0] || null;
  },
});

// Admin: List all applications with user data
export const listApplications = query({
  args: {
    status: v.optional(v.union(v.literal("submitted"), v.literal("reviewing"), v.literal("approved"), v.literal("rejected"), v.literal("waitlist"))),
    type: v.optional(v.union(v.literal("workshop"), v.literal("accelerator"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("applications").order("desc").collect();

    if (args.status) results = results.filter((a) => a.status === args.status);
    if (args.type) results = results.filter((a) => a.type === args.type);
    if (args.limit) results = results.slice(0, args.limit);

    // Enrich with user
    const enriched = await Promise.all(
      results.map(async (app) => {
        const user = await ctx.db.get(app.userId);
        return { ...app, user };
      })
    );
    return enriched;
  },
});

// Admin: Update application status + override
export const updateApplicationStatus = mutation({
  args: {
    applicationId: v.id("applications"),
    status: v.union(v.literal("submitted"), v.literal("reviewing"), v.literal("approved"), v.literal("rejected"), v.literal("waitlist")),
    adminNotes: v.optional(v.string()),
    adminEmail: v.string(), // for audit
  },
  handler: async (ctx, args) => {
    const app = await ctx.db.get(args.applicationId);
    if (!app) throw new Error("Application not found");

    await ctx.db.patch(args.applicationId, {
      status: args.status,
      adminNotes: args.adminNotes,
      reviewedBy: args.adminEmail,
      reviewedAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Propagate to user for Accelerator
    if (app.type === "accelerator") {
      const newStatus = args.status === "approved" ? "approved" : args.status === "rejected" ? "none" : "applied";
      await ctx.db.patch(app.userId, {
        acceleratorStatus: newStatus as any,
        updatedAt: Date.now(),
      });
    }

    await ctx.db.insert("auditLogs", {
      event: "application_status_changed",
      actor: args.adminEmail,
      userId: app.userId,
      details: { applicationId: args.applicationId, newStatus: args.status },
      createdAt: Date.now(),
    });

    return true;
  },
});

// Simple qualification override by admin
export const overrideQualificationScore = mutation({
  args: {
    applicationId: v.id("applications"),
    newScore: v.number(),
    reason: v.string(),
    adminEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const app = await ctx.db.get(args.applicationId);
    if (!app) throw new Error("Not found");

    await ctx.db.patch(args.applicationId, {
      qualificationScore: Math.max(0, Math.min(100, args.newScore)),
      adminNotes: (app.adminNotes || "") + `\n[OVERRIDE by ${args.adminEmail}] ${args.reason}`,
      updatedAt: Date.now(),
    });

    await ctx.db.insert("auditLogs", {
      event: "qualification_override",
      actor: args.adminEmail,
      details: { appId: args.applicationId, old: app.qualificationScore, new: args.newScore, reason: args.reason },
      createdAt: Date.now(),
    });
    return true;
  },
});
