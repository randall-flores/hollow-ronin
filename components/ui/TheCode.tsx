const LINES = [
  'We answer to no house.',
  'We follow no banner.',
  'What we carry, we earned.',
  'What we wear, we chose.',
  "The blade stays sheathed — until it doesn't.",
  'No master. No rules.',
] as const

export default function TheCode() {
  return (
    <section
      aria-labelledby="the-code-heading"
      style={{
        position:      'relative',
        background:    '#080808',
        padding:       'clamp(120px, 16vw, 220px) 32px',
        overflow:      'hidden',
        textAlign:     'center',
      }}
    >
      {/* faint top + bottom rule, full bleed, soft gold */}
      <div style={{ position: 'absolute', top: 0,    left: '5%', right: '5%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,97,0.30), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '5%', right: '5%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,169,97,0.30), transparent)' }} />

      <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }}>
        {/* kerned label */}
        <p
          id="the-code-heading"
          style={{
            margin:        0,
            marginBottom:  'clamp(48px, 7vw, 96px)',
            fontFamily:    "'Space Mono', monospace",
            fontSize:      10,
            letterSpacing: '0.8em',
            textTransform: 'uppercase',
            color:         '#c9a961',
            paddingLeft:   '0.8em', // optical: compensate the right-trailing tracking
          }}
        >
          ⟁&nbsp;&nbsp;&nbsp;The Code&nbsp;&nbsp;&nbsp;⟁
        </p>

        {/* manifesto lines */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           'clamp(8px, 1.4vw, 18px)',
          }}
        >
          {LINES.map((line, i) => {
            const isLast = i === LINES.length - 1
            return (
              <div
                key={line}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexDirection:  'column',
                  gap:            12,
                }}
              >
                <p
                  style={{
                    margin:        0,
                    fontFamily:    "'Bebas Neue', sans-serif",
                    fontSize:      isLast ? 'clamp(42px, 6.4vw, 96px)' : 'clamp(28px, 4.4vw, 64px)',
                    lineHeight:    1.45,
                    letterSpacing: '0.04em',
                    color:         isLast ? '#f0ede6' : '#e6e3dc',
                    textShadow:    isLast ? '0 0 28px rgba(201,169,97,0.22)' : 'none',
                  }}
                >
                  {line}
                </p>
                {isLast && (
                  <span
                    aria-hidden
                    style={{
                      display:    'block',
                      width:      'clamp(60px, 8vw, 120px)',
                      height:     2,
                      background: '#c9a961',
                      marginTop:  6,
                      boxShadow:  '0 0 16px rgba(201,169,97,0.45)',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
