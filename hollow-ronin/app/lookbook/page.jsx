import Link from "next/link";
import Image from "next/image";

const EDITORIALS = [
  { label: "EDITORIAL 001", height: "440px", src: "/mockups/tee-cyber-oni-clash-back-black-model1.png",        caption: "ONI / CLASH" },
  { label: "EDITORIAL 002", height: "300px", src: "/mockups/tee-crow-warrior-ghost-back-white-model3.png",      caption: "GHOST / TENGU" },
  { label: "EDITORIAL 003", height: "380px", src: "/mockups/tee-skeleton-samurai-kanji-back-black-model4.png",  caption: "HOLLOW / KANJI" },
  { label: "EDITORIAL 004", height: "380px", src: "/mockups/tee-dragon-red-sun-back-black-model1.png",          caption: "RYŪ / RED SUN" },
  { label: "EDITORIAL 005", height: "440px", src: "/mockups/tee-kitsune-nine-tails-back-white-model3.png",      caption: "KITSUNE / NINE" },
  { label: "EDITORIAL 006", height: "300px", src: "/mockups/tee-hollow-ronin-logo-front-black-lifestyle.png",   caption: "MASK / SIGIL" },
];

export default function LookbookPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <style>{`
        @keyframes lk-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lk-tile {
          position: relative;
          overflow: hidden;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.04);
          opacity: 0;
          animation: lk-fade-up 0.9s ease-out forwards;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .lk-tile img {
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 0.6s ease;
          filter: grayscale(0.7) brightness(0.78) contrast(1.05);
        }
        .lk-tile:hover img {
          transform: scale(1.07);
          filter: grayscale(0) brightness(0.95) contrast(1.1);
        }
        .lk-tile:hover .lk-overlay {
          opacity: 1;
        }
        .lk-tile:hover .lk-caption {
          transform: translateY(0);
          opacity: 1;
        }
        .lk-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.85) 100%),
            radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%);
          opacity: 0.75;
          transition: opacity 0.4s ease;
        }
        .lk-caption {
          position: absolute; bottom: 18px; left: 22px; right: 22px;
          display: flex; align-items: center; justify-content: space-between;
          transform: translateY(8px);
          opacity: 0.8;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
      `}</style>

      {/* Hero */}
      <div
        style={{
          height: "320px",
          background:
            "radial-gradient(ellipse at center, rgba(120,10,10,0.18) 0%, #0a0a0a 70%)",
          borderBottom: "1px solid rgba(180,20,20,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "68px",
        }}
      >
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.5em",
          color: "rgba(204,34,34,0.85)",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          ⟁ &nbsp; DROP 001 // EDITORIAL &nbsp; ⟁
        </p>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 8vw, 96px)",
            color: "#f0ede6",
            letterSpacing: "0.14em",
            margin: 0,
            textShadow: "0 0 40px rgba(204,34,34,0.18)",
          }}
        >
          LOOKBOOK
        </h1>
        <p style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: "14px",
          color: "rgba(255,255,255,0.42)",
          marginTop: "22px",
          maxWidth: 520,
          textAlign: "center",
          padding: "0 24px",
          lineHeight: 1.7,
        }}>
          Six fragments. One protocol. The void wears what survives the cut.
        </p>
      </div>

      {/* Editorial grid */}
      <div style={{ padding: "80px 32px 120px", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
          }}
        >
          {EDITORIALS.map(({ label, height, src, caption }, i) => (
            <Link
              key={label}
              href="/shop"
              className="lk-tile"
              style={{ height, animationDelay: `${i * 0.12}s` }}
            >
              <Image
                src={src}
                alt={caption}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={{ objectFit: "cover" }}
              />

              <div className="lk-overlay" />

              {/* Top frame */}
              <span style={{
                position: "absolute", top: 16, left: 22, zIndex: 4,
                fontFamily: "'Space Mono', monospace",
                fontSize: 9, letterSpacing: 4,
                color: "rgba(204,34,34,0.9)",
                textShadow: "0 0 12px rgba(204,34,34,0.4)",
              }}>
                {label}
              </span>

              <span style={{
                position: "absolute", top: 16, right: 22, zIndex: 4,
                fontFamily: "'Space Mono', monospace",
                fontSize: 9, letterSpacing: 3,
                color: "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.18)",
                padding: "3px 8px",
              }}>
                FRAME {String(i + 1).padStart(2, "0")}
              </span>

              {/* Bottom caption */}
              <div className="lk-caption" style={{ zIndex: 4 }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  letterSpacing: "0.1em",
                  color: "#f0ede6",
                }}>
                  {caption}
                </span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9, letterSpacing: 4,
                  color: "#cc2222",
                  textTransform: "uppercase",
                  border: "1px solid #cc2222",
                  padding: "5px 10px",
                }}>
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p style={{
          marginTop: 80, textAlign: "center",
          fontSize: 10, letterSpacing: 4,
          fontFamily: "'Space Mono', monospace",
          color: "rgba(255,255,255,0.18)",
          textTransform: "uppercase",
        }}>
          ▲  Hollow Ronin · No master. No rules.  ▲
        </p>
      </div>
    </main>
  );
}
