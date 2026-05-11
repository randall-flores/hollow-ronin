'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const TshirtViewer = dynamic(() => import('@/components/TshirtViewer'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ margin: 0, fontSize: 9, letterSpacing: 6, fontFamily: 'monospace', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>Loading</p>
    </div>
  ),
})

const SIZES   = ['XS', 'S', 'M', 'L', 'XL'] as const
type Size     = typeof SIZES[number]

const DETAILS: [string, string][] = [
  ['Material', '100% heavyweight cotton, 250gsm'],
  ['Print',    'DTG front + back, wash-safe ink'],
  ['Fit',      'Oversized — size down if unsure'],
  ['Ships',    '5–8 business days, worldwide'],
  ['Made by',  'Print-on-demand via Printify'],
]

function SizeBtn({ label, selected, onClick }: { label: Size; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: 44, height: 44, fontSize: 11, fontFamily: 'monospace', letterSpacing: 1,
      border: `1px solid ${selected ? '#cc2222' : 'rgba(255,255,255,0.12)'}`,
      background: selected ? 'rgba(204,34,34,0.12)' : 'transparent',
      color: selected ? '#ffffff' : 'rgba(255,255,255,0.42)',
      cursor: 'pointer', transition: 'all 0.18s ease', outline: 'none',
    }}>
      {label}
    </button>
  )
}

function Rule() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ width: 4, height: 4, background: 'rgba(204,34,34,0.38)', transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  )
}

export default function ProductPage() {
  const [size,      setSize]      = useState<Size | null>(null)
  const [qty,       setQty]       = useState(1)
  const [cartState, setCartState] = useState<'idle' | 'added'>('idle')

  const handleAdd = () => {
    if (!size) return
    setCartState('added')
    setTimeout(() => setCartState('idle'), 2200)
    // TODO: wire up Shopify cart mutation here
  }

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#ffffff', display: 'flex', fontFamily: 'Georgia, Times New Roman, serif' }}>

      {/* 3D Viewer — left 58% */}
      <div style={{ position: 'relative', width: '58%', height: 'calc(100vh - 68px)', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 28, left: 28, zIndex: 10, pointerEvents: 'none' }}>
          <p style={{ margin: 0, fontSize: 9, letterSpacing: 6, color: 'rgba(255,255,255,0.13)', fontFamily: 'monospace' }}>HOLLOW RONIN</p>
          <p style={{ margin: '5px 0 0', fontSize: 9, letterSpacing: 4, color: 'rgba(204,34,34,0.65)', fontFamily: 'monospace' }}>DROP 001</p>
        </div>
        <TshirtViewer />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(204,34,34,0.18) 40%, rgba(204,34,34,0.18) 60%, transparent)' }} />
      </div>

      {/* Product info — right side */}
      <div style={{ flex: 1, height: 'calc(100vh - 68px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 52px', gap: 30 }}>

        <div>
          <p style={{ margin: '0 0 14px', fontSize: 9, letterSpacing: 5, color: '#cc2222', fontFamily: 'monospace', textTransform: 'uppercase' }}>Drop 001  ·  Limited Edition</p>
          <h1 style={{ margin: '0 0 18px', fontSize: 42, fontWeight: 700, lineHeight: 1.06, letterSpacing: -0.5 }}>Torii Ronin Tee</h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 24, fontFamily: 'monospace' }}>$38.00</span>
            <span style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>USD</span>
          </div>
        </div>

        <Rule />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Size</p>
            {!size && <p style={{ margin: 0, fontSize: 9, letterSpacing: 3, color: 'rgba(204,34,34,0.5)', fontFamily: 'monospace' }}>Required</p>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {SIZES.map((s) => <SizeBtn key={s} label={s} selected={size === s} onClick={() => setSize(s)} />)}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Quantity</p>
          <div style={{ display: 'inline-flex', border: '1px solid rgba(255,255,255,0.1)' }}>
            {(['−', String(qty), '+'] as const).map((label, i) => (
              <button key={i}
                onClick={i === 0 ? () => setQty(q => Math.max(1, q - 1)) : i === 2 ? () => setQty(q => q + 1) : undefined}
                disabled={i === 1}
                style={{
                  width: 44, height: 44, background: 'transparent', border: 'none',
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  color: i === 1 ? '#ffffff' : 'rgba(255,255,255,0.38)',
                  fontFamily: 'monospace', fontSize: i === 1 ? 14 : 18,
                  cursor: i === 1 ? 'default' : 'pointer', outline: 'none',
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleAdd} disabled={!size} style={{
          height: 56, width: '100%', outline: 'none', fontFamily: 'monospace',
          fontSize: 11, letterSpacing: 5, textTransform: 'uppercase',
          cursor: size ? 'pointer' : 'not-allowed', transition: 'all 0.22s ease',
          border: `1px solid ${!size ? 'rgba(255,255,255,0.08)' : cartState === 'added' ? 'rgba(204,34,34,0.5)' : '#cc2222'}`,
          background: !size ? 'transparent' : cartState === 'added' ? 'rgba(204,34,34,0.1)' : '#cc2222',
          color: !size ? 'rgba(255,255,255,0.16)' : cartState === 'added' ? '#cc2222' : '#ffffff',
        }}>
          {cartState === 'added' ? '✓  Added to Cart' : !size ? 'Select a Size' : 'Add to Cart'}
        </button>

        <Rule />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {DETAILS.map(([label, value]) => (
            <div key={label} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <p style={{ margin: 0, fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.26)', fontFamily: 'monospace', textTransform: 'uppercase', width: 56, flexShrink: 0, paddingTop: 2 }}>{label}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{value}</p>
            </div>
          ))}
        </div>

        <p style={{ margin: '8px 0 0', fontSize: 10, letterSpacing: 3, fontFamily: 'monospace', color: 'rgba(255,255,255,0.05)' }}>
          © HOLLOW RONIN  ·  No master. No rules.
        </p>
      </div>
    </main>
  )
}
