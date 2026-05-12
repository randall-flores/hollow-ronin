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
  slug:     string
  name:     string
  tag:      string
  price:    number
  design:   string
  images:   ProductImage[]
  accent:   string
  bg:       string
  label:    string
  color:    'Black' | 'White'
  category: Category
  blurb:    string
  story:    string
}

const FRONT_BLACK = '/mockups/tee-hollow-ronin-logo-front-black.png'
const FRONT_WHITE = '/mockups/tee-hollow-ronin-logo-front-white.png'

type ImgMod = 'back' | 'm1' | 'm3' | 'm4'

/**
 * Build the images array in the canonical order:
 *   back flat → front flat → model 1 → model 3 → model 4
 * Pass only the modifiers whose files actually exist on disk; anything
 * omitted is silently dropped from the array (no 404 references).
 */
function teeImages(
  mockup: string,
  color: 'black' | 'white',
  name:  string,
  mods:  ImgMod[],
): ProductImage[] {
  const front  = color === 'black' ? FRONT_BLACK : FRONT_WHITE
  const base   = `/mockups/tee-${mockup}-back-${color}`
  const has    = (m: ImgMod) => mods.includes(m)
  const images: ProductImage[] = []

  if (has('back')) images.push({ url: `${base}.png`,          alt: `${name} — back design` })
                   images.push({ url: front,                    alt: `${name} — front logo` })
  if (has('m1'))   images.push({ url: `${base}-model1.png`,    alt: `${name} — worn, side` })
  if (has('m3'))   images.push({ url: `${base}-model3.png`,    alt: `${name} — worn, studio` })
  if (has('m4'))   images.push({ url: `${base}-model4.png`,    alt: `${name} — worn, editorial` })

  return images
}

