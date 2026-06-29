// @ts-nocheck
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// These are called from Admin Dashboard. In prod protect with admin secret header or role.
// For now simple passkey via env on client call.

export const getDashboardStats = query({
  args: { adminKey: v.string() },
  handler: async (ctx: any, { adminKey }: { adminKey: string }) => {
    // Simple protection: compare against env on server only in real impl
    // Here we do a soft check. Replace with proper auth.
    if (adminKey !== process.env.ADMIN_DASHBOARD_KEY && process.env.NODE_ENV === "production") {
      throw new Error("UNAUTHORIZED");
    }

    const [users, applications, payments, workshops, cohorts] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db.query("applications").collect(),
      ctx.db.query("payments").collect(),
      ctx.db.query("workshops").collect(),
      ctx.db.query("acceleratorCohorts").collect(),
    ]);

    const workshopPaid = payments.filter((p) => p.type === "workshop" && p.status === "succeeded").length;
    const accelPaid = payments.filter((p) => p.type === "accelerator" && p.status === "succeeded").length;

    return {
      totalUsers: users.length,
      workshopAttendees: users.filter((u) => u.workshopAttended).length,
      acceleratorPaid: users.filter((u) => u.acceleratorStatus === "paid").length,
      applicationsSubmitted: applications.length,
      applicationsApproved: applications.filter((a) => a.status === "approved").length,
      totalRevenue: payments
        .filter((p) => p.status === "succeeded")
        .reduce((sum, p) => sum + p.amount, 0),
      workshopRevenue: payments
        .filter((p) => p.type === "workshop" && p.status === "succeeded")
        .reduce((sum, p) => sum + p.amount, 0),
      openWorkshops: workshops.filter((w) => w.status === "open").length,
      openCohorts: cohorts.filter((c) => c.status === "open").length,
      recentPayments: payments.filter((p) => p.status === "succeeded").slice(-5),
    };
  },
});

export const listAllApplicationsWithUsers = query({
  args: { adminKey: v.string() },
  handler: async (ctx: any, { adminKey }: { adminKey: string }) => {
    if (adminKey !== process.env.ADMIN_DASHBOARD_KEY && process.env.NODE_ENV === "production") {
      throw new Error("UNAUTHORIZED");
    }

    const apps = await ctx.db.query("applications").order("desc").collect();
    return Promise.all(
      apps.map(async (app) => ({
        ...app,
        user: await ctx.db.get(app.userId),
      }))
    );
  },
});

export const getAuditLogs = query({
  args: { adminKey: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx: any, { adminKey, limit = 100 }: any) => {
    if (adminKey !== process.env.ADMIN_DASHBOARD_KEY && process.env.NODE_ENV === "production") {
      throw new Error("UNAUTHORIZED");
    }
    return ctx.db.query("auditLogs").order("desc").take(limit);
  },
});

// Admin override: manually mark user as workshop attended (for edge cases)
export const adminGrantWorkshopAccess = mutation({
  args: {
    adminKey: v.string(),
    userId: v.id("users"),
    workshopId: v.optional(v.id("workshops")),
  },
  handler: async (ctx, args) => {
    if (args.adminKey !== process.env.ADMIN_DASHBOARD_KEY && process.env.NODE_ENV === "production") {
      throw new Error("UNAUTHORIZED");
    }
    await ctx.db.patch(args.userId, {
      workshopAttended: true,
      workshopId: args.workshopId,
      updatedAt: Date.now(),
    });
    await ctx.db.insert("auditLogs", {
      event: "admin_grant_workshop",
      actor: "admin",
      userId: args.userId,
      details: { workshopId: args.workshopId },
      createdAt: Date.now(),
    });
    return true;
  },
});
