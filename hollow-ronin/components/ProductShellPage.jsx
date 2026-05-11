export default function ProductShellPage({ title, subtitle }) {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Hero */}
      <div
        style={{
          height: "280px",
          background:
            "radial-gradient(ellipse at center, rgba(120,10,10,0.15) 0%, #0a0a0a 70%)",
          borderBottom: "1px solid rgba(180,20,20,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "68px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "72px",
            color: "#f0ede6",
            letterSpacing: "0.12em",
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "#555555",
            textTransform: "uppercase",
            marginTop: "12px",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Product skeleton grid */}
      <div style={{ padding: "80px", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="product-skeleton">
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "#333",
                  textTransform: "uppercase",
                }}
              >
                COMING SOON
              </span>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div
                  style={{
                    height: "10px",
                    background: "rgba(255,255,255,0.04)",
                    marginBottom: "8px",
                    width: "70%",
                  }}
                />
                <div
                  style={{
                    height: "10px",
                    background: "rgba(255,255,255,0.04)",
                    width: "40%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
