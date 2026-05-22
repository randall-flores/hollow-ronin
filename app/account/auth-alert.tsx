// app/account/auth-alert.tsx
// Shared auth alert for the Gate. Single source of truth for the error/status
// block — rendered by the server page (searchParams) and the client Google button.
export function AuthAlert({
  error,
  message,
}: {
  error?: string
  message?: string
}) {
  if (!error && !message) return null

  return (
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
  )
}
