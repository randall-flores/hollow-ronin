import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About · The Hollow Code",
  description:
    "Hollow Ronin is a cyber-samurai streetwear label born outside the system. No master, no rules, no compromise. Read the manifesto, the process, the transmission log.",
  alternates: { canonical: "/about" },
  openGraph: {
    title:       "About · The Hollow Code · HOLLOW RONIN",
    description: "Manifesto, process, founder's note. Built for the masterless.",
    url:         "/about",
  },
};

const PHILOSOPHY = [
  "Hollow Ronin was born in the margins. Late nights. Cold lights. A laptop, a Wacom tablet, and a refusal to design for anyone but the ghosts in the mirror.",
  "We do not chase trend cycles. We do not court algorithms. We are not interested in being everywhere — we are interested in being undeniable to the few who recognize the cut.",
  "Every piece is a transmission. Every drop is a protocol. Each garment carries a name, a kanji, a myth — because if you are going to wear something, it should mean something.",
];

const PILLARS: [string, string, string][] = [
  ["01", "LIMITED",  "Each drop is cut once. When it's gone, it's gone — no restocks, no exceptions. Scarcity is part of the story."],
  ["02", "STORIED",  "Every piece carries a name, a myth, a reason to exist. Wear the legend, not the logo."],
  ["03", "FORGED",   "Heavyweight cotton, wash-safe ink, DTG front + back. Built to outlive the season — and the trend that bore it."],
];

const PROCESS: [string, string, string][] = [
  ["I",   "DRAFT",   "Concept begins in mythology — yokai, ronin, oni, kitsune. We pull threads from Japanese folklore and run them through a cyberpunk filter."],
  ["II",  "CUT",     "Each design is hand-drawn, then engineered for fabric. Front, back, sleeve — every surface considered. No filler placements."],
  ["III", "FORGE",   "Premium 6.5oz heavyweight cotton, ring-spun. DTG print with reactive inks. Built to fade with character, not fail."],
  ["IV",  "RELEASE", "Drop opens. Drop closes. The protocol is final. What sells out does not return — it gets archived, named, retired."],
];

