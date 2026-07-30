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
          <p className="text-[#C5A46E] text-sm font-medium">In person · Lake Country, BC</p>
          <h1 className="text-4xl md:text-5xl tracking-tight font-semibold mt-2">The day</h1>
          <p className="text-xl text-[#6B7280] mt-3 max-w-2xl">
            $15,000 CAD. Private day with me at O&apos;Rourke. I run multiple six-figure businesses
            solo — plus a charity and parenting solo. That&apos;s what you&apos;re buying time with.
          </p>

          <div className="mt-8 grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 card-premium p-8 space-y-4 text-[15px]">
              <p className="text-[#3D4A5C] leading-relaxed">
                For people past the basics. You see how I actually run the stack across products
                and capital. How stays in the room — not on a public page.
              </p>
              <ul className="space-y-2 text-[#3D4A5C]">
                <li>→ Multiple live businesses, run solo</li>
                <li>→ Real systems, historical examples only</li>
                <li>→ Small room, people at your level</li>
                <li>→ No public curriculum</li>
              </ul>
              <p className="pt-3 text-sm border-t text-[#6B7280]">
                Not financial advice. Results not typical or guaranteed.
              </p>
            </div>

            <div className="md:col-span-2 card-premium p-8 bg-[#0A1628] text-white">
              <div className="text-4xl font-semibold tracking-tight">$15,000</div>
              <div className="text-white/60 mt-1 text-sm">CAD · one day</div>
              <p className="my-6 text-sm text-white/75">
                O&apos;Rourke Winery.
                <br />
                Paid upfront. In-person only.
              </p>
              <a
                href="https://calendar.gohighlevel.com/thegracenetworkai-private"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-[#C5A46E] hover:underline"
              >
                Book the fit call →
              </a>
            </div>
          </div>

          <div className="mt-8 text-sm text-[#6B7280]">
            More on the{" "}
            <Link href="/#why" className="text-[#0A1628] underline underline-offset-2">
              homepage
            </Link>
            .
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
                  <p className="mt-4 text-[#C5A46E]">
                    Book the 15-minute consult first (included in the $15k paid upfront) to confirm fit.
                  </p>
                )}

                {userStatus.workshopAttended && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button onClick={applyToAccelerator} className="gold-btn rounded-full px-8">
                      Submit Accelerator Application
                    </Button>
                    <Button onClick={payForAccelerator} variant="outline" className="rounded-full border-[#0A1628] px-8">
                      Pay $15,000 now (if pre-approved)
                    </Button>
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
