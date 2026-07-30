import { ArrowRight, Check, MapPin, X } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import wineryImage from "@/public/grace-winery.jpg";

const CONSULT_URL = "https://calendar.gohighlevel.com/thegracenetworkai-private";

const businesses = [
  { name: "AUVIE", note: "District education", href: "https://www.auvie.app" },
  { name: "KOLA Academy", note: "Nature-based learning", href: "https://www.learnwithkola.ca/" },
  { name: "Medvo", note: "Health", href: "https://www.medvo.io" },
  { name: "FamilyTerms", note: "Family", href: "https://www.familyterms.com" },
  { name: "Capital systems", note: "Private", href: "#day" },
];

export default function GraceNetworkHome() {
  return (
    <main>
      <Navbar />

      <section className="hero">
        <div className="hero-photo" aria-hidden="true">
          <Image
            src={wineryImage}
            alt=""
            fill
            preload
            sizes="100vw"
          />
        </div>
        <div className="hero-wash" aria-hidden="true" />
        <div className="kola-container hero-inner">
          <div className="eyebrow light hero-reveal hero-reveal-1">
            Everyone signs an NDA · O&apos;Rourke Winery · Lake Country
          </div>
          <h1 className="hero-reveal hero-reveal-2">
            How to run more
            <br />
            <em>without life running you.</em>
          </h1>
          <div className="hero-bottom hero-reveal hero-reveal-3">
            <p>
              One working day with Emily Grace—the solo operator behind multiple
              six-figure businesses, a charity, and a very full real life.
            </p>
            <div className="hero-action">
              <a className="primary-link" href={CONSULT_URL} target="_blank" rel="noreferrer">
                See if it&apos;s a fit <ArrowRight size={17} />
              </a>
              <span>$15,000 CAD · In person only</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-ribbon" aria-label="Emily's operating proof">
        <div className="kola-container proof-grid">
          <div><strong>Multiple</strong><span>six-figure businesses</span></div>
          <div><strong>Solo</strong><span>no team behind the curtain</span></div>
          <a href="https://www.thekolafund.org/" target="_blank" rel="noreferrer">
            <strong>The Kola Fund</strong><span>charity alongside the companies ↗</span>
          </a>
          <div><strong>Parent</strong><span>the systems have to work</span></div>
        </div>
      </section>

      <section className="editorial-section optimized-section">
        <div className="kola-container editorial-grid">
          <div className="eyebrow">Why Emily</div>
          <div>
            <h2>I don&apos;t teach this from a deck. I live inside it.</h2>
            <p className="lead">
              AUVIE. Medvo. FamilyTerms. Trading systems. A charity. Kids.
              None of it works because I have endless time. It works because I&apos;ve
              built systems I can trust when I&apos;m offline, at school pickup, or
              deep in another product.
            </p>
            <p className="signature">— Emily</p>
          </div>
        </div>

        <div className="kola-container business-row">
          {businesses.map((business) => (
            <a
              key={business.name}
              href={business.href}
              target={business.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              <span>{business.note}</span>
              <strong>{business.name}</strong>
              <ArrowRight size={16} />
            </a>
          ))}
        </div>
      </section>

      <section id="day" className="day-section">
        <div className="kola-container">
          <div className="day-heading">
            <div>
              <div className="eyebrow light">The day</div>
              <h2>Bring the thing that&apos;s<br />too real for a course.</h2>
            </div>
            <p>
              We open the actual operating layer: what is working, what is fragile,
              and what would give you your time back. The agenda follows the room,
              not a canned curriculum.
            </p>
          </div>

          <div className="day-cards">
            {[
              ["01", "Your operating system", "How the companies keep moving when life is full."],
              ["02", "The judgment layer", "What to automate, what to protect, and what still needs you."],
              ["03", "The room", "A small, fit-checked group of people with something real on the line."],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="not-course">
            <p>This is not</p>
            <span>prompt packs</span><span>a webinar</span><span>beginner AI</span><span>a recording</span>
          </div>
        </div>
      </section>

      <section id="why" className="price-section optimized-section">
        <div className="kola-container price-grid">
          <div>
            <div className="eyebrow">The price</div>
            <div className="price">$15,000</div>
            <p>CAD · paid upfront · one private day</p>
          </div>
          <div className="price-copy">
            <h2>Expensive on purpose.</h2>
            <p>
              My time is the same time I use to run the businesses, the charity,
              and my family. The price protects the room—and attracts people who
              want operator-level judgment, not more content.
            </p>
            <blockquote>
              For the right person, this can change how everything runs.
              For the wrong person, it&apos;s a hard no. Both are useful.
            </blockquote>
          </div>
        </div>
      </section>

      <section className="fit-section">
        <div className="kola-container fit-grid">
          <div>
            <div className="eyebrow">A quick gut check</div>
            <h2>You&apos;ll know if this is your room.</h2>
          </div>
          <div className="fit-lists">
            <div>
              <h3>Come if</h3>
              {[
                "You already use AI",
                "You have real revenue, product, or capital",
                "You want better systems—not more theory",
              ].map((item) => <p key={item}><Check size={16} />{item}</p>)}
            </div>
            <div className="muted-list">
              <h3>Skip it if</h3>
              {[
                "You need the beginner version",
                "You want templates to download",
                "You can’t be in the room",
              ].map((item) => <p key={item}><X size={16} />{item}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="venue">
        <div className="venue-image" aria-hidden="true">
          <Image
            src={wineryImage}
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="venue-card">
          <MapPin size={19} />
          <div className="eyebrow light">Lake Country, British Columbia</div>
          <h2>A beautiful room for serious work.</h2>
          <p>
            O&apos;Rourke Winery. In person, around one table. No hybrid option.
            No watch-later version.
          </p>
        </div>
      </section>

      <section className="closing">
        <div className="kola-container">
          <div className="eyebrow">15-minute fit call · mutual yes only</div>
          <h2>Come with the business<br />you want your life back from.</h2>
          <a className="primary-link dark" href={CONSULT_URL} target="_blank" rel="noreferrer">
            Book the fit call <ArrowRight size={17} />
          </a>
          <p className="fine-print">
            Historical examples only. Not financial advice. No broker services.
            No guaranteed investment or revenue outcomes. Results are not typical.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
