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
  { name: "Trading systems", note: "Live capital · historical", href: "#day" },
];

export default function GraceNetworkHome() {
  return (
    <main>
      <Navbar overlay />

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
          <div><strong>Solo</strong><span>operated by Emily</span></div>
          <a href="https://www.thekolafund.org/" target="_blank" rel="noreferrer">
            <strong>The Kola Fund</strong><span>charity alongside the companies ↗</span>
          </a>
          <div><strong>Parent</strong><span>a full real life</span></div>
        </div>
      </section>

      <section className="editorial-section optimized-section">
        <div className="kola-container editorial-grid">
          <div className="eyebrow">Why Emily</div>
          <div>
            <h2>I built this in the middle of a full life.</h2>
            <p className="lead">
              AUVIE. Medvo. FamilyTerms. Trading systems. A charity. Kids.
              None of it works because I have endless time. It works through
              school-pickup weeks, while I&apos;m deep in another company, and when
              I&apos;m completely offline.
            </p>
            <p className="signature">— Emily</p>
          </div>
        </div>

        <div className="kola-container business-row">
          {businesses.map((business, index) => (
            <a
              key={business.name}
              href={business.href}
              target={business.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              <small>0{index + 1}</small>
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
              <h2>Bring the decision<br />that won&apos;t leave you alone.</h2>
            </div>
            <p>
              We work on what is holding, what keeps breaking, and what would give
              you time back. The day follows the problem you bring.
            </p>
          </div>

          <div className="day-cards">
            {[
              ["01", "What keeps breaking", "Find the part of the week that repeatedly steals your attention."],
              ["02", "What still needs you", "Decide what only you should hold—and what should stop waiting for you."],
              ["03", "Who is at the table", "A small room of people responsible for something real."],
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
            <span>generic playbooks</span><span>a remote seminar</span><span>starter material</span><span>a recording</span>
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
            <h2>One day. $15,000 CAD.</h2>
            <p>
              Paid upfront. My working time is scarce, and the room stays small.
              You come for clear decisions, not more material.
            </p>
            <blockquote>
              A private day should leave you with fewer moving parts and more
              protected time.
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
                "You already make consequential decisions",
                "You have real revenue, product, or capital",
                "You want fewer moving parts—not more theory",
              ].map((item) => <p key={item}><Check size={16} />{item}</p>)}
            </div>
            <div className="muted-list">
              <h3>Skip it if</h3>
              {[
                "You need the fundamentals explained",
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
          <h2>One table above the Okanagan.</h2>
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
