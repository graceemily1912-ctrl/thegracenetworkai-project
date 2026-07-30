import { ArrowRight } from "lucide-react";
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
  { name: "The Kola Fund", note: "Charity", href: "https://www.thekolafund.org/" },
];

export default function GraceNetworkHome() {
  return (
    <main>
      <Navbar overlay />

      <section className="hero">
        <div className="hero-photo" aria-hidden="true">
          <Image src={wineryImage} alt="" fill preload sizes="100vw" />
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
            <a className="primary-link" href={CONSULT_URL} target="_blank" rel="noreferrer">
              See if it&apos;s a fit <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section id="day" className="story-section">
        <div className="kola-container">
          <div className="story-opening">
            <div className="eyebrow">The private day</div>
            <div>
              <h2>Bring the decision that won&apos;t leave you alone.</h2>
              <p>
                We work on the part of your business that keeps taking your
                attention: what is holding, what keeps breaking, what still needs
                you, and what would give you time back.
              </p>
              <p>
                I built my companies through school-pickup weeks, solo parenting,
                charity work, live capital decisions, and the ordinary disorder
                of a full life. The day is practical because it has to be.
              </p>
            </div>
          </div>

          <div className="story-proof" aria-label="Emily's operating proof">
            <div className="proof-intro">
              <span>Built in real life</span>
              <strong>Multiple six-figure businesses. Operated solo.</strong>
            </div>
            <div className="proof-links">
              {businesses.map((business) => (
                <a key={business.name} href={business.href} target="_blank" rel="noreferrer">
                  <span>{business.note}</span>
                  <strong>{business.name}</strong>
                  <ArrowRight size={14} />
                </a>
              ))}
              <div className="proof-trading">
                <span>Live capital · historical</span>
                <strong>Trading systems</strong>
              </div>
            </div>
          </div>

          <div className="story-close">
            <div>
              <div className="eyebrow">The room</div>
              <h3>Small, private, and calibrated to people already responsible for something real.</h3>
            </div>
            <div className="story-details">
              <p>
                No fixed agenda. No recording. No remote version. You bring
                the live operating problem; the day follows it.
              </p>
              <div id="why" className="single-price">
                <strong>$15,000 USD</strong>
                <span>Paid upfront · one private day</span>
              </div>
              <a className="primary-link dark" href={CONSULT_URL} target="_blank" rel="noreferrer">
                Book the 15-minute fit call <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="venue-final">
        <div className="venue-image" aria-hidden="true">
          <Image src={wineryImage} alt="" fill sizes="100vw" />
        </div>
        <div className="venue-final-wash" aria-hidden="true" />
        <div className="kola-container venue-final-copy">
          <div className="eyebrow light">Lake Country, British Columbia</div>
          <h2>One table above the Okanagan.</h2>
          <p>
            O&apos;Rourke Winery. In person, around one table. Mutual yes only.
          </p>
          <a className="primary-link" href={CONSULT_URL} target="_blank" rel="noreferrer">
            Start with the fit call <ArrowRight size={17} />
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
