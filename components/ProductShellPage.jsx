import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, getProductsByCategory, getLeadVariants, getFamilyVariants } from '@/lib/products';
import { cardHoverImage } from '@/lib/card-images';

const COLOR_DOT = {
  Black: '#1a1a1a',
  White: '#e8e2d6',
};

export default function ProductShellPage({ title, subtitle, category }) {
  const allInCategory = category ? getProductsByCategory(category) : PRODUCTS;
  const products      = getLeadVariants(allInCategory);
  const isEmpty       = products.length === 0;

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>

      {/* Inline keyframes + hover rules */}
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
        .hr-card {
          opacity: 0;
          animation: hr-fade-up 0.8s ease-out forwards;
        }
        .hr-card-link {
          display: block;
          position: relative;
          background: var(--card-bg);
          text-decoration: none;
          color: #ffffff;
          overflow: hidden;
          isolation: isolate;
          perspective: 1200px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hr-card-link::after {
          content: '';
          position: absolute; inset: 0;
          border: 1px solid transparent;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          pointer-events: none;
          z-index: 4;
        }
        .hr-card-link:hover {
          transform: translateY(-6px);
        }
        .hr-card-link:hover::after {
          border-color: var(--card-accent);
          box-shadow: 0 0 50px -8px var(--card-accent), inset 0 0 36px -10px var(--card-accent);
        }
        .hr-card-link:hover .hr-view {
          background: #f4ede2;
        }
        .hr-card-link:hover .hr-mock-default {
          opacity: 0;
        }
        .hr-card-link:hover .hr-mock-reveal {
          opacity: 1;
        }
        .hr-mock-default,
        .hr-mock-reveal {
          object-fit: cover;
          transition: opacity 0.2s ease;
        }
        @media (hover: none) {
          .hr-card-link:hover .hr-mock-default { opacity: 1; }
          .hr-card-link:hover .hr-mock-reveal  { opacity: 0; }
        }
        .hr-mock-default { opacity: 1; }
        .hr-mock-reveal  { opacity: 0; }
        .hr-view {
          transition: background 0.3s ease, color 0.3s ease;
        }
        .hr-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .hr-grid > .hr-card-link {
          flex: 1 1 320px;
          max-width: calc(25% - 1px);
          min-width: 280px;
        }
        @media (max-width: 1180px) {
          .hr-grid > .hr-card-link { max-width: calc(33.333% - 1px); }
        }
        @media (max-width: 860px) {
          .hr-grid > .hr-card-link { max-width: calc(50% - 1px); min-width: 150px; }
        }
        @media (max-width: 360px) {
          .hr-grid > .hr-card-link { max-width: 100%; min-width: 0; }
        }
        @keyframes hr-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .hr-scanline {
          position: absolute; left: 0; right: 0; height: 140px;
          background: linear-gradient(180deg, transparent, rgba(204,34,34,0.06) 50%, transparent);
          animation: hr-scan 7s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          position:       'relative',
          minHeight:      '420px',
          paddingTop:     '120px',
          paddingBottom:  '60px',
          background:     'radial-gradient(ellipse at 50% 30%, rgba(204,34,34,0.16) 0%, rgba(8,8,8,0) 60%), #080808',
          borderBottom:   '1px solid rgba(204,34,34,0.18)',
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
          color: 'rgba(204,34,34,0.85)', fontFamily: '"Space Mono", monospace',
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
            textShadow:    '0 0 40px rgba(204,34,34,0.18)',
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
          <div style={{ width: 40, height: 1, background: 'rgba(204,34,34,0.5)' }} />
          <span style={{
            fontSize: 9, letterSpacing: 5, fontFamily: '"Space Mono", monospace',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase',
          }}>
            {isEmpty ? 'Forthcoming · Drop 002' : `${products.length} Pieces · Limited Run`}
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(204,34,34,0.5)' }} />
        </div>
      </section>

      {/* Product grid */}
      <section style={{ padding: '64px 16px 120px', maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {isEmpty ? (
          <div style={{
            padding: '120px 32px',
            border:  '1px dashed rgba(204,34,34,0.25)',
            background: 'radial-gradient(ellipse at center, rgba(204,34,34,0.04) 0%, transparent 70%)',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
          }}>
            <div style={{
              width: 56, height: 56, border: '1px solid rgba(204,34,34,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Georgia, serif', fontSize: 32, color: 'rgba(204,34,34,0.7)',
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
              border: '1px solid #cc2222', color: '#cc2222',
              fontSize: 10, letterSpacing: 5,
              fontFamily: '"Space Mono", monospace',
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}>
              View Drop 001 — Shirts →
            </Link>
          </div>
        ) : (
        <div className="hr-grid">
          {products.map((product, i) => {
            const variants = getFamilyVariants(product.designFamily, allInCategory);
            const hasMultipleColors = variants.length > 1;
            return (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              prefetch={false}
              className="hr-card hr-card-link"
              style={{
                '--card-bg':     product.bg,
                '--card-accent': product.accent,
                animationDelay:  `${i * 0.12}s`,
              }}
              aria-label={
                hasMultipleColors
                  ? `${product.name} · available in ${variants.length} colors`
                  : product.name
              }
            >
              {/* Visual area */}
              <div style={{
                position:    'relative',
                aspectRatio: '1 / 1',
                width:       '100%',
                overflow:    'hidden',
                background:  `radial-gradient(ellipse at center 60%, ${product.accent}1a 0%, transparent 65%), ${product.bg}`,
              }}>
                {/* Drop label */}
                <span style={{
                  position: 'absolute', top: 18, left: 22, zIndex: 5,
                  fontSize: 9, letterSpacing: 5,
                  fontFamily: '"Space Mono", monospace',
                  color: product.accent,
                  textShadow: `0 0 12px ${product.accent}66`,
                }}>
                  {product.label}
                </span>

                {/* Color badge */}
                <span style={{
                  position: 'absolute', top: 18, right: 22, zIndex: 5,
                  fontSize: 9, letterSpacing: 3,
                  fontFamily: '"Space Mono", monospace',
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '4px 10px',
                }}>
                  {product.color}
                </span>

                {/* Default image (back design — selling point) */}
                <Image
                  className="hr-mock-default"
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={i < 4}
                />
                {/* Hover reveal — front mockup (chest sigil printed on shirt) */}
                {(() => {
                  const hover = cardHoverImage(product)
                  return (
                    <Image
                      className="hr-mock-reveal"
                      src={hover.url}
                      alt={hover.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      priority={i < 4}
                    />
                  )
                })()}

                {/* Vignette */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                  background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
                }} />

              </div>

              {/* Footer */}
              <div style={{
                padding:         '22px 26px',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'space-between',
                background:      'rgba(0,0,0,0.4)',
                borderTop:       '1px solid rgba(255,255,255,0.05)',
                position:        'relative',
                zIndex:          2,
              }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    margin:       0,
                    fontSize:     17,
                    fontWeight:   600,
                    fontFamily:   'Georgia, serif',
                    color:        '#ffffff',
                    marginBottom: 6,
                    lineHeight:   1.2,
                    display:      '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow:     'hidden',
                  }}>
                    {product.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <p style={{
                      margin: 0, fontSize: 11,
                      fontFamily: '"Space Mono", monospace',
                      color: 'rgba(255,255,255,0.42)',
                      letterSpacing: 2,
                    }}>
                      ${product.price}.00 USD
                    </p>
                    {hasMultipleColors && (
                      <span
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        aria-hidden="true"
                      >
                        {variants.map((v) => (
                          <span
                            key={v.slug}
                            title={v.color}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: COLOR_DOT[v.color],
                              border: v.slug === product.slug
                                ? `1px solid ${product.accent}`
                                : '1px solid rgba(255,255,255,0.18)',
                              boxShadow: v.slug === product.slug
                                ? `0 0 0 2px ${product.accent}33`
                                : 'none',
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className="hr-view"
                  style={{
                    fontSize: 9, letterSpacing: 4,
                    fontFamily: '"Space Mono", monospace',
                    color: product.accent,
                    textTransform: 'uppercase',
                    border: `1px solid ${product.accent}`,
                    padding: '9px 16px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  View →
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
