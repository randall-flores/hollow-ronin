// app/account/placeholder-section.tsx
// Quiet "Coming soon" empty state for sections not built yet.
// Navigable, never an error. The lock is functional UI iconography, not imagery.
export function PlaceholderSection({ label }: { label: string }) {
  return (
    <section
      aria-labelledby="placeholder-heading"
      className="animate-fade-up delay-2 flex min-h-[280px] w-full flex-col items-center justify-center gap-5 border border-bone/10 bg-bone/[0.02] px-6 py-16 text-center"
    >
      <LockGlyph />
      <h2
        id="placeholder-heading"
        className="font-bebas uppercase text-bone/80"
        style={{ fontSize: 'clamp(28px, 5vw, 40px)', letterSpacing: '0.12em' }}
      >
        {label}
      </h2>
      <p className="font-mono uppercase text-[11px] tracking-[0.35em] text-bone/35">
        Coming soon
      </p>
    </section>
  )
}

function LockGlyph() {
  return (
    <svg
      aria-hidden
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold/60"
    >
      <rect x="4" y="10" width="16" height="11" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.4" />
    </svg>
  )
}
