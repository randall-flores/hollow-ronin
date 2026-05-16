'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden" style={{ marginTop: '-68px' }}>

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* DARK VIGNETTE OVERLAY */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)'
        }}
      />

      {/* BOTTOM FADE TO BLACK */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: '35%',
          background: 'linear-gradient(to bottom, transparent, #08080a)'
        }}
      />

      {/* SCANLINE TEXTURE */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          opacity: 0.4
        }}
      />

      {/* CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:px-20">

        {/* COLLECTION LABEL */}
        <div className="flex items-center gap-3 mb-6">
          <div style={{ width: '32px', height: '1px', backgroundColor: '#c9a961' }} />
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#c9a961',
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400
          }}>
            COLLECTION 001
          </span>
        </div>

        {/* MAIN TITLE */}
        <div style={{ lineHeight: 0.85 }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(56px, 14vw, 180px)',
            letterSpacing: '0.06em',
            color: '#f0ece4',
            textShadow: '0 0 120px rgba(201,169,97,0.28)',
            display: 'block'
          }}>
            HOLLOW
          </h1>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(56px, 14vw, 180px)',
            letterSpacing: '0.06em',
            color: '#f0ece4',
            textShadow: '0 0 120px rgba(201,169,97,0.28)',
            display: 'block',
            marginLeft: '4vw'
          }}>
            RONIN
          </h1>
        </div>

        {/* TAGLINE */}
        <p style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(13px, 1.6vw, 16px)',
          letterSpacing: '0.15em',
          color: '#a09080',
          marginTop: '24px',
          marginBottom: '40px'
        }}>
          No Master. No Rules. No Mercy.
        </p>

        {/* CTA BUTTON */}
        <Link
          href="/shop"
          style={{
            width: 'fit-content',
            padding: '14px 40px',
            border: 'none',
            background: '#c9a961',
            color: '#0a0a0a',
            fontSize: '11px',
            letterSpacing: '0.25em',
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            textDecoration: 'none',
            display: 'inline-block',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#a88b45'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#c9a961'
          }}
        >
          ENTER THE DROP
        </Link>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div style={{
          width: '1px',
          height: '50px',
          backgroundColor: 'rgba(244,237,226,0.40)',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
        <span style={{
          fontSize: '9px',
          letterSpacing: '0.3em',
          color: 'rgba(244,237,226,0.50)'
        }}>SCROLL</span>
      </div>

    </section>
  );
}
