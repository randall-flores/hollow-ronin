import Ticker from "@/components/layout/Ticker";
import ProductGrid from "@/components/product/ProductGrid";
import BrandStatement from "@/components/ui/BrandStatement";
import EmailCapture from "@/components/ui/EmailCapture";

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDk2nPBv6rTtq8RlUlEHJRo22jgWid3BMU_6tXKc9wY_QWX-TIQw9Mh73J5Zx7jXCfYyI3lsyxZkyh9yjqjbw56_mYT4aRS92CdeuOIpcuwy8dG7iPKLkTglu6XT7_qMUerZIaOGjnNQRGWNz2XFNjyBE8ziOoVw24m7dB5ey3WrSTIQzV6Vj5PPu61cBqlRSs-jp_mScz8MMLjAnCgYmTf0diOrVhx9J9gnU9DOkxxgJgUyVCq31plr5APZc31wrbuikk3-zzZfE0";

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ───────────────────────────────────── */}
      <section style={{ position: "relative", height: "100vh", width: "100%", background: "#0a0a0a", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 80px" }}>

        {/* Hero background image — same as Stitch */}
        <img
          src={HERO_IMG}
          alt="Hollow Ronin — Cyber Samurai Editorial"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "overlay", opacity: 0.4 }}
        />

        {/* Red gradient from bottom */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(192,0,30,0.1), transparent)" }} />

        {/* Dark base so image doesn't overpower */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.6)" }} />

        {/* Subtle red grid */}
        <div className="grid-lines" style={{ position: "absolute", inset: 0, backgroundSize: "80px 80px", opacity: 0.08 }} />

        {/* Vertical side label */}
        <div style={{ position: "absolute", top: "50%", right: "48px", transform: "translateY(-50%)" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase", color: "#c0001e", writingMode: "vertical-rl", display: "block" }}>
            PROTOCOL_001 // NEO_EDO
          </span>
        </div>

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "48px" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "120px", lineHeight: "100px", letterSpacing: "-0.02em", color: "#f0ede6" }}>
              HOLLOW
            </span>
            <span className="text-stroke-cream" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "120px", lineHeight: "100px", letterSpacing: "-0.02em", marginTop: "-16px", display: "block" }}>
              RONIN
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: "24px" }}>
            <p style={{ maxWidth: "420px", fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px", color: "#c4c7c7", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Fabricated in the void. Designed for the resistance. A new protocol of functional aesthetics.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="/shop" className="btn-primary" style={{ padding: "16px 40px" }}>SHOP_COLLECTION</a>
              <a href="/drops" className="btn-outline" style={{ padding: "16px 40px" }}>VIEW_FILM</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────────── */}
      <Ticker />

      {/* ── PRODUCTS ───────────────────────────────── */}
      <ProductGrid />

      {/* ── BRAND STATEMENT ────────────────────────── */}
      <BrandStatement />

      {/* ── EMAIL CAPTURE ───────────────────────────── */}
      <EmailCapture />
    </main>
  );
}
