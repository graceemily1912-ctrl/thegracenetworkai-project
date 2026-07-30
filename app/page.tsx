"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Shield,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
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
    tag: "Education · Live product",
    blurb: "Life-skills app for children with neurological conditions + caregiver portal — product, AI content systems, and shipping cadence.",
    href: "https://www.auvie.app",
  },
  {
    name: "Medvo",
    tag: "Health · Live product",
    blurb: "Patient-advocacy letter app for chronically ill people — ops automation so advocacy scales without a bigger team.",
    href: "https://www.medvo.io",
  },
  {
    name: "FamilyTerms",
    tag: "Family · Live product",
    blurb: "Parenting-plan product: intake to paid plan in one sitting. Systems that convert complexity into a clean customer path.",
    href: "https://www.familyterms.com",
  },
  {
    name: "Grace Network Ops",
    tag: "Trading & capital systems",
    blurb: "Autonomous scanning, signal rules, execution checklists, and review loops — the same class of systems we transfer in the day.",
    href: "https://thegracenetwork.ai",
  },
];

const dayAgenda = [
  {
    time: "09:00",
    title: "Map the machine",
    body: "Full audit of how money, time, and decisions currently move through your businesses — CRM, ops, marketing, finance, support, research.",
  },
  {
    time: "10:30",
    title: "Find the $ leaks",
    body: "Identify the manual loops that cost you founder hours, missed signals, and slow decisions. Rank by ROI, not by what feels urgent.",
  },
  {
    time: "12:00",
    title: "Build the stack (live)",
    body: "Design and start implementing autonomous scanning, rule-based execution, and self-improving review loops for your actual stack.",
  },
  {
    time: "14:30",
    title: "Wire agents into your tools",
    body: "Alerts, decisions, and actions that fit tools you already use — so the system runs without a second full-time hire.",
  },
  {
    time: "16:00",
    title: "Leave with a 90-day machine",
    body: "A prioritized roadmap, working automation starters, and the operating rules your team can run without you in the room.",
  },
];

const outcomes = [
  "A written map of your current systems and where leverage actually lives",
  "Custom autonomous scanning / opportunity detection for your niche",
  "Rule-based execution checklists tailored to your team and process",
  "Self-running review loops so performance compounds after the day",
  "Agent / automation integrations that fit your existing stack",
  "A 90-day implementation roadmap you can execute without hand-holding",
];

const forWho = [
  "Founders running one or more real businesses (not idea-stage)",
  "Operators who already feel the drag of manual scanning and decisions",
  "Leaders ready to implement the same day — not collect another course",
  "People who value private, in-person work over webinar content",
];

const notFor = [
  "Anyone looking for trading tips or guaranteed returns",
  "Teams that want a passive video course or group Zoom",
  "Operators who will not change how work gets done",
  "People shopping the cheapest AI workshop on the internet",
];

