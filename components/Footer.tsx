export function Footer() {
  return (
    <footer className="border-t border-[#EDE9E0] bg-white py-10 text-sm text-[#6B7280]">
      <div className="kola-container flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <div className="font-semibold text-[#0A1628]">The Grace Network</div>
          <p className="mt-1 max-w-sm">
            Private day with Emily Grace. Multiple six-figure businesses, solo — systems that actually run.
          </p>
          <p className="mt-2 text-xs">Lake Country · Kelowna, BC</p>
        </div>
        <div className="text-xs md:text-right space-y-1">
          <div>
            <a href="mailto:hello@thegracenetwork.ai" className="hover:text-[#0A1628]">
              hello@thegracenetwork.ai
            </a>
          </div>
          <div>© {new Date().getFullYear()} The Grace Network</div>
          <div className="pt-2 text-[10px] max-w-xs md:ml-auto">
            Historical examples only. Not financial advice. Results not typical or guaranteed.
          </div>
        </div>
      </div>
    </footer>
  );
}
