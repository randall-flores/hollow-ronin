/*
 * Source of truth for color slugs across the storefront.
 *
 * Previously the color list was duplicated across:
 *   - lib/shopify-products.ts   (ColorSlug union + normalizeColor)
 *   - lib/card-images.ts        (colorToFolder)
 *   - components/ProductGridCard.jsx + components/three/ProductPage.tsx (SWATCH_HEX)
 *
 * Adding Drop 004 mineral wash colors required touching all four files.
 * Consolidating here keeps the next color drop to a single edit.
 *
 * NOTE on palette guardrails: purple was previously gated to the Yami clan.
 * As of Drop 004 (Weathered Exile, May 2026), purple is permitted across all
 * clans when stock availability dictates. The palette is no longer clan-locked.
 */

export type ColorSlug =
  | 'BLACK'
  | 'WHITE'
  | 'PEPPER'
  | 'ESPRESSO'
  | 'IVORY'
  | 'MINERAL-GREY'
  | 'MINERAL-BLACK'
  | 'MINERAL-NAVY'
  | 'MINERAL-PURPLE'

export type ColorFolder =
  | 'black'
  | 'white'
  | 'pepper'
  | 'espresso'
  | 'ivory'
  | 'mineral-grey'
  | 'mineral-black'
  | 'mineral-navy'
  | 'mineral-purple'

export const SWATCH_HEX: Record<ColorSlug, string> = {
  'BLACK':          '#1a1a1a',
  'WHITE':          '#e8e2d6',
  'PEPPER':         '#4a4a4a',
  'ESPRESSO':       '#3d2817',
  'IVORY':          '#f4ede2',
  'MINERAL-GREY':   '#8A8782',
  'MINERAL-BLACK':  '#0F0F0F',
  'MINERAL-NAVY':   '#1C2338',
  'MINERAL-PURPLE': '#4B3A5C',
}

const FOLDER_MAP: Record<ColorSlug, ColorFolder> = {
  'BLACK':          'black',
  'WHITE':          'white',
  'PEPPER':         'pepper',
  'ESPRESSO':       'espresso',
  'IVORY':          'ivory',
  'MINERAL-GREY':   'mineral-grey',
  'MINERAL-BLACK':  'mineral-black',
  'MINERAL-NAVY':   'mineral-navy',
  'MINERAL-PURPLE': 'mineral-purple',
}

export function colorToFolder(c: ColorSlug): ColorFolder {
  return FOLDER_MAP[c] ?? 'black'
}

/**
 * Normalize a raw color string from Shopify (any case, hyphen/underscore/space)
 * to the canonical ColorSlug. Unrecognized values fall back to 'BLACK'.
 */
export function normalizeColor(raw: string | null | undefined): ColorSlug {
  if (!raw) return 'BLACK'
  const canon = raw.trim().toUpperCase().replace(/[_\s]+/g, '-')
  switch (canon) {
    case 'WHITE':          return 'WHITE'
    case 'PEPPER':         return 'PEPPER'
    case 'ESPRESSO':       return 'ESPRESSO'
    case 'IVORY':          return 'IVORY'
    case 'MINERAL-GREY':   return 'MINERAL-GREY'
    case 'MINERAL-BLACK':  return 'MINERAL-BLACK'
    case 'MINERAL-NAVY':   return 'MINERAL-NAVY'
    case 'MINERAL-PURPLE': return 'MINERAL-PURPLE'
    default:               return 'BLACK'
  }
}

/** Slug used in synthetic per-color handles (e.g. mon-no-muko-tee-mineral-grey). */
export function colorToHandleSlug(c: ColorSlug): string {
  return c.toLowerCase()
}

/** Human-readable display name for swatch labels and color-row chips. */
export function colorLabel(c: ColorSlug): string {
  switch (c) {
    case 'BLACK':          return 'Black'
    case 'WHITE':          return 'White'
    case 'PEPPER':         return 'Pepper'
    case 'ESPRESSO':       return 'Espresso'
    case 'IVORY':          return 'Ivory'
    case 'MINERAL-GREY':   return 'Mineral Grey'
    case 'MINERAL-BLACK':  return 'Mineral Black'
    case 'MINERAL-NAVY':   return 'Mineral Navy'
    case 'MINERAL-PURPLE': return 'Mineral Purple'
  }
}
