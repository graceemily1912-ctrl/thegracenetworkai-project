/**
 * Seed script for KOLA AI
 * Run with: npm run seed   (requires tsx)
 * 
 * Seeds sample workshops, cohorts, and assets
 */

import "dotenv/config";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://127.0.0.1:3210";
const client = new ConvexHttpClient(convexUrl);

async function main() {
  console.log("Seeding KOLA AI demo data...");

  // Workshops
  const ws1 = await client.mutation(api.workshops.createWorkshop, {
    name: "KOLA AI Workshop — September 2026",
    date: "2026-09-18",
    location: "Kelowna, BC (In-Person + Hybrid)",
    capacity: 14,
    price: 1997,
    tier: "pro",
  });

  const ws2 = await client.mutation(api.workshops.createWorkshop, {
    name: "VIP Private Workshop — October",
    date: "2026-10-09",
    location: "Kelowna, BC (Private)",
    capacity: 6,
    price: 2997,
    tier: "vip",
  });

  console.log("Created workshops");

  // Accelerator Cohort
  await client.mutation(api.workshops.createCohort, {
    name: "October 2026 Accelerator Cohort",
    date: "2026-10-22",
    type: "group",
    capacity: 10,
    price: 10000,
  });

  console.log("Created cohort");

  // Sample assets
  const assetSeeds = [
    { title: "ROI Savings Calculator v2", type: "roi_calculator", description: "Excel + Airtable template to model $60k+ annual savings", tags: ["finance", "roi"] },
    { title: "AI Agent Playbook", type: "agent", description: "Ready-to-deploy internal agents for ops, sales and support", tags: ["agents"] },
    { title: "90-Day Implementation Roadmap", type: "roadmap", description: "Step-by-step system rollout for ambitious teams", tags: ["framework"] },
  ];

  for (const a of assetSeeds) {
    await client.mutation(api.assets.createAsset, {
      ...a,
      fileUrl: "https://example.com/secure/" + a.title.toLowerCase().replace(/\s+/g, "-"),
      tags: a.tags,
    });
  }

  console.log("Seeded assets. Done.");
}

main().catch(console.error);
