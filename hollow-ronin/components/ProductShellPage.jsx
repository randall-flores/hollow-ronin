const PRODUCTS = [
  {
    id:     1,
    name:   'Torii Ronin Tee',
    tag:    'The Ronin',
    price:  '$38',
    color:  'Black',
    href:   '/products/torii-ronin-tee',
    accent: '#cc2222',
    bg:     '#0f0f0f',
    label:  'DROP 001',
  },
  {
    id:     2,
    name:   'Dragon Tee',
    tag:    'The Dragon',
    price:  '$38',
    color:  'Black',
    href:   '/products/torii-ronin-tee',
    accent: '#cc2222',
    bg:     '#0a0a0f',
    label:  'DROP 001',
  },
  {
    id:     3,
    name:   'Kitsune Tee',
    tag:    'The Fox Spirit',
    price:  '$38',
    color:  'Black',
    href:   '/products/torii-ronin-tee',
    accent: '#cc2222',
    bg:     '#0f0a0a',
    label:  'DROP 001',
  },
  {
    id:     4,
    name:   'Tengu Tee',
    tag:    'The Crow Warrior',
    price:  '$38',
    color:  'White',
    href:   '/products/torii-ronin-tee',
    accent: '#cc2222',
    bg:     '#111111',
    label:  'DROP 001',
  },
]

export default function ProductShellPage({ title, subtitle }) {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Hero */}
      <div
        style={{
          height: "280px",
          background:
            "radial-gradient(ellipse at center, rgba(120,10,10,0.15) 0%, #0a0a0a 70%)",
          borderBottom: "1px solid rgba(180,20,20,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "68px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "72px",
            color: "#f0ede6",
            letterSpacing: "0.12em",
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "#555555",
            textTransform: "uppercase",
            marginTop: "12px",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Product grid */}
      <div style={{ padding: "80px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {PRODUCTS.map((product) => (
            <a
              key={product.id}
              href={product.href}
              style={{
                display:        'flex',
                flexDirection:  'column',
                background:     product.bg,
                textDecoration: 'none',
                color:          '#ffffff',
                cursor:         'pointer',
                transition:     'background 0.2s ease',
                position:       'relative',
                overflow:       'hidden',
              }}
            >
              {/* Image / preview area */}
              <div style={{
                height:         340,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                background:     `radial-gradient(ellipse at center, ${product.accent}18 0%, transparent 70%)`,
                borderBottom:   '1px solid rgba(255,255,255,0.05)',
                position:       'relative',
              }}>
                <span style={{
                  position:      'absolute',
                  top:           16,
                  left:          16,
                  fontSize:      9,
                  letterSpacing: 4,
                  fontFamily:    'monospace',
                  color:         product.accent,
                  opacity:       0.8,
                }}>
                  {product.label}
                </span>
                <span style={{
                  position:      'absolute',
                  top:           16,
                  right:         16,
                  fontSize:      9,
                  letterSpacing: 3,
                  fontFamily:    'monospace',
                  color:         'rgba(255,255,255,0.3)',
                }}>
                  {product.color}
                </span>
                <div style={{
                  fontSize:   120,
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  color:      'rgba(255,255,255,0.04)',
                  userSelect: 'none',
                  lineHeight: 1,
                }}>
                  侍
                </div>
                <div style={{
                  position:      'absolute',
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           6,
                }}>
                  <div style={{ width: 32, height: 1, background: product.accent, opacity: 0.6 }} />
                  <span style={{
                    fontSize:      10,
                    letterSpacing: 4,
                    fontFamily:    'monospace',
                    color:         'rgba(255,255,255,0.25)',
                    textTransform: 'uppercase',
                  }}>
                    {product.tag}
                  </span>
                  <div style={{ width: 32, height: 1, background: product.accent, opacity: 0.6 }} />
                </div>
              </div>

              {/* Card footer */}
              <div style={{
                padding:        '20px 24px',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{
                    margin:       0,
                    fontSize:     15,
                    fontWeight:   600,
                    fontFamily:   'Georgia, serif',
                    color:        '#ffffff',
                    marginBottom: 4,
                  }}>
                    {product.name}
                  </p>
                  <p style={{
                    margin:        0,
                    fontSize:      11,
                    fontFamily:    'monospace',
                    color:         'rgba(255,255,255,0.35)',
                    letterSpacing: 2,
                  }}>
                    {product.price}
                  </p>
                </div>
                <div style={{
                  fontSize:      9,
                  letterSpacing: 4,
                  fontFamily:    'monospace',
                  color:         product.accent,
                  textTransform: 'uppercase',
                  border:        `1px solid ${product.accent}`,
                  padding:       '6px 12px',
                }}>
                  View
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
