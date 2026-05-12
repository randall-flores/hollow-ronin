'use client'

import { useState } from 'react'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

type State = 'idle' | 'loading' | 'joined' | 'error'

export default function TheOrder() {
  const [email,    setEmail]    = useState('')
  const [state,    setState]    = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setErrorMsg('Enter a valid email.')
      setState('error')
      return
    }
    setState('loading')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Subscribe failed')
      setState('joined')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Subscribe failed')
      setState('error')
    }
  }

  const joined  = state === 'joined'
  const loading = state === 'loading'

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
              disabled={loading}
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
              disabled={loading}
              style={{
                background:    loading ? '#7a0212' : '#c0001e',
                color:         '#f0ede6',
                border:        'none',
                padding:       '10px 22px',
                fontFamily:    "'Space Mono', monospace",
                fontSize:      11,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                cursor:        loading ? 'wait' : 'pointer',
                transition:    'background 0.2s ease',
                opacity:       loading ? 0.85 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#e0102e' }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#c0001e' }}
            >
              {loading ? '...' : 'Join'}
            </button>
          </form>
        )}
        {state === 'error' && errorMsg && (
          <p role="alert" style={{
            marginTop:     16,
            fontFamily:    "'Space Mono', monospace",
            fontSize:      10,
            letterSpacing: '0.25em',
            color:         '#f0a0a0',
            textTransform: 'uppercase',
          }}>
            {errorMsg}
          </p>
        )}
      </div>
    </section>
  )
}
