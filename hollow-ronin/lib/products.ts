export type Category =
  | 'shirts'
  | 'hoodies'
  | 'hats'
  | 'beanies'
  | 'socks'
  | 'scarfs'
  | 'masked-hoodies'

export type ProductImage = {
  url: string
  alt: string
}

export type Product = {
  slug:          string
  name:          string
  subtitle:      string
  tag:           string
  price:         number
  designFamily:  string
  images:        ProductImage[]
  accent:        string
  bg:            string
  label:         string
  color:         'Black' | 'White'
  category:      Category
  blurb:         string
  story:         string
}

const FRONT_BLACK = '/mockups/tee-hollow-ronin-logo-front-black.png'
const FRONT_WHITE = '/mockups/tee-hollow-ronin-logo-front-white.png'

type ImgMod = 'back' | 'm1' | 'm3' | 'm4'

// Gallery order is fixed and per-color:
//   [0] back design (the unique artwork for this product)
//   [1] front view — color-matched brand-mark tee (same image for every
//       product of that color, because the brand mark is what prints on
//       the chest of every Hollow Ronin shirt). Drives listing hover swap.
//   [2..] model shots: model-1, model-3, model-4 in mods order.
//
// Every product MUST have indices [0] and [1] populated. Enforced by
// scripts/validate-products.js.
function teeImages(
  mockup: string,
  color: 'black' | 'white',
  name:  string,
  mods:  ImgMod[],
): ProductImage[] {
  const front = color === 'black' ? FRONT_BLACK : FRONT_WHITE
  const base  = `/mockups/tee-${mockup}-back-${color}`
  const has   = (m: ImgMod) => mods.includes(m)
  const images: ProductImage[] = []

  if (has('back')) images.push({ url: `${base}.png`,        alt: `${name} — back design` })
                   images.push({ url: front,                alt: `${name} — front view` })
  if (has('m1'))   images.push({ url: `${base}-model1.png`, alt: `${name} — worn, side` })
  if (has('m3'))   images.push({ url: `${base}-model3.png`, alt: `${name} — worn, studio` })
  if (has('m4'))   images.push({ url: `${base}-model4.png`, alt: `${name} — worn, editorial` })

  return images
}

