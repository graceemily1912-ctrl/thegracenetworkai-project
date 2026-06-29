"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function AcceleratorPage() {
  const [email, setEmail] = useState("");
  const [showApply, setShowApply] = useState(false);

  // Reactive query — updates live as email changes (Convex handles it)
  const userStatus = useQuery(api.users.getUserStatus, email ? { email } : "skip" as any);
  const submitApp = useMutation(api.applications.submitApplication);
  const createCheckout = useAction(api.payments.createCheckoutSession);

  async function applyToAccelerator() {
    if (!email) return;
    try {
      const res = await submitApp({
        email,
        type: "accelerator",
        answers: {
          businessSystems: [],
          currentChallenges: "Ready to implement at a higher level after completing the Workshop.",
          aiExperience: "intermediate",
          willingnessToLearn: 5,
          timeCommitment: "full-day",
          specificGoals: "Focused implementation and systems work.",
        },
      });
      toast.success("Accelerator application submitted.");
      // Immediately offer payment if approved fast-track or for demo
      setShowApply(true);
    } catch (e: any) {
      if (e.message?.includes("GATE")) {
        toast.error("You must first complete the Workshop to apply.");
      } else {
        toast.error(e.message);
      }
    }
  }

  async function payForAccelerator() {
    try {
      const res = await createCheckout({
        email,
        type: "accelerator",
        successUrl: `${window.location.origin}/thank-you?type=accelerator&email=${encodeURIComponent(email)}`,
      });
      if (res.url) window.location.href = res.url;
    } catch (err: any) {
      toast.error(err.message || "Could not start checkout");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="kola-container pt-14 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="uppercase text-[#C5A46E] text-xs tracking-[3px]">IN-PERSON • LAKE COUNTRY</div>
          <h1 className="text-6xl tracking-[-2px] font-semibold mt-2">The AI Accelerator</h1>
          <p className="text-2xl text-[#6B7280] mt-2">$10,000 base — paid upfront. Includes 15-min consult to confirm fit.</p>

          <div className="mt-8 grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 card-premium p-9 space-y-6 text-[15px]">
              <div className="uppercase tracking-widest text-xs text-[#C5A46E]">WHAT TO EXPECT</div>
              <ul className="space-y-3 text-lg">
                <li>• A full day dedicated to strategic clarity on your systems and opportunities</li>
                <li>• High-leverage frameworks for implementation</li>
                <li>• Focused guidance alongside a small peer cohort</li>
                <li>• Private resources and follow-up pathways for graduates</li>
              </ul>
              <div className="pt-4 text-sm border-t text-[#6B7280]">The same systems running my businesses autonomously — delivering $60k+ ROI every year.</div>
            </div>

            <div className="md:col-span-2 card-premium p-9 bg-[#0A1628] text-white">
              <div className="text-5xl font-semibold tracking-tighter">$10,000</div>
              <div className="text-white/70 mt-1">CAD • One-time</div>

              <div className="my-8 text-sm space-y-2 text-white/80">
                Small group or private options.<br />Limited dates available.
              </div>

              <div className="text-xs tracking-widest uppercase">In-person at O&apos;Rourke Winery • Paid upfront</div>
            </div>
          </div>

          {/* MEDIA PROOF TEASER */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#6B7280]">The exact systems from my own businesses — running autonomously with strong ROI.</p>
            <div className="mt-3 flex justify-center gap-4">
              <img src="/proof/linkedin-proof-system.png" alt="My autonomous signal system" className="h-20 rounded border" />
              <img src="/proof/web-hero-automation-proof.png" alt="My automation in production" className="h-20 rounded border" />
            </div>
          </div>

          {/* WHY THIS PRICE */}
          <div className="mt-10 card-premium p-9">
            <div className="uppercase tracking-widest text-xs text-[#C5A46E] mb-2">WHY $10,000</div>
            <h3 className="text-2xl font-semibold tracking-tight">One focused day that pays for itself many times over.</h3>
            <div className="mt-6 grid md:grid-cols-2 gap-6 text-[15px]">
              <ul className="space-y-3">
                <li>• You leave with working systems, not theory</li>
                <li>• The frameworks have already been proven on real capital and real workflows</li>
                <li>• Small group means direct access — no generic group coaching</li>
                <li>• Graduates get private resources and follow-up pathways that stay available</li>
              </ul>
              <div className="text-[#6B7280]">
                This is the same level of leverage I use in my own businesses. The media and live examples of my autonomous systems are shared only with Accelerator participants.
              </div>
            </div>
          </div>

          {/* GATE CHECK */}
          <div className="mt-14 card-premium p-8 md:p-10">
            <h3 className="text-2xl tracking-tight font-semibold">Verify your eligibility</h3>
            <p className="text-[#6B7280] mt-1">Enter the email used for your Workshop application or payment.</p>

            <div className="mt-6">
              <Input
                placeholder="demo@leader.com  (or your email)"
                className="input-premium h-12 w-full max-w-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="mt-1 text-xs text-[#6B7280]">Status updates live. Book the 15-min consult via the GHL link above.</p>
            </div>

            {userStatus && (
              <div className="mt-6 p-6 bg-[#F8F7F4] rounded-2xl border text-sm">
                <div className="flex items-center gap-2 text-emerald-600">
                  <div className="live-dot" /> Connected to realtime records
                </div>
                <div className="mt-3 font-medium">Fit consult completed: {userStatus.workshopAttended ? "YES ✓" : "NO"}</div>
                <div>Accelerator status: <span className="font-semibold uppercase">{userStatus.acceleratorStatus}</span></div>

                {!userStatus.workshopAttended && (
                  <p className="mt-4 text-[#C5A46E]">Book the 15-minute consult first (included in the $10k paid upfront) to confirm fit.</p>
                )}

                {userStatus.workshopAttended && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button onClick={applyToAccelerator} className="gold-btn rounded-full px-8">Submit Accelerator Application</Button>
                    <Button onClick={payForAccelerator} variant="outline" className="rounded-full border-[#0A1628] px-8">Pay $10,000 now (if pre-approved)</Button>
                  </div>
                )}
              </div>
            )}

            {!userStatus && email && (
              <p className="mt-4 text-xs text-[#6B7280]">No record yet. Book the 15-min consult via the calendar to get started.</p>
            )}
          </div>

          <div className="text-center mt-8 text-xs">
            <Link href="/">← Back to The AI Accelerator</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
