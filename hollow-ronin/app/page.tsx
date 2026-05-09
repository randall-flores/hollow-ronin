import Ticker from "@/components/layout/Ticker";
import ProductGrid from "@/components/product/ProductGrid";
import BrandStatement from "@/components/ui/BrandStatement";
import EmailCapture from "@/components/ui/EmailCapture";

export default function HomePage() {
  return (
    <main>
      <section style={{ position: "relative", height: "100vh", width: "100%", background: "#0a0a0a", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 80px" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 65% 50%, #1a0005 0%, #0a0a0a 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 100% 100%, rgba(192,0,30,0.2) 0%, transparent 60%)" }} />
        <div className="grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundSize: "80px 80px" }} />
        <div style={{ position: "absolute", top: "15%", right: "15%", width: "1px", height: "60%", background: "linear-gradient(to bottom, transparent, #c0001e, transparent)", transform: "rotate(12deg)", opacity: 0.5 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }} className="animate-fade-in delay-1">
            <span className="animate-blink" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c0001e", display: "inline-block" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6b6b" }}>
              DROP 001 — STATUS: INCOMING
            </span>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <div style={{ overflow: "hidden" }}>
              <h1 className="animate-fade-up delay-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem, 18vw, 18rem)", lineHeight: 0.88, letterSpacing: "-0.01em", textTransform: "uppercase", color: "#f0ede6", display: "block" }}>
                HOLLOW
              </h1>
            </div>
            <div style={{ overflow: "hidden" }}>
              <h1 className="text-stroke-cream animate-fade-up delay-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem, 18vw, 18rem)", lineHeight: 0.88, letterSpacing: "-0.01em", textTransform: "uppercase", display: "block", marginLeft: "clamp(1rem, 4vw, 6rem)" }}>
                RONIN
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "32px" }} className="animate-fade-up delay-4">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "#6b6b6b", maxWidth: "300px", lineHeight: 1.8, textTransform: "uppercase" }}>
              Fabricated in the void. Designed for the resistance. A new protocol of functional aesthetics.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="/shop" className="btn-primary">SHOP_COLLECTION</a>
              <a href="/drops" className="btn-outline">VIEW_FILM</a>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }} className="animate-fade-in delay-5">
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, #6b6b6b)" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b6b6b" }}>SCROLL</span>
        </div>
      </section>

      <Ticker />
      <ProductGrid />
      <BrandStatement />
      <EmailCapture />
    </main>
  );
}
