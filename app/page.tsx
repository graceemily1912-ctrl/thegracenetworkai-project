"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Check, Users, Calendar, Shield } from "lucide-react";

export default function KolaAIHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="section pt-16 md:pt-24 bg-[#0A1628] text-white">
        <div className="kola-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs tracking-[2px] text-[#C5A46E] mb-6">
              KELowna • BC • CANADA
            </div>
            <h1 className="text-6xl md:text-7xl font-semibold tracking-[-2.2px] leading-[0.95]">
              Build AI systems that<br />save $60,000+ per year.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-white/80">
              A high-leverage, invitation-only funnel. Start with the Workshop.
              Only attendees qualify for the $10,000 Accelerator.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/workshop">
                <Button size="lg" className="gold-btn h-14 px-9 text-base rounded-full flex items-center gap-2">
                  Apply to the Workshop <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/accelerator">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-white/40 text-white hover:bg-white/5">
                  Learn about the Accelerator
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/50">10-person cohorts • Reusable frameworks • Hands-off implementation</p>
          </div>
        </div>
      </section>

      {/* VALUE / PROOF */}
      <section className="section border-b border-[#EDE9E0]">
        <div className="kola-container grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Strict Gating", desc: "Workshop is the only entry. No low-ticket shortcuts. IP protected." },
            { icon: Users, title: "High-Leverage Cohorts", desc: "10 leaders × $10k = $100k+ per Accelerator day. Focused group delivery." },
            { icon: Calendar, title: "One-Day Intensive", desc: "Pre-audit + full day + 1hr private + templates, roadmaps, agents." },
          ].map((f, i) => (
            <div key={i} className="card-premium p-8">
              <f.icon className="w-6 h-6 text-[#C5A46E] mb-4" />
              <div className="font-semibold text-xl tracking-tight mb-3">{f.title}</div>
              <p className="text-[#6B7280]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKSHOP TEASER */}
      <section className="section">
        <div className="kola-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="text-[#C5A46E] text-sm tracking-[2px] font-medium">STEP 1 — ENTRY</div>
              <h2 className="text-4xl font-semibold tracking-tight">The Workshop</h2>
            </div>
            <Link href="/workshop"><Button className="gold-btn rounded-full px-8">View dates &amp; apply</Button></Link>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7 card-premium p-10">
              <ul className="space-y-4 text-lg">
                {[
                  "In-person or hybrid in Kelowna, BC",
                  "Hands-on frameworks for real business systems",
                  "$997 – $2,997 (tiered by access)",
                  "Direct qualification path to the Accelerator",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3"><Check className="mt-1.5 w-5 h-5 text-[#C5A46E] flex-none" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5 card-premium p-10 bg-[#0A1628] text-white flex flex-col justify-between">
              <div>
                <div className="uppercase text-xs tracking-[3px] text-[#C5A46E]">WHO IT'S FOR</div>
                <p className="mt-3 text-xl">Ambitious leaders ready to learn and implement — not necessarily AI experts.</p>
              </div>
              <div className="mt-8 text-sm text-white/70">Pre-qualification via application. Limited seats.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCELERATOR TEASER — GATED MESSAGE */}
      <section className="section bg-white border-y">
        <div className="kola-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[#C5A46E] uppercase tracking-[3px] text-sm font-medium">STEP 2 — EXCLUSIVE</div>
            <h2 className="text-5xl font-semibold tracking-[-1.5px] mt-3">The $10,000 Accelerator</h2>
            <p className="mt-4 text-xl text-[#6B7280]">One-day intensive. Private or group. Only for Workshop attendees.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Pre-audit of your current systems",
                "Full-day implementation session",
                "1-hour private follow-up time",
                "Reusable templates, agents & roadmaps",
                "$60k+ annual savings ROI framework",
                "Alumni portal + private GHL calendar booking",
              ].map((d, i) => (
                <div key={i} className="flex items-start gap-3 text-base p-5 border border-[#EDE9E0] rounded-xl bg-[#F8F7F4]">
                  <Check className="text-[#C5A46E] mt-0.5" /> {d}
                </div>
              ))}
            </div>

            <Link href="/accelerator" className="inline-block mt-10">
              <Button className="navy-btn px-10 h-14 rounded-full text-base">Check eligibility &amp; apply</Button>
            </Link>
            <p className="mt-3 text-xs text-[#6B7280]">We verify Workshop attendance before Accelerator access is granted.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section pb-24">
        <div className="kola-container text-center">
          <h3 className="text-3xl font-semibold tracking-tight">Ready to qualify?</h3>
          <p className="mt-3 text-lg text-[#6B7280]">Start with the Workshop. No exceptions.</p>
          <div className="mt-8">
            <Link href="/workshop"><Button size="lg" className="gold-btn h-14 px-12 text-lg rounded-full">Begin Application</Button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
