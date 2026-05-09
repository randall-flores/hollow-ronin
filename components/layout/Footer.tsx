import Link from "next/link";

const LINKS = {
  BRAND:   ["STORY","EDITORIAL","RETAIL_LABS"],
  SUPPORT: ["SHIPPING","RETURNS","CONTACT"],
  LEGAL:   ["TERMS","PRIVACY","COOKIES"],
  SOCIAL:  ["INSTAGRAM","TWITTER_X","DISCORD"],
};

export default function Footer() {
  return (
    <footer className="bg-void border-t border-red/30 px-page pt-20 pb-10">
      {/* Footer marquee */}
      <div className="overflow-hidden border-b border-gray-outline/20 pb-8 mb-16">
        <div className="flex whitespace-nowrap animate-ticker" style={{ width: "max-content" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-mono text-[10px] tracking-[0.2em] text-gray-dim mx-8">
              HOLLOW RONIN — DROP 001 — NO MASTER. NO RULES — CYBER SAMURAI ◆
            </span>
          ))}
        </div>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
        {Object.entries(LINKS).map(([col, links]) => (
          <div key={col} className="space-y-6">
            <h4 className="font-mono text-[10px] tracking-[0.2em] text-red">{col}</h4>
            <nav className="flex flex-col gap-3">
              {links.map(l => (
                <Link key={l} href="#"
                  className="font-mono text-[10px] tracking-[0.15em] text-gray-dim hover:text-cream transition-colors duration-300">
                  {l}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-10 border-t border-gray-outline/20">
        <span className="font-bebas text-3xl text-cream tracking-tight">HOLLOW RONIN</span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-gray-dim">
          ©2025 HOLLOW RONIN // PROTOCOL_001 // ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  );
}
