import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, getProductsByCategory, getLeadVariants } from '@/lib/products';

const CLAN_LABEL = {
  Akatsuki:    'AKATSUKI',
  Yami:        'YAMI',
  Kage:        'KAGE',
  Protagonist: 'NAMELESS',
};

const CLAN_CLASS = {
  Akatsuki:    'hr-clan-badge hr-clan-akatsuki',
  Yami:        'hr-clan-badge hr-clan-yami',
  Kage:        'hr-clan-badge hr-clan-kage',
  Protagonist: 'hr-clan-badge hr-clan-protagonist',
};

export default function ProductShellPage({ title, subtitle, category }) {
  const allInCategory = category ? getProductsByCategory(category) : PRODUCTS;
  const products      = getLeadVariants(allInCategory);
  const isEmpty       = products.length === 0;

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F4EDE2', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .hr-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1440px;
          margin: 0 auto;
        }
        @media (max-width: 1180px) { .hr-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 860px)  { .hr-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .hr-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Hero */}
      <section
        style={{
          position:       'relative',
          minHeight:      '380px',
          paddingTop:     '160px',
          paddingBottom:  '64px',
          background:     'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(28,58,42,0.45) 0%, transparent 70%), #0A0A0A',
          borderBottom:   '1px solid rgba(201,160,39,0.20)',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          textAlign:      'center',
          overflow:       'hidden',
        }}
      >
        <p style={{
          margin: '0 0 20px',
          fontSize: 11, letterSpacing: '0.3em',
          color: '#C9A027',
          fontFamily: "'DM Mono', monospace",
          textTransform: 'uppercase',
        }}>
          Hollow Ronin — Drop 001
        </p>

        <h1
          style={{
            fontFamily:    "'Shippori Mincho', 'Noto Serif JP', Georgia, serif",
            fontWeight:    700,
            fontSize:      'clamp(48px, 8vw, 96px)',
            color:         '#F4EDE2',
            letterSpacing: '0.06em',
            margin:        0,
            lineHeight:    0.95,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      12,
            letterSpacing: '0.3em',
            color:         '#F4EDE2',
            textTransform: 'uppercase',
            marginTop:     24,
            opacity:       0.7,
          }}
        >
          {subtitle}
        </p>

        {!isEmpty && (
          <p style={{
            maxWidth: 560, margin: '36px auto 0', padding: '0 24px',
            fontSize: 14, lineHeight: 1.75,
            color: 'rgba(244,237,226,0.65)',
            fontFamily: "'Shippori Mincho', serif",
            fontStyle: 'italic',
          }}>
            Twelve walk the broken roads with the Hollow Ronin — bound to clans that no longer
            exist except in the marks they carry.
          </p>
        )}

        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 1, background: 'rgba(201,160,39,0.55)' }} />
          <span style={{
            fontSize: 10, letterSpacing: '0.3em',
            fontFamily: "'DM Mono', monospace",
            color: 'rgba(244,237,226,0.45)',
            textTransform: 'uppercase',
          }}>
            {isEmpty ? 'Forthcoming · Drop 002' : `${products.length} Pieces · Limited Run`}
          </span>
          <div style={{ width: 36, height: 1, background: 'rgba(201,160,39,0.55)' }} />
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '80px 32px 120px', position: 'relative' }}>
        {isEmpty ? (
          <div style={{
            maxWidth: 720, margin: '0 auto',
            padding: '120px 32px',
            border: '1px solid rgba(201,160,39,0.25)',
            background: '#1A1A1A',
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
          }}>
            <p style={{
              margin: 0, fontSize: 11, letterSpacing: '0.4em',
              fontFamily: "'DM Mono', monospace",
              color: '#C9A027',
              textTransform: 'uppercase',
            }}>
              In the forge
            </p>
            <p style={{
              margin: 0, maxWidth: 440, fontSize: 14, lineHeight: 1.75,
              color: 'rgba(244,237,226,0.55)',
              fontFamily: "'Shippori Mincho', serif",
              fontStyle: 'italic',
            }}>
              {title.toLowerCase()} are not yet released. The next drop is being cut by hand — return soon.
            </p>
            <Link href="/shop/shirts" style={{
              marginTop: 12, padding: '14px 28px',
              border: '1px solid #C9A027', color: '#C9A027',
              fontSize: 11, letterSpacing: '0.25em',
              fontFamily: "'DM Mono', monospace",
              textTransform: 'uppercase', textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}>
              View Drop 001 — Shirts →
            </Link>
          </div>
        ) : (
          <div className="hr-grid">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                prefetch={false}
                className="hr-card"
                aria-label={product.name}
              >
                <div className="hr-card-media">
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill
                    sizes="(min-width: 1180px) 25vw, (min-width: 860px) 33vw, (min-width: 480px) 50vw, 100vw"
                  />
                  <div className="hr-card-cta">Acquire →</div>
                </div>

                <div style={{
                  padding: '20px 22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}>
                  <span className={CLAN_CLASS[product.clan]}>{CLAN_LABEL[product.clan]}</span>

                  <h3 style={{
                    margin: 0,
                    fontFamily: "'Shippori Mincho', 'Noto Serif JP', Georgia, serif",
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: '0.05em',
                    color: '#F4EDE2',
                    lineHeight: 1.2,
                  }}>
                    {product.japaneseName}
                  </h3>

                  <p style={{
                    margin: 0,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(244,237,226,0.5)',
                  }}>
                    {product.title}
                  </p>

                  <p style={{
                    margin: '4px 0 0',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    letterSpacing: '0.08em',
                    color: '#C9A027',
                  }}>
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <p style={{
          marginTop: 80, textAlign: 'center',
          fontSize: 10, letterSpacing: '0.4em',
          fontFamily: "'DM Mono', monospace",
          color: 'rgba(244,237,226,0.25)',
          textTransform: 'uppercase',
        }}>
          Hollow Ronin · No master. No rules.
        </p>
      </section>
    </main>
  );
}
