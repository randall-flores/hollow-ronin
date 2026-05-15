import fs   from 'node:fs'
import path from 'node:path'
import { CLAN_SIGIL, type Clan, type ProductImage } from './products'
import { type ColorSlug } from './shopify-products'

/*
 * Image resolvers — pull mockup files from /public/mockups/{imageFolder}/{color}/...
 *
 * Folder convention (per design family):
 *   /mockups/{imageFolder}/{color-lowercase}/tee-{imageFolder}-{back|front}-{color-lowercase}[-modelN].png
 *
 * imageFolder is the editorial slug (decoupled from Shopify handle so renaming
 * Shopify handles never breaks local images).
 *
 * Server-only: uses fs.existsSync. Do not import from a client component.
 */

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const warned     = new Set<string>()

function colorToFolder(c: ColorSlug): 'black' | 'white' {
  return c === 'WHITE' ? 'white' : 'black'
}

type CardHoverArgs = {
  imageFolder: string
  color:       ColorSlug
  name:        string
  fallback?:   { url: string; alt: string }
}

export function cardHoverImage(args: CardHoverArgs): { url: string; alt: string } {
  const { imageFolder, color, name, fallback } = args
  const folder   = colorToFolder(color)
  const frontUrl = `/mockups/${imageFolder}/${folder}/tee-${imageFolder}-front-${folder}.png`
  const absFront = path.join(PUBLIC_DIR, frontUrl.replace(/^\//, ''))

  try {
    if (fs.existsSync(absFront)) {
      return { url: frontUrl, alt: `${name} — front view` }
    }
  } catch {
    /* fs unavailable — silently fall through */
  }

  const warnKey = `${imageFolder}::${folder}::hover`
  if (!warned.has(warnKey)) {
    warned.add(warnKey)
    console.warn(`[card-images] missing front mockup for "${imageFolder}" (${frontUrl}). Falling back.`)
  }
  return fallback ?? { url: frontUrl, alt: name }
}

type GalleryArgs = {
  imageFolder: string
  color:       ColorSlug
  clan:        Clan
  name:        string
}

export function productGalleryImages(args: GalleryArgs): ProductImage[] {
  const { imageFolder, color, clan, name } = args
  const folder = colorToFolder(color)
  const dir    = `/mockups/${imageFolder}/${folder}`

  type Candidate = { url: string; alt: string }
  const candidates: Candidate[] = [
    { url: `${dir}/tee-${imageFolder}-front-${folder}.png`,        alt: `${name} — front view`             },
    { url: `${dir}/tee-${imageFolder}-back-${folder}.png`,         alt: `${name} — back design`            },
    { url: `${dir}/tee-${imageFolder}-front-${folder}-model1.png`, alt: `${name} — worn, front (1)`        },
    { url: `${dir}/tee-${imageFolder}-front-${folder}-model3.png`, alt: `${name} — worn, front (studio)`   },
    { url: `${dir}/tee-${imageFolder}-front-${folder}-model4.png`, alt: `${name} — worn, front (editorial)`},
    { url: `${dir}/tee-${imageFolder}-back-${folder}-model1.png`,  alt: `${name} — worn, back (1)`         },
    { url: `${dir}/tee-${imageFolder}-back-${folder}-model3.png`,  alt: `${name} — worn, back (studio)`    },
    { url: `${dir}/tee-${imageFolder}-back-${folder}-model4.png`,  alt: `${name} — worn, back (editorial)` },
    { url: CLAN_SIGIL[clan],                                       alt: `${name} — clan sigil`             },
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
  return present
}
