'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { PRODUCTS, type Product } from '@/lib/products'
import { useCart } from '@/components/cart/CartProvider'
import DropUrgency from '@/components/product/DropUrgency'
import SocialShare from '@/components/product/SocialShare'

const SIZES = ['S', 'M', 'L', 'XL'] as const
type Size   = typeof SIZES[number]

const SIZE_CHART: Array<[Size, number, number, number]> = [
  ['S',  42, 28, 8.5],
  ['M',  44, 29, 9],
  ['L',  46, 30, 9.5],
  ['XL', 48, 31, 10],
]

const DETAILS: [string, string][] = [
  ['Material', '100% heavyweight cotton, 250gsm'],
  ['Print',    'DTG front + back, wash-safe ink'],
  ['Fit',      'Oversized — size down if unsure'],
  ['Ships',    '5–8 business days, worldwide'],
  ['Origin',   'Forged on demand. Limited by design.'],
]

const COLOR_SWATCH: Record<'Black' | 'White', string> = {
  Black: '#1a1a1a',
  White: '#e8e2d6',
}

function getVariants(product: Product): Product[] {
  return PRODUCTS.filter((p) => p.subtitle === product.subtitle)
}

function getRelated(product: Product, limit = 4): Product[] {
  return PRODUCTS
    .filter((p) => p.subtitle !== product.subtitle && p.category === product.category)
    .slice(0, limit)
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

function Breadcrumbs({ product }: { product: Product }) {
  return (
    <nav aria-label="Breadcrumb" style={{
      padding: '20px 32px 0',
      fontFamily: "'Space Mono', monospace",
      fontSize: 10, letterSpacing: 3,
      color: 'rgba(255,255,255,0.35)',
      textTransform: 'uppercase',
      display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
    }}>
      <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
      <span style={{ color: 'rgba(204,34,34,0.5)' }}>/</span>
      <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
      <span style={{ color: 'rgba(204,34,34,0.5)' }}>/</span>
      <Link href={`/shop/${product.category}`} style={{ color: 'inherit', textDecoration: 'none' }}>{product.category}</Link>
      <span style={{ color: 'rgba(204,34,34,0.5)' }}>/</span>
      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{product.name}</span>
    </nav>
  )
}

function Gallery({ product, onZoom }: { product: Product; onZoom: (index: number) => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPos,    setHoverPos]    = useState<{ x: number; y: number } | null>(null)
  const active = product.images[activeIndex]

  useEffect(() => { setActiveIndex(0); setHoverPos(null) }, [product.slug])

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia('(hover: none)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPos({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    })
  }

  return (
    <div className="hr-gallery">
      <div
        role="tablist"
        aria-label="Product images"
        className="hr-thumbs"
      >
        {product.images.map((img, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={img.url}
              role="tab"
              aria-selected={isActive}
              aria-label={`View ${img.alt}`}
              onClick={() => setActiveIndex(i)}
              style={{
                position:   'relative',
                width:      72,
                height:     72,
                padding:    0,
                background: '#0d0d0d',
                border:     `1px solid ${isActive ? '#cc2222' : 'rgba(255,255,255,0.08)'}`,
                boxShadow:  isActive ? '0 0 0 2px rgba(204,34,34,0.18)' : 'none',
                cursor:     'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                outline:    'none',
                flexShrink: 0,
              }}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="72px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onZoom(activeIndex)}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverPos(null)}
        aria-label="Zoom image"
        className="hr-hero"
      >
        <Image
          key={active.url}
          src={active.url}
          alt={active.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
          style={{
            objectFit:       'contain',
            transform:       hoverPos ? 'scale(1.7)' : 'scale(1)',
            transformOrigin: hoverPos ? `${hoverPos.x}% ${hoverPos.y}%` : 'center',
            transition:      hoverPos ? 'transform 0.08s linear' : 'transform 0.35s ease',
          }}
        />
        <span style={{
          position:  'absolute', bottom: 16, right: 16,
          fontSize:  9, letterSpacing: 4,
          fontFamily: 'monospace',
          color:     'rgba(255,255,255,0.35)',
          background: 'rgba(0,0,0,0.4)',
          padding:   '6px 10px',
          border:    '1px solid rgba(255,255,255,0.08)',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          opacity:    hoverPos ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}>
          {hoverPos ? '' : 'Hover to zoom · Click for full'}
        </span>
      </button>
    </div>
  )
}

function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Size guide"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 320,
        background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 560, width: '100%',
          background: '#0c0c0c',
          border: '1px solid rgba(204,34,34,0.35)',
          padding: '32px 28px',
          color: '#f0ede6',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <p style={{ margin: 0, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 5, color: '#cc2222', textTransform: 'uppercase' }}>Reference</p>
            <h3 style={{ margin: '8px 0 0', fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: '0.14em' }}>SIZE GUIDE</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#f0ede6', width: 36, height: 36, cursor: 'pointer',
              fontFamily: 'monospace', fontSize: 14,
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ margin: '0 0 18px', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          Oversized fit, measured flat. Garment in inches. Size down for a regular fit.
        </p>

        <table style={{
          width: '100%', borderCollapse: 'collapse',
          fontFamily: "'Space Mono', monospace", fontSize: 11,
        }}>
          <thead>
            <tr style={{ background: 'rgba(204,34,34,0.08)' }}>
              {['Size', 'Chest', 'Length', 'Sleeve'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', letterSpacing: 3, color: 'rgba(255,255,255,0.62)', textTransform: 'uppercase', borderBottom: '1px solid rgba(204,34,34,0.25)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZE_CHART.map(([sz, chest, len, sleeve]) => (
              <tr key={sz}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#f0ede6' }}>{sz}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>{chest}″</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>{len}″</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)' }}>{sleeve}″</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ margin: '22px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>
          Measure a tee you already love, flat and unstretched. Chest = pit to pit doubled.
        </p>
      </div>
    </div>
  )
}

function VariantPicker({ product, variants }: { product: Product; variants: Product[] }) {
  if (variants.length <= 1) return null
  const activeIndex = variants.findIndex((v) => v.slug === product.slug)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          Color  <span style={{ color: 'rgba(255,255,255,0.2)' }}>· {activeIndex + 1} of {variants.length}</span>
        </p>
        <p style={{ margin: 0, fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)' }}>{product.color}</p>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {variants.map((v) => {
          const active = v.slug === product.slug
          return (
            <Link
              key={v.slug}
              href={`/products/${v.slug}`}
              aria-label={`${v.color} variant`}
              prefetch={false}
              style={{
                width: 44, height: 44, padding: 4,
                background: '#0a0a0a',
                border: `1px solid ${active ? '#cc2222' : 'rgba(255,255,255,0.12)'}`,
                boxShadow: active ? '0 0 0 2px rgba(204,34,34,0.18)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s ease',
                textDecoration: 'none',
              }}
            >
              <span style={{
                width: '100%', height: '100%',
                background: COLOR_SWATCH[v.color],
                border: v.color === 'White' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                display: 'block',
              }} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function Related({ items }: { items: Product[] }) {
  if (items.length === 0) return null
  return (
    <section style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 32px 100px',
      maxWidth: 1440, margin: '0 auto',
    }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 36, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 1, background: 'rgba(204,34,34,0.55)' }} />
          <p style={{ margin: 0, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 6, color: 'rgba(204,34,34,0.85)', textTransform: 'uppercase' }}>
            More from the Drop
          </p>
          <div style={{ width: 36, height: 1, background: 'rgba(204,34,34,0.55)' }} />
        </div>
        <Link
          href="/shop"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 4,
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '8px 14px',
            border: '1px solid rgba(255,255,255,0.12)',
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          className="hr-rel-viewall"
        >
          View All →
        </Link>
      </header>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
      }}>
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            prefetch={false}
            style={{
              display: 'block', textDecoration: 'none', color: '#f0ede6',
              background: p.bg,
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'border-color 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
            className="hr-rel-card"
          >
            <div style={{
              position: 'relative', aspectRatio: '1 / 1',
              background: `radial-gradient(ellipse at center 60%, ${p.accent}1a 0%, transparent 65%), ${p.bg}`,
            }}>
              <Image
                src={p.images[0].url}
                alt={p.images[0].alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: 13, color: '#f0ede6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.name}
              </p>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>${p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function ProductPage({ product }: { product: Product }) {
  const [size,        setSize]        = useState<Size | null>(null)
  const [qty,         setQty]         = useState(1)
  const [cartState,   setCartState]   = useState<'idle' | 'added'>('idle')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [guideOpen,   setGuideOpen]   = useState(false)
  const { add } = useCart()

  const variants = getVariants(product)
  const related  = getRelated(product, 4)

  const handleAdd = () => {
    if (!size) return
    add({
      slug:  product.slug,
      name:  product.name,
      size,
      price: product.price,
      image: product.images[0].url,
      qty,
    })
    setCartState('added')
    setTimeout(() => setCartState('idle'), 2200)
  }

  return (
    <>
      <style>{`
        .hr-pdp {
          min-height: 100vh;
          background: #080808;
          color: #ffffff;
          font-family: Georgia, 'Times New Roman', serif;
        }
        .hr-pdp-grid {
          display: flex;
          flex-direction: column;
        }
        .hr-pdp-gallery-col,
        .hr-pdp-info-col {
          width: 100%;
        }
        .hr-pdp-info-col {
          padding: 32px 24px 120px;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }
        .hr-gallery {
          display: flex;
          flex-direction: column-reverse;
          gap: 12px;
          padding: 20px;
          width: 100%;
        }
        .hr-thumbs {
          display: flex;
          flex-direction: row;
          gap: 8px;
          overflow-x: auto;
          width: 100%;
          padding-bottom: 4px;
        }
        .hr-hero {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.06);
          cursor: zoom-in;
          padding: 0;
          outline: none;
        }
        @media (min-width: 1024px) {
          .hr-pdp-grid {
            flex-direction: row;
          }
          .hr-pdp-gallery-col {
            width: 58%;
            position: sticky;
            top: 68px;
            height: calc(100vh - 68px);
            flex-shrink: 0;
          }
          .hr-pdp-info-col {
            flex: 1;
            padding: 48px 52px;
            justify-content: center;
            height: calc(100vh - 68px);
            overflow-y: auto;
          }
          .hr-gallery {
            flex-direction: row;
            padding: 32px 32px 32px 24px;
            height: 100%;
          }
          .hr-thumbs {
            flex-direction: column;
            width: 72px;
            flex-shrink: 0;
            overflow-x: visible;
            overflow-y: auto;
          }
          .hr-hero {
            aspect-ratio: auto;
            flex: 1;
            height: 100%;
          }
        }
        .hr-rel-card:hover {
          border-color: rgba(204,34,34,0.55) !important;
          transform: translateY(-4px);
        }
        .hr-rel-viewall:hover {
          border-color: #cc2222 !important;
          color: #cc2222 !important;
        }
        .hr-hero img {
          animation: heroFade 0.35s ease-out;
        }
        @keyframes heroFade {
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
        .hr-size-pill {
          display: inline-flex;
          align-items: center;
          height: 18px;
          padding: 0 6px;
          margin-left: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: #f0ede6;
          background: rgba(204,34,34,0.18);
          border: 1px solid rgba(204,34,34,0.5);
        }
        .hr-size-btn:focus-visible,
        .hr-qty-btn:focus-visible {
          outline: 2px solid #cc2222;
          outline-offset: 2px;
        }
        .hr-mobile-cta {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          background: rgba(8,8,8,0.96);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(204,34,34,0.3);
          padding: 12px 16px env(safe-area-inset-bottom, 12px);
          z-index: 90;
          display: flex; gap: 10px; align-items: center;
        }
        @media (min-width: 1024px) {
          .hr-mobile-cta { display: none; }
        }
      `}</style>

      <main className="hr-pdp">
        <Breadcrumbs product={product} />

        <div className="hr-pdp-grid">
          {/* Gallery */}
          <div className="hr-pdp-gallery-col">
            <div style={{ position: 'absolute', top: 28, left: 28, zIndex: 10, pointerEvents: 'none', display: 'none' }} className="hr-pdp-corner">
              <p style={{ margin: 0, fontSize: 9, letterSpacing: 6, color: 'rgba(255,255,255,0.13)', fontFamily: 'monospace' }}>HOLLOW RONIN</p>
              <p style={{ margin: '5px 0 0', fontSize: 9, letterSpacing: 4, color: 'rgba(204,34,34,0.65)', fontFamily: 'monospace' }}>{product.label}</p>
            </div>
            <Gallery product={product} onZoom={(i) => setLightboxIdx(i)} />
          </div>

          {/* Info */}
          <div className="hr-pdp-info-col">
            <div>
              <p style={{ margin: '0 0 14px', fontSize: 9, letterSpacing: 5, color: '#cc2222', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                {product.label}  ·  Limited Edition
              </p>
              <h1 style={{ margin: '0 0 6px', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 56px)', fontWeight: 400, lineHeight: 1, letterSpacing: '0.06em', color: '#f0ede6' }}>
                {product.name}
              </h1>
              <p style={{ margin: '0 0 18px', fontSize: 10, letterSpacing: 6, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                {product.subtitle}
              </p>
              <p style={{ margin: '0 0 18px', fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: 460 }}>
                {product.story}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontSize: 24, fontFamily: 'monospace', color: '#f0ede6' }}>${product.price}.00</span>
                <span style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>USD</span>
              </div>
              <div style={{ marginTop: 14 }}>
                <DropUrgency />
              </div>
            </div>

            <Rule />

            <VariantPicker product={product} variants={variants} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Size</p>
                <button
                  onClick={() => setGuideOpen(true)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 9, letterSpacing: 3, color: 'rgba(204,34,34,0.85)',
                    fontFamily: 'monospace', textTransform: 'uppercase',
                    textDecoration: 'underline', textUnderlineOffset: 3,
                    padding: 0,
                  }}
                >
                  Size Guide ↗
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SIZES.map((s) => {
                  const selected = size === s
                  return (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      aria-pressed={selected}
                      className="hr-size-btn"
                      style={{
                        width: 48, height: 48, fontSize: 11, fontFamily: 'monospace', letterSpacing: 1,
                        border: `1px solid ${selected ? '#cc2222' : 'rgba(255,255,255,0.12)'}`,
                        background: selected ? 'rgba(204,34,34,0.12)' : 'transparent',
                        color: selected ? '#ffffff' : 'rgba(255,255,255,0.55)',
                        cursor: 'pointer', transition: 'all 0.18s ease', outline: 'none',
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
              {!size && <p style={{ margin: 0, fontSize: 10, letterSpacing: 2, color: 'rgba(204,34,34,0.55)', fontFamily: 'monospace' }}>Select a size to continue.</p>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Quantity</p>
              <div style={{ display: 'inline-flex', border: '1px solid rgba(255,255,255,0.1)', alignSelf: 'flex-start' }}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="hr-qty-btn"
                  style={{ width: 48, height: 48, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace', fontSize: 18, cursor: 'pointer', outline: 'none' }}
                >−</button>
                <span aria-live="polite" style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontFamily: 'monospace', fontSize: 14 }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="hr-qty-btn"
                  style={{ width: 48, height: 48, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace', fontSize: 18, cursor: 'pointer', outline: 'none' }}
                >+</button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!size}
              aria-live="polite"
              style={{
                height: 56, width: '100%', outline: 'none', fontFamily: 'monospace',
                fontSize: 11, letterSpacing: 5, textTransform: 'uppercase',
                cursor: size ? 'pointer' : 'not-allowed', transition: 'all 0.22s ease',
                border: `1px solid ${!size ? 'rgba(255,255,255,0.08)' : cartState === 'added' ? 'rgba(204,34,34,0.5)' : '#cc2222'}`,
                background: !size ? 'transparent' : cartState === 'added' ? 'rgba(204,34,34,0.1)' : '#cc2222',
                color: !size ? 'rgba(255,255,255,0.16)' : cartState === 'added' ? '#cc2222' : '#ffffff',
              }}
            >
              {cartState === 'added' ? '✓  Added to Cart' : !size ? 'Select a Size' : `Add to Cart — $${(product.price * qty).toFixed(2)}`}
            </button>

            {/* Trust row */}
            <div style={{ display: 'flex', gap: 18, justifyContent: 'space-between', padding: '6px 2px' }}>
              {[
                ['SHIP', 'Worldwide 5–8d'],
                ['LIMIT', 'Drop 001 only'],
                ['RET',  '14-day exchange'],
              ].map(([k, v]) => (
                <div key={k} style={{ textAlign: 'center', flex: 1 }}>
                  <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 9, letterSpacing: 4, color: '#cc2222', textTransform: 'uppercase' }}>{k}</p>
                  <p style={{ margin: '6px 0 0', fontFamily: 'Georgia, serif', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{v}</p>
                </div>
              ))}
            </div>

            <Rule />

            <SocialShare
              url={`https://hollowronin.com/products/${product.slug}`}
              title={`${product.name} — ${product.subtitle} · HOLLOW RONIN`}
              image={`https://hollowronin.com${product.images[0]?.url ?? ''}`}
            />

            <Rule />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {DETAILS.map(([label, value]) => (
                <div key={label} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <p style={{ margin: 0, fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.32)', fontFamily: 'monospace', textTransform: 'uppercase', width: 64, flexShrink: 0, paddingTop: 2 }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{value}</p>
                </div>
              ))}
            </div>

            <p style={{ margin: '8px 0 0', fontSize: 10, letterSpacing: 3, fontFamily: 'monospace', color: 'rgba(255,255,255,0.12)' }}>
              © HOLLOW RONIN  ·  No master. No rules.
            </p>
          </div>
        </div>

        <Related items={related} />

        {/* Sticky mobile CTA */}
        <div className="hr-mobile-cta" role="region" aria-label="Add to cart">
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: 13, color: '#f0ede6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {product.name}
              {size && <span className="hr-size-pill">{size}</span>}
            </p>
            <p style={{ margin: '2px 0 0', fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
              ${(product.price * qty).toFixed(2)} {!size && '· pick size'}
              {size && qty > 1 ? ` · ×${qty}` : ''}
            </p>
          </div>
          <button
            onClick={handleAdd}
            disabled={!size}
            style={{
              height: 48, padding: '0 18px',
              fontFamily: 'monospace', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase',
              border: `1px solid ${!size ? 'rgba(255,255,255,0.12)' : '#cc2222'}`,
              background: !size ? 'transparent' : '#cc2222',
              color: !size ? 'rgba(255,255,255,0.3)' : '#fff',
              cursor: size ? 'pointer' : 'not-allowed',
            }}
          >
            {cartState === 'added' ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </main>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />

      <Lightbox
        open={lightboxIdx !== null}
        close={() => setLightboxIdx(null)}
        index={lightboxIdx ?? 0}
        slides={product.images.map((img) => ({ src: img.url, alt: img.alt }))}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}
      />
    </>
  )
}
