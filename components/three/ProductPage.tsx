'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { ProductImage } from '@/lib/products'
import type { EnrichedFamily, EnrichedVariant } from '@/lib/product-merge'
import { useCart } from '@/components/cart/CartProvider'
import DropUrgency from '@/components/product/DropUrgency'
import SocialShare from '@/components/product/SocialShare'

const SIZE_CHART: Array<[string, number, number, number]> = [
  ['S',   42, 28, 8.5],
  ['M',   44, 29, 9],
  ['L',   46, 30, 9.5],
  ['XL',  48, 31, 10],
  ['2XL', 50, 32, 10.5],
  ['3XL', 52, 33, 11],
  ['4XL', 54, 34, 11.5],
]

const DETAILS: [string, string][] = [
  ['Material', '100% heavyweight cotton, 250gsm'],
  ['Print',    'DTG front + back, wash-safe ink'],
  ['Fit',      'Oversized — size down if unsure'],
  ['Ships',    '5–8 business days, worldwide'],
  ['Origin',   'Forged on demand. Limited by design.'],
]

const COLOR_SWATCH: Record<'BLACK' | 'WHITE', string> = {
  BLACK: '#1a1a1a',
  WHITE: '#e8e2d6',
}

function Rule() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ width: 4, height: 4, background: 'rgba(201,169,97,0.55)', transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  )
}

function Breadcrumbs({ family }: { family: EnrichedFamily }) {
  return (
    <nav aria-label="Breadcrumb" style={{
      padding: '20px clamp(16px, 4vw, 32px) 0',
      fontFamily: "'Space Mono', monospace",
      fontSize: 10, letterSpacing: 2,
      color: 'rgba(255,255,255,0.35)',
      textTransform: 'uppercase',
      display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap',
    }}>
      <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
      <span style={{ color: 'rgba(244,237,226,0.35)' }}>/</span>
      <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
      <span style={{ color: 'rgba(244,237,226,0.35)' }}>/</span>
      <Link href={`/shop/${family.category}`} style={{ color: 'inherit', textDecoration: 'none' }}>{family.category}</Link>
      <span style={{ color: 'rgba(244,237,226,0.35)' }}>/</span>
      <span style={{ color: 'rgba(255,255,255,0.7)' }}>{family.name}</span>
    </nav>
  )
}

