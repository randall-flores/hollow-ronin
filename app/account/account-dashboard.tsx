// app/account/account-dashboard.tsx
import type { User } from '@supabase/supabase-js'
import { AccountNav } from './account-nav'
import { OverviewSection } from './overview-section'
import { ProfileSection } from './profile-section'
import { PlaceholderSection } from './placeholder-section'
import { InitialAvatar } from './initial-avatar'
import { NAV_ITEMS, isSectionId, type Profile, type SectionId } from './account-types'

export function AccountDashboard({
  user,
  profile,
  section,
}: {
  user: User
  profile: Profile | null
  section?: string
}) {
  const active: SectionId = isSectionId(section) ? section : 'overview'
  const headerName =
    profile?.display_name?.trim() || (user.email ?? '').split('@')[0] || 'Ronin'
  const activeLabel = NAV_ITEMS.find((i) => i.id === active)?.label ?? 'Overview'

  return (
    <div className="relative z-10 w-full max-w-[960px] flex flex-col gap-10 text-left">
      <header className="animate-fade-up delay-1 flex items-center gap-4">
        <InitialAvatar name={headerName} />
        <div className="min-w-0">
          <p className="font-mono uppercase text-[10px] tracking-[0.35em] text-gold/70">
            Hollow Ronin · Account
          </p>
          <p
            className="mt-1 font-bebas uppercase text-bone text-2xl break-all"
            style={{ letterSpacing: '0.06em' }}
          >
            {headerName}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 sm:gap-10">
        <AccountNav active={active} />

        <div className="min-w-0">
          {active === 'overview' && <OverviewSection user={user} profile={profile} />}
          {active === 'profile' && (
            <ProfileSection userId={user.id} email={user.email ?? ''} profile={profile} />
          )}
          {active !== 'overview' && active !== 'profile' && (
            <PlaceholderSection label={activeLabel} />
          )}
        </div>
      </div>
    </div>
  )
}
