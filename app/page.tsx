"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Check,
  Lock,
  MapPin,
  Shield,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const CONSULT_URL = "https://calendar.gohighlevel.com/thegracenetworkai-private";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const portfolio = [
  {
    name: "AUVIE",
    tag: "Live · Education",
    blurb: "Shipping a life-skills product for families — not a pitch deck.",
    href: "https://www.auvie.app",
  },
  {
    name: "Medvo",
    tag: "Live · Health",
    blurb: "Patient advocacy product in market. Real users. Real constraints.",
    href: "https://www.medvo.io",
  },
  {
    name: "FamilyTerms",
    tag: "Live · Family",
    blurb: "Parenting-plan product designed to convert complexity into a clean path.",
    href: "https://www.familyterms.com",
  },
  {
    name: "Capital systems",
    tag: "Live · Trading ops",
    blurb: "Operator systems on real capital — shown as historical examples only.",
    href: "#room",
  },
];

const inTheRoom = [
  {
    title: "Systems that already print",
    body: "You see the private operating layer behind multi-figure days — how it is protected, reviewed, and kept from breaking. Not a public playbook.",
  },
  {
    title: "Agent infrastructure that ships",
    body: "How operators install, harden, and optimize agents across a real stack — the judgment calls that never make it into a YouTube tutorial.",
  },
  {
    title: "Multi-business leverage",
    body: "One person. Multiple live products. Capital systems. Parenting. Charity. The architecture that makes that possible without burning out the founder.",
  },
  {
    title: "A room at your level",
    body: "People who already have the basics. Smart peers. No “how do I get Claude to write my emails” energy. Curated on purpose.",
  },
];

const notInTheRoom = [
  "Prompt courses and chat-bot hobbyists",
  "People hunting free tactics to recreate at home",
  "Anyone who wants a recording instead of the room",
  "Operators who are still deciding whether AI is “real”",
];

const forWho = [
  "You already use AI daily — you are past the basics",
  "You run real revenue, real products, or real capital",
  "You want to sit with operators, not collect another course",
  "You understand $15k is a filter, not a bargain bin",
];

const valueStack = [
  {
    label: "Public AI content (unlimited)",
    value: "Free–$2k",
    detail: "Prompts, templates, and mailing-list tricks. Commodity. Googleable tomorrow.",
  },
  {
    label: "Agency “AI transformation”",
    value: "$25k–$75k",
    detail: "Months of decks and junior delivery. You still own the hard judgment calls.",
  },
  {
    label: "What one strong operating day is worth",
    value: "6 figures*",
    detail: "When systems fire correctly, a single day can move serious capital or pipeline. Historical. Not typical. Not promised.",
  },
  {
    label: "The room — private day",
    value: "$15,000",
    detail: "In-person. Fit-checked. Built for people who already get it. The method stays in the room.",
  },
];

