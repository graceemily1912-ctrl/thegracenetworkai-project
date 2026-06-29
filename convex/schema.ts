import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Core users synced with GHL contacts
  users: defineTable({
    ghlContactId: v.optional(v.string()), // Primary link to GHL
    email: v.string(),
    fullName: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    role: v.optional(v.string()), // e.g. "Founder", "CEO"
    workshopAttended: v.boolean(), // Gate for Accelerator
    workshopId: v.optional(v.id("workshops")),
    acceleratorStatus: v.union(
      v.literal("none"),
      v.literal("applied"),
      v.literal("approved"),
      v.literal("paid"),
      v.literal("completed")
    ),
    acceleratorCohortId: v.optional(v.id("acceleratorCohorts")),
    ghlTags: v.array(v.string()),
    ghlMembershipId: v.optional(v.string()), // For gated alumni portal
    consentMarketing: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_ghlContactId", ["ghlContactId"])
    .index("by_workshopAttended", ["workshopAttended"])
    .index("by_acceleratorStatus", ["acceleratorStatus"]),

  // Workshop applications (entry point)
  applications: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("workshop"), v.literal("accelerator")),
    answers: v.object({
      // Multi-step answers stored as structured JSON for qualification
      businessSystems: v.array(v.string()), // e.g. ["CRM", "Finance", "Ops"]
      currentChallenges: v.string(),
      annualRevenueRange: v.optional(v.string()),
      teamSize: v.optional(v.string()),
      aiExperience: v.string(), // "none" | "beginner" | "intermediate" | "advanced"
      willingnessToLearn: v.number(), // 1-5 self rating
      timeCommitment: v.string(),
      specificGoals: v.string(),
      referralSource: v.optional(v.string()),
      utm: v.optional(v.object({
        source: v.optional(v.string()),
        medium: v.optional(v.string()),
        campaign: v.optional(v.string()),
      })),
    }),
    qualificationScore: v.number(), // 0-100 calculated in mutation
    status: v.union(
      v.literal("submitted"),
      v.literal("reviewing"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("waitlist")
    ),
    adminNotes: v.optional(v.string()),
    reviewedBy: v.optional(v.string()), // admin identifier
    reviewedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_type_status", ["type", "status"])
    .index("by_qualificationScore", ["qualificationScore"]),

  // Workshops (events)
  workshops: defineTable({
    name: v.string(),
    date: v.string(), // ISO or human readable e.g. "2026-09-15"
    location: v.string(), // "Kelowna, BC (In-Person + Hybrid)"
    capacity: v.number(),
    spotsTaken: v.number(),
    price: v.number(), // 997 | 1997 | 2997 tiers
    tier: v.string(), // "essentials" | "pro" | "vip"
    status: v.union(v.literal("open"), v.literal("closed"), v.literal("past")),
    description: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_date", ["date"]),

  // Accelerator Cohorts
  acceleratorCohorts: defineTable({
    name: v.string(),
    date: v.string(),
    type: v.union(v.literal("group"), v.literal("private")),
    capacity: v.number(),
    spotsTaken: v.number(),
    price: v.number(), // 10000
    status: v.union(v.literal("open"), v.literal("closed"), v.literal("past")),
    facilitatorNotes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_status", ["status"]),

  // Payments (Stripe source of truth)
  payments: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("workshop"), v.literal("accelerator")),
    stripeSessionId: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
    amount: v.number(),
    currency: v.literal("cad"), // CAD for Canada
    status: v.union(
      v.literal("pending"),
      v.literal("succeeded"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    workshopId: v.optional(v.id("workshops")),
    cohortId: v.optional(v.id("acceleratorCohorts")),
    ghlSynced: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_stripeSessionId", ["stripeSessionId"])
    .index("by_userId", ["userId"])
    .index("by_status", ["status"]),

  // Reusable assets library for Alumni (protected)
  assets: defineTable({
    title: v.string(),
    type: v.union(
      v.literal("template"),
      v.literal("roadmap"),
      v.literal("agent"),
      v.literal("framework"),
      v.literal("roi_calculator")
    ),
    description: v.string(),
    fileUrl: v.optional(v.string()), // Convex storage or external signed
    storageId: v.optional(v.id("_storage")),
    downloadCount: v.number(),
    tags: v.array(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_type", ["type"])
    .index("by_isActive", ["isActive"]),

  // Alumni progress tracking (simple)
  progress: defineTable({
    userId: v.id("users"),
    cohortId: v.optional(v.id("acceleratorCohorts")),
    milestones: v.array(v.object({
      key: v.string(),
      label: v.string(),
      completed: v.boolean(),
      completedAt: v.optional(v.number()),
    })),
    notes: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"]),

  // Audit log for admin actions & webhooks
  auditLogs: defineTable({
    event: v.string(),
    actor: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    details: v.any(),
    createdAt: v.number(),
  })
    .index("by_event", ["event"])
    .index("by_createdAt", ["createdAt"]),

  // Simple rate limiting / idempotency keys
  rateLimits: defineTable({
    key: v.string(), // e.g. "apply:email@ex.com"
    count: v.number(),
    windowStart: v.number(),
  })
    .index("by_key", ["key"]),
});
