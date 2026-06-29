"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#F8F7F4]/95 backdrop-blur border-b border-[#EDE9E0]">
      <div className="kola-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0A1628] flex items-center justify-center">
            <span className="text-[#C5A46E] font-semibold tracking-tighter text-xl">K</span>
          </div>
          <div>
            <div className="font-semibold tracking-[-0.5px] text-xl text-[#0A1628]">KOLA AI</div>
            <div className="text-[10px] text-[#6B7280] -mt-1">KELowna</div>
          </div>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/workshop" className={`hover:text-[#C5A46E] transition-colors ${pathname === "/workshop" ? "text-[#C5A46E]" : ""}`}>
            Workshop
          </Link>
          <Link href="/accelerator" className={`hover:text-[#C5A46E] transition-colors ${pathname === "/accelerator" ? "text-[#C5A46E]" : ""}`}>
            Accelerator
          </Link>
          <Link href="/alumni" className={`hover:text-[#C5A46E] transition-colors ${pathname === "/alumni" ? "text-[#C5A46E]" : ""}`}>
            Alumni
          </Link>
          <Link href="/admin" className="text-[#6B7280] hover:text-[#0A1628] text-xs font-mono tracking-widest">
            ADMIN
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/workshop">
            <Button size="sm" className="gold-btn px-6 rounded-full">Apply to Workshop</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
