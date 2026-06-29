"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Link from "next/link";

const STEPS = ["Your Details", "Business Systems", "Challenges & Goals", "Commitment & Submit"];

export default function WorkshopPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    businessSystems: [] as string[],
    currentChallenges: "",
    annualRevenueRange: "",
    teamSize: "",
    aiExperience: "none",
    willingnessToLearn: 4,
    timeCommitment: "",
    specificGoals: "",
    referralSource: "",
  });

  const workshops = useQuery(api.workshops.listOpenWorkshops) || [];
  const submitApplication = useMutation(api.applications.submitApplication);

  const systemsOptions = ["CRM / Sales", "Finance & Accounting", "Operations", "Marketing", "Customer Support", "HR / Talent", "Project Management", "Other"];

  const toggleSystem = (sys: string) => {
    setForm((f) => ({
      ...f,
      businessSystems: f.businessSystems.includes(sys)
        ? f.businessSystems.filter((s) => s !== sys)
        : [...f.businessSystems, sys],
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const isValid = () => {
    if (step === 0) return form.fullName && form.email;
    if (step === 1) return form.businessSystems.length > 0;
    if (step === 2) return form.currentChallenges.length > 20 && form.specificGoals.length > 20;
    return true;
  };

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!form.email) return;

    setLoading(true);
    try {
      const res = await submitApplication({
        email: form.email,
        fullName: form.fullName,
        phone: form.phone || undefined,
        company: form.company || undefined,
        type: "workshop",
        answers: {
          businessSystems: form.businessSystems,
          currentChallenges: form.currentChallenges,
          annualRevenueRange: form.annualRevenueRange || undefined,
          teamSize: form.teamSize || undefined,
          aiExperience: form.aiExperience,
          willingnessToLearn: form.willingnessToLearn,
          timeCommitment: form.timeCommitment,
          specificGoals: form.specificGoals,
          referralSource: form.referralSource || undefined,
          utm: undefined, // add UTM capture in production
        },
      });

      setApplicationId(res.applicationId as any);
      setScore(res.qualificationScore);
      setSubmitted(true);
      toast.success("Application received. Check your email for next steps.");

      // Optional: Immediately create checkout (or show pay button)
    } catch (err: any) {
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4]">
      <Navbar />

      <div className="kola-container pt-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="uppercase text-xs tracking-[3px] text-[#C5A46E]">IN-PERSON / HYBRID • KELOWNA, BC</div>
            <h1 className="text-5xl tracking-[-1.8px] font-semibold mt-2">The Workshop</h1>
            <p className="text-xl mt-3 text-[#6B7280]">Your entry point. Qualify for the Accelerator.</p>
          </div>

          {/* Pricing tiers + dates */}
          <div className="mb-10 grid md:grid-cols-3 gap-4">
            {workshops.length > 0 ? workshops.map((w: any) => (
              <Card key={w._id} className="card-premium p-6">
                <div className="font-medium text-[#C5A46E]">{w.tier.toUpperCase()}</div>
                <div className="text-4xl font-semibold mt-1 tracking-tighter">${w.price}</div>
                <div className="text-sm text-[#6B7280] mt-1">{w.date} • {w.location}</div>
                <div className="mt-4 text-sm">{w.capacity - w.spotsTaken} seats remaining</div>
              </Card>
            )) : (
              <div className="col-span-3 p-8 border rounded-2xl bg-white text-center">
                Dates announced monthly. Apply now and we’ll match you to the next open cohort.
              </div>
            )}
          </div>

          {!submitted ? (
            <Card className="card-premium p-8 md:p-10">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {STEPS.map((label, i) => (
                  <div key={i} className="flex items-center gap-2 flex-1">
                    <div className={`step-dot ${i === step ? "active" : i < step ? "complete" : "border-[#EDE9E0] text-[#6B7280]"}`}>{i + 1}</div>
                    <div className="text-xs text-[#6B7280] pr-3">{label}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* STEP 0 */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Full Name</Label>
                      <Input className="input-premium mt-1.5 h-12" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <Input type="email" className="input-premium mt-1.5 h-12" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input className="input-premium mt-1.5 h-12" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <Label>Company / Organization</Label>
                      <Input className="input-premium mt-1.5 h-12" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                    </div>
                  </div>
                )}

                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <Label className="mb-3 block">Which business systems are you currently running? (select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {systemsOptions.map((sys) => (
                        <label key={sys} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-[#F8F7F4]">
                          <Checkbox checked={form.businessSystems.includes(sys)} onCheckedChange={() => toggleSystem(sys)} />
                          <span>{sys}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label>What are your biggest operational challenges right now?</Label>
                      <Textarea className="mt-1.5 min-h-[120px] input-premium" value={form.currentChallenges} onChange={(e) => setForm({ ...form, currentChallenges: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Annual Revenue Range</Label>
                        <Select value={form.annualRevenueRange || ""} onValueChange={(v) => setForm({ ...form, annualRevenueRange: (v || "") as string })}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select..." /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<500k">&lt;$500k</SelectItem>
                            <SelectItem value="500k-2m">$500k – $2M</SelectItem>
                            <SelectItem value="2m-10m">$2M – $10M</SelectItem>
                            <SelectItem value=">10m">$10M+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Team Size</Label>
                        <Select value={form.teamSize} onValueChange={(v) => setForm({ ...form, teamSize: (v || "") as string })}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select..." /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solo">Solo / Founder</SelectItem>
                            <SelectItem value="2-5">2–5</SelectItem>
                            <SelectItem value="6-15">6–15</SelectItem>
                            <SelectItem value="15+">15+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Current AI Experience</Label>
                      <Select value={form.aiExperience} onValueChange={(v) => setForm({ ...form, aiExperience: (v || "none") as string })}>
                        <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None — curious beginner</SelectItem>
                          <SelectItem value="beginner">Some experimentation</SelectItem>
                          <SelectItem value="intermediate">Regular use in workflows</SelectItem>
                          <SelectItem value="advanced">Advanced / building custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Specific goals for this training (be detailed)</Label>
                      <Textarea value={form.specificGoals} onChange={(e) => setForm({ ...form, specificGoals: e.target.value })} className="mt-1.5 min-h-[110px] input-premium" />
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-7">
                    <div>
                      <Label>How willing are you to fully engage and implement? (1–5)</Label>
                      <input type="range" min={1} max={5} step="1" value={form.willingnessToLearn} onChange={(e) => setForm({ ...form, willingnessToLearn: parseInt(e.target.value) })} className="w-full accent-[#C5A46E] mt-3" />
                      <div className="text-right text-sm text-[#C5A46E] font-medium">{form.willingnessToLearn}/5</div>
                    </div>

                    <div>
                      <Label>Time you can commit during the workshop</Label>
                      <Select value={form.timeCommitment} onValueChange={(v) => setForm({ ...form, timeCommitment: (v || "") as string })}>
                        <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select commitment level" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-day">Full day, fully present</SelectItem>
                          <SelectItem value="half-day">Half day + follow-up</SelectItem>
                          <SelectItem value="flex">Flexible but committed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Referral / How did you hear about us?</Label>
                      <Input className="input-premium mt-1.5" value={form.referralSource} onChange={(e) => setForm({ ...form, referralSource: e.target.value })} />
                    </div>

                    <div className="pt-4 text-sm bg-[#F8F7F4] p-5 rounded-xl border">
                      By submitting you agree to our <a href="#" className="underline">Privacy Policy</a> and consent to being contacted about The Grace Network programs. Attendance at the Workshop is required to qualify for the Accelerator.
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-9 pt-6 border-t">
                  {step > 0 ? (
                    <Button type="button" variant="outline" onClick={back} className="rounded-full px-8">Back</Button>
                  ) : <div />}

                  {step < STEPS.length - 1 ? (
                    <Button type="button" onClick={next} disabled={!isValid()} className="gold-btn rounded-full px-9">Continue</Button>
                  ) : (
                    <Button type="button" onClick={handleSubmit} disabled={loading || !isValid()} className="gold-btn h-12 px-10 rounded-full">
                      {loading ? "Submitting..." : "Submit Application"}
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          ) : (
            /* Success state */
            <Card className="card-premium p-10 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#C5A46E] text-[#0A1628] flex items-center justify-center mb-6">
                ✓
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">Application Submitted</h2>
              <p className="mt-2 text-[#6B7280]">Thank you. Your qualification score: <span className="font-semibold text-[#0A1628]">{score}</span></p>

              <div className="mt-8 space-y-4">
                <Link href={`/thank-you?type=workshop&email=${encodeURIComponent(form.email)}`}>
                  <Button className="navy-btn w-full h-12">View live application status →</Button>
                </Link>

                <p className="text-sm text-[#6B7280]">We will contact you shortly to confirm your seat and payment link.</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
