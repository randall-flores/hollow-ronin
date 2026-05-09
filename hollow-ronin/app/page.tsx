import ProductGrid from "@/components/product/ProductGrid";

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative w-full min-h-dvh flex flex-col justify-end overflow-hidden bg-black">

        {/* Background — layered atmospherics */}
        <div className="absolute inset-0">
          {/* Base: deep dark radial */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 50%, #1a0005 0%, #0a0a0a 65%)",
            }}
          />
          {/* Red vignette bleeding from bottom-right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 100% 100%, rgba(192,0,30,0.18) 0%, transparent 60%)",
            }}
          />
          {/* Grid lines overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(240,237,230,0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(240,237,230,0.8) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
          {/* Diagonal slash accent */}
          <div
            className="absolute"
            style={{
              right: "10%",
              top: "20%",
              width: "1px",
              height: "60%",
              background:
                "linear-gradient(to bottom, transparent, #c0001e, transparent)",
              transform: "rotate(15deg)",
              opacity: 0.6,
            }}
          />
          {/* Horizontal scan line */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "38%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(192,0,30,0.4), transparent)",
            }}
          />
        </div>

        {/* ── CONTENT ──────────────────────────────────────────── */}
        <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-20">

          {/* Status bar — top */}
          <div
            className="fixed top-20 left-6 md:left-10 flex items-center gap-3 animate-fade-in delay-700"
            style={{ zIndex: 10 }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-red animate-blink"
            />
            <span className="label text-[9px] text-gray-lt">
              DROP 001 — STATUS: INCOMING
            </span>
          </div>

          {/* Right side vertical text */}
          <div
            className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 animate-fade-in delay-900"
            style={{ zIndex: 10 }}
          >
            <div
              className="label text-[9px] text-gray-lt"
              style={{ writingMode: "vertical-rl", letterSpacing: "0.2em" }}
            >
              CYBER · SAMURAI · COLLECTIVE
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-red" />
          </div>

          {/* Main hero text — bottom-left anchored */}
          <div>
            {/* Eyebrow */}
            <p className="label text-[10px] text-red mb-6 animate-fade-up delay-200">
              — The Outsider. No Master. No Rules.
            </p>

            {/* HOLLOW — massive display */}
            <div className="overflow-hidden">
              <h1
                className="block animate-fade-up delay-300"
                style={{
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(5rem, 18vw, 18rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "#f0ede6",
                }}
              >
                HOLLOW
              </h1>
            </div>

            {/* RONIN — offset, with red stroke */}
            <div className="overflow-hidden">
              <h1
                className="block animate-fade-up delay-400"
                style={{
                  fontFamily: "'Big Shoulders Display', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(5rem, 18vw, 18rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "transparent",
                  WebkitTextStroke: "1.5px #f0ede6",
                  marginLeft: "clamp(2rem, 6vw, 8rem)",
                }}
              >
                RONIN
              </h1>
            </div>

            {/* Sub-copy + CTA row */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-12 mt-8 animate-fade-up delay-600">
              <p
                className="label text-[11px] text-gray-lt max-w-xs leading-relaxed"
                style={{ letterSpacing: "0.1em", textTransform: "none", fontFamily: "'Chakra Petch', monospace" }}
              >
                Drop 001 arriving soon. Cyber-samurai streetwear built for those who answer to no one.
              </p>
              <div className="flex gap-4">
                <a
                  href="/shop"
                  className="label text-[10px] bg-red text-offwhite px-7 py-3 hover:bg-offwhite hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Shop Drop 001
                </a>
                <a
                  href="/drops"
                  className="label text-[10px] border border-gray-mid text-gray-lt px-7 py-3 hover:border-red hover:text-red transition-all duration-300 cursor-pointer"
                >
                  Notify Me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-1100">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gray-lt" />
          <span className="label text-[9px] text-gray-lt">scroll</span>
        </div>
      </section>

      {/* ── TICKER STRIP ─────────────────────────────────────── */}
      <div
        className="overflow-hidden bg-red py-2.5 border-y border-red-dim"
        style={{ borderColor: "#7a0012" }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="label text-[9px] text-offwhite/90 mx-8"
              style={{ letterSpacing: "0.2em" }}
            >
              DROP 001 — HOLLOW RONIN — NO MASTER — CYBER SAMURAI — FREE SHIPPING OVER $100 ◆
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ─────────────────────────────────────────── */}
      <ProductGrid />

      {/* ── BRAND STATEMENT ──────────────────────────────────── */}
      <section className="bg-black border-t border-gray-mid px-6 md:px-10 py-24 md:py-36 relative overflow-hidden">
        {/* Background cross lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(192,0,30,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(192,0,30,1) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />

        <div className="relative z-10 max-w-5xl">
          <p className="label text-red mb-8">— The Code</p>

          <blockquote
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "#f0ede6",
            }}
          >
            The ronin serves no master.
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px #f0ede6" }}>
              The ronin wears no crest.
            </span>
            <br />
            <span style={{ color: "#c0001e" }}>
              The ronin walks alone.
            </span>
          </blockquote>

          <div className="mt-12 flex items-center gap-6">
            <div className="h-px bg-red w-16" />
            <p className="label text-gray-lt text-[10px]">
              Hollow Ronin — Est. 2025
            </p>
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ────────────────────────────────────── */}
      <section className="bg-gray border-t border-gray-mid px-6 md:px-10 py-20">
        <div className="max-w-lg">
          <p className="label text-red mb-3">— Stay in the shadows</p>
          <h3
            style={{
              fontFamily: "'Big Shoulders Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 0.92,
              textTransform: "uppercase",
              color: "#f0ede6",
            }}
          >
            Be first for Drop 001
          </h3>
          <p
            className="mt-4 mb-8 text-gray-lt text-xs leading-relaxed"
            style={{ fontFamily: "'Chakra Petch', monospace", letterSpacing: "0.04em" }}
          >
            No spam. No noise. Just early access when the drop goes live.
          </p>
          <div className="flex flex-col gap-0">
            <label htmlFor="email-capture" className="sr-only">
              Email address
            </label>
            <div className="flex gap-0">
              <input
                id="email-capture"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                className="flex-1 bg-black border border-gray-mid text-offwhite px-4 py-3 text-xs transition-colors"
                style={{ fontFamily: "'Chakra Petch', monospace" }}
              />
              <button className="label text-[10px] bg-red text-offwhite px-6 py-3 hover:bg-offwhite hover:text-black transition-all duration-300 shrink-0 cursor-pointer">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
