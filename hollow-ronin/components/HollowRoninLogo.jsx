export default function HollowRoninLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

      {/* Black container + screen blend removes the black square from logo-mask.png */}
      <div style={{
        background: '#000000',
        borderRadius: '8px',
        padding: '3px',
        border: '1px solid rgba(204,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src="/images/logo-mask.png"
          alt="Hollow Ronin"
          style={{
            height: '38px',
            width: 'auto',
            display: 'block',
            mixBlendMode: 'screen',
          }}
        />
      </div>

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
          background: 'linear-gradient(to right, #cc0000, rgba(204,0,0,0.1))',
          marginBottom: '1px',
        }} />
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '26px',
          color: '#cc0000',
          letterSpacing: '0.18em',
          textShadow: '0 0 20px rgba(204,0,0,0.9), 0 0 50px rgba(204,0,0,0.4), 0 2px 6px rgba(0,0,0,0.9)',
          marginTop: '-1px',
        }}>
          RONIN
        </span>
      </div>

    </div>
  )
}
