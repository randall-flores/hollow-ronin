"use client";
import Link from "next/link";
import Image from "next/image";

type FooterLink = { label: string; href: string; external?: boolean };

const LINKS: FooterLink[] = [
  { label: "SHOP",     href: "/shop" },
  { label: "DROPS",    href: "/drops" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "ABOUT",    href: "/about" },
  { label: "SHIPPING", href: "/shipping" },
  { label: "RETURNS",  href: "/returns" },
  { label: "PRIVACY",  href: "/privacy" },
  { label: "TERMS",    href: "/terms" },
];

const SOCIALS: FooterLink[] = [
  { label: "INSTAGRAM", href: "https://instagram.com/hollow.ronin", external: true },
  { label: "TIKTOK",    href: "https://tiktok.com/@hollowronin",    external: true },
  { label: "FACEBOOK",  href: "https://facebook.com/hollowronin",   external: true },
];

const linkStyle: React.CSSProperties = {
  fontFamily:    "'DM Mono', monospace",
  fontSize:      "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color:         "#F4EDE2",
  textDecoration:"none",
  display:       "block",
  transition:    "color 0.25s ease",
  padding:       "6px 0",
};

export default function Footer() {
  return (
    <footer
      style={{
        background:   "#0A0A0A",
        borderTop:    "1px solid rgba(201,160,39,0.30)",
        padding:      "72px 48px 28px",
      }}
    >
      <style>{`
        .hr-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 64px;
          margin-bottom: 64px;
        }
        @media (max-width: 767px) {
          .hr-footer-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            margin-bottom: 48px;
          }
        }
        .hr-footer-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          border-top: 1px solid rgba(201,160,39,0.20);
          padding-top: 24px;
        }
      `}</style>

      <div className="hr-footer-grid">
        {/* BRAND COLUMN */}
        <div>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", marginBottom: 24 }}>
            <Image
              src="/logo-mask-transparent.png"
              alt="Hollow Ronin"
              width={140}
              height={56}
              className="object-contain"
            />
          </Link>
          <p
            style={{
              fontFamily:    "'Shippori Mincho', 'Noto Serif JP', Georgia, serif",
              fontStyle:     "italic",
              fontSize:      "14px",
              lineHeight:    1.6,
              color:         "#F4EDE2",
              maxWidth:      "30ch",
              letterSpacing: "0.02em",
            }}
          >
            When the masters fell, the masks remained.
          </p>
        </div>

        {/* LINKS COLUMN */}
        <div>
          <h4
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color:         "#C9A027",
              marginBottom:  20,
            }}
          >
            Navigate
          </h4>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A027")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#F4EDE2")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* SOCIAL COLUMN */}
        <div>
          <h4
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color:         "#C9A027",
              marginBottom:  20,
            }}
          >
            Follow
          </h4>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {SOCIALS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A027")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#F4EDE2")}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="hr-footer-bottom">
        <span
          style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#6B6B6B",
          }}
        >
          © 2025 Hollow Ronin. No gods. No masters.
        </span>
      </div>
    </footer>
  );
}
