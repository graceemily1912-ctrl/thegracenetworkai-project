"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Check, Users, Calendar, Shield } from "lucide-react";

export default function GraceNetworkHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO - Aspirational, less specific */}
      <section className="section pt-16 md:pt-24 bg-[#0A1628] text-white">
        <div className="kola-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs tracking-[2px] text-[#C5A46E] mb-6">
              KELOWNA • BC • CANADA
            </div>
            <h1 className="text-6xl md:text-7xl font-semibold tracking-[-2.2px] leading-[0.95]">
              Lead with clarity.<br />Integrate AI with intention.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-white/80">
              An exclusive experience for ambitious leaders ready to bring AI into their organizations in a meaningful, sustainable way.
              The Workshop is the starting point.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/workshop">
                <Button size="lg" className="gold-btn h-14 px-9 text-base rounded-full flex items-center gap-2">
                  Begin with the Workshop <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/accelerator">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-white/40 text-white hover:bg-white/5">
                  Explore the Accelerator
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/50">Small cohorts • Focused work • Real implementation</p>
          </div>
        </div>
      </section>

      {/* VALUE - High-level, aspirational */}
      <section className="section border-b border-[#EDE9E0]">
        <div className="kola-container grid md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Thoughtfully Gated", desc: "Experiences designed for those ready to do the work. Access is earned." },
            { icon: Users, title: "Peer Community", desc: "Work alongside other leaders navigating similar challenges and ambitions." },
            { icon: Calendar, title: "Intensive & Immersive", desc: "Focused time away from the day-to-day to make real progress." },
          ].map((f, i) => (
            <div key={i} className="card-premium p-8">
              <f.icon className="w-6 h-6 text-[#C5A46E] mb-4" />
              <div className="font-semibold text-xl tracking-tight mb-3">{f.title}</div>
              <p className="text-[#6B7280]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKSHOP TEASER - High-level */}
      <section className="section">
        <div className="kola-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="text-[#C5A46E] text-sm tracking-[2px] font-medium">THE STARTING POINT</div>
              <h2 className="text-4xl font-semibold tracking-tight">The Workshop</h2>
            </div>
            <Link href="/workshop"><Button className="gold-btn rounded-full px-8">Learn more &amp; apply</Button></Link>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7 card-premium p-10">
              <ul className="space-y-4 text-lg">
                {[
                  "In-person or hybrid in Kelowna, BC",
                  "Space to think deeply about your systems and leadership",
                  "Tiered investment based on access and format",
                  "The pathway to the Accelerator for those ready",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3"><Check className="mt-1.5 w-5 h-5 text-[#C5A46E] flex-none" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5 card-premium p-10 bg-[#0A1628] text-white flex flex-col justify-between">
              <div>
                <div className="uppercase text-xs tracking-[3px] text-[#C5A46E]">FOR LEADERS WHO</div>
                <p className="mt-3 text-xl">Are ready to move beyond theory and into meaningful implementation.</p>
              </div>
              <div className="mt-8 text-sm text-white/70">Application required. Small groups.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCELERATOR TEASER — High-level, gated */}
      <section className="section bg-white border-y">
        <div className="kola-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[#C5A46E] uppercase tracking-[3px] text-sm font-medium">FOR THOSE WHO ARE READY</div>
            <h2 className="text-5xl font-semibold tracking-[-1.5px] mt-3">The Accelerator</h2>
            <p className="mt-4 text-xl text-[#6B7280]">An intensive experience available only to those who complete the Workshop.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Deep work on your organization's systems and opportunities",
                "Time and space for focused implementation",
                "Direct access and guidance",
                "Frameworks and support for ongoing work",
                "Connection to a community of peers",
                "Private follow-up and next steps",
              ].map((d, i) => (
                <div key={i} className="flex items-start gap-3 text-base p-5 border border-[#EDE9E0] rounded-xl bg-[#F8F7F4]">
                  <Check className="text-[#C5A46E] mt-0.5" /> {d}
                </div>
              ))}
            </div>

            <Link href="/accelerator" className="inline-block mt-10">
              <Button className="navy-btn px-10 h-14 rounded-full text-base">Check your eligibility</Button>
            </Link>
            <p className="mt-3 text-xs text-[#6B7280]">Workshop completion is required for consideration.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section pb-24">
        <div className="kola-container text-center">
          <h3 className="text-3xl font-semibold tracking-tight">Ready to begin?</h3>
          <p className="mt-3 text-lg text-[#6B7280]">The Workshop is the first step.</p>
          <div className="mt-8">
            <Link href="/workshop"><Button size="lg" className="gold-btn h-14 px-12 text-lg rounded-full">Start Your Application</Button></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
