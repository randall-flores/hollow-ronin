/*
 * Editorial / lore content for Hollow Ronin products.
 *
 * Source of truth for: story, blurb, clan, accent, sigil — everything that
 * is *not* product/commerce data (price, handle, variants — those live in
 * Shopify and come through `lib/shopify-products.ts`).
 *
 * Joined to Shopify products via the `custom.design_family` metafield, which
 * matches the keys of EDITORIAL. See `lib/product-merge.ts`.
 */

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

export type Editorial = {
  designFamily: string
  name:         string   // display name, often uppercase
  japaneseName: string
  kanji:        string   // native CJK glyphs for card eyebrow
  clan:         Clan
  title:        string
  subtitle:     string
  tagline:      string
  blurb:        string
  story:        string
  tag:          string
  accent:       string
  bg:           string
  label:        string
  category:     Category
  imageFolder:  string   // folder name under /public/mockups/ — decoupled from Shopify handle
}

// Clan sigil — one mon per clan, shared across all clan members.
export const CLAN_SIGIL: Record<Clan, string> = {
  Akatsuki:    '/sigils/mon-akatsuki-transparent.png',
  Yami:        '/sigils/mon-yami-transparent.png',
  Kage:        '/sigils/mon-kage-transparent.png',
  Protagonist: '/sigils/mon-hollow-ronin-transparent.png',
}

