import Link from "next/link";

type Props = {
  eyebrow: string;
  title:   string;
  intro:   string;
};

export default function PolicyPage({ eyebrow, title, intro }: Props) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color:      "#f0ede6",
      }}
    >
      <section
        style={{
          minHeight: 320,
          background:
            "radial-gradient(ellipse at center, rgba(201,169,97,0.12) 0%, #0a0a0a 70%)",
          borderBottom: "1px solid rgba(201,169,97,0.30)",
          display:      "flex",
          flexDirection: "column",
          alignItems:    "center",
          justifyContent: "center",
          paddingTop:    "clamp(80px, 12vw, 100px)",
          paddingBottom: 40,
          paddingLeft:   20,
          paddingRight:  20,
          textAlign: "center",
        }}
      >
        <p style={{
          margin: "0 0 18px",
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: "0.5em",
          color: "#c9a961",
          textTransform: "uppercase",
        }}>
          {eyebrow}
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(56px, 8vw, 96px)",
          color: "#f0ede6",
          letterSpacing: "0.14em",
          margin: 0, lineHeight: 1,
          textShadow: "0 0 40px rgba(201,169,97,0.20)",
        }}>
          {title}
        </h1>
      </section>

      <section style={{
        maxWidth: 720, margin: "0 auto",
        padding: "clamp(64px, 10vw, 100px) clamp(20px, 5vw, 32px) clamp(96px, 16vw, 140px)",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "Georgia, serif", fontStyle: "italic",
          fontSize: 17, lineHeight: 1.85,
          color: "rgba(240,237,230,0.7)",
          margin: "0 0 32px",
        }}>
          {intro}
        </p>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 5,
          color: "rgba(201,169,97,0.80)",
          textTransform: "uppercase",
          marginBottom: 40,
        }}>
          ⟁ &nbsp; Transmission incoming &nbsp; ⟁
        </p>
        <Link href="/" style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 5,
          color: "#c9a961",
          textTransform: "uppercase",
          border: "1px solid #c9a961",
          padding: "12px 24px",
          textDecoration: "none",
        }}>
          Return to base →
        </Link>
      </section>
    </main>
  );
}
