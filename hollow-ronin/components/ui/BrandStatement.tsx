export default function BrandStatement() {
  return (
    <section style={{ position: "relative", padding: "160px 48px", borderTop: "1px solid rgba(192,0,30,0.2)", borderBottom: "1px solid rgba(192,0,30,0.2)", overflow: "hidden" }}>
      <div className="grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundSize: "80px 80px" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "100px", lineHeight: "0.9", textTransform: "uppercase", color: "#f0ede6" }}>
          We exist in the silence
        </h2>
        <h2 className="text-stroke-cream" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "100px", lineHeight: "0.9", textTransform: "uppercase", display: "block", margin: "16px 0" }}>
          Between the signal and
        </h2>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "100px", lineHeight: "0.9", textTransform: "uppercase", color: "#c0001e" }}>
          The absolute void
        </h2>
      </div>
      <div style={{ marginTop: "80px", display: "flex", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "1em", textTransform: "uppercase", color: "#c4c7c7" }}>
          ESTABLISHED_001 // TOKYO_LONDON_VOID
        </span>
      </div>
    </section>
  );
}
