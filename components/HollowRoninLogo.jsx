export default function HollowRoninLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

      <img
        src="/logos/hollow-ronin-emblem.svg"
        alt="Hollow Ronin"
        style={{
          height: '40px',
          width:  '40px',
          display: 'block',
          flexShrink: 0,
        }}
      />

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: '2px' }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '18px',
          color: 'rgba(245,240,232,0.7)',
          letterSpacing: '0.32em',
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
        }}>
          HOLLOW
        </span>
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, #c9a961, rgba(201,169,97,0.1))',
          marginBottom: '1px',
        }} />
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '26px',
          color: '#c9a961',
          letterSpacing: '0.18em',
          textShadow: '0 0 20px rgba(201,169,97,0.85), 0 0 50px rgba(201,169,97,0.35), 0 2px 6px rgba(0,0,0,0.9)',
          marginTop: '-1px',
        }}>
          RONIN
        </span>
      </div>

    </div>
  )
}
