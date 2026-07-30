import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CONSULT_URL = "https://calendar.gohighlevel.com/thegracenetworkai-private";

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  return (
    <nav className={`site-nav${overlay ? " overlay" : ""}`}>
      <div className="kola-container nav-inner">
        <Link href="/" className="brand">
          <strong>The Grace Network</strong>
        </Link>
        <div className="nav-links">
          <a href="/#day">The day</a>
          <a href="/#why">Why $15k</a>
          <a className="nav-cta" href={CONSULT_URL} target="_blank" rel="noreferrer">
            Fit call <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </nav>
  );
}