export const EDITORIAL: Record<string, Editorial> = {
  // 00 — THE NAMELESS — protagonist, split across two halves of the vow.

  // HOLLOW (Black) — what came back through the gate.
  'hollow': {
    designFamily: 'hollow',
    name:         'HOLLOW',
    japaneseName: 'Hollow',
    kanji:        '虚',
    clan:         'Protagonist',
    title:        'The Vow That Refused',
    subtitle:     'Mon no Mukō · The Hollow',
    tagline:      'What came back was not a man, but a vow that refused to die.',
    blurb:        'Empty is not nothing. Empty is what waits.',
    story:        'What came back was not a man, but a vow that refused to die. He walks among the thirteen to remember what the world made them forget. Empty is not the same as nothing — empty is the space the next cut lands.',
    tag:          'The Hollow',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'hollow',
  },

  // RONIN (White) — the one who walked through alone.
  'ronin': {
    designFamily: 'ronin',
    name:         'RONIN',
    japaneseName: 'Rōnin',
    kanji:        '浪人',
    clan:         'Protagonist',
    title:        'Masterless',
    subtitle:     'Mon no Mukō · The Ronin',
    tagline:      'He walked through the torii alone — without flag, without lord, without name.',
    blurb:        'No master. No banner. No mercy.',
    story:        'He walked through the torii alone — the gate between the living and the forgotten, the threshold no one returns from. He crossed it with no master to mourn and no name worth speaking. The white is the silence before the cut.',
    tag:          'The Ronin',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'ronin',
  },

  // 01 — AKATSUKI-GUMI
  'ryujin-dragon-vow': {
    designFamily: 'ryujin-dragon-vow',
    name:         'RYŪJIN',
    japaneseName: 'Ryūjin',
    kanji:        '龍神',
    clan:         'Akatsuki',
    title:        'The Dragon Vow',
    subtitle:     'Akatsuki-Gumi · The Dragon Vow',
    tagline:      'The dragon coils upward — neon scale, ink shadow, breath of cold light.',
    blurb:        'One body. Two vows. No master.',
    story:        'First of the Crimson Clan. His blood ran with the river kami, and when his master fell, the dragon refused to leave him. Now they share one body, two vows, and no master worth serving.',
    tag:          'The Dragon Vow',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'ryujin-dragon-vow',
  },
  'hone-no-chikai-bone-vow': {
    designFamily: 'hone-no-chikai-bone-vow',
    name:         'HONE NO CHIKAI',
    japaneseName: 'Hone no Chikai',
    kanji:        '骨ノ誓',
    clan:         'Kage',
    title:        'The Bone Vow',
    subtitle:     'Kage-Gumi · The Bone Vow',
    tagline:      'What walks past death is no longer a man — only the promise he refused to break.',
    blurb:        'Died once. Stood up anyway.',
    story:        'Died at Sekigahara. Stood up anyway. The vow was louder than the silence, and the silence has been getting quieter ever since.',
    tag:          'The Bone Vow',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'hone-no-chikai-bone-vow',
  },
  'karada-nashi-hollow-warrior': {
    designFamily: 'karada-nashi-hollow-warrior',
    name:         'KARADA-NASHI',
    japaneseName: 'Karada-Nashi',
    kanji:        '体無',
    clan:         'Kage',
    title:        'The Hollow Warrior',
    subtitle:     'Kage-Gumi · The Hollow Warrior',
    tagline:      'Flesh gone, vow intact — kanji burned across the ribcage of what remained.',
    blurb:        'Flesh forgot. Bone did not.',
    story:        'He tattooed his oath into bone so even the worms would know who he served. The flesh forgot. The bones did not.',
    tag:          'The Hollow Warrior',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'karada-nashi-hollow-warrior',
  },
  'arashi-maru-stormchild': {
    designFamily: 'arashi-maru-stormchild',
    name:         'ARASHI-MARU',
    japaneseName: 'Arashi-Maru',
    kanji:        '嵐丸',
    clan:         'Akatsuki',
    title:        'The Stormchild',
    subtitle:     'Akatsuki-Gumi · The Stormchild',
    tagline:      'Born in the eye of the storm, named by the thunder that followed.',
    blurb:        'Thunder named him. Thunder never left.',
    story:        'The youngest of the Crimson Clan. They say he was born during a typhoon that drowned three villages — and that the thunder that named him has never stopped following.',
    tag:          'The Stormchild',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'arashi-maru-stormchild',
  },

  // 05 — YAMI-GUMI
  'akuma-no-ikari-mask-of-wrath': {
    designFamily: 'akuma-no-ikari-mask-of-wrath',
    name:         'AKUMA NO IKARI',
    japaneseName: 'Akuma no Ikari',
    kanji:        '悪魔ノ怒',
    clan:         'Yami',
    title:        'Mask of Wrath',
    subtitle:     'Yami-Gumi · Mask of Wrath',
    tagline:      'Hannya born of fury — horns of grief, eyes that never close.',
    blurb:        'Rage made flesh — twice.',
    story:        'The first mask of the Hannya Court. Rage made flesh, then made flesh again. She does not sleep. She does not need to.',
    tag:          'Mask of Wrath',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'akuma-no-ikari-mask-of-wrath',
  },
  'namida-no-oni-mask-of-mourning': {
    designFamily: 'namida-no-oni-mask-of-mourning',
    name:         'NAMIDA NO ONI',
    japaneseName: 'Namida no Oni',
    kanji:        '涙ノ鬼',
    clan:         'Yami',
    title:        'Mask of Mourning',
    subtitle:     'Yami-Gumi · Mask of Mourning',
    tagline:      'The second mask weeps in silence — the river beneath the fire.',
    blurb:        'Sorrow that outlasted its cause.',
    story:        'Sorrow that outlasted the one who caused it. He carries the tears of every name his clan forgot to speak.',
    tag:          'Mask of Mourning',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'namida-no-oni-mask-of-mourning',
  },
  'saigo-no-sabaki-mask-of-reckoning': {
    designFamily: 'saigo-no-sabaki-mask-of-reckoning',
    name:         'SAIGO NO SABAKI',
    japaneseName: 'Saigo no Sabaki',
    kanji:        '最後ノ裁',
    clan:         'Yami',
    title:        'Mask of Reckoning',
    subtitle:     'Yami-Gumi · Mask of Reckoning',
    tagline:      'The third mask remembers every name carved into the dark.',
    blurb:        'The ledger is overdue.',
    story:        'Final judgment. Keeps the ledger of debts unpaid. When the third mask arrives, the asking is over.',
    tag:          'Mask of Reckoning',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'saigo-no-sabaki-mask-of-reckoning',
  },
  'mu-no-kamen-mask-of-stillness': {
    designFamily: 'mu-no-kamen-mask-of-stillness',
    name:         'MU NO KAMEN',
    japaneseName: 'Mu no Kamen',
    kanji:        '無ノ仮面',
    clan:         'Yami',
    title:        'Mask of Stillness',
    subtitle:     'Yami-Gumi · Mask of Stillness',
    tagline:      'The fourth mask is the most dangerous — patience sharpened into a blade.',
    blurb:        'The strike you never see.',
    story:        'The mask that does not move. The strike you never see. Of all four, fear her last — but fear her most.',
    tag:          'Mask of Stillness',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'mu-no-kamen-mask-of-stillness',
  },

  // 09 — KAGE-GUMI
  'kurokitsune-vow-keeper': {
    designFamily: 'kurokitsune-vow-keeper',
    name:         'KUROKITSUNE',
    japaneseName: 'Kurokitsune',
    kanji:        '黒狐',
    clan:         'Kage',
    title:        'The Vow-Keeper',
    subtitle:     'Kage-Gumi · The Vow-Keeper',
    tagline:      'Nine tails, nine lifetimes, one promise unkept.',
    blurb:        'A thousand-year vow, finally claimed.',
    story:        'Nine-tailed fox spirit. She waited a thousand years at the shrine fires for a master who would never return. The Hollow took her vow when no one else would honor it.',
    tag:          'The Vow-Keeper',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'kurokitsune-vow-keeper',
  },
  'yurei-ghost': {
    designFamily: 'yurei-ghost',
    name:         'YŪREI',
    japaneseName: 'Yūrei',
    kanji:        '幽霊',
    clan:         'Kage',
    title:        'The Ghost',
    subtitle:     'Kage-Gumi · The Ghost',
    tagline:      'The ghost does not haunt — it remembers, and that is worse.',
    blurb:        'Not haunting. Remembering.',
    story:        'A vow that outlived its body. He walks where the living forgot to look. The dead recognize him — the living try not to.',
    tag:          'The Ghost',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'yurei-ghost',
  },
  'karasu-tengu-sentinel': {
    designFamily: 'karasu-tengu-sentinel',
    name:         'KARASU-TENGU',
    japaneseName: 'Karasu-Tengu',
    kanji:        '烏天狗',
    clan:         'Kage',
    title:        'The Sentinel',
    subtitle:     'Kage-Gumi · The Sentinel',
    tagline:      'Wings of the watcher — sees every blade before it falls.',
    blurb:        'He watches when the Hollow walks alone.',
    story:        'Tengu of the crow mountain. Sentinel of those the world abandoned. When the Hollow Ronin walks alone, he is not alone — Karasu watches from above.',
    tag:          'The Sentinel',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'karasu-tengu-sentinel',
  },
  'shinigami-reaper': {
    designFamily: 'shinigami-reaper',
    name:         'SHINIGAMI',
    japaneseName: 'Shinigami',
    kanji:        '死神',
    clan:         'Kage',
    title:        'The Reaper',
    subtitle:     'Kage-Gumi · The Reaper',
    tagline:      'Death wore neon the night the city forgot how to pray.',
    blurb:        'Death wore neon.',
    story:        'The last one. The one who collects the others when their vow is done. He does not arrive in shadow — he arrives in the only light left.',
    tag:          'The Reaper',
    accent:       '#A1182A',
    bg:           '#0A0A0A',
    label:        'DROP 001',
    category:     'shirts',
    imageFolder:  'shinigami-reaper',
  },
}

export function getEditorial(designFamily: string): Editorial | undefined {
  return EDITORIAL[designFamily]
}

export function listEditorial(): Editorial[] {
  return Object.values(EDITORIAL)
}
