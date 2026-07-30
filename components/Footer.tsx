import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#EDE9E0] bg-white py-12 text-sm text-[#6B7280]">
      <div className="kola-container grid md:grid-cols-3 gap-y-10">
        <div>
          <div className="font-semibold text-[#0A1628] tracking-tight">The Grace Network</div>
          <div className="mt-1">
            Private AI Accelerator for founders who want systems that run without them.
          </div>
          <div className="mt-4 text-xs">Lake Country · Kelowna, British Columbia, Canada</div>
        </div>

        <div className="flex flex-col gap-1.5">
          <a href="/#why-15k" className="hover:text-[#0A1628]">
            Why $15,000
          </a>
          <a href="/#day" className="hover:text-[#0A1628]">
            The day
          </a>
          <Link href="/accelerator" className="hover:text-[#0A1628]">
            Accelerator
          </Link>
          <Link href="/alumni" className="hover:text-[#0A1628]">
            Alumni
          </Link>
        </div>

        <div className="md:text-right space-y-1.5 text-xs">
          <div>© {new Date().getFullYear()} The Grace Network. All rights reserved.</div>
          <div>Privacy · Terms · PIPEDA-aware</div>
          <div className="pt-2">
            <a href="mailto:hello@thegracenetwork.ai" className="hover:text-[#0A1628]">
              hello@thegracenetwork.ai
            </a>
          </div>
        </div>
      </div>
      <div className="kola-container mt-10 pt-6 border-t text-[10px] text-center text-[#6B7280] max-w-3xl">
        Historical examples only. Not financial advice. Results are not typical or guaranteed.
        The Grace Network does not provide broker services or guaranteed investment outcomes.
        $15,000 CAD · In-person only at O&apos;Rourke Winery.
      </div>
    </footer>
  );
}