export default function GraceNetworkHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A1628] text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#C5A46E]/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#132A4A] blur-3xl" />
        </div>
        <div className="kola-container relative section pt-16 md:pt-24 pb-20">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs tracking-[2px] text-[#C5A46E] mb-6"
              >
                <span className="live-dot" />
                PRIVATE ROOM · FIT-CHECKED · LAKE COUNTRY, BC
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-5xl md:text-7xl font-semibold tracking-[-2.2px] leading-[0.95]"
              >
                Not another AI course.
                <br />
                <span className="text-[#C5A46E]">A room you can&apos;t Google.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-6 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed"
              >
                For people who already have the basics — and want to sit with operators who ship.
                Products in market. Capital systems on the desk. Agents that actually run.
                The playbook is not on this page on purpose.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gold-btn h-14 px-9 text-base rounded-full flex items-center gap-2 w-full sm:w-auto">
                    Request a fit consult <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href="#room">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-9 text-base rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white w-full sm:w-auto"
                  >
                    What the room is
                  </Button>
                </a>
              </motion.div>

              <p className="mt-5 text-sm text-white/50">
                $15,000 CAD · Paid upfront · Includes fit consult · O&apos;Rourke Winery · In-person only
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-7 space-y-5">
                <div className="flex items-center gap-2 text-xs tracking-[2px] text-[#C5A46E]">
                  <Lock className="w-3.5 h-3.5" /> THE AI ACCELERATOR
                </div>
                <div className="text-5xl font-semibold tracking-tighter">$15,000</div>
                <div className="text-white/70 text-sm">CAD · One day · One-time</div>
                <ul className="space-y-3 text-sm text-white/85">
                  {[
                    "Private room — not a webinar",
                    "Peers who already get the basics",
                    "Live systems from a multi-business operator",
                    "Method stays offline",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-[#C5A46E] mt-0.5 flex-none" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 flex items-center gap-2 text-xs text-white/50">
                  <MapPin className="w-3.5 h-3.5" /> O&apos;Rourke Winery · Lake Country, BC
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { k: "Private", v: "Fit-checked seats only" },
              { k: "In-person", v: "No hybrid, on purpose" },
              { k: "Operator", v: "Live products + capital" },
              { k: "$15k", v: "Filter, not a discount" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="text-2xl font-semibold text-[#C5A46E] tracking-tight">{s.k}</div>
                <div className="text-sm text-white/60 mt-1">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ANTI-COMMODITY */}
      <motion.section className="section bg-white border-b border-[#EDE9E0]" {...fadeUp}>
        <div className="kola-container max-w-3xl text-center">
          <div className="text-[#C5A46E] text-sm tracking-[2px]">THE POINT</div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
            This is not the room where people learn how to use Claude for a mailing list.
          </h2>
          <p className="mt-5 text-lg text-[#6B7280] leading-relaxed">
            That content is everywhere. This room is for people who already know the basics and want
            the layer that doesn&apos;t get published — systems analysis, protection, agent install,
            optimization judgment, and the operating patterns behind serious days.
          </p>
          <p className="mt-4 text-sm text-[#6B7280] flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-[#C5A46E]" />
            We teaser the outcomes. We do not hand you a Googleable recipe.
          </p>
        </div>
      </motion.section>

      {/* WHO */}
      <motion.section id="proof" className="section" {...fadeUp}>
        <div className="kola-container">
          <div className="max-w-2xl mb-10">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">WHO BUILDS THE ROOM</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
              Emily Grace — shipping, trading, parenting, building
            </h2>
            <p className="mt-4 text-lg text-[#6B7280] leading-relaxed">
              Not a parked idea. Multiple live products (AUVIE, Medvo, and more), capital systems,
              and a full life that only works because the systems do. You&apos;re hiring a day with
              that operator — not a content brand performing “AI.”
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {portfolio.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card-premium p-7 group block"
              >
                <div className="text-xs tracking-[2px] text-[#C5A46E]">{p.tag}</div>
                <div className="text-2xl font-semibold mt-1 group-hover:text-[#C5A46E] transition-colors">
                  {p.name}
                </div>
                <p className="mt-3 text-[#6B7280] leading-relaxed">{p.blurb}</p>
              </motion.a>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#6B7280] max-w-3xl">
            Historical operating examples. Not financial advice. Results are not typical or guaranteed.
            Nothing on this site is an invitation to recreate trading or revenue outcomes.
          </p>
        </div>
      </motion.section>

      {/* THE ROOM */}
      <motion.section id="room" className="section bg-[#F8F7F4]" {...fadeUp}>
        <div className="kola-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">INSIDE (TEASER)</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
              What you come for — without the recipe
            </h2>
            <p className="mt-3 text-[#6B7280] text-lg">
              Enough signal to know if this is your room. Not enough to reverse-engineer it from a browser tab.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {inTheRoom.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-premium p-7"
              >
                <div className="flex items-center gap-2 text-[#C5A46E] text-xs tracking-[2px] mb-3">
                  <Lock className="w-3.5 h-3.5" /> IN THE ROOM
                </div>
                <div className="text-xl font-semibold tracking-tight">{item.title}</div>
                <p className="mt-2 text-[#6B7280] leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 max-w-2xl mx-auto rounded-2xl border border-[#EDE9E0] bg-white p-7 text-center">
            <Sparkles className="w-5 h-5 text-[#C5A46E] mx-auto" />
            <p className="mt-3 text-lg font-semibold tracking-tight">
              Six-figure days exist in the systems we open up.
            </p>
            <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
              Historical examples from live operations — capital and product. Not a promise.
              Not typical. Not something we outline step-by-step on a landing page.
            </p>
          </div>
        </div>
      </motion.section>

      {/* WHY 15K */}
      <motion.section id="why-15k" className="section bg-[#0A1628] text-white" {...fadeUp}>
        <div className="kola-container">
          <div className="max-w-2xl mb-10">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">WHY $15,000</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
              Honestly? It might still be underpriced.
            </h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              The number is a filter. It keeps the room full of people who already have the basics
              and want to be around other smart operators — not tourists collecting free tactics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {valueStack.map((row) => (
              <div
                key={row.label}
                className={`rounded-2xl border p-7 ${
                  row.value === "$15,000"
                    ? "border-[#C5A46E] bg-[#C5A46E]/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="text-sm text-white/60">{row.label}</div>
                <div
                  className={`text-3xl font-semibold tracking-tight mt-2 ${
                    row.value === "$15,000" || row.value.startsWith("6")
                      ? "text-[#C5A46E]"
                      : "text-white"
                  }`}
                >
                  {row.value}
                </div>
                <p className="mt-3 text-sm text-white/65 leading-relaxed">{row.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Peer caliber",
                body: "You came for the systems — and for the other people in the room who already operate at a high level.",
              },
              {
                icon: Shield,
                title: "Protected method",
                body: "What we show is not re-published as a downloadable course. Access is the product.",
              },
              {
                icon: Lock,
                title: "Fit-checked first",
                body: "15-minute consult included. If it is not mutual, we do not force a seat.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 p-6">
                <c.icon className="w-5 h-5 text-[#C5A46E]" />
                <div className="font-semibold mt-3">{c.title}</div>
                <p className="text-sm text-white/65 mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FOR / NOT FOR */}
      <motion.section className="section" {...fadeUp}>
        <div className="kola-container">
          <div className="text-center mb-10">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">THE FILTER</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">Who this room is for</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card-premium p-8">
              <div className="text-sm font-semibold tracking-wide text-emerald-700 mb-4">YES</div>
              <ul className="space-y-3">
                {forWho.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px]">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-none" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-premium p-8">
              <div className="text-sm font-semibold tracking-wide text-red-700/80 mb-4">NOT THIS ROOM</div>
              <ul className="space-y-3">
                {notInTheRoom.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px]">
                    <X className="w-4 h-4 text-red-500/80 mt-1 flex-none" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* VENUE — short */}
      <motion.section className="section bg-white border-y border-[#EDE9E0]" {...fadeUp}>
        <div className="kola-container grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[#C5A46E] text-sm tracking-[2px]">WHERE</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">
              O&apos;Rourke Winery, Lake Country
            </h2>
            <p className="mt-4 text-lg text-[#6B7280] leading-relaxed">
              Private. In-person only. No hybrid Zoom version — the room is the product.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border">
            <img
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80"
              alt="Okanagan vineyard setting"
              className="w-full h-[280px] object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* FAQ — tight, no methods */}
      <motion.section className="section bg-[#F8F7F4]" {...fadeUp}>
        <div className="kola-container max-w-3xl">
          <div className="text-center mb-10">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">QUESTIONS</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Will you publish the curriculum online?",
                a: "No. The site is a teaser on purpose. If you can reverse-engineer the day from a landing page, it is not worth $15k.",
              },
              {
                q: "Is this a trading course?",
                a: "No. Capital systems may appear as historical operator examples. The room is about systems, protection, agents, and multi-business leverage — not tips or guaranteed returns.",
              },
              {
                q: "Why $15,000?",
                a: "To keep the room full of people who already have the basics and want peer-level operators — not the cheapest AI workshop on the internet.",
              },
              {
                q: "Is there a remote option?",
                a: "No. In-person only at O'Rourke Winery.",
              },
              {
                q: "What is the next step?",
                a: "A short fit consult. Mutual yes only. Then you lock the day.",
              },
            ].map((faq) => (
              <div key={faq.q} className="card-premium p-6">
                <div className="font-semibold text-lg">{faq.q}</div>
                <p className="mt-2 text-[#6B7280] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <section className="section bg-[#0A1628] text-white">
        <div className="kola-container text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs tracking-[2px] text-[#C5A46E] mb-6">
            <span className="live-dot" />
            FIT CONSULT · 15 MINUTES
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            If this is your room, you already feel it.
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Request the fit consult. We both decide. $15,000 CAD · private day · method stays offline.
          </p>
          <div className="mt-10">
            <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gold-btn h-14 px-10 text-base rounded-full">
                Request a fit consult <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="mt-4 text-xs text-white/45">
              O&apos;Rourke Winery · Lake Country, BC · In-person only · Limited seats
            </p>
          </div>
          <p className="mt-8 text-[11px] text-white/35 max-w-lg mx-auto">
            Historical examples only. Not financial advice. The Grace Network does not provide
            broker services or guarantee investment or revenue outcomes. Results are not typical.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
