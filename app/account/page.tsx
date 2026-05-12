"use client";

import Link from "next/link";

const PILL = "rgba(204,34,34,0.85)";

export default function AccountPage() {
  return (
    <main
      style={{
        minHeight:  "calc(100vh - 68px)",
        background: "radial-gradient(ellipse at 50% 20%, rgba(204,34,34,0.10) 0%, #0a0a0a 60%)",
        color:      "#f0ede6",
        padding:    "120px 24px 160px",
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
            "radial-gradient(circle at 50% 40%, rgba(204,34,34,0.05) 0%, transparent 55%)",
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
          textShadow: "0 0 40px rgba(204,34,34,0.18)",
        }}>
          THE ORDER
        </h1>

        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginTop: -8,
        }}>
          <div style={{ width: 40, height: 1, background: "rgba(204,34,34,0.5)" }} />
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9, letterSpacing: 5,
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
          }}>
            Members access protocols first
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(204,34,34,0.5)" }} />
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
            onClick={() => console.log("Sign in flow not yet implemented")}
            note="Email-based access — coming with Drop 002."
          />
          <AuthButton
            label="Create Account"
            kind="outline"
            onClick={() => console.log("Create account flow not yet implemented")}
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
            style={{ color: "rgba(204,34,34,0.85)", textDecoration: "none" }}
          >
            → return to the drop
          </Link>
        </p>
      </div>
    </main>
  );
}

function AuthButton({
  label, kind, onClick, note,
}: {
  label:   string;
  kind:    "solid" | "outline";
  onClick: () => void;
  note:    string;
}) {
  const solid = kind === "solid";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 8 }}>
      <button
        onClick={onClick}
        style={{
          width:        "100%",
          padding:      "16px 24px",
          background:   solid ? "#cc2222" : "transparent",
          color:        solid ? "#f0ede6" : "#cc2222",
          border:       `1px solid ${solid ? "#cc2222" : "#cc2222"}`,
          fontFamily:   "'Space Mono', monospace",
          fontSize:     11,
          letterSpacing: 5,
          textTransform: "uppercase",
          cursor:       "pointer",
          transition:   "background 0.25s, color 0.25s, box-shadow 0.25s",
        }}
        onMouseEnter={(e) => {
          if (solid) {
            (e.currentTarget as HTMLButtonElement).style.background = "#e62a2a";
            (e.currentTarget as HTMLButtonElement).style.boxShadow  = "0 0 28px -6px rgba(204,34,34,0.75)";
          } else {
            (e.currentTarget as HTMLButtonElement).style.background = "#cc2222";
            (e.currentTarget as HTMLButtonElement).style.color      = "#f0ede6";
          }
        }}
        onMouseLeave={(e) => {
          if (solid) {
            (e.currentTarget as HTMLButtonElement).style.background = "#cc2222";
            (e.currentTarget as HTMLButtonElement).style.boxShadow  = "none";
          } else {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color      = "#cc2222";
          }
        }}
      >
        {label}
      </button>
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
