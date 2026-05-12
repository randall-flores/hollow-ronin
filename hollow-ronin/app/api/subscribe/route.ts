import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const RESEND_API_KEY     = process.env.RESEND_API_KEY
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Body = { email?: string }

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as Body
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
      console.warn('[subscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID missing; logging only:', email)
      return NextResponse.json({ ok: true, logged: true })
    }

    const res = await fetch(
      `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
      {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      },
    )

    if (!res.ok) {
      const text = await res.text()
      // Resend returns 409 if contact already exists — treat as success
      if (res.status === 409) return NextResponse.json({ ok: true, alreadyExists: true })
      console.error('[subscribe] Resend error', res.status, text)
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Subscribe failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
