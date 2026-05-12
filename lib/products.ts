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

export const PRODUCTS: Product[] = [
  {
    slug:   'torii-ronin-tee',
    name:   'Torii Ronin Tee',
    tag:    'The Ronin',
    price:  38,
    design: '/designs/torii-ronin.png',
    images: [
      { url: '/mockups/tee-crow-warrior-bloodmoon-dark-back-black.png', alt: 'Torii Ronin Tee — back design' },
      { url: FRONT_BLACK,                                                alt: 'Torii Ronin Tee — front' },
    ],
    accent: '#cc2222',
    bg:     '#0f0a0a',
    label:  'DROP 001',
    color:  'Black',
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
    images: [
      { url: '/mockups/tee-skeleton-ronin-redsun-back-black.png', alt: 'Skeleton Ronin Tee — back design' },
      { url: FRONT_BLACK,                                          alt: 'Skeleton Ronin Tee — front' },
    ],
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
    images: [
      { url: '/mockups/tee-cyber-oni-clash-back-black.png', alt: 'Hannya: Rage Tee — back design' },
      { url: FRONT_BLACK,                                    alt: 'Hannya: Rage Tee — front' },
    ],
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
    images: [
      { url: '/mockups/tee-oni-samurai-dark-back-black.png', alt: 'Hannya: Sorrow Tee — back design' },
      { url: FRONT_BLACK,                                     alt: 'Hannya: Sorrow Tee — front' },
    ],
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
    images: [
      { url: '/mockups/tee-cyber-oni-full-back-black.png', alt: 'Hannya: Vengeance Tee — back design' },
      { url: FRONT_BLACK,                                   alt: 'Hannya: Vengeance Tee — front' },
    ],
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
    images: [
      { url: '/mockups/tee-skeleton-samurai-kanji-back-black.png', alt: 'Hannya: Silence Tee — back design' },
      { url: FRONT_BLACK,                                           alt: 'Hannya: Silence Tee — front' },
    ],
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
    images: [
      { url: '/mockups/tee-dragon-red-sun-back-black.png', alt: 'Dragon Tee — back design' },
      { url: FRONT_BLACK,                                   alt: 'Dragon Tee — front' },
    ],
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
    images: [
      { url: '/mockups/tee-kitsune-nine-tails-back-black.png', alt: 'Kitsune Tee — back design' },
      { url: FRONT_BLACK,                                       alt: 'Kitsune Tee — front' },
    ],
    accent: '#cc2222',
    bg:     '#161816',
    label:  'DROP 001',
    color:  'Black',
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
    images: [
      { url: '/mockups/tee-crow-warrior-ghost-back-white.png', alt: 'Tengu Tee — back design' },
      { url: FRONT_WHITE,                                       alt: 'Tengu Tee — front' },
    ],
    accent: '#cc2222',
    bg:     '#101010',
    label:  'DROP 001',
    color:  'White',
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
    images: [
      { url: '/mockups/tee-crow-ronin-bloodmoon-back-white.png', alt: 'Tengu: Watch Tee — back design' },
      { url: FRONT_WHITE,                                         alt: 'Tengu: Watch Tee — front' },
    ],
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
    images: [
      { url: '/mockups/tee-crow-samurai-aerial-back-black.png', alt: 'Tengu: Wing Tee — back design' },
      { url: FRONT_BLACK,                                        alt: 'Tengu: Wing Tee — front' },
    ],
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
    images: [
      { url: '/mockups/tee-cyberpunk-ninja-neon-back-black.png', alt: 'Tengu: Shadow Tee — back design' },
      { url: FRONT_BLACK,                                         alt: 'Tengu: Shadow Tee — front' },
    ],
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
