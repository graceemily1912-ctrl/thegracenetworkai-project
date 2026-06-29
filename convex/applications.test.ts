// Basic unit test scaffolding for Convex functions
// Run via `npx convex dev` or use convex test runner (recommended: vitest + convex-test)

// Example scoring test (conceptual)

import { describe, expect, it } from "vitest";

function calculateQualificationScore(answers: any): number {
  let score = 0;
  const learn = Number(answers.willingnessToLearn) || 0;
  score += Math.min(learn, 5) * 12;
  const goals = (answers.specificGoals || "").trim().length;
  if (goals > 120) score += 12;
  return Math.min(Math.floor(score), 100);
}

describe("qualification scoring", () => {
  it("gives high score for high willingness + detailed goals", () => {
    const score = calculateQualificationScore({
      willingnessToLearn: 5,
      specificGoals: "A".repeat(150),
      currentChallenges: "X".repeat(80),
      timeCommitment: "full-day",
      businessSystems: ["CRM", "Ops"],
      aiExperience: "intermediate",
    });
    expect(score).toBeGreaterThan(80);
  });

  it("low willingness caps the score", () => {
    const score = calculateQualificationScore({
      willingnessToLearn: 2,
      specificGoals: "short",
    });
    expect(score).toBeLessThan(50);
  });
});
