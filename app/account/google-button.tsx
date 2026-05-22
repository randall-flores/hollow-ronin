// app/account/google-button.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AuthAlert } from './auth-alert'

export function GoogleButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  async function handleClick() {
    if (loading) return
    setError(undefined)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })

      // On success the browser is already redirecting to Google; this only runs on failure.
      if (error) {
        setError(error.message)
        setLoading(false)
      }
    } catch {
      // signInWithOAuth can throw (network down, bad config) instead of returning { error }.
      // Without this, loading would stay true and the button would be stuck on "Redirecting…".
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-up delay-4 w-full">
      {error && <AuthAlert error={error} />}

      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-busy={loading}
        className="w-full min-h-[56px] flex items-center justify-center gap-3 bg-obsidian border border-bone/30 text-bone font-bebas uppercase py-4 text-base transition-all duration-300 hover:border-bone/60 hover:bg-bone/[0.04] focus:outline-none focus-visible:border-blood focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ letterSpacing: '0.28em' }}
      >
        {loading ? (
          <>
            <Spinner />
            Redirecting&hellip;
          </>
        ) : (
          <>
            <GoogleG />
            Continue with Google
          </>
        )}
      </button>
    </div>
  )
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-bone/30 border-t-bone"
    />
  )
}

function GoogleG() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.583-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}
