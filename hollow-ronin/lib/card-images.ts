import fs   from 'node:fs'
import path from 'node:path'
import type { Product } from './products'

/*
 * Resolve the hover image shown on listing cards.
 *
 * Default state of a card = back mockup (gallery[0]).
 * Hover state            = the front mockup (chest sigil printed on shirt).
 *
 * Path pattern: /mockups/tee-{slug}-front-{color}.png
 *
 * If that file does not exist on disk under public/, log a warning at
 * build time and fall back to the back mockup so the card never breaks
 * visually.
 *
 * Server-only: this module uses `fs` and must not be imported from any
 * client component. TheDrop and ProductShellPage are both RSC, so they
 * can call this safely at build time.
 */

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const warned     = new Set<string>()

export function cardHoverImage(product: Product): { url: string; alt: string } {
  const slug      = product.slug
  const colorSlug = product.color === 'White' ? 'white' : 'black'
  const frontUrl  = `/mockups/tee-${slug}-front-${colorSlug}.png`
  const backUrl   = product.images[0]?.url ?? frontUrl
  const backAlt   = product.images[0]?.alt ?? product.name

  const absFront = path.join(PUBLIC_DIR, frontUrl.replace(/^\//, ''))

  try {
    if (fs.existsSync(absFront)) {
      return { url: frontUrl, alt: `${product.name} — front view` }
    }
  } catch {
    // fs unavailable (shouldn't happen on server) — silently fall through
  }

  if (!warned.has(slug)) {
    warned.add(slug)
    console.warn(`[card-images] missing front mockup for "${slug}" (${frontUrl}). Falling back to back mockup.`)
  }
  return { url: backUrl, alt: backAlt }
}