const valueStack = [
  {
    label: "What an agency charges for half of this",
    value: "$25k–$75k",
    detail: "Discovery, architecture, and a first automation slice — often over months, with junior delivery.",
  },
  {
    label: "Fractional AI / ops lead (one month)",
    value: "$8k–$15k",
    detail: "You pay that monthly for someone still learning your business. This day compresses the architecture decision.",
  },
  {
    label: "Founder time leak (conservative)",
    value: "$60k+/yr",
    detail: "8 hours/week × ~$150/hr × 50 weeks. Manual chaos is expensive even before missed opportunity.",
  },
  {
    label: "The AI Accelerator day",
    value: "$15,000",
    detail: "One focused day with someone who already runs multiple live products on these systems — not a slide deck.",
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
                ACCEPTING FIT CONSULTS · LAKE COUNTRY, BC
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-5xl md:text-7xl font-semibold tracking-[-2.2px] leading-[0.95]"
              >
                One day with me.
                <br />
                <span className="text-[#C5A46E]">Systems that run without you.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-6 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed"
              >
                I build and operate multiple live tech products with autonomous AI systems —
                scanning, deciding, executing, reviewing — so the business compounds while I&apos;m offline.
                The AI Accelerator is a private, in-person day where we transfer that operating system
                onto <em>your</em> businesses.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gold-btn h-14 px-9 text-base rounded-full flex items-center gap-2 w-full sm:w-auto">
                    Book your 15-min fit consult <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href="#why-15k">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-9 text-base rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white w-full sm:w-auto"
                  >
                    Why $15k for one day
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
                <div className="text-xs tracking-[2px] text-[#C5A46E]">THE OFFER</div>
                <div className="text-5xl font-semibold tracking-tighter">$15,000</div>
                <div className="text-white/70 text-sm">CAD · One day · One-time</div>
                <ul className="space-y-3 text-sm text-white/85">
                  {[
                    "Private day at O'Rourke Winery",
                    "Built on systems from my live products",
                    "Working automations, not theory",
                    "15-min fit consult included",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-[#C5A46E] mt-0.5 flex-none" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2 flex items-center gap-2 text-xs text-white/50">
                  <MapPin className="w-3.5 h-3.5" /> Lake Country, BC · Limited dates
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { k: "4+", v: "Live products shipped" },
              { k: "24/7", v: "Systems that keep working" },
              { k: "1 day", v: "Full transfer, not a course" },
              { k: "$15k", v: "Pays for itself in founder time" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="text-2xl font-semibold text-[#C5A46E] tracking-tight">{s.k}</div>
                <div className="text-sm text-white/60 mt-1">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHO I AM / PORTFOLIO */}
      <motion.section id="proof" className="section" {...fadeUp}>
        <div className="kola-container">
          <div className="max-w-2xl mb-10">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">WHO YOU&apos;RE HIRING FOR THE DAY</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
              Emily Grace — builder-operator, not a course creator
            </h2>
            <p className="mt-4 text-lg text-[#6B7280] leading-relaxed">
              I don&apos;t teach AI from slides I found on LinkedIn. I run a portfolio of real products
              in health, education, family, and capital systems — and I use the same autonomous
              workflows I&apos;ll put on your businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {portfolio.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card-premium p-7 group block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs tracking-[2px] text-[#C5A46E]">{p.tag}</div>
                    <div className="text-2xl font-semibold mt-1 group-hover:text-[#C5A46E] transition-colors">
                      {p.name}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C5A46E] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-3 text-[#6B7280] leading-relaxed">{p.blurb}</p>
              </motion.a>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#6B7280] max-w-3xl">
            Historical operating examples from my businesses. Not financial advice. Results are not
            typical or guaranteed — the transfer is the system and the method, not a promise of returns.
          </p>
        </div>
      </motion.section>

      {/* THE PROBLEM */}
      <motion.section className="section bg-white border-y border-[#EDE9E0]" {...fadeUp}>
        <div className="kola-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#C5A46E] text-sm tracking-[2px]">THE REAL COST</div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
                Manual chaos is quietly expensive
              </h2>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed">
                Every week you spend scanning, deciding, chasing, and re-explaining is a week your
                competitors are compounding with systems. The bill isn&apos;t just payroll — it&apos;s
                founder attention, slow response, and opportunities that never make it to a decision.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                {
                  icon: Clock,
                  title: "Founder hours disappear",
                  body: "Repetitive scanning and decisions that a rules + agent layer should own.",
                },
                {
                  icon: Target,
                  title: "Signals arrive late",
                  body: "By the time a human notices, the window has narrowed or closed.",
                },
                {
                  icon: Zap,
                  title: "Nothing compounds",
                  body: "Without review loops, last month's work doesn't make next month smarter.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-[#EDE9E0] bg-[#F8F7F4]">
                  <div className="w-10 h-10 rounded-full bg-[#0A1628] text-[#C5A46E] flex items-center justify-center flex-none">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <p className="text-sm text-[#6B7280] mt-1">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* DAY AGENDA */}
      <motion.section id="day" className="section bg-[#F8F7F4]" {...fadeUp}>
        <div className="kola-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">THE DAY</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
              What $15,000 actually buys
            </h2>
            <p className="mt-3 text-[#6B7280] text-lg">
              Not a webinar. A full private implementation day at O&apos;Rourke Winery —
              built around the businesses you walk in with.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {dayAgenda.map((block, i) => (
              <motion.div
                key={block.time}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-premium p-6 md:p-7 flex gap-5 md:gap-8"
              >
                <div className="flex-none">
                  <div className="text-[#C5A46E] font-mono text-sm tracking-wider">{block.time}</div>
                  <div className="mt-2 w-px h-full min-h-[2rem] bg-[#EDE9E0] ml-4 hidden md:block" />
                </div>
                <div>
                  <div className="text-xl font-semibold tracking-tight">{block.title}</div>
                  <p className="mt-1.5 text-[#6B7280] leading-relaxed">{block.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-center text-xl font-semibold mb-6">You leave with</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto">
              {outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 text-[15px]">
                  <Check className="text-[#C5A46E] mt-1 flex-none w-4 h-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* SYSTEMS PROOF */}
      <motion.section className="section bg-white" {...fadeUp}>
        <div className="kola-container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[#C5A46E] text-sm tracking-[2px]">THE SYSTEMS</div>
              <h2 className="text-4xl font-semibold tracking-tight mt-2">
                What already runs my businesses
              </h2>
              <p className="mt-4 text-[#6B7280] text-lg leading-relaxed">
                The Accelerator is not a generic ChatGPT tutorial. It&apos;s the transfer of the
                operating layers I use: scan → filter → alert → execute → review — so judgment
                stays human and repetition leaves the room.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Autonomous scanning & signal detection",
                    desc: "24/7 monitoring that surfaces high-leverage opportunities before manual review catches up.",
                  },
                  {
                    title: "Rule-based execution engines",
                    desc: "Emotion-free decisions and actions executed inside checklists and workflows.",
                  },
                  {
                    title: "Self-improving review loops",
                    desc: "Structured journaling and optimization so the system gets sharper every cycle.",
                  },
                  {
                    title: "Compounding infrastructure",
                    desc: "Architecture that scales across verticals without linear headcount.",
                  },
                ].map((s) => (
                  <div key={s.title} className="border-l-2 border-[#C5A46E] pl-4">
                    <div className="font-semibold">{s.title}</div>
                    <p className="text-sm text-[#6B7280] mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[#EDE9E0]">
                <img
                  src="/proof/linkedin-proof-system.png"
                  alt="Autonomous signal system from Emily's businesses"
                  className="w-full"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#EDE9E0]">
                <img
                  src="/proof/web-hero-automation-proof.png"
                  alt="Web automation and execution systems in production"
                  className="w-full"
                />
              </div>
              <p className="text-xs text-[#6B7280]">
                Historical examples only. Not financial advice. Results are not typical or guaranteed.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* WHY $15K */}
      <motion.section id="why-15k" className="section bg-[#0A1628] text-white" {...fadeUp}>
        <div className="kola-container">
          <div className="max-w-2xl mb-10">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">WHY $15,000</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mt-2">
              You&apos;re not buying a day of talking.
              <br />
              You&apos;re buying compressed years of operator pattern recognition.
            </h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              The price is intentional. It filters for people ready to implement, and it reflects
              what it costs to sit with someone who already shipped the hard parts — product,
              systems, and the judgment of what not to automate.
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
                    row.value === "$15,000" ? "text-[#C5A46E]" : "text-white"
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
                icon: Sparkles,
                title: "Operator, not influencer",
                body: "Multiple live products. Real constraints. Systems that survive contact with customers and capital.",
              },
              {
                icon: Users,
                title: "Private access",
                body: "Small / private format. Direct guidance. No diluted group content built for a thousand seats.",
              },
              {
                icon: Shield,
                title: "Fit-checked first",
                body: "15-minute consult is included. If it's not the right day for either of us, we don't force it.",
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
            <div className="text-[#C5A46E] text-sm tracking-[2px]">FIT</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">Who this day is for</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card-premium p-8">
              <div className="text-sm font-semibold tracking-wide text-emerald-700 mb-4">YES — if this is you</div>
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
              <div className="text-sm font-semibold tracking-wide text-red-700/80 mb-4">NO — not a fit</div>
              <ul className="space-y-3">
                {notFor.map((item) => (
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

      {/* VENUE */}
      <motion.section className="section bg-white border-y border-[#EDE9E0]" {...fadeUp}>
        <div className="kola-container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[#C5A46E] text-sm tracking-[2px]">THE VENUE</div>
              <h2 className="text-4xl font-semibold tracking-tight mt-2">
                O&apos;Rourke Winery, Lake Country
              </h2>
              <p className="mt-4 text-lg text-[#6B7280] leading-relaxed">
                A private winery setting overlooking Okanagan Lake. Dramatic landscape, zero hybrid
                Zoom fatigue — room to think and build. In-person only, on purpose.
              </p>
              <ul className="mt-6 space-y-2 text-[15px]">
                {[
                  "Private room, full-day focus",
                  "Lake Country, BC — easy from Kelowna",
                  "Designed for deep work, not a hotel ballroom",
                ].map((t) => (
                  <li key={t} className="flex gap-2 items-center">
                    <Check className="w-4 h-4 text-[#C5A46E]" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-2xl border col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80"
                  alt="Vineyard and lake setting in the Okanagan"
                  className="w-full h-[280px] object-cover"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-2xl border">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80"
                  alt="Wine glasses at a refined table setting"
                  className="w-full h-[180px] object-cover"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-2xl border">
                <img
                  src="https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80"
                  alt="Vineyard rows in golden light"
                  className="w-full h-[180px] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section className="section bg-[#F8F7F4]" {...fadeUp}>
        <div className="kola-container max-w-3xl">
          <div className="text-center mb-10">
            <div className="text-[#C5A46E] text-sm tracking-[2px]">QUESTIONS</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">Straight answers</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is this a trading course?",
                a: "No. Trading systems are one proof surface of how I build autonomous workflows. The day is about installing scan → filter → alert → execute → review systems on the businesses you actually run.",
              },
              {
                q: "Why is it $15,000 and not cheaper?",
                a: "Because the scarce resource is private operator time with someone who already ships. A lower price attracts collectors of content. This price attracts people ready to implement and protects the quality of the day.",
              },
              {
                q: "What if I'm not sure I'm a fit?",
                a: "That's what the 15-minute consult is for — included in the path. We both get a clear yes or no before anyone commits a full day.",
              },
              {
                q: "Is there a remote option?",
                a: "No. In-person only at O'Rourke Winery. The environment is part of the product.",
              },
              {
                q: "Do I get materials after?",
                a: "Yes — roadmap, system maps, and the automation starters we build. The point is that the systems keep working after you leave the winery.",
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
            NEXT STEP · 15 MINUTES
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Ready to stop paying for chaos?
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Book the fit consult. If we&apos;re aligned, you lock a private day at O&apos;Rourke —
            $15,000 CAD, paid upfront, systems that keep working after.
          </p>
          <div className="mt-10">
            <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gold-btn h-14 px-10 text-base rounded-full">
                Book the 15-min consult <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <p className="mt-4 text-xs text-white/45">
              $15,000 CAD · O&apos;Rourke Winery · In-person only · Limited dates
            </p>
          </div>
          <p className="mt-8 text-[11px] text-white/35 max-w-lg mx-auto">
            Historical examples only. Not financial advice. The Grace Network does not provide
            broker services or guarantee investment outcomes. Results are not typical.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
