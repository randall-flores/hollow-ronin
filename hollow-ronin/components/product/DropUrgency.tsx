'use client'

import { useEffect, useState } from 'react'

const DROP_END = new Date('2026-05-17T00:00:00')

function remaining() {
  const diff = Math.max(0, DROP_END.getTime() - Date.now())
  const total = Math.floor(diff / 1000)
  return {
    d:    Math.floor(total / 86400),
    h:    Math.floor((total % 86400) / 3600),
    m:    Math.floor((total % 3600) / 60),
    live: diff <= 0,
  }
}

export default function DropUrgency() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, live: false })
  useEffect(() => {
    setT(remaining())
    const id = setInterval(() => setT(remaining()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (t.live) {
    return (
      <div style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            8,
        padding:        '8px 12px',
        border:         '1px solid rgba(204,34,34,0.55)',
        background:     'rgba(204,34,34,0.08)',
        fontFamily:     "'Space Mono', monospace",
        fontSize:       10,
        letterSpacing:  4,
        color:          '#cc2222',
        textTransform:  'uppercase',
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#cc2222',
          boxShadow:  '0 0 8px rgba(204,34,34,0.8)',
        }} />
        Drop 001 · Live now
      </div>
    )
  }

  const label =
    t.d > 0 ? `${t.d}d ${t.h}h` :
    t.h > 0 ? `${t.h}h ${t.m}m` :
              `${t.m}m`

  return (
    <div style={{
      display:        'inline-flex',
      alignItems:     'center',
      gap:            8,
      padding:        '8px 12px',
      border:         '1px solid rgba(204,34,34,0.35)',
      background:     'rgba(204,34,34,0.05)',
      fontFamily:     "'Space Mono', monospace",
      fontSize:       10,
      letterSpacing:  3,
      color:          'rgba(255,255,255,0.7)',
      textTransform:  'uppercase',
    }}>
      <span style={{ color: 'rgba(204,34,34,0.85)', letterSpacing: 4 }}>Closes</span>
      <span style={{ color: '#f0ede6' }}>{label}</span>
    </div>
  )
}
