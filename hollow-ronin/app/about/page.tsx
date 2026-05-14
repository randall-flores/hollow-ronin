import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About · The Legend",
  description:
    "Hollow Ronin — a clothing house built on a legend. Twelve characters. Three clans. One outsider. No master. No clan. No mercy.",
  alternates: { canonical: "/about" },
  openGraph: {
    title:       "About · The Legend · HOLLOW RONIN",
    description: "Twelve characters. Three clans. One outsider. Wear the story.",
    url:         "/about",
  },
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ede6" }}>
      <style>{`
        @keyframes ab-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ab-anim { opacity: 0; animation: ab-fade-up 1s ease-out forwards; }
      `}</style>

      {/* ============== HERO — THE LEGEND ============== */}
      <section
        style={{
          position: "relative",
          background:
            "radial-gradient(ellipse at center top, rgba(120,10,10,0.18) 0%, #0a0a0a 65%)",
          borderBottom: "1px solid rgba(180,20,20,0.4)",
          paddingTop: 140, paddingBottom: 120,
          overflow: "hidden",
        }}
      >
        {/* faint kanji backdrop */}
        <span style={{
          position: "absolute",
          fontFamily: "serif", fontSize: 480,
          color: "rgba(204,34,34,0.022)",
          fontWeight: 700, lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
          top: "8%", left: "50%",
          transform: "translateX(-50%)",
        }}>
          門
        </span>

        {/* Eyebrow + headline */}
        <div className="ab-anim" style={{
          maxWidth: 900, margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
          position: "relative",
        }}>
          <p style={{
            margin: "0 0 24px",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: "0.5em",
            color: "rgba(204,34,34,0.85)",
            textTransform: "uppercase",
          }}>
            ─────────  WEAR THE STORY  ─────────
          </p>
          <h1 style={{
            margin: 0,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(44px, 6.5vw, 84px)",
            color: "#f0ede6",
            letterSpacing: "0.10em",
            lineHeight: 1.05,
            textShadow: "0 0 40px rgba(204,34,34,0.18)",
          }}>
            A CLOTHING HOUSE
            <br />BUILT ON A LEGEND.
          </h1>
        </div>

        {/* Opening narrative */}
        <div className="ab-anim" style={{
          maxWidth: 680, margin: "72px auto 0",
          padding: "0 32px",
          fontFamily: "Georgia, serif",
          fontSize: 18, lineHeight: 2,
          color: "rgba(240,237,230,0.82)",
          animationDelay: "0.15s",
          display: "flex", flexDirection: "column", gap: 28,
          textAlign: "center",
        }}>
          <p style={{ margin: 0 }}>The world was older once. Quieter.</p>
          <p style={{ margin: 0 }}>
            Twelve masters held it together. Twelve faces. Twelve oaths.
            A balance no one questioned because no one knew it existed.
          </p>
          <p style={{
            margin: 0,
            fontStyle: "italic",
            color: "rgba(204,34,34,0.85)",
            fontSize: 22,
          }}>
            Then it broke.
          </p>
          <p style={{ margin: 0 }}>
            What was left were students. Masks they did not earn. Oaths they
            could not keep. And the kind of silence that demands to be filled.
          </p>
          <p style={{
            margin: 0,
            fontFamily: "'Bebas Neue', sans-serif",
            fontStyle: "normal",
            fontSize: 32,
            letterSpacing: "0.12em",
            color: "#f0ede6",
            textTransform: "uppercase",
          }}>
            Three clans answered.
          </p>
        </div>

        {/* Three clans */}
        <div className="ab-anim" style={{
          maxWidth: 1100, margin: "88px auto 0",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 1,
          background: "rgba(204,34,34,0.18)",
          border: "1px solid rgba(204,34,34,0.18)",
          animationDelay: "0.3s",
        }}>
          {[
            {
              kanji:  "赤月組",
              romaji: "AKATSUKI-GUMI",
              title:  "The Crimson Moon",
              line:   "Warriors of fire and oath. They burn first and answer nothing after.",
            },
            {
              kanji:  "闇組",
              romaji: "YAMI-GUMI",
              title:  "The Hannya Court",
              line:   "Demons wearing human shape. They turn their wounds into crowns.",
            },
            {
              kanji:  "影組",
              romaji: "KAGE-GUMI",
              title:  "The Phantom Path",
              line:   "They walk between worlds. No footprints. No faces. No names.",
            },
          ].map((clan) => (
            <div
              key={clan.romaji}
              style={{
                background: "#0a0a0a",
                padding: "44px 32px 40px",
                display: "flex", flexDirection: "column", gap: 14,
                minHeight: 280,
              }}
            >
              <span style={{
                fontFamily: "serif", fontSize: 38,
                color: "rgba(204,34,34,0.85)",
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}>
                {clan.kanji}
              </span>
              <p style={{
                margin: "8px 0 0",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22, letterSpacing: "0.18em",
                color: "#f0ede6",
              }}>
                {clan.romaji}
              </p>
              <p style={{
                margin: 0,
                fontFamily: "Georgia, serif", fontStyle: "italic",
                fontSize: 14,
                color: "rgba(204,34,34,0.75)",
                letterSpacing: "0.02em",
              }}>
                {clan.title}
              </p>
              <p style={{
                margin: "8px 0 0",
                fontFamily: "Georgia, serif",
                fontSize: 14, lineHeight: 1.75,
                color: "rgba(255,255,255,0.65)",
              }}>
                {clan.line}
              </p>
            </div>
          ))}
        </div>

        {/* Hollow Ronin — the outsider */}
        <div className="ab-anim" style={{
          maxWidth: 720, margin: "104px auto 0",
          padding: "0 32px",
          textAlign: "center",
          animationDelay: "0.45s",
        }}>
          <p style={{
            margin: "0 0 12px",
            fontFamily: "serif",
            fontSize: 44,
            color: "rgba(204,34,34,0.85)",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}>
            門の向こう
          </p>
          <p style={{
            margin: "0 0 28px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22, letterSpacing: "0.3em",
            color: "#f0ede6",
            textTransform: "uppercase",
          }}>
            Mon no Mukō
          </p>
          <p style={{
            margin: "0 0 36px",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 16, letterSpacing: "0.04em",
            color: "rgba(240,237,230,0.55)",
          }}>
            Beyond the Gate
          </p>
          <div style={{
            fontFamily: "Georgia, serif",
            fontSize: 17, lineHeight: 2,
            color: "rgba(240,237,230,0.82)",
            display: "flex", flexDirection: "column", gap: 22,
          }}>
            <p style={{ margin: 0 }}>
              One walked past all three. Past the torii. Past the boundary
              between this world and what watches it.
            </p>
            <p style={{ margin: 0 }}>
              He went through alone. What came back wears his face.
            </p>
            <p style={{ margin: 0 }}>
              Those who saw him return do not speak his name. They only
              whisper what he became —{" "}
              <span style={{ color: "rgba(204,34,34,0.95)", fontStyle: "italic" }}>
                the Hollow Ronin.
              </span>
            </p>
          </div>
        </div>

        {/* Closing thesis + manifesto stamp */}
        <div className="ab-anim" style={{
          maxWidth: 740, margin: "104px auto 0",
          padding: "60px 32px 0",
          textAlign: "center",
          borderTop: "1px solid rgba(204,34,34,0.25)",
          animationDelay: "0.6s",
        }}>
          <p style={{
            margin: "0 0 20px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(20px, 2.4vw, 28px)",
            letterSpacing: "0.16em",
            color: "#f0ede6",
            textTransform: "uppercase",
            lineHeight: 1.4,
          }}>
            HOLLOW RONIN is a streetwear house
            <br />disguised as a legend.
          </p>
          <p style={{
            margin: "0 0 56px",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 15, lineHeight: 1.9,
            color: "rgba(240,237,230,0.6)",
          }}>
            Twelve characters. Three clans. One outsider.<br />
            Each piece carries a name. Each name carries a story.<br />
            Pick the mask that finds you.
          </p>

          {/* Final stamp */}
          {["NO MASTER.", "NO CLAN.", "NO MERCY."].map((line) => (
            <div
              key={line}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 5.5vw, 60px)",
                color: "#f0ede6",
                letterSpacing: "0.05em",
                lineHeight: 1.05,
                textShadow: "0 0 28px rgba(204,34,34,0.18)",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section style={{
        borderTop: "1px solid rgba(204,34,34,0.35)",
        padding: "120px 32px 140px",
        textAlign: "center",
        background:
          "radial-gradient(ellipse at center, rgba(120,10,10,0.15) 0%, #0a0a0a 70%)",
      }}>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 6,
          color: "rgba(204,34,34,0.85)",
          textTransform: "uppercase", margin: "0 0 24px",
        }}>
          ⟁ &nbsp; The Protocol Is Open &nbsp; ⟁
        </p>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(48px, 8vw, 92px)",
          color: "#f0ede6", letterSpacing: "0.08em",
          margin: 0, lineHeight: 1,
        }}>
          WALK THE VOID
        </h2>
        <p style={{
          fontFamily: "Georgia, serif", fontStyle: "italic",
          fontSize: 15, color: "rgba(240,237,230,0.5)",
          margin: "26px auto 40px", maxWidth: 480, lineHeight: 1.7,
        }}>
          Twelve characters. Three clans. Cut once, then never again.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/shop" style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 14,
            letterSpacing: 6, color: "#f0ede6",
            border: "1px solid #f0ede6", padding: "14px 30px",
            textDecoration: "none", textTransform: "uppercase",
            background: "rgba(0,0,0,0.3)",
          }}>
            Enter the shop →
          </Link>
          <Link href="/lookbook" style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 14,
            letterSpacing: 6, color: "rgba(204,34,34,0.95)",
            border: "1px solid rgba(204,34,34,0.6)", padding: "14px 30px",
            textDecoration: "none", textTransform: "uppercase",
          }}>
            View lookbook →
          </Link>
        </div>
      </section>
    </main>
  );
}
