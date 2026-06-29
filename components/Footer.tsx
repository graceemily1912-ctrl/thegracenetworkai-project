import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#EDE9E0] bg-white py-12 text-sm text-[#6B7280]">
      <div className="kola-container grid md:grid-cols-3 gap-y-10">
        <div>
          <div className="font-semibold text-[#0A1628] tracking-tight">The Grace Network</div>
          <div className="mt-1">High-leverage AI implementation for ambitious leaders.</div>
          <div className="mt-4 text-xs">Kelowna, British Columbia, Canada</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Link href="/workshop" className="hover:text-[#0A1628]">The Workshop</Link>
          <Link href="/accelerator" className="hover:text-[#0A1628]">The Accelerator</Link>
          <Link href="/alumni" className="hover:text-[#0A1628]">Alumni Portal</Link>
        </div>

        <div className="md:text-right space-y-1.5 text-xs">
          <div>© {new Date().getFullYear()} The Grace Network. All rights reserved.</div>
          <div>Privacy • Terms • PIPEDA compliant</div>
          <div className="pt-2">
            <a href="mailto:hello@thegracenetwork.ai" className="hover:text-[#0A1628]">hello@thegracenetwork.ai</a>
          </div>
        </div>
      </div>
      <div className="kola-container mt-10 pt-6 border-t text-[10px] text-center text-[#6B7280]">
        Exclusive programs. The Workshop is the required first step.
      </div>
    </footer>
  );
}
