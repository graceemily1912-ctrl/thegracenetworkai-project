"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CONSULT_URL = "https://calendar.gohighlevel.com/thegracenetworkai-private";

function publicStatus(value?: string) {
  if (!value) return "Not started";
  const labels: Record<string, string> = {
    applied: "Application received",
    approved: "Fit confirmed",
    paid: "Reserved",
    rejected: "Not moving forward",
  };
  return labels[value] || "In review";
}

export default function PrivateDayPage() {
  const [email, setEmail] = useState("");
  const userStatus = useQuery(api.users.getUserStatus, email ? { email } : "skip" as any);
  const submitApp = useMutation(api.applications.submitApplication);
  const createCheckout = useAction(api.payments.createCheckoutSession);

  async function apply() {
    if (!email) return;
    try {
      await submitApp({
        email,
        type: "accelerator",
        answers: {
          businessSystems: [],
          currentChallenges: "Ready to work at a higher level after completing the fit process.",
          aiExperience: "intermediate",
          willingnessToLearn: 5,
          timeCommitment: "full-day",
          specificGoals: "Focused decisions and systems work.",
        },
      });
      toast.success("Application received.");
    } catch (error: any) {
      toast.error(error.message?.includes("GATE") ? "Complete the fit process first." : error.message);
    }
  }

  async function pay() {
    try {
      const result = await createCheckout({
        email,
        type: "accelerator",
        successUrl: `${window.location.origin}/thank-you?type=accelerator&email=${encodeURIComponent(email)}`,
      });
      if (result.url) window.location.href = result.url;
    } catch (error: any) {
      toast.error(error.message || "Could not start checkout.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="portal-page">
        <div className="kola-container portal-grid">
          <section>
            <div className="eyebrow">Private access · Lake Country</div>
            <h1>The Private<br />Operator&apos;s Day</h1>
            <p className="portal-lead">
              Bring the decisions that are taking too much of your attention.
              We&apos;ll work through them against the reality of your companies,
              your capital, and your life.
            </p>
            <div className="portal-facts">
              <span>One day</span>
              <span>O&apos;Rourke Winery</span>
              <span>$15,000 USD</span>
              <span>Everyone signs an NDA</span>
            </div>
            <a href={CONSULT_URL} target="_blank" rel="noreferrer" className="primary-link dark">
              Book the fit call →
            </a>
          </section>

          <aside className="booking-panel">
            <div className="eyebrow">Already in the process?</div>
            <h2>Check your booking.</h2>
            <p>Enter the email used for your fit call.</p>
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-6 h-12"
            />

            {email && (
              <div className="booking-status">
                <span>Your status</span>
                <strong>{userStatus ? publicStatus(userStatus.acceleratorStatus) : "No record yet"}</strong>
                {!userStatus && <p>Book a fit call to begin.</p>}
                {userStatus?.workshopAttended && userStatus.acceleratorStatus !== "paid" && (
                  <div className="booking-actions">
                    <Button onClick={apply}>Submit application</Button>
                    <Button onClick={pay} variant="outline">Reserve with payment</Button>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
