import Link from "next/link";

const HERO = {
  title: "DROPS",
  subtitle: "PROTOCOL_001 // VOID COLLECTION",
};

export default function DropsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Hero */}
      <div
        style={{
          height: "280px",
          background:
            "radial-gradient(ellipse at center, rgba(201,169,97,0.12) 0%, #0a0a0a 70%)",
          borderBottom: "1px solid rgba(201,169,97,0.30)",
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
            fontSize: "clamp(48px, 10vw, 72px)",
            color: "#f0ede6",
            letterSpacing: "0.12em",
            margin: 0,
          }}
        >
          {HERO.title}
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
          {HERO.subtitle}
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Drop 001 — Live */}
          <Link href="/shop" className="drop-card" style={{ textDecoration: "none" }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "#c9a961",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              LIVE NOW
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(28px, 5vw, 40px)",
                color: "#f0ede6",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              THE VOID COLLECTION
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "#444",
                marginBottom: "32px",
                textTransform: "uppercase",
              }}
            >
              DROP 001
            </div>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "#a8a8a8",
                textTransform: "uppercase",
              }}
            >
              → SHOP NOW
            </span>
          </Link>

          {/* Drop 002 — Coming soon */}
          <div className="drop-card" style={{ opacity: 0.5, cursor: "default" }}>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "rgba(244,237,226,0.50)",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              CLASSIFIED
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(28px, 5vw, 40px)",
                color: "#f0ede6",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              COMING SOON
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "#444",
                textTransform: "uppercase",
              }}
            >
              DROP 002
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
