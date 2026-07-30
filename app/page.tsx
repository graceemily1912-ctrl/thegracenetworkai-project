"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const CONSULT_URL = "https://calendar.gohighlevel.com/thegracenetworkai-private";

export default function GraceNetworkHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#0A1628] text-white">
        <div className="kola-container pt-20 md:pt-28 pb-16 md:pb-20">
          <p className="text-[#C5A46E] text-sm font-medium mb-5">
            Private day · O&apos;Rourke Winery · Lake Country, BC
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
            I run multiple six-figure businesses alone.
            <span className="block text-[#C5A46E] mt-2">Plus a charity. Plus parenting solo.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed">
            That only works because the systems do. One private day with me — $15,000 —
            for people who already get the basics and want the real stuff, not another course.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gold-btn h-12 px-8 rounded-full text-base">
                Book the 15-min fit call <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
            <a href="#why">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white text-base"
              >
                Why $15k
              </Button>
            </a>
          </div>
          <p className="mt-4 text-sm text-white/40">Paid upfront · In-person only · No Zoom version</p>
        </div>
      </section>

      {/* PROOF STRIP — who I am */}
      <section className="bg-white border-b border-[#EDE9E0]">
        <div className="kola-container py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { n: "Multiple", l: "6-figure businesses" },
              { n: "Solo", l: "No team running them for me" },
              { n: "Charity", l: "On top of the companies" },
              { n: "Parent", l: "Solo — same systems load" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0A1628]">{s.n}</div>
                <div className="text-sm text-[#6B7280] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ME */}
      <section id="proof" className="py-14 md:py-20">
        <div className="kola-container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            I&apos;m Emily. I actually ship.
          </h2>
          <div className="mt-5 space-y-4 text-lg text-[#3D4A5C] leading-relaxed">
            <p>
              AUVIE. Medvo. FamilyTerms. Trading systems. A charity. Kids.
              I run all of it myself. Not with a 40-person agency behind the scenes —
              with systems that work when I&apos;m offline, in school pickup, or in another product.
            </p>
            <p>
              That&apos;s the only reason a day with me is worth $15k. You&apos;re not buying slides.
              You&apos;re buying time with someone who has to make this work in real life, every day.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            {[
              { name: "AUVIE", href: "https://www.auvie.app", note: "Live product" },
              { name: "Medvo", href: "https://www.medvo.io", note: "Live product" },
              { name: "FamilyTerms", href: "https://www.familyterms.com", note: "Live product" },
              { name: "Capital systems", href: "#room", note: "Historical examples only" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between rounded-xl border border-[#EDE9E0] bg-white px-5 py-4 hover:border-[#C5A46E]/50 transition-colors"
              >
                <span className="font-semibold">{p.name}</span>
                <span className="text-sm text-[#6B7280]">{p.note}</span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#6B7280]">
            Historical examples only. Not financial advice. Results are not typical or guaranteed.
          </p>
        </div>
      </section>

      {/* THE ROOM */}
      <section id="room" className="py-14 md:py-20 bg-[#F8F7F4] border-y border-[#EDE9E0]">
        <div className="kola-container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            What the day is (and isn&apos;t)
          </h2>
          <p className="mt-4 text-lg text-[#3D4A5C] leading-relaxed">
            One day at the winery. Small room. People who already use this stuff —
            not beginners asking how to make Claude write emails.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-[#0A1628] mb-3">You come for</h3>
              <ul className="space-y-2.5 text-[#3D4A5C]">
                {[
                  "How I actually run multiple businesses solo",
                  "Systems that keep working when life is full",
                  "Judgment you only get from shipping for real",
                  "A room of people at your level",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="text-[#C5A46E] mt-0.5">→</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#0A1628] mb-3">You don&apos;t get</h3>
              <ul className="space-y-2.5 text-[#3D4A5C]">
                {[
                  "A public curriculum you can Google later",
                  "Prompt packs and hobbyist AI content",
                  "A recording instead of being in the room",
                  "A promise of anyone else’s results",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="text-[#6B7280] mt-0.5">×</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-[#3D4A5C] leading-relaxed border-l-2 border-[#C5A46E] pl-4">
            I show real systems from my businesses — including days that have moved serious money.
            Historical. Not typical. Not a guarantee. And I don&apos;t put the how on this website
            so someone can recreate it from a blog post.
          </p>
        </div>
      </section>

      {/* WHY 15K */}
      <section id="why" className="py-14 md:py-20 bg-[#0A1628] text-white">
        <div className="kola-container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Why it&apos;s $15,000
          </h2>
          <div className="mt-5 space-y-4 text-lg text-white/75 leading-relaxed">
            <p>
              Because my time is what I use to run the companies, the charity, and my kids.
              A private day is expensive on purpose.
            </p>
            <p>
              $15k keeps the room clean. People who already have the basics.
              People who want to be around other operators — not freebie hunters reverse-engineering
              a landing page.
            </p>
            <p className="text-white/90 font-medium">
              Honestly, for the right person it&apos;s still cheap. For the wrong person it&apos;s a hard no —
              and that&apos;s fine.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-white/10 p-5">
              <div className="text-white/50">Public AI content</div>
              <div className="text-xl font-semibold mt-1">$0–2k</div>
              <div className="text-white/45 mt-2">Everywhere. Commodity.</div>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <div className="text-white/50">Agency “transformation”</div>
              <div className="text-xl font-semibold mt-1">$25–75k</div>
              <div className="text-white/45 mt-2">Months. Junior delivery.</div>
            </div>
            <div className="rounded-xl border border-[#C5A46E] bg-[#C5A46E]/10 p-5">
              <div className="text-[#C5A46E]">This day</div>
              <div className="text-xl font-semibold mt-1 text-[#C5A46E]">$15,000</div>
              <div className="text-white/60 mt-2">Private. Fit-checked. Offline.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="py-14 md:py-20">
        <div className="kola-container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Who should book</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold text-emerald-700 mb-3">Yes if</p>
              <ul className="space-y-2 text-[#3D4A5C]">
                {[
                  "You already use AI — you’re not starting from zero",
                  "You have real revenue, a real product, or real capital on the line",
                  "You want operators in the room, not a course library",
                  "You get why $15k is a filter",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-red-700/80 mb-3">Skip if</p>
              <ul className="space-y-2 text-[#3D4A5C]">
                {[
                  "You want prompts and templates you can buy cheaper elsewhere",
                  "You need a recording because you can’t show up",
                  "You’re shopping for the lowest-price AI workshop",
                  "You’re still deciding if any of this is real",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-red-500/80">×</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VENUE + FAQ compact */}
      <section className="py-14 md:py-16 bg-[#F8F7F4] border-y border-[#EDE9E0]">
        <div className="kola-container max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight">O&apos;Rourke Winery</h2>
          <p className="mt-3 text-[#3D4A5C] leading-relaxed">
            Lake Country, BC. In person. That&apos;s it — no hybrid, no “watch later.”
            The room only works if you&apos;re in it.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                q: "Will you put the curriculum online?",
                a: "No. If you can reverse-engineer the day from a website, it isn’t worth $15k.",
              },
              {
                q: "Is this a trading course?",
                a: "No. I may show capital systems as historical examples. You’re not buying tips or guaranteed returns.",
              },
              {
                q: "What’s next?",
                a: "15-minute fit call. We both decide. Then you lock the day.",
              },
            ].map((f) => (
              <div key={f.q} className="border-b border-[#EDE9E0] pb-5 last:border-0 last:pb-0">
                <div className="font-semibold">{f.q}</div>
                <p className="mt-1.5 text-[#6B7280] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0A1628] text-white">
        <div className="kola-container max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            If that landed, book the call.
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed">
            15 minutes. Mutual yes only. $15,000 CAD for the day at O&apos;Rourke.
          </p>
          <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
            <Button size="lg" className="gold-btn h-12 px-8 rounded-full text-base">
              Book the fit call <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </a>
          <p className="mt-8 text-[11px] text-white/35 leading-relaxed max-w-md">
            Historical examples only. Not financial advice. No broker services.
            No guaranteed investment or revenue outcomes. Results are not typical.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
