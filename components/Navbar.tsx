"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const CONSULT_URL = "https://calendar.gohighlevel.com/thegracenetworkai-private";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#F8F7F4]/95 backdrop-blur border-b border-[#EDE9E0]">
      <div className="kola-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0A1628] flex items-center justify-center">
            <span className="text-[#C5A46E] font-semibold tracking-tighter text-xl">G</span>
          </div>
          <div>
            <div className="font-semibold tracking-[-0.5px] text-xl text-[#0A1628]">The Grace Network</div>
            <div className="text-[10px] text-[#6B7280] -mt-1">AI Accelerator</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/#why-15k" className="hover:text-[#C5A46E] transition-colors">
            Why $15k
          </a>
          <a href="/#day" className="hover:text-[#C5A46E] transition-colors">
            The Day
          </a>
          <Link
            href="/accelerator"
            className={`hover:text-[#C5A46E] transition-colors ${pathname === "/accelerator" ? "text-[#C5A46E]" : ""}`}
          >
            Accelerator
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gold-btn px-6 rounded-full">
              Book consult
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
