// app/account/overview-section.tsx
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'
import { logout } from './actions'
import type { Profile } from './account-types'

function formatMemberSince(iso: string | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function OverviewSection({
  user,
  profile,
}: {
  user: User
  profile: Profile | null
}) {
  const emailLocalPart = (user.email ?? '').split('@')[0]
  const welcomeName = profile?.display_name?.trim() || emailLocalPart || 'Ronin'
  const provider = user.app_metadata?.provider === 'google' ? 'Google' : 'Email'

  return (
    <section
      aria-labelledby="overview-heading"
      className="animate-fade-up delay-2 w-full flex flex-col gap-8 text-left"
    >
      <header>
        <p className="font-mono uppercase text-[10px] tracking-[0.35em] text-gold/70">
          Welcome back
        </p>
        <h2
          id="overview-heading"
          className="mt-2 font-bebas uppercase text-bone break-words"
          style={{ fontSize: 'clamp(34px, 6vw, 56px)', letterSpacing: '0.08em' }}
        >
          {welcomeName}
        </h2>
      </header>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-bone/[0.06] border border-bone/[0.06]">
        <InfoCell label="Member since" value={formatMemberSince(user.created_at)} />
        <InfoCell label="Sign-in method" value={provider} />
      </dl>

      <div className="flex flex-col gap-px bg-bone/[0.06]">
        <Link
          href="/account/reset"
          className="min-h-[56px] flex items-center justify-between bg-obsidian px-5 font-mono uppercase text-[12px] tracking-[0.22em] text-bone/70 transition-colors duration-200 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
        >
          Change Password
          <span aria-hidden className="text-bone/30">→</span>
        </Link>

        <form action={logout}>
          <button
            type="submit"
            className="w-full min-h-[56px] flex items-center justify-between bg-obsidian px-5 font-mono uppercase text-[12px] tracking-[0.22em] text-bone/70 transition-colors duration-200 hover:text-blood focus:outline-none focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
          >
            Sign Out
            <span aria-hidden className="text-bone/30">↪</span>
          </button>
        </form>
      </div>
    </section>
  )
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-obsidian px-5 py-5">
      <dt className="font-mono uppercase text-[10px] tracking-[0.3em] text-bone/35">
        {label}
      </dt>
      <dd
        className="mt-2 font-bebas uppercase text-bone text-xl"
        style={{ letterSpacing: '0.06em' }}
      >
        {value}
      </dd>
    </div>
  )
}
