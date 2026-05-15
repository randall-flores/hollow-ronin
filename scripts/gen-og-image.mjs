// Generate /public/og/og-default.png — 1200x630 OG card.
// Black bg, gold Hollow Ronin emblem centered, "HOLLOW RONIN" wordmark
// below in bone, small red "浪人" above. Run with: node scripts/gen-og-image.mjs

import sharp from 'sharp'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = resolve(__dirname, '..')

const W      = 1200
const H      = 630
const GOLD   = '#c9a961'
const BONE   = '#f0ede6'
const RED    = '#a1182a'
const BG     = '#0a0a0a'

const emblemSvg = await readFile(resolve(ROOT, 'public/logos/hollow-ronin-emblem.svg'), 'utf8')
const emblemInner = emblemSvg.replace(/<\?xml[^?]*\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')

const EMBLEM_SIZE = 280
const emblemX = (W - EMBLEM_SIZE) / 2
const emblemY = 110

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- subtle gold radial glow behind emblem -->
  <defs>
    <radialGradient id="glow" cx="50%" cy="42%" r="40%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- gold hairlines top/bottom -->
  <line x1="60" y1="60" x2="${W - 60}" y2="60" stroke="${GOLD}" stroke-opacity="0.40" stroke-width="1"/>
  <line x1="60" y1="${H - 60}" x2="${W - 60}" y2="${H - 60}" stroke="${GOLD}" stroke-opacity="0.40" stroke-width="1"/>

  <!-- red kanji 浪人 above emblem -->
  <text x="${W / 2}" y="90"
        font-family="'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif"
        font-size="20" font-weight="700"
        fill="${RED}" text-anchor="middle" letter-spacing="14">
    浪人
  </text>

  <!-- emblem (gold) -->
  <g transform="translate(${emblemX} ${emblemY}) scale(${EMBLEM_SIZE / 512})">
    ${emblemInner}
  </g>

  <!-- HOLLOW RONIN wordmark in bone -->
  <text x="${W / 2}" y="490"
        font-family="'Anton','Bebas Neue','Impact',sans-serif"
        font-size="72" font-weight="400"
        fill="${BONE}" text-anchor="middle" letter-spacing="14">
    HOLLOW RONIN
  </text>

  <!-- gold tagline rule -->
  <line x1="${W / 2 - 90}" y1="525" x2="${W / 2 + 90}" y2="525"
        stroke="${GOLD}" stroke-opacity="0.6" stroke-width="1"/>

  <!-- subtitle gold -->
  <text x="${W / 2}" y="560"
        font-family="'Space Mono','Courier New',monospace"
        font-size="14" fill="${GOLD}" fill-opacity="0.85" text-anchor="middle" letter-spacing="8">
    CYBER-SAMURAI STREETWEAR · DROP 001
  </text>
</svg>
`.trim()

const out = resolve(ROOT, 'public/og/og-default.png')
await mkdir(dirname(out), { recursive: true })
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out)

const stat = await sharp(out).metadata()
console.log(`Wrote ${out}`)
console.log(`Size: ${stat.width}x${stat.height} · ${stat.format}`)
