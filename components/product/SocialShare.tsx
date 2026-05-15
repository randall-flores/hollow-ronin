'use client'

import { useState } from 'react'

type Props = {
  url:   string
  title: string
  image?: string
}

const BTN: React.CSSProperties = {
  display:        'inline-flex',
  alignItems:     'center',
  justifyContent: 'center',
  width:          34,
  height:         34,
  background:     'transparent',
  border:         '1px solid rgba(255,255,255,0.12)',
  color:          'rgba(255,255,255,0.6)',
  cursor:         'pointer',
  textDecoration: 'none',
  transition:     'all 0.18s ease',
}

const HOVER_IN  = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = '#c9a961'
  e.currentTarget.style.color       = '#c9a961'
}
const HOVER_OUT = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
  e.currentTarget.style.color       = 'rgba(255,255,255,0.6)'
}

export default function SocialShare({ url, title, image }: Props) {
  const [copied, setCopied] = useState(false)

  const enc       = encodeURIComponent
  const xUrl      = `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`
  const pinUrl    = `https://pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(title)}${image ? `&media=${enc(image)}` : ''}`
  const fbUrl     = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked — fall back to selection
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* noop */ }
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <p style={{
        margin:        0,
        fontSize:      9,
        letterSpacing: 4,
        color:         'rgba(255,255,255,0.35)',
        fontFamily:    'monospace',
        textTransform: 'uppercase',
      }}>
        Share
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <a href={xUrl}   target="_blank" rel="noopener noreferrer" aria-label="Share on X"        style={BTN} onMouseEnter={HOVER_IN} onMouseLeave={HOVER_OUT}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
          </svg>
        </a>
        <a href={pinUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest" style={BTN} onMouseEnter={HOVER_IN} onMouseLeave={HOVER_OUT}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.366-.053.224-.171.272-.395.164-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Z"/>
          </svg>
        </a>
        <a href={fbUrl}  target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" style={BTN} onMouseEnter={HOVER_IN} onMouseLeave={HOVER_OUT}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82V14.706h-3.13v-3.622h3.13V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.764v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0Z"/>
          </svg>
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label="Copy product link"
          style={BTN}
          onMouseEnter={HOVER_IN}
          onMouseLeave={HOVER_OUT}
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.41 1.41"/>
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.41-1.41"/>
            </svg>
          )}
        </button>
      </div>
      {copied && (
        <span role="status" style={{
          fontFamily:    "'Space Mono', monospace",
          fontSize:      9,
          letterSpacing: 3,
          color:         '#c9a961',
          textTransform: 'uppercase',
        }}>
          Link copied
        </span>
      )}
    </div>
  )
}
