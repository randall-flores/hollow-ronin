"use client";
import Link from "next/link";

type FooterLink = { label: string; href: string; external?: boolean };

const LINKS: Record<string, FooterLink[]> = {
  SHOP: [
    { label: "SHOP",     href: "/shop" },
    { label: "DROPS",    href: "/drops" },
    { label: "LOOKBOOK", href: "/lookbook" },
    { label: "ABOUT",    href: "/about" },
  ],
  SUPPORT: [
    { label: "CONTACT",  href: "mailto:support@hollowronin.com", external: true },
    { label: "SHIPPING", href: "/shipping" },
    { label: "RETURNS",  href: "/returns" },
  ],
  LEGAL: [
    { label: "PRIVACY", href: "/privacy" },
    { label: "TERMS",   href: "/terms" },
  ],
  SOCIAL: [
    { label: "INSTAGRAM", href: "https://instagram.com/hollow.ronin",   external: true },
    { label: "TIKTOK",    href: "https://tiktok.com/@hollowronin",      external: true },
    { label: "FACEBOOK",  href: "https://facebook.com/hollowronin",     external: true },
  ],
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
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(201,169,97,0.3)", padding: "clamp(40px, 7vw, 64px) clamp(20px, 5vw, 48px) 32px" }}>
      <style>{`
        .hr-footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 80px;
        }
        @media (max-width: 767px) {
          .hr-footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 24px;
            margin-bottom: 56px;
          }
        }
        .hr-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #2e2e2e;
          padding-top: 24px;
          gap: 16px;
        }
        @media (max-width: 480px) {
          .hr-footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
        <img
          src="/logos/hollow-ronin-emblem.svg"
          alt="Hollow Ronin"
          width={160}
          height={160}
          style={{ width: "160px", height: "160px", opacity: 0.95 }}
        />
      </div>

      <div style={{ overflow: "hidden", borderBottom: "1px solid #2e2e2e", paddingBottom: "32px", marginBottom: "64px" }}>
        <div className="animate-ticker" style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#444748", margin: "0 24px" }}>
              HOLLOW RONIN — DROP 001 — NO MASTER. NO RULES — CYBER SAMURAI ◆
            </span>
          ))}
        </div>
      </div>

      <div className="hr-footer-grid">
        {Object.entries(LINKS).map(([col, links]) => (
          <div key={col}>
            <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a961", marginBottom: "20px" }}>
              {col}
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {links.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a961")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={linkStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a961")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        ))}
      </div>

      <div className="hr-footer-bottom">
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", color: "#f0ede6", letterSpacing: "0.1em" }}>
          HOLLOW RONIN
        </span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,237,226,0.5)" }}>
          ©2025 HOLLOW RONIN // PROTOCOL_001 // ALL RIGHTS RESERVED
        </span>
      </div>
    </footer>
  );
}
