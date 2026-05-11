const BOXES = [
  { label: "EDITORIAL 001", height: "400px" },
  { label: "EDITORIAL 002", height: "280px" },
  { label: "EDITORIAL 003", height: "360px" },
  { label: "EDITORIAL 004", height: "360px" },
  { label: "EDITORIAL 005", height: "400px" },
  { label: "EDITORIAL 006", height: "280px" },
];

export default function LookbookPage() {
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
          LOOKBOOK
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
          DROP 001 // EDITORIAL
        </p>
      </div>

      {/* Masonry-style grid */}
      <div style={{ padding: "80px", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
          }}
        >
          {BOXES.map(({ label, height }) => (
            <div
              key={label}
              className="lookbook-box"
              style={{ height }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "20px",
                  letterSpacing: "0.08em",
                  color: "#2a2a2a",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