export const PRODUCTS: Product[] = [
  {
    slug:         'the-ronin',
    name:         'THE RONIN',
    subtitle:     'Torii Ronin',
    tag:          'The Ronin',
    price:        38,
    designFamily: 'torii-ronin',
    images:       teeImages('crow-ronin-bloodmoon', 'black', 'THE RONIN', ['back']),
    accent:       '#cc2222',
    bg:           '#0f0a0a',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'A masterless warrior beneath the gates of nothing.',
    story:        'The torii marks the threshold. The ronin chose to walk through it alone.',
  },
  {
    slug:         'the-ronin-white',
    name:         'THE RONIN',
    subtitle:     'Torii Ronin',
    tag:          'The Ronin',
    price:        38,
    designFamily: 'torii-ronin',
    images:       teeImages('crow-ronin-bloodmoon', 'white', 'THE RONIN', ['back', 'm1', 'm3', 'm4']),
    accent:       '#cc2222',
    bg:           '#15100f',
    label:        'DROP 001',
    color:        'White',
    category:     'shirts',
    blurb:        'A masterless warrior beneath the gates of nothing.',
    story:        'The torii marks the threshold. The ronin chose to walk through it alone.',
  },
  {
    slug:         'the-hollow-warrior',
    name:         'THE HOLLOW WARRIOR',
    subtitle:     'Skeleton Ronin',
    tag:          'The Hollow Warrior',
    price:        38,
    designFamily: 'skeleton-ronin',
    images:       teeImages('skeleton-ronin-redsun', 'black', 'THE HOLLOW WARRIOR', ['back', 'm1', 'm3', 'm4']),
    accent:       '#cc2222',
    bg:           '#0a0a0a',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'Flesh forgotten. Vow remembered.',
    story:        'What walks past death is no longer a man — only the promise he refused to break.',
  },
  {
    slug:         'mask-of-wrath',
    name:         'MASK OF WRATH',
    subtitle:     'Hannya: Rage',
    tag:          'Mask of Wrath',
    price:        38,
    designFamily: 'hannya-rage',
    images:       teeImages('cyber-oni-clash', 'black', 'MASK OF WRATH', ['back', 'm1', 'm3', 'm4']),
    accent:       '#cc2222',
    bg:           '#0f0a0a',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'The first mask. The one she could not take off.',
    story:        'Hannya born of fury — horns of grief, eyes that never close.',
  },
  {
    slug:         'mask-of-mourning',
    name:         'MASK OF MOURNING',
    subtitle:     'Hannya: Sorrow',
    tag:          'Mask of Mourning',
    price:        38,
    designFamily: 'hannya-sorrow',
    images:       teeImages('oni-samurai-dark', 'black', 'MASK OF MOURNING', ['back', 'm1', 'm3', 'm4']),
    accent:       '#aa1f3a',
    bg:           '#0a0a10',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'Quiet rage. Louder than any scream.',
    story:        'The second mask weeps in silence — the river beneath the fire.',
  },
  {
    slug:         'mask-of-reckoning',
    name:         'MASK OF RECKONING',
    subtitle:     'Hannya: Vengeance',
    tag:          'Mask of Reckoning',
    price:        38,
    designFamily: 'hannya-vengeance',
    images:       teeImages('cyber-oni-full', 'black', 'MASK OF RECKONING', ['back', 'm1', 'm3', 'm4']),
    accent:       '#cc2222',
    bg:           '#0f0808',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'The debt is overdue.',
    story:        'The third mask remembers every name carved into the dark.',
  },
  {
    slug:         'mask-of-stillness',
    name:         'MASK OF STILLNESS',
    subtitle:     'Hannya: Silence',
    tag:          'Mask of Stillness',
    price:        38,
    designFamily: 'hannya-silence',
    images: [
      { url: '/mockups/tee-cyber-oni-portrait-circle-back-black-model3.png', alt: 'MASK OF STILLNESS — back design' },
      { url: FRONT_BLACK,                                                    alt: 'MASK OF STILLNESS — front view' },
      { url: '/mockups/tee-cyber-oni-portrait-circle-back-black-model4.png', alt: 'MASK OF STILLNESS — worn, editorial' },
    ],
    accent:       '#a83244',
    bg:           '#0a0a0a',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'When the screaming stops, listen harder.',
    story:        'The fourth mask is the most dangerous — patience sharpened into a blade.',
  },
  {
    slug:         'the-inscribed',
    name:         'THE INSCRIBED',
    subtitle:     'Bone Kanji',
    tag:          'The Bone Vow',
    price:        38,
    designFamily: 'bone-kanji',
    images:       teeImages('skeleton-samurai-kanji', 'black', 'THE INSCRIBED', ['back', 'm1', 'm3', 'm4']),
    accent:       '#cc2222',
    bg:           '#0a0a0a',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'Bone, ink, and kanji. The warrior that endured the void.',
    story:        'Flesh gone, vow intact — kanji burned across the ribcage of what remained.',
  },
  {
    slug:         'the-dragon',
    name:         'THE DRAGON',
    subtitle:     'Dragon',
    tag:          'The Dragon',
    price:        38,
    designFamily: 'dragon',
    images:       teeImages('dragon-red-sun', 'black', 'THE DRAGON', ['back', 'm1', 'm3']),
    accent:       '#cc2222',
    bg:           '#1a1a1f',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'Coiled fire ascending the spine of the void.',
    story:        'Ryū. The dragon coils upward — neon scale, ink shadow, breath of cold light.',
  },
  {
    slug:         'the-fox',
    name:         'THE FOX',
    subtitle:     'Kitsune',
    tag:          'The Fox Spirit',
    price:        38,
    designFamily: 'kitsune',
    images:       teeImages('kitsune-nine-tails', 'black', 'THE FOX', ['back', 'm1', 'm3', 'm4']),
    accent:       '#cc2222',
    bg:           '#161816',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'Nine tails. One trickster. Zero apologies.',
    story:        'Kitsune. Nine-tailed silhouette drifting through the long grass between worlds.',
  },
  {
    slug:         'the-fox-white',
    name:         'THE FOX',
    subtitle:     'Kitsune',
    tag:          'The Fox Spirit',
    price:        38,
    designFamily: 'kitsune',
    images:       teeImages('kitsune-nine-tails', 'white', 'THE FOX', ['back', 'm1', 'm3', 'm4']),
    accent:       '#cc2222',
    bg:           '#1c1d1c',
    label:        'DROP 001',
    color:        'White',
    category:     'shirts',
    blurb:        'Nine tails. One trickster. Zero apologies.',
    story:        'Kitsune. Nine-tailed silhouette drifting through the long grass between worlds.',
  },
  {
    slug:         'the-ghost',
    name:         'THE GHOST',
    subtitle:     'Tengu',
    tag:          'The Crow Warrior',
    price:        38,
    designFamily: 'tengu-ghost',
    images:       teeImages('crow-warrior-ghost', 'white', 'THE GHOST', ['back', 'm1', 'm3']),
    accent:       '#cc2222',
    bg:           '#101010',
    label:        'DROP 001',
    color:        'White',
    category:     'shirts',
    blurb:        'Wings spread across the red sun.',
    story:        'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',
  },
  {
    slug:         'the-ghost-black',
    name:         'THE GHOST',
    subtitle:     'Tengu',
    tag:          'The Crow Warrior',
    price:        38,
    designFamily: 'tengu-ghost',
    images: [
      { url: '/mockups/tee-crow-warrior-ghost-back-black-model4.png', alt: 'THE GHOST — back design' },
      { url: FRONT_BLACK,                                              alt: 'THE GHOST — front view' },
    ],
    accent:       '#cc2222',
    bg:           '#0c0c0c',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'Wings spread across the red sun.',
    story:        'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',
  },
  {
    slug:         'the-sentinel',
    name:         'THE SENTINEL',
    subtitle:     'Tengu: Watch',
    tag:          'The Sentinel',
    price:        38,
    designFamily: 'tengu-watch',
    images: [
      { url: '/mockups/tee-crow-warrior-bloodmoon-dark-back-white-model4.png', alt: 'THE SENTINEL — back design' },
      { url: FRONT_WHITE,                                                       alt: 'THE SENTINEL — front view' },
    ],
    accent:       '#cc2222',
    bg:           '#15151a',
    label:        'DROP 001',
    color:        'White',
    category:     'shirts',
    blurb:        'Eyes that never blink. Wings that never tire.',
    story:        'The crow stands sentry above the pass. The mountain remembers.',
  },
  {
    slug:         'the-sentinel-black',
    name:         'THE SENTINEL',
    subtitle:     'Tengu: Watch',
    tag:          'The Sentinel',
    price:        38,
    designFamily: 'tengu-watch',
    images:       teeImages('crow-warrior-bloodmoon-dark', 'black', 'THE SENTINEL', ['back', 'm1', 'm3']),
    accent:       '#cc2222',
    bg:           '#0f0f12',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'Eyes that never blink. Wings that never tire.',
    story:        'The crow stands sentry above the pass. The mountain remembers.',
  },
  {
    slug:         'the-stormbringer',
    name:         'THE STORMBRINGER',
    subtitle:     'Tengu: Wing',
    tag:          'The Stormbringer',
    price:        38,
    designFamily: 'tengu-wing',
    images:       teeImages('crow-samurai-aerial', 'black', 'THE STORMBRINGER', ['back', 'm1', 'm3', 'm4']),
    accent:       '#cc2222',
    bg:           '#1a1a1f',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'A storm folded into feathers.',
    story:        'When his wings open, the sky turns to a colder shade of black.',
  },
  {
    slug:         'the-reaper',
    name:         'THE REAPER',
    subtitle:     'Tengu: Shadow',
    tag:          'The Reaper',
    price:        38,
    designFamily: 'tengu-shadow',
    images:       teeImages('cyberpunk-ninja-neon', 'black', 'THE REAPER', ['back', 'm1', 'm4']),
    accent:       '#cc2222',
    bg:           '#151515',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    blurb:        'The last thing the wicked ever see.',
    story:        'The shadow tengu walks where the light dares not — the final judgment.',
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

// Returns one product per design family — the "lead variant" for the listing
// card. Black is preferred when present, otherwise the first variant found.
export function getLeadVariants(products: Product[] = PRODUCTS): Product[] {
  const byFamily = new Map<string, Product>()
  for (const p of products) {
    const current = byFamily.get(p.designFamily)
    if (!current || (current.color !== 'Black' && p.color === 'Black')) {
      byFamily.set(p.designFamily, p)
    }
  }
  return [...byFamily.values()]
}

export function getFamilyVariants(family: string, products: Product[] = PRODUCTS): Product[] {
  return products.filter((p) => p.designFamily === family)
}
