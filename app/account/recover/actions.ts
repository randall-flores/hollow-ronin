'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requestReset(formData: FormData) {
  const email = (formData.get('email') as string | null)?.trim()

  if (!email) {
    redirect('/account/recover?error=Email required')
  }

  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hollowronin.com'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/account/reset`,
  })

  if (error) {
    redirect(`/account/recover?error=${encodeURIComponent(error.message)}`)
  }

  // Always show success — never leak whether the email is registered (prevents account enumeration).
  redirect(`/account/recover?sent=true&email=${encodeURIComponent(email)}`)
}
