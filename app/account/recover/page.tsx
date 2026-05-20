import Link from 'next/link'

export const metadata = {
  title: 'Recover Access',
  description: 'Password recovery transmission — Hollow Ronin.',
}

export default function RecoverPage() {
  return (
    <main className="relative min-h-[calc(100vh-68px)] flex items-center justify-center overflow-hidden px-6 py-24 sm:py-32 bg-obsidian text-bone">
      {/* Sigil watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <img
          src="/sigils/mon-hollow-ronin-transparent.png"
          alt=""
          className="w-[min(82vw,640px)] h-auto select-none"
          style={{ opacity: 0.035, filter: 'grayscale(1) brightness(1.4)' }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,169,97,0.06) 0%, transparent 55%), radial-gradient(ellipse at 50% 110%, rgba(161,24,42,0.05) 0%, transparent 60%)',
        }}
      />

      <article className="relative z-10 w-full max-w-[440px] flex flex-col items-center text-center">
        <p
          className="animate-fade-up delay-1 flex items-center gap-3 font-mono uppercase text-[10px]"
          style={{ letterSpacing: '0.4em', color: 'rgba(201,169,97,0.78)' }}
        >
          <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
          Recovery · Transmission
          <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
        </p>

        <h1
          className="animate-fade-up delay-2 mt-7 font-bebas text-bone"
          style={{
            fontSize: 'clamp(60px, 11vw, 108px)',
            lineHeight: 0.92,
            letterSpacing: '0.12em',
            textShadow:
              '0 0 38px rgba(201,169,97,0.18), 0 0 90px rgba(201,169,97,0.05)',
          }}
        >
          LOST KEY
        </h1>

        <p
          className="animate-fade-up delay-2 mt-5 max-w-[360px] text-bone/45 italic"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(13px, 1.5vw, 15px)',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}
        >
          Even severed ronin can be summoned back. Recovery ritual still being forged.
        </p>

        <div
          aria-hidden
          className="animate-fade-up delay-3 mt-10 mb-9 h-px w-24"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(201,169,97,0.55), transparent)',
          }}
        />

        <div
          className="animate-fade-up delay-3 w-full px-5 py-6 border border-bone/15"
          style={{ background: 'rgba(244,237,226,0.02)' }}
        >
          <p
            className="font-mono uppercase text-[10px]"
            style={{ letterSpacing: '0.3em', color: 'rgba(244,237,226,0.65)' }}
          >
            Coming soon — Drop 002
          </p>
          <p
            className="mt-3 text-bone/45 italic"
            style={{ fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.6 }}
          >
            In the meantime, reach the order at{' '}
            <a
              href="mailto:hello@hollowronin.com"
              className="text-bone/75 not-italic underline decoration-dotted underline-offset-4 hover:text-[#c9a961]"
              style={{ fontFamily: 'var(--font-space-mono), ui-monospace, monospace' }}
            >
              hello@hollowronin.com
            </a>
          </p>
        </div>

        <div
          className="animate-fade-up delay-4 mt-10 font-mono uppercase text-[9px]"
          style={{ letterSpacing: '0.4em', color: 'rgba(244,237,226,0.32)' }}
        >
          <Link
            href="/account"
            className="transition-colors hover:text-[#c9a961] focus:outline-none focus-visible:text-[#c9a961]"
          >
            ← Return to the gate
          </Link>
        </div>
      </article>
    </main>
  )
}
