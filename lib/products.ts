export type Category =
  | 'shirts'
  | 'hoodies'
  | 'hats'
  | 'beanies'
  | 'socks'
  | 'scarfs'
  | 'masked-hoodies'

export type Clan = 'Akatsuki' | 'Yami' | 'Kage' | 'Protagonist'

export type ProductImage = {
  url: string
  alt: string
}

export type ColorOption = {
  name: string           // display label, e.g. 'Black'
  slug: 'black' | 'white'
  hex:  string
}

const BLACK_ONLY: ColorOption[] = [
  { name: 'Obsidian', slug: 'black', hex: '#0A0A0A' },
]

const BLACK_AND_BONE: ColorOption[] = [
  { name: 'Obsidian', slug: 'black', hex: '#0A0A0A' },
  { name: 'Bone',     slug: 'white', hex: '#F4EDE2' },
]

// Clan sigil — one mon per clan, shared across all clan members.
export const CLAN_SIGIL: Record<Clan, string> = {
  Akatsuki:    '/sigils/mon-akatsuki-transparent.png',
  Yami:        '/sigils/mon-yami-transparent.png',
  Kage:        '/sigils/mon-kage-transparent.png',
  Protagonist: '/sigils/mon-hollow-ronin-transparent.png',
}

export type Product = {
  slug:          string
  name:          string
  japaneseName:  string
  clan:          Clan
  title:         string
  subtitle:      string
  tagline:       string
  blurb:         string
  story:         string
  tag:           string
  price:         number
  designFamily:  string
  images:        ProductImage[]
  accent:        string
  bg:            string
  label:         string
  color:         'Black' | 'White'
  category:      Category
  colors:        ColorOption[]
}

type ImgMod = 'm1' | 'm3' | 'm4'

// Gallery contract (per product, enforced by scripts/validate-products.js):
//   [0]  back design — /mockups/{slug}/{color}/tee-{slug}-back-{color}.png
//   [1]  clan sigil  — /sigils/mon-{clan-slug}-transparent.png (shared per clan)
//   [2+] worn model shots — /mockups/{slug}/{color}/tee-{slug}-back-{color}-model{N}.png
function teeImages(
  slug:  string,
  color: 'black' | 'white',
  name:  string,
  clan:  Clan,
  mods:  ImgMod[],
): ProductImage[] {
  const base  = `/mockups/${slug}/${color}/tee-${slug}-back-${color}`
  const sigil = CLAN_SIGIL[clan]
  const images: ProductImage[] = [
    { url: `${base}.png`, alt: `${name} — back design` },
    { url: sigil,         alt: `${name} — clan sigil` },
  ]
  if (mods.includes('m1')) images.push({ url: `${base}-model1.png`, alt: `${name} — worn, side` })
  if (mods.includes('m3')) images.push({ url: `${base}-model3.png`, alt: `${name} — worn, studio` })
  if (mods.includes('m4')) images.push({ url: `${base}-model4.png`, alt: `${name} — worn, editorial` })
  return images
}

