import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Lookbook · Editorial Vol. I",
  description:
    "Six fragments. One protocol. The Hollow Ronin DROP 001 editorial — Ronin, Oni, Kitsune, Tengu, Ryū, Hollow.",
  alternates: { canonical: "/lookbook" },
  openGraph: {
    title:       "Lookbook · Editorial Vol. I · HOLLOW RONIN",
    description: "Six fragments. One protocol. The cinematic DROP 001 editorial.",
    url:         "/lookbook",
    images:      ["/mockups/namida-no-oni-mask-of-mourning/black/tee-namida-no-oni-mask-of-mourning-back-black-model3.png"],
  },
};

const CHAPTERS = [
  {
    num:     "I",
    title:   "THE RONIN",
    kanji:   "浪人",
    blurb:   "Masterless. Moving without flag, without lord. The first cut is always the one that frees you.",
    hero:    "/mockups/hone-no-chikai-bone-vow/black/tee-hone-no-chikai-bone-vow-back-black-model1.png",
    detail:  "/mockups/hone-no-chikai-bone-vow/black/tee-hone-no-chikai-bone-vow-back-black.png",
  },
  {
    num:     "II",
    title:   "ONI",
    kanji:   "鬼",
    blurb:   "The demon mask is not a disguise. It is what the world made of you, worn on the outside so nothing can sneak in.",
    hero:    "/mockups/namida-no-oni-mask-of-mourning/black/tee-namida-no-oni-mask-of-mourning-back-black-model4.png",
    detail:  "/mockups/namida-no-oni-mask-of-mourning/black/tee-namida-no-oni-mask-of-mourning-back-black-model3.png",
  },
  {
    num:     "III",
    title:   "KITSUNE",
    kanji:   "狐",
    blurb:   "Nine tails. Nine lives. The fox spirit does not chase — it waits, then takes everything.",
    hero:    "/mockups/kurokitsune-vow-keeper/black/tee-kurokitsune-vow-keeper-back-black-model3.png",
    detail:  "/mockups/kurokitsune-vow-keeper/black/tee-kurokitsune-vow-keeper-back-black-model1.png",
  },
  {
    num:     "IV",
    title:   "TENGU",
    kanji:   "天狗",
    blurb:   "Crow warrior. The teacher who beats discipline into the disciple. Wings black as the night you do not return from.",
    hero:    "/mockups/karasu-tengu-sentinel/white/tee-karasu-tengu-sentinel-back-white-model3.png",
    detail:  "/mockups/karasu-tengu-sentinel/black/tee-karasu-tengu-sentinel-back-black-model4.png",
  },
  {
    num:     "V",
    title:   "RYŪ",
    kanji:   "龍",
    blurb:   "The dragon does not ask the sun for permission to rise. It coils. It waits. It burns.",
    hero:    "/mockups/ryujin-dragon-vow/black/tee-ryujin-dragon-vow-back-black-model1.png",
    detail:  "/mockups/ryujin-dragon-vow/black/tee-ryujin-dragon-vow-back-black.png",
  },
  {
    num:     "VI",
    title:   "HOLLOW",
    kanji:   "空",
    blurb:   "Empty is not the same as nothing. Empty is the space where the next cut lands.",
    hero:    "/mockups/hollow/black/tee-hollow-front-black-model3.png",
    detail:  "/mockups/hollow/black/tee-hollow-front-black.png",
  },
];