function Gallery({
  images,
  productKey,
  onZoom,
}: {
  images:     ProductImage[]
  productKey: string
  onZoom:     (index: number) => void
}) {
  const firstUrl = images[0]?.url ?? ''
  const [activeUrl, setActiveUrl] = useState<string>(firstUrl)

  useEffect(() => {
    setActiveUrl(images[0]?.url ?? '')
  }, [productKey, images])

  const safeActive = images.find((img) => img.url === activeUrl) ?? images[0]
  const activeIndex = images.findIndex((img) => img.url === safeActive?.url)

  if (!safeActive) return null

  return (
    <div className="hr-gallery">
      <div role="tablist" aria-label="Product images" className="hr-thumbs">
        {images.map((img) => {
          const isActive = img.url === safeActive.url
          return (
            <button
              key={`${productKey}::${img.url}`}
              role="tab"
              aria-selected={isActive}
              aria-label={`View ${img.alt}`}
              onClick={() => setActiveUrl(img.url)}
              style={{
                position:   'relative',
                width:      72,
                height:     72,
                padding:    0,
                background: '#0d0d0d',
                border:     `1px solid ${isActive ? '#c9a961' : 'rgba(255,255,255,0.08)'}`,
                boxShadow:  isActive ? '0 0 0 2px rgba(201,169,97,0.22)' : 'none',
                cursor:     'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                outline:    'none',
                flexShrink: 0,
              }}
            >
              <Image src={img.url} alt={img.alt} fill sizes="72px" style={{ objectFit: 'cover' }} />
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onZoom(activeIndex >= 0 ? activeIndex : 0)}
        aria-label="Open full-size image"
        className="hr-hero"
      >
        <Image
          key={`${productKey}::${safeActive.url}`}
          src={safeActive.url}
          alt={safeActive.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
          style={{ objectFit: 'contain' }}
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
        }}>
          Click for full
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
          border: '1px solid rgba(201,169,97,0.40)',
          padding: '32px 28px',
          color: '#f0ede6',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <p style={{ margin: 0, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 5, color: '#c9a961', textTransform: 'uppercase' }}>Reference</p>
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
            <tr style={{ background: 'rgba(201,169,97,0.08)' }}>
              {['Size', 'Chest', 'Length', 'Sleeve'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', letterSpacing: 3, color: 'rgba(255,255,255,0.62)', textTransform: 'uppercase', borderBottom: '1px solid rgba(201,169,97,0.30)' }}>
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

function ColorPicker({
  family,
  activeHandle,
}: {
  family:       EnrichedFamily
  activeHandle: string
}) {
  if (family.variants.length <= 1) return null
  const active = family.variants.find((v) => v.handle === activeHandle) ?? family.variants[0]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          Color
        </p>
        <p style={{ margin: 0, fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          {active.color === 'WHITE' ? 'White' : 'Black'}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {family.variants.map((v) => {
          const selected = v.handle === activeHandle
          const colorName = v.color === 'WHITE' ? 'White' : 'Black'
          return (
            <Link
              key={v.handle}
              href={`/products/${v.handle}`}
              aria-label={`Color: ${colorName}`}
              aria-current={selected ? 'page' : undefined}
              title={colorName}
              prefetch={false}
              style={{
                width: 36, height: 36, padding: 0,
                background: COLOR_SWATCH[v.color],
                border: `1px solid ${selected ? '#c9a961' : 'rgba(255,255,255,0.15)'}`,
                boxShadow: selected ? '0 0 0 2px rgba(201,169,97,0.30)' : 'none',
                display: 'inline-block',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export type RelatedItem = {
  handle: string
  name:   string
  price:  number
  image:  ProductImage
  bg:     string
  accent: string
}

function Related({ items }: { items: RelatedItem[] }) {
  if (items.length === 0) return null
  return (
    <section style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: 'clamp(56px, 9vw, 80px) clamp(16px, 4vw, 32px) clamp(72px, 12vw, 100px)',
      maxWidth: 1440, margin: '0 auto',
    }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 36, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 1, background: 'rgba(201,169,97,0.55)' }} />
          <p style={{ margin: 0, fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 6, color: '#c9a961', textTransform: 'uppercase' }}>
            More from the Drop
          </p>
          <div style={{ width: 36, height: 1, background: 'rgba(201,169,97,0.55)' }} />
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
            key={p.handle}
            href={`/products/${p.handle}`}
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
                src={p.image.url}
                alt={p.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: 13, color: '#f0ede6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.name}
              </p>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>${p.price.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function ProductPage({
  family,
  active,
  galleryByHandle,
  related = [],
}: {
  family:          EnrichedFamily
  active:          EnrichedVariant
  galleryByHandle: Record<string, ProductImage[]>
  related?:        RelatedItem[]
}) {
  const availableSizes = active.sizes.filter((s) => s.available)
  const sizeOrder = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
  const sortedSizes = [...availableSizes].sort(
    (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size),
  )

  const [size,        setSize]        = useState<string | null>(null)
  const [qty,         setQty]         = useState(1)
  const [cartState,   setCartState]   = useState<'idle' | 'added'>('idle')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const [guideOpen,   setGuideOpen]   = useState(false)
  const { add } = useCart()

  const images = galleryByHandle[active.handle] ??
    (active.featuredImage ? [{ url: active.featuredImage.url, alt: active.featuredImage.alt }] : [])

  const handleAdd = () => {
    if (!size) return
    add({
      handle: active.handle,
      name:   family.name,
      size,
      price:  active.price,
      image:  images[0]?.url ?? active.featuredImage?.url ?? '',
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
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .hr-hero img {
          transition: filter 0.3s ease;
          filter: brightness(0.96);
        }
        .hr-hero:hover {
          border-color: rgba(201,169,97,0.45);
          box-shadow: 0 0 24px -6px rgba(201,169,97,0.30);
        }
        .hr-hero:hover img {
          filter: brightness(1.03);
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
            min-width: 0;
            padding: 48px 56px 48px 52px;
            justify-content: flex-start;
            height: calc(100vh - 68px);
            overflow-y: auto;
            overflow-x: hidden;
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
          border-color: rgba(201,169,97,0.6) !important;
          transform: translateY(-4px);
          box-shadow: 0 0 24px rgba(201,169,97,0.15);
        }
        .hr-rel-viewall:hover {
          border-color: #c9a961 !important;
          color: #c9a961 !important;
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
          color: #0a0a0a;
          background: rgba(201,169,97,0.90);
          border: 1px solid #c9a961;
        }
        .hr-size-btn:focus-visible,
        .hr-qty-btn:focus-visible {
          outline: 2px solid #c9a961;
          outline-offset: 2px;
        }
        .hr-mobile-cta {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          background: rgba(8,8,8,0.96);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(201,169,97,0.35);
          padding: 12px 16px env(safe-area-inset-bottom, 12px);
          z-index: 90;
          display: flex; gap: 10px; align-items: center;
        }
        @media (min-width: 1024px) {
          .hr-mobile-cta { display: none; }
        }
      `}</style>

      <main className="hr-pdp">
        <Breadcrumbs family={family} />

        <div className="hr-pdp-grid">
          {/* Gallery */}
          <div className="hr-pdp-gallery-col">
            <Gallery images={images} productKey={active.handle} onZoom={(i) => setLightboxIdx(i)} />
          </div>

          {/* Info */}
          <div className="hr-pdp-info-col">
            <div>
              <p style={{ margin: '0 0 14px', fontSize: 9, letterSpacing: 5, color: '#cc2222', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                {family.label}  ·  Limited Edition
              </p>
              <h1 style={{ margin: '0 0 6px', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5.2vw, 56px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '0.03em', color: '#f0ede6', overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%', paddingRight: 4 }}>
                {family.name}
              </h1>
              <p style={{ margin: '0 0 18px', fontSize: 10, letterSpacing: 6, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                {family.subtitle}
              </p>
              <p style={{ margin: '0 0 18px', fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: 460 }}>
                {family.story}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{
                  fontSize: 24, fontFamily: 'monospace', color: '#f0ede6',
                  paddingBottom: 2, borderBottom: '1px solid #c9a961',
                }}>${active.price.toFixed(2)}</span>
                <span style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>{active.currencyCode}</span>
              </div>
              <div style={{ marginTop: 14 }}>
                <DropUrgency />
              </div>
            </div>

            <Rule />

            <ColorPicker family={family} activeHandle={active.handle} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Size</p>
                <button
                  onClick={() => setGuideOpen(true)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 9, letterSpacing: 3, color: '#c9a961',
                    fontFamily: 'monospace', textTransform: 'uppercase',
                    textDecoration: 'underline', textUnderlineOffset: 3,
                    padding: 0,
                  }}
                >
                  Size Guide ↗
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {sortedSizes.map((s) => {
                  const selected = size === s.size
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.size)}
                      aria-pressed={selected}
                      className="hr-size-btn"
                      style={{
                        minWidth: 48, height: 48, padding: '0 12px', fontSize: 11, fontFamily: 'monospace', letterSpacing: 1,
                        border: `1px solid ${selected ? '#c9a961' : 'rgba(255,255,255,0.12)'}`,
                        background: selected ? 'rgba(201,169,97,0.10)' : 'transparent',
                        color: selected ? '#c9a961' : 'rgba(255,255,255,0.55)',
                        cursor: 'pointer', transition: 'all 0.18s ease', outline: 'none',
                      }}
                    >
                      {s.size}
                    </button>
                  )
                })}
              </div>
              {!size && <p style={{ margin: 0, fontSize: 10, letterSpacing: 2, color: 'rgba(244,237,226,0.50)', fontFamily: 'monospace' }}>Select a size to continue.</p>}
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
                fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', fontWeight: 600,
                cursor: size ? 'pointer' : 'not-allowed', transition: 'all 0.22s ease',
                border: `1px solid ${!size ? 'rgba(255,255,255,0.08)' : cartState === 'added' ? '#c9a961' : '#c9a961'}`,
                background: !size ? 'transparent' : cartState === 'added' ? 'rgba(201,169,97,0.10)' : '#c9a961',
                color: !size ? 'rgba(255,255,255,0.16)' : cartState === 'added' ? '#c9a961' : '#0a0a0a',
              }}
            >
              {cartState === 'added' ? '✓  Added to Cart' : !size ? 'Select a Size' : `Acquire — $${(active.price * qty).toFixed(2)}`}
            </button>

            {/* Trust row */}
            <div style={{ display: 'flex', gap: 18, justifyContent: 'space-between', padding: '6px 2px' }}>
              {[
                ['SHIP', 'Worldwide 5–8d'],
                ['LIMIT', 'Drop 001 only'],
                ['RET',  '14-day exchange'],
              ].map(([k, v]) => (
                <div key={k} style={{ textAlign: 'center', flex: 1 }}>
                  <p style={{ margin: 0, fontFamily: 'monospace', fontSize: 9, letterSpacing: 4, color: '#c9a961', textTransform: 'uppercase' }}>{k}</p>
                  <p style={{ margin: '6px 0 0', fontFamily: 'Georgia, serif', fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{v}</p>
                </div>
              ))}
            </div>

            <Rule />

            <SocialShare
              url={`https://hollowronin.com/products/${active.handle}`}
              title={`${family.name} — ${family.subtitle} · HOLLOW RONIN`}
              image={`https://hollowronin.com${images[0]?.url ?? ''}`}
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
              {family.name}
              {size && <span className="hr-size-pill">{size}</span>}
            </p>
            <p style={{ margin: '2px 0 0', fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
              ${(active.price * qty).toFixed(2)} {!size && '· pick size'}
              {size && qty > 1 ? ` · ×${qty}` : ''}
            </p>
          </div>
          <button
            onClick={handleAdd}
            disabled={!size}
            style={{
              height: 48, padding: '0 18px',
              fontFamily: 'monospace', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase',
              border: `1px solid ${!size ? 'rgba(255,255,255,0.12)' : '#c9a961'}`,
              background: !size ? 'transparent' : '#c9a961',
              color: !size ? 'rgba(255,255,255,0.3)' : '#0a0a0a',
              cursor: size ? 'pointer' : 'not-allowed',
              fontWeight: 600,
            }}
          >
            {cartState === 'added' ? 'Added ✓' : 'Acquire'}
          </button>
        </div>
      </main>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />

      <Lightbox
        open={lightboxIdx !== null}
        close={() => setLightboxIdx(null)}
        index={lightboxIdx ?? 0}
        slides={images.map((img) => ({ src: img.url, alt: img.alt }))}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}
      />
    </>
  )
}
