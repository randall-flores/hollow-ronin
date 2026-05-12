import Link from 'next/link';
import { PRODUCTS, getProductsByCategory } from '@/lib/products';

export default function ProductShellPage({ title, subtitle, category }) {
  const products = category ? getProductsByCategory(category) : PRODUCTS;
  const isEmpty  = products.length === 0;

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
        .hr-card-link:hover .hr-shirt-stage {
          transform: rotateY(-8deg) rotateX(4deg) scale(1.05);
        }
        .hr-card-link:hover .hr-shirt {
          filter: brightness(1.15) drop-shadow(0 24px 32px rgba(0,0,0,0.85));
        }
        .hr-card-link:hover .hr-floor {
          opacity: 0.85;
          transform: translateX(-50%) scaleX(1.05);
        }
        .hr-card-link:hover .hr-view {
          background: var(--card-accent);
          color: #ffffff;
        }
        .hr-shirt-stage {
          position: relative;
          width: 88%;
          aspect-ratio: 1 / 1.1;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hr-shirt {
          width: 100%;
          height: 100%;
          transition: filter 0.6s ease;
          filter: drop-shadow(0 18px 26px rgba(0,0,0,0.75));
        }
        .hr-floor {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 62%;
          height: 14px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 70%);
          filter: blur(4px);
          opacity: 0.6;
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }
        .hr-view {
          transition: background 0.3s ease, color 0.3s ease;
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
      <section style={{ padding: '80px 32px 120px', maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap:                 '1px',
          background:          'rgba(255,255,255,0.05)',
          border:              '1px solid rgba(255,255,255,0.06)',
        }}>
          {products.map((product, i) => (
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
            >
              {/* Visual area */}
              <div style={{
                position: 'relative',
                height:   420,
                display:  'flex',
                alignItems:     'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: `radial-gradient(ellipse at center 60%, ${product.accent}1a 0%, transparent 65%), ${product.bg}`,
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

                {/* Shirt stage — 3D tilt happens here */}
                <div className="hr-shirt-stage">
                  <div className="hr-floor" />
                  <svg
                    className="hr-shirt"
                    viewBox="0 0 320 360"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      {/* Body — top highlight to bottom shadow */}
                      <linearGradient id={`body-grad-${product.slug}`} x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%"   stopColor="#262626" />
                        <stop offset="20%"  stopColor="#1d1d1d" />
                        <stop offset="55%"  stopColor="#161616" />
                        <stop offset="100%" stopColor="#080808" />
                      </linearGradient>

                      {/* Side shading — darken edges to suggest fabric curving */}
                      <linearGradient id={`side-grad-${product.slug}`} x1="0" y1="0.5" x2="1" y2="0.5">
                        <stop offset="0%"   stopColor="rgba(0,0,0,0.7)" />
                        <stop offset="18%"  stopColor="rgba(0,0,0,0.0)" />
                        <stop offset="82%"  stopColor="rgba(0,0,0,0.0)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.7)" />
                      </linearGradient>

                      {/* Sleeve highlights */}
                      <linearGradient id={`sleeve-l-${product.slug}`} x1="0" y1="0.3" x2="1" y2="0.7">
                        <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
                        <stop offset="60%"  stopColor="rgba(255,255,255,0.04)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
                      </linearGradient>
                      <linearGradient id={`sleeve-r-${product.slug}`} x1="1" y1="0.3" x2="0" y2="0.7">
                        <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
                        <stop offset="60%"  stopColor="rgba(255,255,255,0.04)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
                      </linearGradient>

                      {/* Soft drop shadow under collar — gives depth where neck sits */}
                      <radialGradient id={`collar-shadow-${product.slug}`} cx="0.5" cy="0" r="0.5">
                        <stop offset="0%"   stopColor="rgba(0,0,0,0.7)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                      </radialGradient>

                      {/* Back print zone */}
                      <clipPath id={`print-${product.slug}`}>
                        <path d="M 108 100 L 212 100 L 212 248 L 108 248 Z" />
                      </clipPath>

                      {/* Filter: subtle blur on print edges to suggest fabric absorption */}
                      <filter id={`print-fx-${product.slug}`} x="-5%" y="-5%" width="110%" height="110%">
                        <feGaussianBlur stdDeviation="0.45" />
                      </filter>

                      {/* Full shirt body path (T-shape) — reused for clip + outline */}
                      <clipPath id={`shirt-${product.slug}`}>
                        <path d="
                          M 110 40
                          L 90 36
                          Q 78 36 68 44
                          L 26 80
                          Q 14 90 18 102
                          L 38 134
                          Q 42 140 50 138
                          L 78 122
                          L 78 332
                          Q 78 342 88 342
                          L 232 342
                          Q 242 342 242 332
                          L 242 122
                          L 270 138
                          Q 278 140 282 134
                          L 302 102
                          Q 306 90 294 80
                          L 252 44
                          Q 242 36 230 36
                          L 210 40
                          Q 198 56 160 56
                          Q 122 56 110 40
                          Z" />
                      </clipPath>
                    </defs>

                    {/* Render fabric inside the T-shape clip */}
                    <g clipPath={`url(#shirt-${product.slug})`}>
                      {/* Base fabric */}
                      <rect x="0" y="0" width="320" height="360" fill={`url(#body-grad-${product.slug})`} />
                      {/* Side darkening */}
                      <rect x="0" y="0" width="320" height="360" fill={`url(#side-grad-${product.slug})`} />
                      {/* Left sleeve shading — overlay narrow rect */}
                      <rect x="18" y="36" width="80" height="110" fill={`url(#sleeve-l-${product.slug})`} />
                      {/* Right sleeve shading */}
                      <rect x="222" y="36" width="80" height="110" fill={`url(#sleeve-r-${product.slug})`} />
                      {/* Collar shadow */}
                      <ellipse cx="160" cy="50" rx="60" ry="18" fill={`url(#collar-shadow-${product.slug})`} />

                      {/* Vertical center fold — subtle vertical break */}
                      <line x1="160" y1="68" x2="160" y2="338" stroke="rgba(0,0,0,0.35)" strokeWidth="0.6" />

                      {/* Fabric wrinkles — fine diagonal lines near sleeves and waist */}
                      <path d="M 80 130 Q 100 145 78 165" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      <path d="M 240 130 Q 220 145 242 165" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      <path d="M 86 260 Q 100 274 92 290" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
                      <path d="M 234 260 Q 220 274 228 290" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
                      <path d="M 110 320 Q 160 326 210 320" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="1.2" />

                      {/* Design — printed on back, blended into fabric */}
                      <g filter={`url(#print-fx-${product.slug})`}>
                        <image
                          href={product.design}
                          x="108" y="100"
                          width="104" height="148"
                          preserveAspectRatio="xMidYMid meet"
                          clipPath={`url(#print-${product.slug})`}
                          style={{ mixBlendMode: 'lighten', opacity: 0.95 }}
                        />
                      </g>
                    </g>

                    {/* Shirt outline */}
                    <path
                      d="
                        M 110 40
                        L 90 36
                        Q 78 36 68 44
                        L 26 80
                        Q 14 90 18 102
                        L 38 134
                        Q 42 140 50 138
                        L 78 122
                        L 78 332
                        Q 78 342 88 342
                        L 232 342
                        Q 242 342 242 332
                        L 242 122
                        L 270 138
                        Q 278 140 282 134
                        L 302 102
                        Q 306 90 294 80
                        L 252 44
                        Q 242 36 230 36
                        L 210 40
                        Q 198 56 160 56
                        Q 122 56 110 40
                        Z"
                      fill="none"
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="1"
                    />

                    {/* Back-neck collar curve */}
                    <path
                      d="M 110 40 Q 160 70 210 40"
                      fill="none"
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.2"
                    />

                    {/* Sleeve seam lines */}
                    <path d="M 90 36 Q 80 76 78 122" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
                    <path d="M 230 36 Q 240 76 242 122" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
                  </svg>
                </div>

                {/* Vignette */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                  background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
                }} />

                {/* Tag at bottom */}
                <div style={{
                  position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', alignItems: 'center', gap: 10, zIndex: 4,
                }}>
                  <div style={{ width: 22, height: 1, background: product.accent, opacity: 0.7 }} />
                  <span style={{
                    fontSize: 10, letterSpacing: 4,
                    fontFamily: '"Space Mono", monospace',
                    color: 'rgba(255,255,255,0.55)',
                    textTransform: 'uppercase',
                  }}>
                    {product.tag}
                  </span>
                  <div style={{ width: 22, height: 1, background: product.accent, opacity: 0.7 }} />
                </div>
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
                    whiteSpace:   'nowrap',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {product.name}
                  </p>
                  <p style={{
                    margin: 0, fontSize: 11,
                    fontFamily: '"Space Mono", monospace',
                    color: 'rgba(255,255,255,0.42)',
                    letterSpacing: 2,
                  }}>
                    ${product.price}.00 USD
                  </p>
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
          ))}
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
