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

  if (user) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-[#F4EDE2] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Account</h1>
          <p className="text-sm text-[#F4EDE2]/60 mb-8">{user.email}</p>
          <form action={logout}>
            <button className="w-full border border-[#F4EDE2]/20 hover:border-[#A1182A] hover:text-[#A1182A] transition py-3 text-sm uppercase tracking-widest">
              Sign Out
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F4EDE2] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Enter</h1>
        <p className="text-sm text-[#F4EDE2]/60 mb-8 uppercase tracking-widest">
          No master. No rules.
        </p>
        {error && <p className="mb-4 text-sm text-[#A1182A]">{error}</p>}
        {message && <p className="mb-4 text-sm text-[#F4EDE2]/80">{message}</p>}
        <form className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full bg-transparent border border-[#F4EDE2]/20 px-4 py-3 text-sm placeholder:text-[#F4EDE2]/40 focus:outline-none focus:border-[#A1182A]"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={6}
            className="w-full bg-transparent border border-[#F4EDE2]/20 px-4 py-3 text-sm placeholder:text-[#F4EDE2]/40 focus:outline-none focus:border-[#A1182A]"
          />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              formAction={login}
              className="bg-[#A1182A] hover:bg-[#A1182A]/90 text-[#F4EDE2] py-3 text-sm uppercase tracking-widest transition"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="border border-[#F4EDE2]/20 hover:border-[#F4EDE2] py-3 text-sm uppercase tracking-widest transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
