import Link from 'next/link'
import { requestReset } from './actions'

export const metadata = {
  title: 'Recover Access',
  description: 'Reset your Hollow Ronin password.',
}

export default async function RecoverPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string; email?: string }>
}) {
  const { error, sent, email } = await searchParams
  const isSuccess = sent === 'true'

  return (
    <main className="relative min-h-[calc(100vh-68px)] flex items-center justify-center overflow-hidden px-6 py-24 sm:py-32 bg-obsidian text-bone">
      {/* Soft vignette — gold above, blood-ember below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,169,97,0.06) 0%, transparent 55%), radial-gradient(ellipse at 50% 110%, rgba(161,24,42,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Scanline texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 3px)',
          opacity: 0.35,
        }}
      />

      <article className="relative z-10 w-full max-w-[480px] flex flex-col items-center text-center">
        <p
          className="animate-fade-up delay-1 flex items-center gap-3 font-mono uppercase text-[10px]"
          style={{ letterSpacing: '0.4em', color: 'rgba(201,169,97,0.78)' }}
        >
          <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
          Hollow Ronin · Recovery
          <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
        </p>

        <h1
          className="animate-fade-up delay-2 mt-7 font-bebas text-bone"
          style={{
            fontSize: 'clamp(56px, 9vw, 104px)',
            lineHeight: 0.92,
            letterSpacing: '0.14em',
            textShadow:
              '0 0 38px rgba(201,169,97,0.22), 0 0 90px rgba(201,169,97,0.06)',
          }}
        >
          RECOVER
        </h1>

        <p
          className="animate-fade-up delay-2 mt-5 max-w-[360px] text-bone/70 italic"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(13px, 1.5vw, 15px)',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}
        >
          {isSuccess
            ? 'Check your email. A reset link has been sent.'
            : "Enter your email and we'll send a link to reset your password."}
        </p>

        <div
          aria-hidden
          className="animate-fade-up delay-3 mt-10 mb-9 h-px w-24"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(201,169,97,0.55), transparent)',
          }}
        />

        {error && (
          <div
            role="alert"
            className="animate-fade-up delay-3 w-full mb-6 px-4 py-3 border"
            style={{
              borderColor: 'rgba(161,24,42,0.55)',
              background: 'rgba(161,24,42,0.08)',
            }}
          >
            <p
              className="font-mono uppercase text-[10px]"
              style={{ letterSpacing: '0.22em', color: '#e26579' }}
            >
              {error}
            </p>
          </div>
        )}

        {isSuccess ? (
          <div
            role="status"
            className="animate-fade-up delay-4 w-full px-5 py-6 border border-bone/15"
            style={{ background: 'rgba(244,237,226,0.02)' }}
          >
            <p
              className="font-mono uppercase text-[10px]"
              style={{ letterSpacing: '0.3em', color: 'rgba(201,169,97,0.85)' }}
            >
              Sent
            </p>
            {email && (
              <p
                className="mt-3 text-bone/80 italic break-all"
                style={{ fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.6 }}
              >
                A reset link has been sent to {email}.
              </p>
            )}
          </div>
        ) : (
          <form action={requestReset} className="animate-fade-up delay-4 w-full flex flex-col gap-4">
            <div className="relative w-full text-left">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                autoComplete="email"
                required
                className="w-full min-h-[56px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-5 py-5 font-mono text-base text-bone caret-blood placeholder:text-bone/30 placeholder:lowercase placeholder:tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:border-blood focus:bg-[rgba(161,24,42,0.05)] focus-visible:ring-1 focus-visible:ring-blood/40"
                style={{ letterSpacing: '0.08em' }}
              />
            </div>

            <button
              type="submit"
              className="mt-4 min-h-[56px] bg-[#c9a961] text-obsidian font-bebas uppercase py-4 text-base transition-all duration-300 hover:bg-[#a88b45] focus:outline-none focus-visible:bg-[#a88b45] focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.99]"
              style={{ letterSpacing: '0.28em' }}
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="animate-fade-up delay-5 mt-8 font-mono uppercase text-[11px] tracking-[0.3em] text-bone/40">
          <Link
            href="/account"
            className="underline underline-offset-4 decoration-bone/0 transition-all duration-200 hover:text-gold hover:decoration-bone/40 focus:outline-none focus-visible:text-gold focus-visible:decoration-bone/40"
          >
            ← Back to Sign In
          </Link>
        </div>
      </article>
    </main>
  )
}
