export default function HollowRoninLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

      {/* Icon with dark container */}
      <div style={{
        background: 'rgba(0,0,0,0.75)',
        borderRadius: '8px',
        padding: '4px',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(204,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <img
          src="/images/logo-mask.png"
          alt="Hollow Ronin"
          style={{ height: '36px', width: 'auto', display: 'block' }}
        />
      </div>

      {/* Premium text wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '26px',
          color: '#f5f0e8',
          letterSpacing: '0.18em',
          textShadow: '0 0 30px rgba(204,0,0,0.4), 0 2px 4px rgba(0,0,0,0.8)',
        }}>
          HOLLOW
        </span>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '26px',
          color: '#cc0000',
          letterSpacing: '0.18em',
          textShadow: '0 0 20px rgba(204,0,0,0.6), 0 0 40px rgba(204,0,0,0.2)',
        }}>
          RONIN
        </span>
      </div>

    </div>
  )
}
