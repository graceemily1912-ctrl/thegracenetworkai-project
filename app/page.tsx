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

      {/* HERO */}
      <section className="section pt-16 md:pt-24 bg-[#0A1628] text-white">
        <div className="kola-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs tracking-[2px] text-[#C5A46E] mb-6">
              LAKE COUNTRY • BC • CANADA
            </div>
            <h1 className="text-6xl md:text-7xl font-semibold tracking-[-2.2px] leading-[0.95]">
              Stop leaking $60k a year<br />to manual chaos.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-white/80">
              The AI Accelerator at O&apos;Rourke Winery gives you the systems that actually work — so you can lead with clarity and watch opportunity compound.
              One day. $10k paid upfront. Includes 15-min fit consult. In-person only.
            </p>

            <div className="mt-10">
              <a href="https://calendar.gohighlevel.com/thegracenetworkai-private" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gold-btn h-14 px-9 text-base rounded-full flex items-center gap-2">
                  Book Your 15-Min Fit Consult <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <p className="mt-4 text-xs text-white/50">$10k • Paid upfront • Includes consult • O&apos;Rourke Winery, Lake Country</p>
          </div>
        </div>
      </section>

      {/* THE OFFER */}
      <section className="section bg-white border-b">
        <div className="kola-container max-w-3xl text-center">
          <div className="text-[#C5A46E] text-sm tracking-[2px]">THE AI ACCELERATOR</div>
          <h2 className="text-5xl font-semibold tracking-[-1.5px] mt-2">$10,000 • Paid Upfront</h2>
          <p className="mt-3 text-xl text-[#6B7280]">One day at the beautiful O&apos;Rourke Winery in Lake Country. Includes 15-minute consult to confirm fit. In-person only — no hybrid.</p>
          <p className="mt-4 text-sm text-[#6B7280]">Limited spots. The systems and venue make the investment clear.</p>
        </div>
      </section>

      {/* THE VENUE */}
      <section className="section">
        <div className="kola-container">
          <div className="text-center mb-8">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">THE VENUE</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">O&apos;Rourke Winery, Lake Country</h2>
            <p className="mt-2 text-[#6B7280]">A breathtaking private winery overlooking Okanagan Lake. Dramatic granite, vineyards, and pure focus. In-person only. No hybrid.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <img src="https://images.unsplash.com/photo-pK78VhoJPiU?w=800" alt="Glasses of champagne toasting at O'Rourke Winery celebration" className="rounded-2xl border w-full h-[320px] object-cover" />
            <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800" alt="O'Rourke Winery, Lake Country - beautiful vineyard and lake setting" className="rounded-2xl border w-full h-[320px] object-cover" />
          </div>
        </div>
      </section>

      {/* WHAT YOU GET + PROOF */}
      <section id="proof" className="section bg-[#F8F7F4]">
        <div className="kola-container">
          <div className="text-center mb-8">
            <div className="text-[#C5A46E] text-sm tracking-[2px] font-medium">PROOF FROM MY BUSINESSES</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">Autonomous systems delivering massive ROI — without me</h2>
            <p className="mt-3 max-w-2xl mx-auto text-[#6B7280]">These are the exact AI systems I built and run for my own businesses. They scan, decide, execute, and compound 24/7. Let's get your businesses ROI'ing the same way — autonomously.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Autonomous Scanning & Signal Detection", desc: "24/7 monitoring that surfaces high-ROI opportunities before competitors even see them." },
              { title: "Rule-Based Execution Engines", desc: "Consistent, emotion-free decisions and actions executed automatically across my workflows." },
              { title: "Self-Improving Review Loops", desc: "Automated journaling and optimization so performance compounds over time." },
              { title: "Scalable Compounding Infrastructure", desc: "Systems that grow with the business — more volume, more verticals, zero extra manual work." },
            ].map((item, i) => (
              <div key={i} className="card-premium p-8">
                <div className="font-semibold text-xl mb-2">{item.title}</div>
                <p className="text-[#6B7280]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div>
              <img src="/proof/linkedin-proof-system.png" alt="Autonomous signal system from one of my core businesses" className="rounded-xl border w-full" />
              <p className="mt-2 text-xs text-[#6B7280]">My signal scanning system — running autonomously and surfacing real opportunities.</p>
            </div>
            <div>
              <img src="/proof/web-hero-automation-proof.png" alt="Web automation and execution system from my businesses" className="rounded-xl border w-full" />
              <p className="mt-2 text-xs text-[#6B7280]">My web + signal automation — executing without constant oversight.</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-semibold tracking-tight mb-4 text-center">In the Accelerator, we'll deep dive into YOUR businesses — curated to exactly what you run.</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-[15px] max-w-3xl mx-auto">
              {[
                "Full audit & mapping of your current systems (CRM, Ops, Marketing, Finance, Support, etc.)",
                "Building custom autonomous scanning & opportunity detection for your specific niche/market",
                "Designing rule-based execution checklists and workflows tailored to your team & processes",
                "Implementing self-running review & improvement loops that compound results",
                "Scaling the infrastructure across multiple businesses or verticals — autonomously",
                "Integrating AI agents for alerts, decisions, and actions that fit your existing stack",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="text-[#C5A46E] mt-1 flex-none" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-[#6B7280]">Everything is customized to the actual businesses and challenges you bring to the table.</p>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="kola-container max-w-3xl">
          <div className="text-center mb-8">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">WHY $10,000</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">One day. $10k. Gets you $60k+ back — every year.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-[15px]">
            <div>
              <div className="font-semibold mb-1">The $60k problem it solves</div>
              <p className="text-[#6B7280]">Manual scanning, slow decisions, missed signals — it adds up fast. These systems turn that leak into leverage.</p>
            </div>
            <div>
              <div className="font-semibold mb-1">Stunning venue + real fit check</div>
              <p className="text-[#6B7280]">O&apos;Rourke Winery on the lake. 15-min consult upfront (included). Paid as part of the $10k — only if it&apos;s right.</p>
            </div>
            <div>
              <div className="font-semibold mb-1">Proven systems you actually use</div>
              <p className="text-[#6B7280]">Not slides. Working automation for scanning, execution, review. See the proof above.</p>
            </div>
            <div>
              <div className="font-semibold mb-1">Small group, private access</div>
              <p className="text-[#6B7280]">Direct guidance + follow-up pathways that last. One day that keeps paying.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="https://calendar.gohighlevel.com/thegracenetworkai-private" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gold-btn h-14 px-10 text-base rounded-full">Book the 15-Min Consult &amp; Lock Your Spot</Button>
            </a>
            <p className="mt-3 text-xs text-[#6B7280]">$10k upfront. O&apos;Rourke Winery. In-person only. Limited dates.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