export const PRODUCTS: Product[] = [
  // 00 — THE NAMELESS (Hollow Ronin) — protagonist, walks between clans.
  {
    slug:         'hollow-ronin',
    name:         'HOLLOW RONIN',
    japaneseName: 'Mon no Mukō',
    clan:         'Protagonist',
    title:        'Beyond the Gate',
    subtitle:     'Mon no Mukō · The Nameless',
    tagline:      'The torii marks the threshold. The ronin chose to walk through it alone.',
    blurb:        'No master. No clan. No name remembered.',
    story:        'He walked through the torii alone — the gate between the living and the forgotten, the threshold no one returns from. He crossed it with no master to mourn and no name worth speaking, and what came back was not a man, but a vow that refused to die. He walks among the thirteen to remember what the world made them forget.',
    tag:          'The Nameless',
    price:        38,
    designFamily: 'hollow-ronin',
    images:       teeImages('hollow-ronin', 'black', 'HOLLOW RONIN', 'Protagonist', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_AND_BONE,
  },

  // 01 — AKATSUKI-GUMI
  {
    slug:         'ryujin-dragon-vow',
    name:         'RYŪJIN',
    japaneseName: 'Ryūjin',
    clan:         'Akatsuki',
    title:        'The Dragon Vow',
    subtitle:     'Akatsuki-Gumi · The Dragon Vow',
    tagline:      'The dragon coils upward — neon scale, ink shadow, breath of cold light.',
    blurb:        'One body. Two vows. No master.',
    story:        'First of the Crimson Clan. His blood ran with the river kami, and when his master fell, the dragon refused to leave him. Now they share one body, two vows, and no master worth serving.',
    tag:          'The Dragon Vow',
    price:        38,
    designFamily: 'ryujin-dragon-vow',
    images:       teeImages('ryujin-dragon-vow', 'black', 'RYŪJIN', 'Akatsuki', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
  {
    slug:         'hone-no-chikai-bone-vow',
    name:         'HONE NO CHIKAI',
    japaneseName: 'Hone no Chikai',
    clan:         'Kage',
    title:        'The Bone Vow',
    subtitle:     'Kage-Gumi · The Bone Vow',
    tagline:      'What walks past death is no longer a man — only the promise he refused to break.',
    blurb:        'Died once. Stood up anyway.',
    story:        'Died at Sekigahara. Stood up anyway. The vow was louder than the silence, and the silence has been getting quieter ever since.',
    tag:          'The Bone Vow',
    price:        38,
    designFamily: 'hone-no-chikai-bone-vow',
    images:       teeImages('hone-no-chikai-bone-vow', 'black', 'HONE NO CHIKAI', 'Kage', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
  {
    slug:         'karada-nashi-hollow-warrior',
    name:         'KARADA-NASHI',
    japaneseName: 'Karada-Nashi',
    clan:         'Kage',
    title:        'The Hollow Warrior',
    subtitle:     'Kage-Gumi · The Hollow Warrior',
    tagline:      'Flesh gone, vow intact — kanji burned across the ribcage of what remained.',
    blurb:        'Flesh forgot. Bone did not.',
    story:        'He tattooed his oath into bone so even the worms would know who he served. The flesh forgot. The bones did not.',
    tag:          'The Hollow Warrior',
    price:        38,
    designFamily: 'karada-nashi-hollow-warrior',
    images:       teeImages('karada-nashi-hollow-warrior', 'black', 'KARADA-NASHI', 'Kage', ['m3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
  {
    slug:         'arashi-maru-stormchild',
    name:         'ARASHI-MARU',
    japaneseName: 'Arashi-Maru',
    clan:         'Akatsuki',
    title:        'The Stormchild',
    subtitle:     'Akatsuki-Gumi · The Stormchild',
    tagline:      'Born in the eye of the storm, named by the thunder that followed.',
    blurb:        'Thunder named him. Thunder never left.',
    story:        'The youngest of the Crimson Clan. They say he was born during a typhoon that drowned three villages — and that the thunder that named him has never stopped following.',
    tag:          'The Stormchild',
    price:        38,
    designFamily: 'arashi-maru-stormchild',
    images:       teeImages('arashi-maru-stormchild', 'black', 'ARASHI-MARU', 'Akatsuki', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_AND_BONE,
  },

  // 05 — YAMI-GUMI
  {
    slug:         'akuma-no-ikari-mask-of-wrath',
    name:         'AKUMA NO IKARI',
    japaneseName: 'Akuma no Ikari',
    clan:         'Yami',
    title:        'Mask of Wrath',
    subtitle:     'Yami-Gumi · Mask of Wrath',
    tagline:      'Hannya born of fury — horns of grief, eyes that never close.',
    blurb:        'Rage made flesh — twice.',
    story:        'The first mask of the Hannya Court. Rage made flesh, then made flesh again. She does not sleep. She does not need to.',
    tag:          'Mask of Wrath',
    price:        38,
    designFamily: 'akuma-no-ikari-mask-of-wrath',
    images:       teeImages('akuma-no-ikari-mask-of-wrath', 'black', 'AKUMA NO IKARI', 'Yami', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
  {
    slug:         'namida-no-oni-mask-of-mourning',
    name:         'NAMIDA NO ONI',
    japaneseName: 'Namida no Oni',
    clan:         'Yami',
    title:        'Mask of Mourning',
    subtitle:     'Yami-Gumi · Mask of Mourning',
    tagline:      'The second mask weeps in silence — the river beneath the fire.',
    blurb:        'Sorrow that outlasted its cause.',
    story:        'Sorrow that outlasted the one who caused it. He carries the tears of every name his clan forgot to speak.',
    tag:          'Mask of Mourning',
    price:        38,
    designFamily: 'namida-no-oni-mask-of-mourning',
    images:       teeImages('namida-no-oni-mask-of-mourning', 'black', 'NAMIDA NO ONI', 'Yami', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
  {
    slug:         'saigo-no-sabaki-mask-of-reckoning',
    name:         'SAIGO NO SABAKI',
    japaneseName: 'Saigo no Sabaki',
    clan:         'Yami',
    title:        'Mask of Reckoning',
    subtitle:     'Yami-Gumi · Mask of Reckoning',
    tagline:      'The third mask remembers every name carved into the dark.',
    blurb:        'The ledger is overdue.',
    story:        'Final judgment. Keeps the ledger of debts unpaid. When the third mask arrives, the asking is over.',
    tag:          'Mask of Reckoning',
    price:        38,
    designFamily: 'saigo-no-sabaki-mask-of-reckoning',
    images:       teeImages('saigo-no-sabaki-mask-of-reckoning', 'black', 'SAIGO NO SABAKI', 'Yami', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
  {
    slug:         'mu-no-kamen-mask-of-stillness',
    name:         'MU NO KAMEN',
    japaneseName: 'Mu no Kamen',
    clan:         'Yami',
    title:        'Mask of Stillness',
    subtitle:     'Yami-Gumi · Mask of Stillness',
    tagline:      'The fourth mask is the most dangerous — patience sharpened into a blade.',
    blurb:        'The strike you never see.',
    story:        'The mask that does not move. The strike you never see. Of all four, fear her last — but fear her most.',
    tag:          'Mask of Stillness',
    price:        38,
    designFamily: 'mu-no-kamen-mask-of-stillness',
    images:       teeImages('mu-no-kamen-mask-of-stillness', 'black', 'MU NO KAMEN', 'Yami', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },

  // 09 — KAGE-GUMI
  {
    slug:         'kurokitsune-vow-keeper',
    name:         'KUROKITSUNE',
    japaneseName: 'Kurokitsune',
    clan:         'Kage',
    title:        'The Vow-Keeper',
    subtitle:     'Kage-Gumi · The Vow-Keeper',
    tagline:      'Nine tails, nine lifetimes, one promise unkept.',
    blurb:        'A thousand-year vow, finally claimed.',
    story:        'Nine-tailed fox spirit. She waited a thousand years at the shrine fires for a master who would never return. The Hollow took her vow when no one else would honor it.',
    tag:          'The Vow-Keeper',
    price:        38,
    designFamily: 'kurokitsune-vow-keeper',
    images:       teeImages('kurokitsune-vow-keeper', 'black', 'KUROKITSUNE', 'Kage', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
  {
    slug:         'yurei-ghost',
    name:         'YŪREI',
    japaneseName: 'Yūrei',
    clan:         'Kage',
    title:        'The Ghost',
    subtitle:     'Kage-Gumi · The Ghost',
    tagline:      'The ghost does not haunt — it remembers, and that is worse.',
    blurb:        'Not haunting. Remembering.',
    story:        'Crow-spirit of the second clan. Walks where the living forgot to. The dead recognize him. The living try not to.',
    tag:          'The Ghost',
    price:        38,
    designFamily: 'yurei-ghost',
    images:       teeImages('yurei-ghost', 'black', 'YŪREI', 'Kage', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
  {
    slug:         'karasu-tengu-sentinel',
    name:         'KARASU-TENGU',
    japaneseName: 'Karasu-Tengu',
    clan:         'Kage',
    title:        'The Sentinel',
    subtitle:     'Kage-Gumi · The Sentinel',
    tagline:      'Wings of the watcher — sees every blade before it falls.',
    blurb:        'He watches when the Hollow walks alone.',
    story:        'Tengu of the crow mountain. Sentinel of those the world abandoned. When the Hollow Ronin walks alone, he is not alone — Karasu watches from above.',
    tag:          'The Sentinel',
    price:        38,
    designFamily: 'karasu-tengu-sentinel',
    images:       teeImages('karasu-tengu-sentinel', 'black', 'KARASU-TENGU', 'Kage', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_AND_BONE,
  },
  {
    slug:         'shinigami-reaper',
    name:         'SHINIGAMI',
    japaneseName: 'Shinigami',
    clan:         'Kage',
    title:        'The Reaper',
    subtitle:     'Kage-Gumi · The Reaper',
    tagline:      'Death wore neon the night the city forgot how to pray.',
    blurb:        'Death wore neon.',
    story:        'The last one. The one who collects the others when their vow is done. He does not arrive in shadow — he arrives in the only light left.',
    tag:          'The Reaper',
    price:        38,
    designFamily: 'shinigami-reaper',
    images:       teeImages('shinigami-reaper', 'black', 'SHINIGAMI', 'Kage', ['m1', 'm3', 'm4']),
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    color:        'Black',
    category:     'shirts',
    colors:       BLACK_ONLY,
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

// Returns one product per design family — the "lead variant" for the listing
// card. With Drop 001 = 13 unique characters, designFamily == slug, so this
// returns every product. Kept for forward-compat with color variants.
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

export function getProductsByClan(clan: Clan, products: Product[] = PRODUCTS): Product[] {
  return products.filter((p) => p.clan === clan)
}
