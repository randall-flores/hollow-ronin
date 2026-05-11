// components/HollowRoninLogo.jsx
// Drop this in your /components folder
// Works with ANY dark background — no video editing or background removal needed

export default function HollowRoninLogo({ showMask = true, showWordmark = true }) {
  return (
    <div className="flex items-center gap-3">

      {/* ── MASK / ICON LOGO ─────────────────────────────────────────────
          Has a black square around it? mix-blend-mode: screen fixes it.
          screen = makes black pixels invisible, keeps bright/colored ones.
          Replace src with your actual mask logo path.
      ─────────────────────────────────────────────────────────────────── */}
      {showMask && (
        <img
          src="/images/logo-mask.png"
          alt="Hollow Ronin"
          className="h-8 w-auto"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* ── WORDMARK VIDEO ───────────────────────────────────────────────
          Has a white background? mix-blend-mode: multiply fixes it.
          multiply = makes white pixels invisible, keeps dark/colored ones.
      ─────────────────────────────────────────────────────────────────── */}
      {showWordmark && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-10 w-auto"
          style={{ mixBlendMode: 'multiply' }}
        >
          <source src="/videos/logo-wordmark.webm" type="video/webm" />
          <source src="/videos/logo-wordmark.mp4"  type="video/mp4" />
        </video>
      )}

    </div>
  )
}
