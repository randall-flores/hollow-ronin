'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email:    formData.get('email')    as string,
    password: formData.get('password') as string,
  })
  if (error) redirect(`/account?error=${encodeURIComponent(error.message)}`)
  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email:    formData.get('email')    as string,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hollowronin.com'}/auth/callback`,
    },
  })
  if (error) redirect(`/account?error=${encodeURIComponent(error.message)}`)

  // Confirmation required: user exists but no session yet.
  if (data.user && !data.session) {
    redirect('/account?message=Check your email to confirm')
  }

  // Confirmation disabled: session granted — log straight in.
  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/account')
}
