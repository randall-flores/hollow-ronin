import fs   from 'node:fs'
import path from 'node:path'
import type { Product, ProductImage } from './products'

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

/*
 * Build the ordered PDP gallery for a product.
 *
 * Display order:
 *   1. /mockups/tee-{slug}-front-{color}.png         (MAIN, default)
 *   2. /mockups/tee-{slug}-back-{color}.png
 *   3. /mockups/tee-{slug}-front-{color}-model1.png  (lifestyle front)
 *   4. /mockups/tee-{slug}-back-{color}-model1.png   (lifestyle back)
 *   5. /sigils/mon-{slug}-transparent.png            (clean sigil, last)
 *
 * Any file that does not exist on disk is silently skipped so the
 * gallery never breaks. Always returns at least one image — falls back
 * to product.images[0] if every preferred file is missing.
 *
 * Server-only: do not import from a client component.
 */
export function productGalleryImages(product: Product): ProductImage[] {
  const slug      = product.slug
  const colorSlug = product.color === 'White' ? 'white' : 'black'
  const name      = product.name

  type Candidate = { url: string; alt: string }
  const candidates: Candidate[] = [
    { url: `/mockups/tee-${slug}-front-${colorSlug}.png`,        alt: `${name} — front view`        },
    { url: `/mockups/tee-${slug}-back-${colorSlug}.png`,         alt: `${name} — back design`       },
    { url: `/mockups/tee-${slug}-front-${colorSlug}-model1.png`, alt: `${name} — worn, front`       },
    { url: `/mockups/tee-${slug}-back-${colorSlug}-model1.png`,  alt: `${name} — worn, back`        },
    { url: `/sigils/mon-${slug}-transparent.png`,                alt: `${name} — clan sigil`        },
  ]

  const present: ProductImage[] = []
  for (const c of candidates) {
    const abs = path.join(PUBLIC_DIR, c.url.replace(/^\//, ''))
    try {
      if (fs.existsSync(abs)) present.push(c)
    } catch {
      /* fs unavailable — skip */
    }
  }

  if (present.length === 0) return product.images
  return present
}

