'use client';

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height:     '100vh',
        marginTop:  '-68px',
        background: '#0A0A0A',
      }}
    >
      {/* Bamboo radial bleed — bottom-left corner */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 0% 100%, rgba(28,58,42,0.55) 0%, rgba(28,58,42,0.18) 35%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* SVG grain texture overlay — 4% opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'h\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23h)\'/%3E%3C/svg%3E")',
          opacity: 0.04,
          mixBlendMode: 'overlay',
          zIndex: 2,
        }}
      />

      {/* Thin gold vertical line — far left, decorative */}
      <div
        className="absolute pointer-events-none"
        style={{
          top:    0,
          bottom: 0,
          left:   '40px',
          width:  '1px',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(201,160,39,0.55) 30%, rgba(201,160,39,0.55) 70%, transparent 100%)',
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ zIndex: 4, padding: '0 clamp(64px, 10vw, 140px)' }}
      >
        {/* Subheadline — sits ABOVE main headline */}
        <p
          style={{
            opacity: 0,
            animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards',
            margin: 0,
            fontFamily: "'DM Mono', monospace",
            fontSize:   '13px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9A027',
            marginBottom: '28px',
          }}
        >
          Drop 001 — Available Now
        </p>

        {/* Main headline */}
        <h1
          style={{
            opacity: 0,
            animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s forwards',
            fontFamily: "'Shippori Mincho', 'Noto Serif JP', Georgia, serif",
            fontWeight: 700,
            fontSize:   'clamp(48px, 8vw, 96px)',
            letterSpacing: '0.08em',
            lineHeight: 0.9,
            color: '#F4EDE2',
            margin: 0,
            textTransform: 'uppercase',
            maxWidth: '14ch',
          }}
        >
          No Master.<br />No Clan.<br />No Mercy.
        </h1>

        {/* CTA */}
        <a
          href="#the-drop"
          style={{
            opacity: 0,
            animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s forwards',
            display: 'inline-block',
            width: 'fit-content',
            marginTop: '48px',
            padding: '16px 40px',
            border: '1px solid #C9A027',
            color: '#C9A027',
            background: 'transparent',
            fontFamily: "'DM Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#C9A027';
            e.currentTarget.style.color      = '#0A0A0A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color      = '#C9A027';
          }}
        >
          Enter the Void
        </a>
      </div>
    </section>
  );
}
