export type Category =
  | 'shirts'
  | 'hoodies'
  | 'hats'
  | 'beanies'
  | 'socks'
  | 'scarfs'
  | 'masked-hoodies'

export type Product = {
  slug:      string
  name:      string
  tag:       string
  price:     number
  design:    string
  accent:    string
  bg:        string
  label:     string
  color:     'Black' | 'White'
  category:  Category
  blurb:     string
  story:     string
}

export const PRODUCTS: Product[] = [
  {
    slug:   'torii-ronin-tee',
    name:   'Torii Ronin Tee',
    tag:    'The Ronin',
    price:  38,
    design: '/designs/torii-ronin.png',
    accent: '#cc2222',
    bg:     '#0f0a0a',
    label:  'DROP 001',
    color:  'Black',
    category: 'shirts',
    blurb:  'A masterless warrior beneath the gates of nothing.',
    story:  'The torii marks the threshold. The ronin chose to walk through it alone.',
  },
  {
    slug:   'dragon-tee',
    name:   'Dragon Tee',
    tag:    'The Dragon',
    price:  38,
    design: '/designs/dragon.png',
    accent: '#cc2222',
    bg:     '#0a0a0f',
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
    accent: '#cc2222',
    bg:     '#0a0f0a',
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
    accent: '#cc2222',
    bg:     '#101010',
    label:  'DROP 001',
    color:  'White',
    category: 'shirts',
    blurb:  'Wings spread across the red sun.',
    story:  'Tengu. Crow-warrior of the mountain — black feathers, longer memory.',
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}
