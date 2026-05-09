import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-mid">
      {/* Top red accent */}
      <div className="h-px bg-red w-full" />

      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-gray-mid py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="label text-gray-lt mx-8">
              HOLLOW RONIN — DROP 001 — NO MASTER. NO RULES. — CYBER SAMURAI — ◆
            </span>
          ))}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-10 py-14">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p
            className="font-display text-3xl text-offwhite mb-3"
            style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 900 }}
          >
            HOLLOW RONIN
          </p>
          <p className="text-gray-lt text-xs leading-relaxed" style={{ letterSpacing: "0.04em" }}>
            The outsider. <br />No master, no rules.
          </p>
        </div>

        {/* Shop */}
        <div>
          <p className="label text-offwhite mb-4">Shop</p>
          <ul className="space-y-3">
            {["All Products", "T-Shirts", "Hoodies", "Headwear"].map((l) => (
              <li key={l}>
                <Link href="#" className="label text-gray-lt hover:text-red transition-colors text-[10px]">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <p className="label text-offwhite mb-4">Info</p>
          <ul className="space-y-3">
            {["About", "Drops", "Sizing Guide", "Shipping"].map((l) => (
              <li key={l}>
                <Link href="#" className="label text-gray-lt hover:text-red transition-colors text-[10px]">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="label text-offwhite mb-4">Follow</p>
          <ul className="space-y-3">
            {["Instagram", "TikTok", "Pinterest"].map((l) => (
              <li key={l}>
                <Link href="#" className="label text-gray-lt hover:text-red transition-colors text-[10px]">
                  {l} ↗
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-mid px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="label text-gray-lt text-[10px]">
          © {year} Hollow Ronin. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms", "Returns"].map((l) => (
            <Link key={l} href="#" className="label text-gray-lt hover:text-red transition-colors text-[10px]">
              {l}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
