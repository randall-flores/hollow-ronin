'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string | null
  const confirm = formData.get('confirm') as string | null

  if (!password || password.length < 6) {
    redirect('/account/reset?error=Password must be at least 6 characters')
  }

  if (password !== confirm) {
    redirect('/account/reset?error=Passwords do not match')
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/account/recover?error=Session expired. Request a new link.')
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    redirect(`/account/reset?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}
