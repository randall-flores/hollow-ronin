import Link from 'next/link';
import Image from 'next/image';
import { getFamiliesByCategory } from '@/lib/product-merge';
import { cardHoverImage } from '@/lib/card-images';

const COLOR_DOT = {
  BLACK: '#1a1a1a',
  WHITE: '#e8e2d6',
};

export default async function ProductShellPage({ title, subtitle, category }) {
  let families = [];
  try {
    families = await getFamiliesByCategory(category);
  } catch (err) {
    console.error('[ProductShellPage] Shopify fetch failed:', err);
  }
  const isEmpty = families.length === 0;

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @keyframes hr-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hr-grain {
          0%, 100% { transform: translate(0, 0); }
          10%      { transform: translate(-4%, -2%); }
          20%      { transform: translate(2%, 4%); }
          30%      { transform: translate(-3%, 3%); }
          40%      { transform: translate(4%, -2%); }
          50%      { transform: translate(-2%, -4%); }
          60%      { transform: translate(3%, 2%); }
          70%      { transform: translate(-4%, 4%); }
          80%      { transform: translate(2%, -3%); }
          90%      { transform: translate(-3%, 2%); }
        }
        .hr-grain::before {
          content: '';
          position: absolute; inset: -100%;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>");
          pointer-events: none;
          opacity: 0.06;
          mix-blend-mode: overlay;
          animation: hr-grain 8s steps(10) infinite;
          z-index: 1;
        }
        @keyframes hr-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .hr-scanline {
          position: absolute; left: 0; right: 0; height: 140px;
          background: linear-gradient(180deg, transparent, rgba(201,169,97,0.05) 50%, transparent);
          animation: hr-scan 7s linear infinite;
          pointer-events: none;
          z-index: 2;
        }

        /* GRID */
        .hr-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 64px;
        }
        @media (max-width: 1023px) {
          .hr-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (max-width: 639px) {
          .hr-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            padding: 0 20px;
          }
        }

        /* CARD */
        .hr-card {
          opacity: 0;
          animation: hr-fade-up 0.8s ease-out forwards;
        }
        .hr-card-link {
          position: relative;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
          border: 1px solid rgba(244, 237, 226, 0.08);
          border-radius: 0;
          color: #f4ede2;
          text-decoration: none;
          overflow: hidden;
          isolation: isolate;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }
        .hr-card-link:hover {
          transform: translateY(-4px);
          border-color: rgba(201, 169, 97, 0.40);
          box-shadow: 0 0 20px rgba(201, 169, 97, 0.15);
        }
        .hr-card-link:hover .hr-arrow {
          color: #a88b45;
        }
        .hr-card-link:hover .hr-mock-default { opacity: 0; }
        .hr-card-link:hover .hr-mock-reveal  { opacity: 1; }
        .hr-mock-default,
        .hr-mock-reveal {
          object-fit: cover;
          transition: opacity 0.25s ease;
        }
        .hr-mock-default { opacity: 1; }
        .hr-mock-reveal  { opacity: 0; }
        @media (hover: none) {
          .hr-card-link:hover .hr-mock-default { opacity: 1; }
          .hr-card-link:hover .hr-mock-reveal  { opacity: 0; }
        }

        /* IMAGE AREA */
        .hr-card-img {
          position: relative;
          aspect-ratio: 1 / 1.18;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(180deg, #181818 0%, #0c0c0c 100%);
        }
        .hr-card-img::after {
          /* film grain — 2% opacity */
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23g)' opacity='0.55'/></svg>");
          opacity: 0.02;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 4;
        }

        /* corner brackets — 10px arms, gold 50% */
        .hr-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          z-index: 3;
          pointer-events: none;
        }
        .hr-bracket-tl { top: 10px;    left: 10px;    border-top: 1px solid rgba(201,169,97,0.50); border-left: 1px solid rgba(201,169,97,0.50); }
        .hr-bracket-tr { top: 10px;    right: 10px;   border-top: 1px solid rgba(201,169,97,0.50); border-right: 1px solid rgba(201,169,97,0.50); }
        .hr-bracket-bl { bottom: 10px; left: 10px;    border-bottom: 1px solid rgba(201,169,97,0.50); border-left: 1px solid rgba(201,169,97,0.50); }
        .hr-bracket-br { bottom: 10px; right: 10px;   border-bottom: 1px solid rgba(201,169,97,0.50); border-right: 1px solid rgba(201,169,97,0.50); }

        /* drop badge — top-left */
        .hr-drop-badge {
          position: absolute;
          top: 14px; left: 14px;
          z-index: 5;
          font-family: 'JetBrains Mono', 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #f4ede2;
          border: 1px solid rgba(244, 237, 226, 0.30);
          padding: 3px 6px;
          text-transform: uppercase;
          background: transparent;
        }

        /* color chip — bottom-right of image */
        .hr-color-chip {
          position: absolute;
          right: 14px; bottom: 14px;
          z-index: 5;
          font-family: 'JetBrains Mono', 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #f4ede2;
          border: 1px solid rgba(244, 237, 226, 0.30);
          padding: 3px 6px;
          text-transform: uppercase;
          background: transparent;
        }

        /* INFO */
        .hr-card-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 18px 18px 20px;
          border-top: 1px solid rgba(244, 237, 226, 0.05);
          position: relative;
          z-index: 2;
        }
        .hr-kanji {
          font-family: 'Noto Sans JP', sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: rgba(244, 237, 226, 0.70);
          line-height: 1;
          letter-spacing: 0.04em;
        }
        .hr-romaji {
          font-family: 'Anton', 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 1.05;
          color: #f4ede2;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hr-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .hr-price {
          font-family: 'JetBrains Mono', 'Space Mono', monospace;
          font-size: 13px;
          color: #f4ede2;
          letter-spacing: 0.04em;
        }
        .hr-arrow {
          font-family: 'JetBrains Mono', 'Space Mono', monospace;
          font-size: 16px;
          line-height: 1;
          color: #c9a961;
          transition: color 0.3s ease;
        }
        .hr-color-dots {
          display: inline-flex;
          gap: 4px;
          margin-left: 10px;
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          position:       'relative',
          minHeight:      '420px',
          paddingTop:     '120px',
          paddingBottom:  '60px',
          background:     'radial-gradient(ellipse at 50% 30%, rgba(201,169,97,0.12) 0%, rgba(8,8,8,0) 60%), #080808',
          borderBottom:   '1px solid rgba(201,169,97,0.22)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          textAlign:      'center',
          overflow:       'hidden',
        }}
        className="hr-grain"
      >
        <div className="hr-scanline" />

        <p style={{
          margin: '0 0 18px', fontSize: 10, letterSpacing: 8,
          color: '#c9a961', fontFamily: '"Space Mono", monospace',
          textTransform: 'uppercase', zIndex: 3, position: 'relative',
        }}>
          ⟁ &nbsp; HOLLOW RONIN &nbsp; ⟁
        </p>

        <h1
          style={{
            fontFamily:    "'Bebas Neue', sans-serif",
            fontSize:      'clamp(64px, 9vw, 124px)',
            color:         '#f0ede6',
            letterSpacing: '0.14em',
            margin:        0,
            lineHeight:    1,
            zIndex:        3,
            position:      'relative',
            textShadow:    '0 0 40px rgba(201,169,97,0.18)',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontFamily:    "'Space Mono', monospace",
            fontSize:      11,
            letterSpacing: '0.4em',
            color:         '#888',
            textTransform: 'uppercase',
            marginTop:     22,
            zIndex:        3,
            position:      'relative',
          }}
        >
          {subtitle}
        </p>

        {!isEmpty && (
          <p style={{
            maxWidth: 560, margin: '40px auto 0', padding: '0 24px',
            fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.42)',
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            zIndex: 3, position: 'relative',
          }}>
            Four spirits. One drop. Each piece is a fragment of a story written for those
            who chose the long road — no master, no map, no apology.
          </p>
        )}

        <div style={{
          marginTop: 36, display: 'flex', alignItems: 'center', gap: 14,
          zIndex: 3, position: 'relative',
        }}>
          <div style={{ width: 40, height: 1, background: 'rgba(201,169,97,0.55)' }} />
          <span style={{
            fontSize: 9, letterSpacing: 5, fontFamily: '"Space Mono", monospace',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
          }}>
            {isEmpty ? 'Forthcoming · Drop 002' : `${families.length} Pieces · Limited Run`}
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(201,169,97,0.55)' }} />
        </div>
      </section>

      {/* Product grid */}
      <section style={{ padding: '64px 0 120px', position: 'relative', zIndex: 2 }}>
        {isEmpty ? (
          <div style={{
            maxWidth: 1280, margin: '0 auto',
            padding: '120px 32px',
            border:  '1px dashed rgba(201,169,97,0.30)',
            background: 'radial-gradient(ellipse at center, rgba(201,169,97,0.04) 0%, transparent 70%)',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
          }}>
            <div style={{
              width: 56, height: 56, border: '1px solid rgba(201,169,97,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Georgia, serif', fontSize: 32, color: 'rgba(201,169,97,0.75)',
            }}>
              ⌖
            </div>
            <p style={{
              margin: 0, fontSize: 11, letterSpacing: 6,
              fontFamily: '"Space Mono", monospace',
              color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase',
            }}>
              In the forge
            </p>
            <p style={{
              margin: 0, maxWidth: 440, fontSize: 14, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
            }}>
              {title.toLowerCase()} are not yet released. The next drop is being cut
              by hand — return soon.
            </p>
            <Link href="/shop/shirts" style={{
              marginTop: 12, padding: '12px 22px',
              border: '1px solid #c9a961', color: '#c9a961',
              fontSize: 10, letterSpacing: 5,
              fontFamily: '"Space Mono", monospace',
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
            }}
            className="hr-empty-cta">
              View Drop 001 — Shirts →
            </Link>
          </div>
        ) : (
        <div className="hr-grid">
          {families.map((family, i) => {
            const lead = family.lead;
            const hasMultipleColors = family.variants.length > 1;
            const folderColor = lead.color === 'WHITE' ? 'white' : 'black';
            const backImage = `/mockups/${family.imageFolder}/${folderColor}/tee-${family.imageFolder}-back-${folderColor}.png`;
            const fallback = { url: backImage, alt: `${family.name} — back design` };
            const hover = cardHoverImage({
              imageFolder: family.imageFolder,
              color:       lead.color,
              name:        family.name,
              fallback,
            });

            return (
            <Link
              key={lead.handle}
              href={`/products/${lead.handle}`}
              prefetch={false}
              className="hr-card hr-card-link"
              style={{ animationDelay: `${i * 0.08}s` }}
              aria-label={
                hasMultipleColors
                  ? `${family.name} · available in ${family.variants.length} colors`
                  : family.name
              }
            >
              <div className="hr-card-img">
                <span className="hr-drop-badge">{family.label}</span>

                <Image
                  className="hr-mock-default"
                  src={fallback.url}
                  alt={fallback.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  priority={i < 4}
                />
                <Image
                  className="hr-mock-reveal"
                  src={hover.url}
                  alt={hover.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  priority={i < 4}
                />

                <span className="hr-bracket hr-bracket-tl" />
                <span className="hr-bracket hr-bracket-tr" />
                <span className="hr-bracket hr-bracket-bl" />
                <span className="hr-bracket hr-bracket-br" />

                <span className="hr-color-chip">
                  {lead.color === 'WHITE' ? 'WHITE' : 'BLACK'}
                </span>
              </div>

              <div className="hr-card-info">
                <span className="hr-kanji">{family.kanji || family.japaneseName}</span>
                <span className="hr-romaji">{family.name}</span>
                <div className="hr-info-row">
                  <span className="hr-price">
                    ${lead.price.toFixed(2)}
                    {hasMultipleColors && (
                      <span className="hr-color-dots" aria-hidden="true">
                        {family.variants.map((v) => (
                          <span
                            key={v.handle}
                            title={v.color}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: COLOR_DOT[v.color],
                              border: v.handle === lead.handle
                                ? '1px solid #c9a961'
                                : '1px solid rgba(244,237,226,0.18)',
                              display: 'inline-block',
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="hr-arrow" aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
        )}

        {/* Footer note */}
        <p style={{
          marginTop: 60, textAlign: 'center',
          fontSize: 10, letterSpacing: 4,
          fontFamily: '"Space Mono", monospace',
          color: 'rgba(255,255,255,0.18)',
          textTransform: 'uppercase',
        }}>
          ▲  Hollow Ronin · No master. No rules.  ▲
        </p>
      </section>
    </main>
  );
}
