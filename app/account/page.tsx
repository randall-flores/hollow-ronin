"use client";

import Link from "next/link";

const PILL = "rgba(201,169,97,0.80)";

export default function AccountPage() {
  return (
    <main
      style={{
        minHeight:  "calc(100vh - 68px)",
        background: "radial-gradient(ellipse at 50% 20%, rgba(201,169,97,0.10) 0%, #0a0a0a 60%)",
        color:      "#f0ede6",
        padding:    "clamp(88px, 14vw, 120px) 20px clamp(96px, 16vw, 160px)",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Backdrop sigil */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset:    0,
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(201,169,97,0.05) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position:      "relative",
          maxWidth:      560,
          margin:        "0 auto",
          textAlign:     "center",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           28,
        }}
      >
        <p style={{
          margin: 0, fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 8,
          color: PILL, textTransform: "uppercase",
        }}>
          ⟁ &nbsp; HOLLOW RONIN &nbsp; ⟁
        </p>

        <h1 style={{
          margin: 0,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(64px, 9vw, 112px)",
          letterSpacing: "0.14em",
          lineHeight: 1,
          color: "#f0ede6",
          textShadow: "0 0 40px rgba(201,169,97,0.22)",
        }}>
          THE ORDER
        </h1>

        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginTop: -8,
        }}>
          <div style={{ width: 40, height: 1, background: "rgba(201,169,97,0.30)" }} />
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9, letterSpacing: 5,
            color: "rgba(201,169,97,0.80)",
            textTransform: "uppercase",
          }}>
            Members access protocols first
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(201,169,97,0.30)" }} />
        </div>

        <p style={{
          margin: 0, maxWidth: 460,
          fontFamily: "Georgia, serif", fontStyle: "italic",
          fontSize: 15, lineHeight: 1.7,
          color: "rgba(255,255,255,0.45)",
        }}>
          Sign in to track your transmissions or forge a new identity in the void.
        </p>

        {/* Buttons */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 14,
          width: "100%", maxWidth: 360, marginTop: 12,
        }}>
          <AuthButton
            label="Sign In"
            kind="solid"
            note="Email-based access — coming with Drop 002."
          />
          <AuthButton
            label="Create Account"
            kind="outline"
            note="Membership opens with Shopify customer accounts in Phase 3."
          />
        </div>

        <p style={{
          margin: "20px 0 0",
          fontFamily: "'Space Mono', monospace",
          fontSize: 9, letterSpacing: 5,
          color: "rgba(255,255,255,0.25)",
          textTransform: "uppercase",
        }}>
          Or{" "}
          <Link
            href="/shop"
            style={{ color: "rgba(244,237,226,0.70)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#c9a961")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(244,237,226,0.70)")}
          >
            → return to the drop
          </Link>
        </p>
      </div>
    </main>
  );
}

function AuthButton({
  label, kind, note,
}: {
  label: string;
  kind:  "solid" | "outline";
  note:  string;
}) {
  const solid = kind === "solid";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 8 }}>
      <div
        role="status"
        aria-disabled="true"
        style={{
          width:         "100%",
          padding:       "16px 24px",
          background:    solid ? "#c9a961" : "transparent",
          color:         solid ? "#0a0a0a" : "#c9a961",
          border:        "1px solid #c9a961",
          fontFamily:    "'Anton', 'Bebas Neue', sans-serif",
          fontSize:      14,
          letterSpacing: 5,
          textTransform: "uppercase",
          cursor:        "not-allowed",
          opacity:       0.7,
          display:       "flex",
          alignItems:    "center",
          justifyContent: "center",
          gap:           12,
          userSelect:    "none",
        }}
      >
        <span>{label}</span>
        <span style={{
          fontFamily:    "'Space Mono', monospace",
          fontSize:      9,
          letterSpacing: 3,
          padding:       "3px 8px",
          border:        `1px solid ${solid ? "rgba(10,10,10,0.45)" : "rgba(201,169,97,0.55)"}`,
          color:         solid ? "rgba(10,10,10,0.75)" : "rgba(201,169,97,0.85)",
        }}>
          COMING SOON
        </span>
      </div>
      <span style={{
        fontFamily: "Georgia, serif", fontStyle: "italic",
        fontSize: 11, color: "rgba(255,255,255,0.32)",
        lineHeight: 1.5,
      }}>
        {note}
      </span>
    </div>
  );
}
