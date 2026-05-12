'use client'

import { useState } from 'react'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function TheOrder() {
  const [email,  setEmail]  = useState('')
  const [joined, setJoined] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) return
    console.log('[TheOrder] new signup:', email)
    setJoined(true)
  }

  return (
    <section
      aria-labelledby="the-order-heading"
      style={{
        position:   'relative',
        background: '#080808',
        padding:    'clamp(96px, 12vw, 160px) 32px',
        textAlign:  'center',
      }}
    >
      {/* divider above — separates from THE CODE / BrandStatement */}
      <div
        aria-hidden
        style={{
          position:   'absolute',
          top:        0,
          left:       '50%',
          transform:  'translateX(-50%)',
          width:      'min(560px, 60%)',
          height:     1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
        }}
      />

      <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2
          id="the-order-heading"
          style={{
            margin:        0,
            fontFamily:    "'Bebas Neue', sans-serif",
            fontSize:      'clamp(40px, 5vw, 64px)',
            letterSpacing: '0.18em',
            color:         '#f0ede6',
            lineHeight:    1,
          }}
        >
          THE ORDER
        </h2>

        <p
          style={{
            margin:        '20px 0 0',
            fontFamily:    'Georgia, serif',
            fontStyle:     'italic',
            fontSize:      14,
            lineHeight:    1.7,
            color:         'rgba(255,255,255,0.5)',
          }}
        >
          First access to every drop. No noise.
        </p>

        {joined ? (
          <p
            role="status"
            style={{
              marginTop:     'clamp(40px, 5vw, 56px)',
              fontFamily:    "'Space Mono', monospace",
              fontSize:      11,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color:         '#c0001e',
            }}
          >
            Welcome to the order.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            style={{
              marginTop:     'clamp(40px, 5vw, 56px)',
              width:         '100%',
              display:       'flex',
              alignItems:    'stretch',
              gap:           14,
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email"
              aria-label="Email address"
              style={{
                flex:          1,
                background:    'transparent',
                border:        'none',
                borderBottom:  '1px solid rgba(255,255,255,0.28)',
                outline:       'none',
                padding:       '10px 2px',
                fontFamily:    "'Space Mono', monospace",
                fontSize:      12,
                letterSpacing: '0.15em',
                color:         '#f0ede6',
                transition:    'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#c0001e')}
              onBlur={(e)  => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.28)')}
            />
            <button
              type="submit"
              style={{
                background:    '#c0001e',
                color:         '#f0ede6',
                border:        'none',
                padding:       '10px 22px',
                fontFamily:    "'Space Mono', monospace",
                fontSize:      11,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                cursor:        'pointer',
                transition:    'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e0102e')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#c0001e')}
            >
              Join
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
