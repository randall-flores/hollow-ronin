import Link from "next/link";
import Image from "next/image";
import { getAllFamilies, type EnrichedFamily } from "@/lib/product-merge";
import { cardHoverImage } from "@/lib/card-images";

const FEATURED_FAMILIES = [
  "ryujin-dragon-vow",
  "akuma-no-ikari-mask-of-wrath",
  "karada-nashi-hollow-warrior",
  "kurokitsune-vow-keeper",
  "shinigami-reaper",
  "arashi-maru-stormchild",
  "karasu-tengu-sentinel",
  "mu-no-kamen-mask-of-stillness",
];

export default async function TheDrop() {
  let families: EnrichedFamily[] = [];
  try {
    families = await getAllFamilies();
  } catch (err) {
    console.error("[TheDrop] Shopify fetch failed:", err);
  }
  const byFamily = new Map(families.map((f) => [f.designFamily, f]));
  const featured = FEATURED_FAMILIES
    .map((df) => byFamily.get(df))
    .filter((f): f is EnrichedFamily => Boolean(f));

  if (featured.length === 0) return null;

  return (
    <section
      id="the-drop"
      style={{
        position:   "relative",
        background: "#080808",
        padding:    "clamp(72px, 12vw, 120px) clamp(16px, 4vw, 32px) clamp(80px, 14vw, 140px)",
        overflow:   "hidden",
        borderTop:    "1px solid rgba(201,169,97,0.18)",
        borderBottom: "1px solid rgba(201,169,97,0.10)",
      }}
    >
      <style>{`
        @keyframes td-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .td-card {
          opacity: 0;
          animation: td-fade-up 0.9s ease-out forwards;
        }
        .td-link {
          display: flex;
          flex-direction: column;
          position: relative;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 1px solid rgba(244,237,226,0.08);
          text-decoration: none;
          color: #f4ede2;
          overflow: hidden;
          isolation: isolate;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }
        .td-link:hover {
          transform: translateY(-3px);
          border-color: rgba(201,169,97,0.40);
          box-shadow: 0 0 20px rgba(201,169,97,0.15);
        }
        .td-link:hover .td-arrow {
          color: #a88b45;
        }
        .td-link:hover .td-default { opacity: 0; }
        .td-link:hover .td-reveal  { opacity: 1; }
        .td-default,
        .td-reveal {
          object-fit: contain;
          transition: opacity 0.25s ease;
        }
        .td-default { opacity: 1; }
        .td-reveal  { opacity: 0; }
        @media (hover: none) {
          .td-link:hover .td-default { opacity: 1; }
          .td-link:hover .td-reveal  { opacity: 0; }
        }
        .td-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 1180px) {
          .td-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (max-width: 860px) {
          .td-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 480px) {
          .td-grid { grid-template-columns: 1fr; }
        }

        /* image area */
        .td-img {
          position: relative;
          aspect-ratio: 1 / 1;
          width: 100%;
          background: linear-gradient(180deg, #181818 0%, #0c0c0c 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .td-img-inner {
          position: relative;
          width: 70%;
          height: 70%;
        }

        /* gold corner brackets — 10px arms, 1px gold 50% */
        .td-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          z-index: 3;
          pointer-events: none;
        }
        .td-bracket-tl { top: 10px;    left: 10px;    border-top: 1px solid rgba(201,169,97,0.50); border-left: 1px solid rgba(201,169,97,0.50); }
        .td-bracket-tr { top: 10px;    right: 10px;   border-top: 1px solid rgba(201,169,97,0.50); border-right: 1px solid rgba(201,169,97,0.50); }
        .td-bracket-bl { bottom: 10px; left: 10px;    border-bottom: 1px solid rgba(201,169,97,0.50); border-left: 1px solid rgba(201,169,97,0.50); }
        .td-bracket-br { bottom: 10px; right: 10px;   border-bottom: 1px solid rgba(201,169,97,0.50); border-right: 1px solid rgba(201,169,97,0.50); }

        .td-badge {
          position: absolute;
          z-index: 4;
          font-family: 'JetBrains Mono', 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #f4ede2;
          border: 1px solid rgba(244,237,226,0.30);
          padding: 3px 6px;
          background: transparent;
          text-transform: uppercase;
        }
        .td-badge-tl { top: 14px; left: 14px; }
        .td-badge-br { bottom: 14px; right: 14px; }

        .td-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px 18px 18px;
          border-top: 1px solid rgba(244,237,226,0.05);
        }
        .td-kanji {
          font-family: 'Noto Sans JP', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(244,237,226,0.7);
          line-height: 1;
          letter-spacing: 0.04em;
        }
        .td-romaji {
          font-family: 'Anton', 'Bebas Neue', sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #f4ede2;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.1;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .td-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
        }
        .td-price {
          font-family: 'JetBrains Mono', 'Space Mono', monospace;
          font-size: 13px;
          color: #f4ede2;
          letter-spacing: 0.04em;
        }
        .td-arrow {
          font-family: 'JetBrains Mono', 'Space Mono', monospace;
          font-size: 16px;
          line-height: 1;
          color: #c9a961;
          transition: color 0.3s ease;
        }

        .td-cta {
          display: inline-flex; align-items: center; gap: 14px;
          padding: 16px 28px;
          border: none;
          background: #c9a961;
          color: #0a0a0a;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.3s ease;
        }
        .td-cta:hover {
          background: #a88b45;
        }
      `}</style>

      {/* Heading block */}
      <header style={{
        position: "relative", zIndex: 2,
        maxWidth: 1440, margin: "0 auto 60px",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      }}>
        <p style={{
          margin: 0, fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 8,
          color: "rgba(201,169,97,0.85)", textTransform: "uppercase",
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
          textShadow: "0 0 40px rgba(201,169,97,0.20)",
        }}>
          THE DROP
        </h2>

        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginTop: 22,
        }}>
          <div style={{ width: 36, height: 1, background: "rgba(201,169,97,0.55)" }} />
          <span style={{
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 13, color: "rgba(255,255,255,0.42)",
            letterSpacing: 1,
          }}>
            Limited transmissions. Forged for the void.
          </span>
          <div style={{ width: 36, height: 1, background: "rgba(201,169,97,0.55)" }} />
        </div>
      </header>

      {/* Grid */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1440, margin: "0 auto",
      }}>
        <div className="td-grid">
          {featured.map((family, i) => {
            const lead = family.lead;
            const folderColor = lead.color === 'WHITE' ? 'white' : 'black';
            const backImage = `/mockups/${family.imageFolder}/${folderColor}/tee-${family.imageFolder}-back-${folderColor}.png`;
            const fallback = { url: backImage, alt: `${family.name} — back design` };
            const hover = cardHoverImage({
              imageFolder: family.imageFolder,
              color:       lead.color,
              name:        family.name,
              fallback,
            });
            const colorLabel = lead.color === 'WHITE' ? 'WHITE' : 'BLACK';
            return (
              <Link
                key={lead.handle}
                href={`/products/${lead.handle}`}
                prefetch={false}
                className="td-card td-link"
                style={{ animationDelay: `${i * 0.08}s` }}
                aria-label={family.name}
              >
                <div className="td-img">
                  <span className="td-badge td-badge-tl">{family.label}</span>
                  <span className="td-badge td-badge-br">{colorLabel}</span>

                  <span className="td-bracket td-bracket-tl" />
                  <span className="td-bracket td-bracket-tr" />
                  <span className="td-bracket td-bracket-bl" />
                  <span className="td-bracket td-bracket-br" />

                  <div className="td-img-inner">
                    <Image
                      className="td-default"
                      src={fallback.url}
                      alt={fallback.alt}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 860px) 33vw, 50vw"
                      priority={i === 0}
                      fetchPriority={i === 0 ? "high" : undefined}
                    />
                    <Image
                      className="td-reveal"
                      src={hover.url}
                      alt={hover.alt}
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 860px) 33vw, 50vw"
                    />
                  </div>
                </div>

                <div className="td-info">
                  <span className="td-kanji">{family.kanji || family.japaneseName}</span>
                  <span className="td-romaji">{family.name}</span>
                  <div className="td-row">
                    <span className="td-price">${lead.price.toFixed(2)}</span>
                    <span className="td-arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
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
