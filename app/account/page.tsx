import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { login, signup, logout } from './actions'

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

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
        {user ? (
          <SignedInView email={user.email ?? ''} />
        ) : (
          <SignedOutView error={error} message={message} />
        )}
      </article>
    </main>
  )
}

function Badge({ label }: { label: string }) {
  return (
    <p
      className="animate-fade-up delay-1 flex items-center gap-3 text-[10px] font-mono uppercase"
      style={{ letterSpacing: '0.4em', color: 'rgba(201,169,97,0.78)' }}
    >
      <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
      {label}
      <span aria-hidden className="inline-block w-8 h-px bg-[rgba(201,169,97,0.45)]" />
    </p>
  )
}

function Divider() {
  return (
    <div
      aria-hidden
      className="animate-fade-up delay-3 mt-10 mb-9 h-px w-24"
      style={{
        background:
          'linear-gradient(to right, transparent, rgba(201,169,97,0.55), transparent)',
      }}
    />
  )
}

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="underline underline-offset-4 decoration-bone/0 transition-all duration-200 hover:text-gold hover:decoration-bone/40 focus:outline-none focus-visible:text-gold focus-visible:decoration-bone/40"
    >
      {children}
    </Link>
  )
}

function SignedOutView({
  error,
  message,
}: {
  error?: string
  message?: string
}) {
  return (
    <>
      <Badge label="Hollow Ronin · Gate" />

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
        THE GATE
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
        When the masters fell, the masks remained.
      </p>

      <Divider />

      {(error || message) && (
        <div
          role={error ? 'alert' : 'status'}
          className="animate-fade-up delay-3 w-full mb-6 px-4 py-3 border"
          style={{
            borderColor: error ? 'rgba(161,24,42,0.55)' : 'rgba(201,169,97,0.35)',
            background: error ? 'rgba(161,24,42,0.08)' : 'rgba(201,169,97,0.04)',
          }}
        >
          <p
            className="font-mono uppercase text-[10px]"
            style={{
              letterSpacing: '0.22em',
              color: error ? '#e26579' : 'rgba(244,237,226,0.85)',
            }}
          >
            {error ?? message}
          </p>
        </div>
      )}

      <SignInForm />

      <div className="animate-fade-up delay-5 mt-8 flex items-center gap-4 font-mono uppercase text-[11px] tracking-[0.3em] text-bone/40">
        <FooterLink href="/account/recover">Forgot password?</FooterLink>
        <span aria-hidden className="h-3 w-px bg-bone/20" />
        <FooterLink href="/shop">Back to Shop</FooterLink>
      </div>
    </>
  )
}

function SignedInView({ email }: { email: string }) {
  return (
    <>
      <Badge label="Account" />

      <h1
        className="animate-fade-up delay-2 mt-7 font-bebas text-bone break-all px-2"
        style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          lineHeight: 1.05,
          letterSpacing: '0.06em',
        }}
      >
        {email}
      </h1>

      <Divider />

      <form action={logout} className="animate-fade-up delay-4 w-full flex justify-center">
        <button
          className="w-full max-w-[200px] min-h-[48px] bg-obsidian border border-bone/30 text-bone font-bebas uppercase py-3 text-base transition-all duration-300 hover:border-blood hover:text-blood focus:outline-none focus-visible:border-blood focus-visible:text-blood focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.99]"
          style={{ letterSpacing: '0.22em' }}
        >
          Sign Out
        </button>
      </form>

      <div className="animate-fade-up delay-5 mt-8 font-mono uppercase text-[11px] tracking-[0.3em] text-bone/40">
        <FooterLink href="/shop">Back to Shop</FooterLink>
      </div>
    </>
  )
}

function SignInForm() {
  return (
    <form className="animate-fade-up delay-4 w-full flex flex-col gap-4">
      <Field
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="email"
        autoComplete="email"
        required
      />
      <Field
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="password"
        autoComplete="current-password"
        required
        minLength={6}
      />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(201,169,97,0.18)]">
        <button
          formAction={login}
          className="min-h-[56px] bg-[#c9a961] text-obsidian font-bebas uppercase py-4 text-base transition-all duration-300 hover:bg-[#a88b45] focus:outline-none focus-visible:bg-[#a88b45] focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.99]"
          style={{ letterSpacing: '0.28em' }}
        >
          Sign In
        </button>
        <button
          formAction={signup}
          className="min-h-[56px] bg-obsidian border border-bone/30 text-bone font-bebas uppercase py-4 text-base transition-all duration-300 hover:border-[#c9a961] hover:text-[#c9a961] focus:outline-none focus-visible:border-blood focus-visible:text-blood focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.99]"
          style={{ letterSpacing: '0.28em' }}
        >
          Create
        </button>
      </div>
    </form>
  )
}

function Field({
  id,
  name,
  type,
  label,
  placeholder,
  autoComplete,
  required,
  minLength,
}: {
  id: string
  name: string
  type: 'email' | 'password'
  label: string
  placeholder: string
  autoComplete: string
  required?: boolean
  minLength?: number
}) {
  return (
    <div className="relative w-full text-left">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="w-full min-h-[56px] bg-bone/[0.03] border-[1.5px] border-bone/[0.15] px-5 py-5 font-mono text-base text-bone caret-blood placeholder:text-bone/30 placeholder:lowercase placeholder:tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:border-blood focus:bg-[rgba(161,24,42,0.05)] focus-visible:ring-1 focus-visible:ring-blood/40"
        style={{ letterSpacing: '0.08em' }}
      />
    </div>
  )
}
