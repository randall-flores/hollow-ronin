import Ticker from "@/components/layout/Ticker";
import ProductGrid from "@/components/product/ProductGrid";
import BrandStatement from "@/components/ui/BrandStatement";
import EmailCapture from "@/components/ui/EmailCapture";

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen w-full bg-void overflow-hidden flex flex-col justify-end px-page pb-20">

        {/* Background atmosphere */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 65% 50%, #1a0005 0%, #0a0a0a 65%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 100% 100%, rgba(192,0,30,0.2) 0%, transparent 60%)"
          }} />
          {/* Subtle red grid */}
          <div className="absolute inset-0 grid-lines opacity-[0.07]"
            style={{ backgroundSize: "80px 80px" }} />
          {/* Vertical accent line */}
          <div className="absolute top-[15%] right-[15%] w-px h-[60%] opacity-50"
            style={{ background: "linear-gradient(to bottom, transparent, #c0001e, transparent)", transform: "rotate(12deg)" }} />
        </div>

        {/* Vertical side label */}
        <div className="absolute right-page top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 animate-fade-in delay-5">
          <span className="font-mono text-[9px] tracking-[0.4em] text-red"
            style={{ writingMode: "vertical-rl" }}>
            PROTOCOL_001 // NEO_EDO
          </span>
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, #c0001e)" }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10">
          {/* Status */}
          <div className="flex items-center gap-3 mb-10 animate-fade-in delay-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-blink inline-block" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-gray-dim">
              DROP 001 — STATUS: INCOMING
            </span>
          </div>

          {/* Main title */}
          <div className="mb-12">
            <div className="overflow-hidden">
              <h1 className="font-bebas text-cream animate-fade-up delay-2"
                style={{ fontSize: "clamp(5rem, 18vw, 18rem)", lineHeight: 0.88, letterSpacing: "-0.01em" }}>
                HOLLOW
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="font-bebas text-stroke-cream animate-fade-up delay-3"
                style={{
                  fontSize: "clamp(5rem, 18vw, 18rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.01em",
                  marginLeft: "clamp(1rem, 4vw, 6rem)",
                }}>
                RONIN
              </h1>
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 animate-fade-up delay-4">
            <p className="font-mono text-[10px] tracking-[0.1em] text-gray-dim max-w-xs leading-relaxed uppercase">
              Fabricated in the void. Designed for the resistance. A new protocol of functional aesthetics.
            </p>
            <div className="flex gap-4">
              <a href="/shop"
                className="font-mono text-[10px] tracking-widest px-10 py-4 bg-cream text-void hover:bg-red hover:text-cream transition-all duration-300">
                SHOP_COLLECTION
              </a>
              <a href="/drops"
                className="font-mono text-[10px] tracking-widest px-10 py-4 border border-cream text-cream hover:bg-cream hover:text-void transition-all duration-300">
                VIEW_FILM
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-5">
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, #8e9192)" }} />
          <span className="font-mono text-[8px] tracking-[0.2em] text-gray-dim">SCROLL</span>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────── */}
      <Ticker />

      {/* ── PRODUCTS ─────────────────────────────────────── */}
      <ProductGrid />

      {/* ── BRAND STATEMENT ──────────────────────────────── */}
      <BrandStatement />

      {/* ── EMAIL CAPTURE ────────────────────────────────── */}
      <EmailCapture />
    </main>
  );
}
