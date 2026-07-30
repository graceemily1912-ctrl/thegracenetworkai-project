"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const CONSULT_URL = "https://calendar.gohighlevel.com/thegracenetworkai-private";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#F8F7F4]/95 backdrop-blur border-b border-[#EDE9E0]">
      <div className="kola-container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-[#0A1628]">
          The Grace Network
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm">
          <a href="/#room" className="text-[#6B7280] hover:text-[#0A1628] transition-colors">
            The day
          </a>
          <a href="/#why" className="text-[#6B7280] hover:text-[#0A1628] transition-colors">
            Why $15k
          </a>
          <Link
            href="/accelerator"
            className={`hover:text-[#0A1628] transition-colors ${
              pathname === "/accelerator" ? "text-[#0A1628]" : "text-[#6B7280]"
            }`}
          >
            Accelerator
          </Link>
        </div>

        <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer">
          <Button size="sm" className="gold-btn px-5 rounded-full h-9">
            Fit call
          </Button>
        </a>
      </div>
    </nav>
  );
}