const TIMELINE: [string, string][] = [
  ["2025 // Q4",  "Concept seed — Hollow Ronin sketched in a notebook at 3am. The first six ghosts named."],
  ["2026 // Q1",  "First samples cut. Fabric weight locked. Print process tested across 18 prototypes."],
  ["2026 // Q2",  "DROP 001 — six garments, six mythologies. The protocol opens to the public."],
  ["2026 // ∞",   "Future drops queued. Tengu armor. Yokai capsules. The void does not stop expanding."],
];

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0ede6" }}>
      <style>{`
        @keyframes ab-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ab-anim { opacity: 0; animation: ab-fade-up 1s ease-out forwards; }
        .ab-corner {
          position: absolute;
          width: 12px; height: 12px;
          border: 1px solid rgba(204,34,34,0.55);
        }
        .ab-corner.tl { top: 6px; left: 6px; border-right: none; border-bottom: none; }
        .ab-corner.tr { top: 6px; right: 6px; border-left: none; border-bottom: none; }
        .ab-corner.bl { bottom: 6px; left: 6px; border-right: none; border-top: none; }
        .ab-corner.br { bottom: 6px; right: 6px; border-left: none; border-top: none; }
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

      {/* ============== THE THREE VOWS + MANIFESTO ============== */}
      <section
        style={{
          padding: "120px 32px",
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr",
          gap: 56,
        }}
        className="hr-about-grid"
      >
        <style>{`
          @media (min-width: 900px) {
            .hr-about-grid { grid-template-columns: 1fr 1.2fr !important; gap: 90px !important; align-items: start; }
          }
        `}</style>

        <div>
          <p style={{
            margin: "0 0 22px",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 5,
            color: "rgba(204,34,34,0.8)",
            textTransform: "uppercase",
          }}>
            ▲ &nbsp; The Three Vows
          </p>
          {["NO MASTER.", "NO RULES.", "NO COMPROMISE."].map((line) => (
            <div
              key={line}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                color: "#f0ede6",
                letterSpacing: "0.04em",
                lineHeight: 1,
                marginBottom: 10,
                textShadow: "0 0 24px rgba(204,34,34,0.12)",
              }}
            >
              {line}
            </div>
          ))}
          <div style={{ width: 56, height: 1, background: "rgba(204,34,34,0.55)", marginTop: 28 }} />
          <p style={{
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 13, color: "rgba(240,237,230,0.4)",
            lineHeight: 1.7, marginTop: 24, maxWidth: 360,
          }}>
            Sworn into every garment. Stitched into every seam. Inked
            onto every label.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <p style={{
            margin: 0,
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 5,
            color: "rgba(204,34,34,0.8)",
            textTransform: "uppercase",
          }}>
            The Manifesto
          </p>
          {PHILOSOPHY.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              {p}
            </p>
          ))}
          <div style={{
            marginTop: 12,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 14, color: "rgba(204,34,34,0.6)",
            letterSpacing: "0.02em",
          }}>
            — sworn at the founding, 2025
          </div>
        </div>
      </section>

      {/* ============== FOUNDER'S NOTE ============== */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#08080a",
        padding: "100px 32px",
      }}>
        <div style={{
          maxWidth: 820, margin: "0 auto",
          position: "relative",
        }}>
          <span className="ab-corner tl" />
          <span className="ab-corner tr" />
          <span className="ab-corner bl" />
          <span className="ab-corner br" />
          <div style={{
            padding: "20px 32px",
            position: "relative",
          }}>
            <p style={{
              margin: "0 0 22px",
              fontFamily: "'Space Mono', monospace",
              fontSize: 10, letterSpacing: 6,
              color: "rgba(204,34,34,0.85)",
              textTransform: "uppercase",
              textAlign: "center",
            }}>
              ⟁ &nbsp; Founder's Transmission &nbsp; ⟁
            </p>

            <h2 style={{
              margin: "0 0 32px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px, 6vw, 64px)",
              color: "#f0ede6",
              letterSpacing: "0.08em",
              textAlign: "center",
              lineHeight: 1,
            }}>
              WHY THE VOID
            </h2>

            <div style={{
              fontFamily: "Georgia, serif",
              fontSize: 16, lineHeight: 1.9,
              color: "rgba(240,237,230,0.78)",
              display: "flex", flexDirection: "column", gap: 22,
            }}>
              <p style={{ margin: 0 }}>
                I grew up between two languages, two cultures, and a
                handful of borrowed mythologies. I never quite fit any
                of them — and somewhere along the way I stopped trying.
              </p>
              <p style={{ margin: 0 }}>
                Hollow Ronin is for the people who recognize that
                feeling. The ones who carry their own myth because no
                existing one had a place for them. The ronin without a
                lord. The ghost in the static. The fox spirit moving
                between worlds.
              </p>
              <p style={{ margin: 0 }}>
                Every piece I cut is a piece of armor for that walk. I
                hope you find one that fits.
              </p>
            </div>

            <div style={{
              marginTop: 40, textAlign: "right",
              fontFamily: "Georgia, serif", fontStyle: "italic",
              fontSize: 14, color: "rgba(204,34,34,0.7)",
              letterSpacing: "0.02em",
            }}>
              — Randall · founder, Hollow Ronin
            </div>
          </div>
        </div>
      </section>

      {/* ============== PILLARS ============== */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "100px 32px",
        background: "#0a0a0a",
      }}>
        <header style={{
          maxWidth: 1200, margin: "0 auto 60px",
          display: "flex", alignItems: "center", gap: 14, justifyContent: "center",
        }}>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
          <p style={{
            margin: 0, fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 6,
            color: "rgba(204,34,34,0.85)", textTransform: "uppercase",
          }}>
            What we make
          </p>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
        </header>

        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 1,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          {PILLARS.map(([num, title, body]) => (
            <div key={num} style={{
              background: "#0c0c0c",
              padding: "40px 32px",
              minHeight: 240,
              display: "flex", flexDirection: "column", gap: 16,
              position: "relative",
            }}>
              <p style={{
                margin: 0, fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: 4,
                color: "#cc2222",
              }}>
                {num}
              </p>
              <h3 style={{
                margin: 0, fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 32, letterSpacing: "0.12em",
                color: "#f0ede6",
              }}>
                {title}
              </h3>
              <p style={{
                margin: 0, fontFamily: "Georgia, serif",
                fontSize: 14, lineHeight: 1.75,
                color: "rgba(255,255,255,0.6)",
              }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== PROCESS ============== */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#08080a",
        padding: "100px 32px",
      }}>
        <header style={{
          maxWidth: 1200, margin: "0 auto 60px",
          display: "flex", alignItems: "center", gap: 14, justifyContent: "center",
        }}>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
          <p style={{
            margin: 0, fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 6,
            color: "rgba(204,34,34,0.85)", textTransform: "uppercase",
          }}>
            The Process · 製法
          </p>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
        </header>

        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {PROCESS.map(([roman, title, body], i) => (
            <div
              key={roman}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: 32,
                padding: "32px 0",
                borderBottom: i === PROCESS.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)",
                alignItems: "start",
              }}
            >
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 56, color: "rgba(204,34,34,0.8)",
                letterSpacing: "0.05em", lineHeight: 1,
              }}>
                {roman}
              </div>
              <div>
                <h4 style={{
                  margin: "0 0 12px",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28, color: "#f0ede6",
                  letterSpacing: "0.12em",
                }}>
                  {title}
                </h4>
                <p style={{
                  margin: 0, fontFamily: "Georgia, serif",
                  fontSize: 15, lineHeight: 1.85,
                  color: "rgba(255,255,255,0.65)",
                }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== TIMELINE ============== */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "100px 32px",
        background: "#0a0a0a",
      }}>
        <header style={{
          maxWidth: 1200, margin: "0 auto 50px",
          display: "flex", alignItems: "center", gap: 14, justifyContent: "center",
        }}>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
          <p style={{
            margin: 0, fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 6,
            color: "rgba(204,34,34,0.85)", textTransform: "uppercase",
          }}>
            Transmission Log
          </p>
          <div style={{ width: 36, height: 1, background: "rgba(204,34,34,0.55)" }} />
        </header>

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {TIMELINE.map(([when, what], i) => (
            <div
              key={when}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: 32,
                padding: "24px 0",
                borderBottom: i === TIMELINE.length - 1 ? "none" : "1px dashed rgba(255,255,255,0.08)",
              }}
            >
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11, letterSpacing: 3,
                color: "rgba(204,34,34,0.85)",
                paddingTop: 4,
              }}>
                {when}
              </span>
              <p style={{
                margin: 0, fontFamily: "Georgia, serif",
                fontSize: 15, lineHeight: 1.7,
                color: "rgba(255,255,255,0.7)",
              }}>
                {what}
              </p>
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
          Six garments. Six ghosts. Cut once, then never again.
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