export const PRODUCTS: Product[] = [
  {
    slug:   'torii-ronin-tee',
    name:   'Torii Ronin Tee',
    tag:    'The Ronin',
    price:  38,
    design: '/designs/torii-ronin.png',
    images: teeImages('crow-warrior-bloodmoon-dark', 'black', 'Torii Ronin Tee', ['back', 'm1', 'm3']),
    accent: '#cc2222',
    bg:     '#0f0a0a',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'A masterless warrior beneath the gates of nothing.',
    story:  'The torii marks the threshold. The ronin chose to walk through it alone.',
  },
  {
    slug:   'torii-ronin-tee-white',
    name:   'Torii Ronin Tee',
    tag:    'The Ronin',
    price:  38,
    design: '/designs/torii-ronin.png',
    images: [
      { url: '/mockups/tee-crow-warrior-bloodmoon-dark-back-white-model4.png', alt: 'Torii Ronin Tee — worn, editorial' },
      { url: FRONT_WHITE,                                                       alt: 'Torii Ronin Tee — front logo' },
    ],
    accent: '#cc2222',
    bg:     '#15100f',
    label:  'DROP 001',
    color:  'White',
    category: 'shirts',
    blurb:  'A masterless warrior beneath the gates of nothing.',
    story:  'The torii marks the threshold. The ronin chose to walk through it alone.',
  },
  {
    slug:   'skeleton-ronin-tee',
    name:   'Skeleton Ronin Tee',
    tag:    'The Hollow Warrior',
    price:  38,
    design: '/designs/skeleton-ronin.png',
    images: teeImages('skeleton-ronin-redsun', 'black', 'Skeleton Ronin Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#cc2222',
    bg:     '#0a0a0a',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'Flesh forgotten. Vow remembered.',
    story:  'What walks past death is no longer a man — only the promise he refused to break.',
  },
  {
    slug:   'hannya-rage-tee',
    name:   'Hannya: Rage Tee',
    tag:    'Mask of Wrath',
    price:  38,
    design: '/designs/hannya-rage.png',
    images: teeImages('cyber-oni-clash', 'black', 'Hannya: Rage Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#cc2222',
    bg:     '#0f0a0a',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'The first mask. The one she could not take off.',
    story:  'Hannya born of fury — horns of grief, eyes that never close.',
  },
  {
    slug:   'hannya-sorrow-tee',
    name:   'Hannya: Sorrow Tee',
    tag:    'Mask of Mourning',
    price:  38,
    design: '/designs/hannya-sorrow.png',
    images: teeImages('oni-samurai-dark', 'black', 'Hannya: Sorrow Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#aa1f3a',
    bg:     '#0a0a10',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'Quiet rage. Louder than any scream.',
    story:  'The second mask weeps in silence — the river beneath the fire.',
  },
  {
    slug:   'hannya-vengeance-tee',
    name:   'Hannya: Vengeance Tee',
    tag:    'Mask of Reckoning',
    price:  38,
    design: '/designs/hannya-vengeance.png',
    images: teeImages('cyber-oni-full', 'black', 'Hannya: Vengeance Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#cc2222',
    bg:     '#0f0808',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'The debt is overdue.',
    story:  'The third mask remembers every name carved into the dark.',
  },
  {
    slug:   'hannya-silence-tee',
    name:   'Hannya: Silence Tee',
    tag:    'Mask of Stillness',
    price:  38,
    design: '/designs/hannya-silence.png',
    images: teeImages('skeleton-samurai-kanji', 'black', 'Hannya: Silence Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#a83244',
    bg:     '#0a0a0a',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'When the screaming stops, listen harder.',
    story:  'The fourth mask is the most dangerous — patience sharpened into a blade.',
  },
  {
    slug:   'dragon-tee',
    name:   'Dragon Tee',
    tag:    'The Dragon',
    price:  38,
    design: '/designs/dragon.png',
    images: teeImages('dragon-red-sun', 'black', 'Dragon Tee', ['back', 'm1', 'm3']),
    accent: '#cc2222',
    bg:     '#1a1a1f',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'Coiled fire ascending the spine of the void.',
    story:  'Ryū. The dragon coils upward — neon scale, ink shadow, breath of cold light.',
  },
  {
    slug:   'kitsune-tee',
    name:   'Kitsune Tee',
    tag:    'The Fox Spirit',
    price:  38,
    design: '/designs/kitsune.png',
    images: teeImages('kitsune-nine-tails', 'black', 'Kitsune Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#cc2222',
    bg:     '#161816',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'Nine tails. One trickster. Zero apologies.',
    story:  'Kitsune. Nine-tailed silhouette drifting through the long grass between worlds.',
  },
  {
    slug:   'kitsune-tee-white',
    name:   'Kitsune Tee',
    tag:    'The Fox Spirit',
    price:  38,
    design: '/designs/kitsune.png',
    images: teeImages('kitsune-nine-tails', 'white', 'Kitsune Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#cc2222',
    bg:     '#1c1d1c',
    label:  'DROP 001',
    color:  'White',
    category: 'shirts',
    blurb:  'Nine tails. One trickster. Zero apologies.',
    story:  'Kitsune. Nine-tailed silhouette drifting through the long grass between worlds.',
  },
  {
    slug:   'tengu-tee',
    name:   'Tengu Tee',
    tag:    'The Crow Warrior',
    price:  38,
    design: '/designs/tengu.png',
    images: teeImages('crow-warrior-ghost', 'white', 'Tengu Tee', ['back', 'm1', 'm3']),
    accent: '#cc2222',
    bg:     '#101010',
    label:  'DROP 001',
    color:  'White',
    category: 'shirts',
    blurb:  'Wings spread across the red sun.',
    story:  'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',
  },
  {
    slug:   'tengu-tee-black',
    name:   'Tengu Tee',
    tag:    'The Crow Warrior',
    price:  38,
    design: '/designs/tengu.png',
    images: [
      { url: '/mockups/tee-crow-warrior-ghost-back-black-model4.png', alt: 'Tengu Tee — worn, editorial' },
      { url: FRONT_BLACK,                                              alt: 'Tengu Tee — front logo' },
    ],
    accent: '#cc2222',
    bg:     '#0c0c0c',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'Wings spread across the red sun.',
    story:  'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',
  },
  {
    slug:   'tengu-watch-tee',
    name:   'Tengu: Watch Tee',
    tag:    'The Sentinel',
    price:  38,
    design: '/designs/tengu-watch.png',
    images: teeImages('crow-ronin-bloodmoon', 'white', 'Tengu: Watch Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#cc2222',
    bg:     '#15151a',
    label:  'DROP 001',
    color:  'White',
    category: 'shirts',
    blurb:  'Eyes that never blink. Wings that never tire.',
    story:  'The crow stands sentry above the pass. The mountain remembers.',
  },
  {
    slug:   'tengu-wing-tee',
    name:   'Tengu: Wing Tee',
    tag:    'The Stormbringer',
    price:  38,
    design: '/designs/tengu-wing.png',
    images: teeImages('crow-samurai-aerial', 'black', 'Tengu: Wing Tee', ['back', 'm1', 'm3', 'm4']),
    accent: '#cc2222',
    bg:     '#1a1a1f',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'A storm folded into feathers.',
    story:  'When his wings open, the sky turns to a colder shade of black.',
  },
  {
    slug:   'tengu-shadow-tee',
    name:   'Tengu: Shadow Tee',
    tag:    'The Reaper',
    price:  38,
    design: '/designs/tengu-shadow.png',
    images: teeImages('cyberpunk-ninja-neon', 'black', 'Tengu: Shadow Tee', ['back', 'm1', 'm4']),
    accent: '#cc2222',
    bg:     '#151515',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'The last thing the wicked ever see.',
    story:  'The shadow tengu walks where the light dares not — the final judgment.',
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}
