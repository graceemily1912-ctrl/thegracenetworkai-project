"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

function ThankYouContent() {
  const params = useSearchParams();
  const type = (params.get("type") || "workshop") as "workshop" | "accelerator";
  const email = params.get("email") || "";
  const sessionId = params.get("session_id");

  const appStatus = useQuery(api.applications.getApplicationStatus, email ? { email, type } : "skip" as any);
  const payment = useQuery(api.payments.getPaymentStatus, sessionId ? { sessionId } : "skip" as any);
  const userStatus = useQuery(api.users.getUserStatus, email ? { email } : "skip" as any);

  const statusText = appStatus?.status || "submitted";
  const isPaid = payment?.status === "succeeded" || userStatus?.acceleratorStatus === "paid";

  return (
    <div className="kola-container py-16">
      <Card className="card-premium max-w-2xl mx-auto p-10 text-center">
        <div className="receipt-mark">G</div>
        <h1 className="text-4xl font-semibold tracking-tight">Thank you</h1>
        <p className="text-[#6B7280] mt-2">Your {type === "workshop" ? "fit" : "private-day"} application has been received.</p>

        {email && (
          <div className="mt-6 text-sm inline-block bg-[#F8F7F4] px-4 py-2 rounded-full border">
            Tracking for <span className="font-medium">{email}</span>
          </div>
        )}

        {/* Realtime status */}
        <div className="mt-9 border rounded-2xl p-6 text-left bg-white">
          <div className="uppercase text-xs tracking-widest text-[#C5A46E] mb-1">YOUR STATUS</div>
          <div className="text-xl font-medium capitalize flex items-center gap-2">
            {statusText}
            <span className="live-dot" />
          </div>

          {type === "workshop" && (
            <>
              <div className="text-sm mt-4">Fit status: {userStatus?.workshopAttended ? "CONFIRMED ✓" : "Pending fit confirmation"}</div>
              <p className="text-xs mt-3 text-[#6B7280]">Once the fit process is complete, you can reserve an available private day.</p>
            </>
          )}

          {type === "accelerator" && (
            <div className="mt-3">
              <div>Private-day status: <span className="font-semibold uppercase">{userStatus?.acceleratorStatus || "applied"}</span></div>
              {isPaid && <div className="mt-1 text-emerald-600 font-medium">Payment confirmed. Your private day is reserved.</div>}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 text-sm">
          <Link href="/workshop" className="underline">Return to application</Link>
          {userStatus?.workshopAttended && <Link href="/accelerator" className="underline">Go to private-day portal</Link>}
          {userStatus?.acceleratorStatus === "paid" && <Link href="/alumni" className="text-[#C5A46E] font-medium">Your private materials →</Link>}
        </div>
      </Card>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="p-10 text-center">Loading status...</div>}>
        <ThankYouContent />
      </Suspense>
      <Footer />
    </div>
  );
}
