export default function BrandStatement() {
  return (
    <section style={{ position: "relative", padding: "clamp(80px, 14vw, 160px) clamp(20px, 5vw, 48px)", borderTop: "1px solid rgba(201,169,97,0.25)", borderBottom: "1px solid rgba(201,169,97,0.25)", overflow: "hidden" }}>
      <div className="grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundSize: "80px 80px" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 9vw, 100px)", lineHeight: "0.95", letterSpacing: "0.02em", textTransform: "uppercase", color: "#f0ede6" }}>
          We exist in the silence
        </h2>
        <h2 className="text-stroke-cream" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 9vw, 100px)", lineHeight: "0.95", letterSpacing: "0.02em", textTransform: "uppercase", display: "block", margin: "16px 0" }}>
          Between the signal and
        </h2>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 9vw, 100px)", lineHeight: "0.95", letterSpacing: "0.02em", textTransform: "uppercase", color: "#c9a961" }}>
          The absolute void
        </h2>
      </div>
      <div style={{ marginTop: "clamp(48px, 8vw, 80px)", display: "flex", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#c4c7c7", textAlign: "center" }}>
          ESTABLISHED_001 // TOKYO_LONDON_VOID
        </span>
      </div>
    </section>
  );
}
