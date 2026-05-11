"use client";
import Link from "next/link";

const LINKS = {
  BRAND:   ["STORY","EDITORIAL","RETAIL_LABS"],
  SUPPORT: ["SHIPPING","RETURNS","CONTACT"],
  LEGAL:   ["TERMS","PRIVACY","COOKIES"],
  SOCIAL:  ["INSTAGRAM","TWITTER_X","DISCORD"],
};

const linkStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "10px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "#6b6b6b",
  textDecoration: "none",
  display: "block",
  transition: "color 0.3s",
};

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(192,0,30,0.3)", padding: "64px 48px 32px" }}>
      <div style={{ overflow: "hidden", borderBottom: "1px solid #2e2e2e", paddingBottom: "32px", marginBottom: "64px" }}>
        <div className="animate-ticker" style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#444748", margin: "0 24px" }}>
              HOLLOW RONIN — DROP 001 — NO MASTER. NO RULES — CYBER SAMURAI ◆
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginBottom: "80px" }}>
        {Object.entries(LINKS).map(([col, links]) => (
          <div key={col}>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "20px" }}>{col}</h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {links.map(l => (
                <Link key={l} href="#" style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f0ede6")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6b6b6b")}>
                  {l}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #2e2e2e", paddingTop: "24px" }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", color: "#f0ede6" }}>HOLLOW RONIN</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6b6b" }}>
          ©2025 HOLLOW RONIN // PROTOCOL_001 // ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  );
}
