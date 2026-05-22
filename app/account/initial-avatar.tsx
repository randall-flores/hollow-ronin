// app/account/initial-avatar.tsx
// Decorative circular badge showing the first initial of the user's name/email.
// The name is rendered as text nearby, so this is aria-hidden.
export function InitialAvatar({ name }: { name: string }) {
  const initial = (name.trim()[0] ?? '?').toUpperCase()

  return (
    <span
      aria-hidden
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-bone/[0.03] font-bebas text-2xl text-gold"
      style={{ letterSpacing: '0.04em' }}
    >
      {initial}
    </span>
  )
}