export default function LookbookPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ede6" }}>
      <style>{`
        @keyframes lb-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lb-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lb-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .lb-hero-img {
          filter: grayscale(0.55) brightness(0.55) contrast(1.15) saturate(0.85);
          transition: filter 1.4s ease, transform 1.4s ease;
        }
        .lb-frame {
          position: relative;
          overflow: hidden;
          background: #0d0d0d;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid transparent;
        }
        .lb-frame img {
          filter: grayscale(0.6) brightness(0.62) contrast(1.1);
          transition: filter 0.6s ease;
        }
        .lb-frame:hover {
          border-color: rgba(204,34,34,0.35);
          box-shadow: 0 0 28px -10px rgba(204,34,34,0.4);
        }
        .lb-frame:hover img {
          filter: grayscale(0) brightness(0.92) contrast(1.05);
        }
        .lb-chapter {
          opacity: 0;
          animation: lb-fade-up 1.2s ease-out forwards;
        }
        .lb-scanline {
          position: absolute; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(204,34,34,0.45), transparent);
          animation: lb-scan 7s linear infinite;
          pointer-events: none;
          z-index: 3;
        }
        .lb-vignette {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.95) 100%);
          z-index: 2;
        }
        .lb-chapter-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: stretch;
        }
        @media (min-width: 900px) {
          .lb-chapter-grid--ltr { grid-template-columns: 1.6fr 1fr; gap: 14px; }
          .lb-chapter-grid--rtl { grid-template-columns: 1fr 1.6fr; gap: 14px; }
        }
        .lb-chapter-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(24px, 5vw, 40px) clamp(16px, 4vw, 28px);
          background: linear-gradient(180deg, rgba(204,34,34,0.04) 0%, transparent 100%);
          border: 1px solid rgba(255,255,255,0.04);
          position: relative;
        }
        .lb-corner {
          position: absolute;
          width: 14px; height: 14px;
          border: 1px solid rgba(204,34,34,0.6);
        }
        .lb-corner.tl { top: 8px; left: 8px; border-right: none; border-bottom: none; }
        .lb-corner.tr { top: 8px; right: 8px; border-left: none; border-bottom: none; }
        .lb-corner.bl { bottom: 8px; left: 8px; border-right: none; border-top: none; }
        .lb-corner.br { bottom: 8px; right: 8px; border-left: none; border-top: none; }
      `}</style>

      {/* ============== HERO — full-bleed cinematic open ============== */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 640,
          overflow: "hidden",
          borderBottom: "1px solid rgba(204,34,34,0.35)",
        }}
      >
        <Image
          src="/mockups/namida-no-oni-mask-of-mourning/black/tee-namida-no-oni-mask-of-mourning-back-black-model3.png"
          alt="Hollow Ronin lookbook hero"
          fill
          priority
          sizes="100vw"
          className="lb-hero-img"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />

        <div className="lb-vignette" />
        <div className="lb-scanline" />

        {/* Frame corners */}
        <div style={{ position: "absolute", top: 24, left: 24, right: 24, bottom: 24, border: "1px solid rgba(240,237,230,0.08)", pointerEvents: "none", zIndex: 4 }}>
          <span className="lb-corner tl" />
          <span className="lb-corner tr" />
          <span className="lb-corner bl" />
          <span className="lb-corner br" />
        </div>

        {/* Top meta strip */}
        <div style={{
          position: "absolute", top: 40, left: 40, right: 40,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          zIndex: 5, opacity: 0, animation: "lb-fade-in 1.5s ease 0.4s forwards",
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 5,
            color: "rgba(204,34,34,0.9)",
          }}>
            ⟁ &nbsp; DROP_001 // EDITORIAL_VOL_I
          </span>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 4,
            color: "rgba(240,237,230,0.45)",
            border: "1px solid rgba(240,237,230,0.18)",
            padding: "4px 10px",
          }}>
            06 / FRAMES
          </span>
        </div>

        {/* Centered title block */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          zIndex: 5,
        }}>
          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.6em",
            color: "rgba(204,34,34,0.85)", textTransform: "uppercase", margin: 0,
            opacity: 0, animation: "lb-fade-up 1.2s ease 0.6s forwards",
          }}>
            Six fragments · One protocol
          </p>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(60px, 14vw, 200px)",
            letterSpacing: "0.04em",
            color: "#f0ede6",
            margin: "20px 0 0",
            lineHeight: 0.9,
            textShadow: "0 0 50px rgba(204,34,34,0.25)",
            opacity: 0, animation: "lb-fade-up 1.4s ease 0.8s forwards",
          }}>
            LOOKBOOK
          </h1>
          <p style={{
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 16, lineHeight: 1.8, color: "rgba(240,237,230,0.55)",
            maxWidth: 540, textAlign: "center", padding: "0 24px",
            marginTop: 30,
            opacity: 0, animation: "lb-fade-up 1.4s ease 1.1s forwards",
          }}>
            A transmission from the masterless. Worn by ghosts who never
            stopped walking.
          </p>
        </div>

        {/* Bottom scroll cue */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          zIndex: 5,
          opacity: 0, animation: "lb-fade-in 1.5s ease 1.5s forwards",
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 5,
            color: "rgba(240,237,230,0.4)",
          }}>
            SCROLL · 進む
          </span>
          <div style={{
            width: 1, height: 40,
            background: "linear-gradient(180deg, rgba(204,34,34,0.7), transparent)",
          }} />
        </div>
      </section>

      {/* ============== MANIFESTO — short editorial intro ============== */}
      <section style={{
        padding: "clamp(64px, 12vw, 140px) 20px clamp(60px, 10vw, 100px)",
        maxWidth: 880, margin: "0 auto",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 6,
          color: "rgba(204,34,34,0.8)", textTransform: "uppercase",
          margin: "0 0 32px",
        }}>
          ▲ &nbsp; The Brief &nbsp; ▲
        </p>
        <p style={{
          fontFamily: "Georgia, serif", fontSize: "clamp(20px, 2.4vw, 26px)",
          lineHeight: 1.7, color: "rgba(240,237,230,0.85)",
          fontStyle: "italic", margin: 0,
        }}>
          &ldquo;Six garments. Six ghosts. Each piece a fragment from a
          mythology that never asked permission to exist. Cut once.
          Worn forever. Built for the ones who walk after the lights
          cut.&rdquo;
        </p>
        <div style={{
          width: 60, height: 1, background: "rgba(204,34,34,0.55)",
          margin: "44px auto 0",
        }} />
      </section>

      {/* ============== CHAPTERS — alternating asymmetric layouts ============== */}
      <section style={{ padding: "20px 24px 80px", maxWidth: 1400, margin: "0 auto" }}>
        {CHAPTERS.map((ch, i) => {
          const isRTL = i % 2 === 1;
          return (
            <div
              key={ch.num}
              className="lb-chapter"
              style={{
                marginBottom: i === CHAPTERS.length - 1 ? 0 : "clamp(60px, 10vw, 120px)",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {/* Chapter header strip */}
              <div style={{
                display: "flex", alignItems: "center", gap: 18,
                marginBottom: 28, padding: "0 4px",
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 14,
                  letterSpacing: 6, color: "rgba(204,34,34,0.9)",
                }}>
                  CHAPTER {ch.num}
                </span>
                <div style={{ flex: 1, height: 1, background: "rgba(204,34,34,0.25)" }} />
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 3,
                  color: "rgba(240,237,230,0.35)",
                }}>
                  FRAME {String(i + 1).padStart(2, "0")} / 06
                </span>
              </div>

              <div className={`lb-chapter-grid lb-chapter-grid--${isRTL ? "rtl" : "ltr"}`}>
                {/* Hero image (big) */}
                <div className="lb-frame" style={{
                  position: "relative",
                  minHeight: "clamp(360px, 60vw, 540px)",
                  order: isRTL ? 2 : 1,
                }}>
                  <Image
                    src={ch.hero}
                    alt={ch.title}
                    fill
                    sizes="(min-width: 900px) 60vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="lb-vignette" />
                  {/* Kanji overlay */}
                  <span style={{
                    position: "absolute",
                    bottom: 24, left: 28, zIndex: 4,
                    fontFamily: "serif",
                    fontSize: 92,
                    color: "rgba(240,237,230,0.08)",
                    lineHeight: 1, fontWeight: 700,
                  }}>
                    {ch.kanji}
                  </span>
                  <span style={{
                    position: "absolute", top: 20, right: 24, zIndex: 4,
                    fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 4,
                    color: "rgba(240,237,230,0.55)",
                    border: "1px solid rgba(240,237,230,0.18)",
                    padding: "4px 10px",
                  }}>
                    {String(i + 1).padStart(2, "0")}.A
                  </span>
                </div>

                {/* Body block — title + copy + detail image */}
                <div className="lb-chapter-body" style={{ order: isRTL ? 1 : 2 }}>
                  <span className="lb-corner tl" />
                  <span className="lb-corner tr" />
                  <span className="lb-corner bl" />
                  <span className="lb-corner br" />

                  <div style={{ padding: "0 8px" }}>
                    <p style={{
                      fontFamily: "serif", fontSize: 48,
                      color: "rgba(204,34,34,0.85)",
                      margin: "0 0 8px", lineHeight: 1,
                    }}>
                      {ch.kanji}
                    </p>
                    <h2 style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(48px, 6vw, 72px)",
                      letterSpacing: "0.08em",
                      color: "#f0ede6",
                      margin: "0 0 22px",
                      lineHeight: 0.95,
                    }}>
                      {ch.title}
                    </h2>

                    <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.6)", marginBottom: 22 }} />

                    <p style={{
                      fontFamily: "Georgia, serif", fontStyle: "italic",
                      fontSize: 16, lineHeight: 1.85,
                      color: "rgba(240,237,230,0.7)",
                      margin: "0 0 28px",
                    }}>
                      &ldquo;{ch.blurb}&rdquo;
                    </p>

                    {/* Detail thumb */}
                    <div className="lb-frame" style={{
                      position: "relative",
                      height: 200,
                      marginBottom: 24,
                    }}>
                      <Image
                        src={ch.detail}
                        alt={`${ch.title} detail`}
                        fill
                        sizes="(min-width: 900px) 35vw, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                      <span style={{
                        position: "absolute", top: 12, left: 14, zIndex: 4,
                        fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 3,
                        color: "rgba(204,34,34,0.85)",
                      }}>
                        {String(i + 1).padStart(2, "0")}.B · DETAIL
                      </span>
                    </div>

                    <Link
                      href="/shop"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 5,
                        color: "#cc2222", textTransform: "uppercase",
                        border: "1px solid #cc2222",
                        padding: "10px 18px",
                        textDecoration: "none",
                        transition: "background 0.25s ease, color 0.25s ease",
                      }}
                      className="lb-cta"
                    >
                      Acquire &nbsp; →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ============== CLOSING — full-bleed final frame ============== */}
      <section style={{
        position: "relative",
        height: "80vh",
        minHeight: 520,
        overflow: "hidden",
        borderTop: "1px solid rgba(204,34,34,0.35)",
      }}>
        <Image
          src="/mockups/karasu-tengu-sentinel/black/tee-karasu-tengu-sentinel-back-black-model3.png"
          alt="Hollow Ronin closing frame"
          fill
          sizes="100vw"
          className="lb-hero-img"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />
        <div className="lb-vignette" />
        <div className="lb-scanline" />

        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          zIndex: 5, textAlign: "center", padding: "0 24px",
        }}>
          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 6,
            color: "rgba(204,34,34,0.85)", margin: "0 0 24px",
          }}>
            END_TRANSMISSION / 終わり
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 9vw, 120px)",
            letterSpacing: "0.06em",
            color: "#f0ede6",
            margin: 0, lineHeight: 0.95,
            textShadow: "0 0 40px rgba(204,34,34,0.3)",
          }}>
            WEAR THE LEGEND
          </h2>
          <p style={{
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 15, color: "rgba(240,237,230,0.55)",
            marginTop: 22, maxWidth: 480, lineHeight: 1.7,
          }}>
            The frames are cut. The protocol is open. Step into the void.
          </p>
          <Link
            href="/shop"
            style={{
              marginTop: 36,
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 16,
              letterSpacing: 6, color: "#f0ede6",
              textDecoration: "none", textTransform: "uppercase",
              border: "1px solid #f0ede6",
              padding: "16px 36px",
              transition: "all 0.3s ease",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(2px)",
            }}
          >
            Enter the shop &nbsp; →
          </Link>
        </div>
      </section>

      {/* Footer signature */}
      <div style={{
        padding: "60px 32px",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        background: "#08080a",
      }}>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 5,
          color: "rgba(255,255,255,0.2)",
          textTransform: "uppercase", margin: 0,
        }}>
          ▲ &nbsp; Hollow Ronin · No master · No rules · No compromise &nbsp; ▲
        </p>
      </div>
    </main>
  );
}
