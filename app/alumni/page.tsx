"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";

export default function AlumniPortal() {
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [userId, setUserId] = useState<any>(null);

  const userStatus = useQuery(api.users.getUserStatus, email ? { email } : "skip" as any);
  const assets = useQuery(api.assets.listAssets) || [];
  const userProgress = useQuery(api.progress.getUserProgress, userId ? { userId } : "skip" as any);

  const updateMilestone = useMutation(api.progress.updateMilestone);

  const isGated = !userStatus || !userStatus.workshopAttended || !["paid", "completed", "approved"].includes(userStatus.acceleratorStatus || "");

  async function verify() {
    if (!email) return;
    // The query runs automatically. We just flip UI state.
    if (userStatus?.workshopAttended && userStatus.acceleratorStatus !== "none") {
      setVerified(true);
      setUserId(userStatus.id);
    } else {
      toast.error("Access denied. Complete the Workshop + Accelerator payment first.");
    }
  }

  async function bookPrivate() {
    if (!userId) return;
    // In production this would call GHL calendar link
    toast("Opening private calendar booking (GHL)...");
    window.open("https://calendar.gohighlevel.com/thegracenetworkai-private", "_blank");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="kola-container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-[#C5A46E] tracking-[2px] uppercase text-xs">MEMBERS ONLY</span>
            <h1 className="text-5xl tracking-[-1.6px] font-semibold">Alumni</h1>
          </div>

          {!verified && (
            <Card className="card-premium max-w-lg p-8">
              <p className="mb-4">Enter the email associated with your Accelerator purchase.</p>
              <div className="flex gap-2">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="h-12" />
                <Button onClick={verify} className="gold-btn px-8 rounded-full">Verify Access</Button>
              </div>
              <div className="mt-4 text-xs text-[#6B7280]">Protected by GHL Membership + Convex realtime check.</div>
            </Card>
          )}

          {verified && !isGated && (
            <div className="space-y-10">
              {/* Welcome + booking */}
              <Card className="p-8 card-premium">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[#C5A46E] text-sm">WELCOME BACK</div>
                    <div className="text-2xl font-semibold mt-1">{userStatus?.fullName || userStatus?.email}</div>
                  </div>
                  <Button onClick={bookPrivate} className="navy-btn">Book Private Follow-up</Button>
                </div>
                <div className="text-sm mt-4">Your resources and progress tracking are below.</div>
              </Card>

              {/* Assets Library */}
              <div>
                <h2 className="font-semibold text-xl mb-4">Resource Library</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {assets.length === 0 && <div className="text-sm p-6 border rounded">Assets will appear after first Accelerator. Seed via admin.</div>}
                  {assets.map((asset: any) => (
                    <Card key={asset._id} className="p-6 card-premium">
                      <div className="uppercase text-xs text-[#C5A46E]">{asset.type}</div>
                      <div className="text-lg font-medium mt-1">{asset.title}</div>
                      <p className="text-sm mt-2 text-[#6B7280]">{asset.description}</p>
                      <Button size="sm" variant="outline" className="mt-4 rounded-full" onClick={() => {
                        toast.success("Download started (demo)");
                      }}>Download</Button>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div>
                <h2 className="font-semibold text-xl mb-4">Implementation Progress</h2>
                <Card className="card-premium p-7">
                  {["foundations", "systems-work", "implementation", "review"].map((m, i) => (
                    <div key={i} className="flex justify-between py-3 border-b last:border-0 items-center">
                      <div>{m.replace(/-/g, " ")}</div>
                      <Button size="sm" variant="ghost" onClick={() => userId && updateMilestone({ userId, milestoneKey: m, completed: true })}>
                        Mark Complete
                      </Button>
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          )}

          {verified && isGated && (
            <Card className="p-9">Access requires completed Accelerator payment. Contact us if you believe this is an error.</Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
