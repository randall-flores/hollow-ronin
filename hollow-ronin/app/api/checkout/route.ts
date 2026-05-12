import { NextResponse } from 'next/server'
import { createCheckoutUrl, type CheckoutItem } from '@/lib/shopify'

export const runtime = 'nodejs'

type Body = { items: CheckoutItem[] }

export async function POST(req: Request) {
  try {
    const { items } = (await req.json()) as Body
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }
    const checkoutUrl = await createCheckoutUrl(items)
    return NextResponse.json({ checkoutUrl })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
