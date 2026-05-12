const PHILOSOPHY = [
  "Born from the intersection of street culture and digital resistance. Hollow Ronin exists outside the system — a label with no allegiance to trends, seasons, or gatekeepers.",
  "Every piece is engineered for those who operate in the margins. Functional aesthetics. Purposeful construction. Built to endure the void.",
  "We don't release collections. We release protocols. Each drop is a transmission — limited, intentional, and designed to outlast the moment it enters.",
];

const PILLARS: [string, string, string][] = [
  ["01", "LIMITED", "Each drop is cut once. When it's gone, it's gone — no restocks, no exceptions."],
  ["02", "STORIED", "Every piece carries a name, a myth, a reason to exist. Wear the legend, not the logo."],
  ["03", "FORGED",  "Heavyweight cotton, wash-safe ink, DTG front + back. Built to outlive the season."],
];

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ede6" }}>
      {/* Hero */}
      <section
        style={{
          minHeight: 360,
          background:
            "radial-gradient(ellipse at center, rgba(120,10,10,0.18) 0%, #0a0a0a 70%)",
          borderBottom: "1px solid rgba(180,20,20,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 100,
          paddingBottom: 40,
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: "0 0 18px",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.5em",
            color: "rgba(204,34,34,0.85)",
            textTransform: "uppercase",
          }}
        >
          PROTOCOL_001 // THE HOLLOW CODE
        </p>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 8vw, 96px)",
            color: "#f0ede6",
            letterSpacing: "0.14em",
            margin: 0,
            lineHeight: 1,
            textShadow: "0 0 40px rgba(204,34,34,0.18)",
          }}
        >
          ABOUT
        </h1>
        <p
          style={{
            margin: "26px auto 0",
            maxWidth: 540,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            padding: "0 24px",
          }}
        >
          A label born outside the system — built for the masterless,
          the marginal, and the ones still walking after the lights cut.
        </p>
      </section>

      {/* Manifesto block */}
      <section
        style={{
          padding: "100px 32px",
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 56,
        }}
        className="hr-about-grid"
      >
        <style>{`
          @media (min-width: 900px) {
            .hr-about-grid { grid-template-columns: 1fr 1.2fr !important; gap: 80px !important; align-items: start; }
          }
        `}</style>

        {/* Left — manifesto */}
        <div>
          <p style={{
            margin: "0 0 22px",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 5,
            color: "rgba(204,34,34,0.8)",
            textTransform: "uppercase",
          }}>
            The Three Vows
          </p>
          {["NO MASTER.", "NO RULES.", "NO COMPROMISE."].map((line) => (
            <div
              key={line}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                color: "#f0ede6",
                letterSpacing: "0.04em",
                lineHeight: 1,
                marginBottom: 10,
                textShadow: "0 0 24px rgba(204,34,34,0.12)",
              }}
            >
              {line}
            </div>
          ))}
          <div style={{ width: 56, height: 1, background: "rgba(204,34,34,0.55)", marginTop: 28 }} />
        </div>

        {/* Right — philosophy paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {PHILOSOPHY.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 15,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.85,
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 32px 120px",
        background: "#08080a",
      }}>
        <header style={{
          maxWidth: 1200, margin: "0 auto 50px",
          display: "flex", alignItems: "center", gap: 14, justifyContent: "center",
        }}>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
          <p style={{
            margin: 0, fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 6,
            color: "rgba(204,34,34,0.85)", textTransform: "uppercase",
          }}>
            What we make
          </p>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
        </header>

        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 1,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          {PILLARS.map(([num, title, body]) => (
            <div key={num} style={{
              background: "#0c0c0c",
              padding: "40px 32px",
              minHeight: 220,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <p style={{
                margin: 0, fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: 4,
                color: "#cc2222",
              }}>
                {num}
              </p>
              <h3 style={{
                margin: 0, fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 32, letterSpacing: "0.12em",
                color: "#f0ede6",
              }}>
                {title}
              </h3>
              <p style={{
                margin: 0, fontFamily: "Georgia, serif",
                fontSize: 13, lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
              }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
