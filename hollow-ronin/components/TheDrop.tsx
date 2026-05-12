import Link from "next/link";
import Image from "next/image";
import { getProduct, type Product } from "@/lib/products";

const FEATURED_SLUGS = [
  "the-ronin",
  "mask-of-wrath",
  "the-hollow-warrior",
  "the-dragon",
  "the-fox",
  "the-stormbringer",   // Crow Samurai design (crow-samurai-aerial)
  "the-reaper",         // Cyberpunk Ninja design (cyberpunk-ninja-neon)
  "mask-of-stillness",
];

export default function TheDrop() {
  const featured = FEATURED_SLUGS
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <section
      id="the-drop"
      style={{
        position:   "relative",
        background: "#080808",
        padding:    "120px 32px 140px",
        overflow:   "hidden",
        borderTop:    "1px solid rgba(204,34,34,0.18)",
        borderBottom: "1px solid rgba(204,34,34,0.10)",
      }}
    >
      <style>{`
        @keyframes td-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes td-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .td-card {
          opacity: 0;
          animation: td-fade-up 0.9s ease-out forwards;
        }
        .td-link {
          display: block;
          position: relative;
          background: var(--card-bg);
          text-decoration: none;
          color: #ffffff;
          overflow: hidden;
          isolation: isolate;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .td-link::after {
          content: '';
          position: absolute; inset: 0;
          border: 1px solid transparent;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          pointer-events: none;
          z-index: 4;
        }
        .td-link:hover {
          transform: translateY(-6px);
        }
        .td-link:hover::after {
          border-color: var(--card-accent);
          box-shadow: 0 0 50px -8px var(--card-accent), inset 0 0 36px -10px var(--card-accent);
        }
        .td-link:hover .td-view {
          background: var(--card-accent);
          color: #f0ede6;
        }
        .td-link:hover .td-default { opacity: 0; }
        .td-link:hover .td-reveal  { opacity: 1; }
        .td-default,
        .td-reveal {
          object-fit: cover;
          transition: opacity 0.25s ease;
        }
        .td-default { opacity: 1; }
        .td-reveal  { opacity: 0; }
        @media (hover: none) {
          .td-link:hover .td-default { opacity: 1; }
          .td-link:hover .td-reveal  { opacity: 0; }
        }
        .td-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .td-grid > .td-link {
          flex: 1 1 280px;
          max-width: calc(25% - 1px);
          min-width: 260px;
        }
        @media (max-width: 1180px) {
          .td-grid > .td-link { max-width: calc(33.333% - 1px); }
        }
        @media (max-width: 860px) {
          .td-grid > .td-link { max-width: calc(50% - 1px); }
        }
        @media (max-width: 560px) {
          .td-grid > .td-link { max-width: 100%; }
        }
        .td-scanline {
          position: absolute; left: 0; right: 0; height: 180px;
          background: linear-gradient(180deg, transparent, rgba(204,34,34,0.05) 50%, transparent);
          animation: td-scan 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        .td-cta {
          display: inline-flex; align-items: center; gap: 14px;
          padding: 16px 28px;
          border: 1px solid #cc2222;
          color: #cc2222;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .td-cta:hover {
          background: #cc2222;
          color: #f0ede6;
          box-shadow: 0 0 40px -6px rgba(204,34,34,0.6);
        }
      `}</style>

      <div className="td-scanline" />

      {/* Heading block */}
      <header style={{
        position: "relative", zIndex: 2,
        maxWidth: 1440, margin: "0 auto 60px",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }}>
        <p style={{
          margin: 0, fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 8,
          color: "rgba(204,34,34,0.85)", textTransform: "uppercase",
        }}>
          DROP 001 &nbsp;//&nbsp; VOID COLLECTION
        </p>

        <h2 style={{
          margin: "22px 0 0",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(56px, 8vw, 110px)",
          letterSpacing: "0.14em",
          lineHeight: 1,
          color: "#f0ede6",
          textShadow: "0 0 40px rgba(204,34,34,0.16)",
        }}>
          THE DROP
        </h2>

        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginTop: 22,
        }}>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
          <span style={{
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 13, color: "rgba(255,255,255,0.42)",
            letterSpacing: 1,
          }}>
            Limited transmissions. Forged for the void.
          </span>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
        </div>
      </header>

      {/* Grid */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1440, margin: "0 auto",
      }}>
        <div className="td-grid">
          {featured.map((product, i) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              prefetch={false}
              className="td-card td-link"
              style={{
                ['--card-bg' as never]:     product.bg,
                ['--card-accent' as never]: product.accent,
                animationDelay:             `${i * 0.10}s`,
              }}
            >
              <div style={{
                position:    "relative",
                aspectRatio: "1 / 1",
                width:       "100%",
                overflow:    "hidden",
                background:  `radial-gradient(ellipse at center 60%, ${product.accent}1a 0%, transparent 65%), ${product.bg}`,
              }}>
                <span style={{
                  position: "absolute", top: 16, left: 20, zIndex: 5,
                  fontSize: 9, letterSpacing: 5,
                  fontFamily: "'Space Mono', monospace",
                  color: product.accent,
                  textShadow: `0 0 12px ${product.accent}66`,
                }}>
                  {product.label}
                </span>

                <span style={{
                  position: "absolute", top: 16, right: 20, zIndex: 5,
                  fontSize: 9, letterSpacing: 3,
                  fontFamily: "'Space Mono', monospace",
                  color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "3px 8px",
                }}>
                  {product.color}
                </span>

                <Image
                  className="td-default"
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <Image
                  className="td-reveal"
                  src={(product.images[1] ?? product.images[0]).url}
                  alt={(product.images[1] ?? product.images[0]).alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                />

                <div style={{
                  position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
                  background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
                }} />

              </div>

              <div style={{
                padding:        "18px 22px",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "space-between",
                background:     "rgba(0,0,0,0.4)",
                borderTop:      "1px solid rgba(255,255,255,0.05)",
                position:       "relative",
                zIndex:         2,
                gap:            12,
              }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    margin: 0,
                    fontFamily: "Georgia, serif",
                    fontSize: 15, fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: 4,
                    lineHeight: 1.2,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {product.name}
                  </p>
                  <p style={{
                    margin: 0,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10, letterSpacing: 2,
                    color: "rgba(255,255,255,0.42)",
                  }}>
                    ${product.price}.00 USD
                  </p>
                </div>
                <div
                  className="td-view"
                  style={{
                    fontSize: 9, letterSpacing: 4,
                    fontFamily: "'Space Mono', monospace",
                    color: product.accent,
                    textTransform: "uppercase",
                    border: `1px solid ${product.accent}`,
                    padding: "8px 12px",
                    whiteSpace: "nowrap",
                    transition: "background 0.3s ease, color 0.3s ease",
                  }}
                >
                  View →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 60,
          display: "flex", justifyContent: "center",
        }}>
          <Link href="/shop" className="td-cta">
            View the Full Armory →
          </Link>
        </div>
      </div>
    </section>
  );
}
