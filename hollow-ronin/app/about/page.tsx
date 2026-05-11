const PHILOSOPHY = [
  "Born from the intersection of street culture and digital resistance. Hollow Ronin exists outside the system — a label with no allegiance to trends, seasons, or gatekeepers.",
  "Every piece is engineered for those who operate in the margins. Functional aesthetics. Purposeful construction. Built to endure the void.",
  "We don't release collections. We release protocols. Each drop is a transmission — limited, intentional, and designed to outlast the moment it enters.",
];

export default function AboutPage() {
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
          ABOUT
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
          PROTOCOL_001 // THE HOLLOW CODE
        </p>
      </div>

      {/* Two-column content */}
      <div
        style={{
          padding: "120px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* Left — brand manifesto */}
        <div>
          {["NO MASTER.", "NO RULES.", "NO COMPROMISE."].map((line) => (
            <div
              key={line}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "48px",
                color: "#1a1a1a",
                letterSpacing: "0.04em",
                lineHeight: "1",
                marginBottom: "8px",
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Right — philosophy paragraphs */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "32px" }}
        >
          {PHILOSOPHY.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                color: "#555",
                lineHeight: "2",
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
