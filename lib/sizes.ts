import type { Category } from './products'

/*
 * Canonical size templates per product category.
 *
 * PDPs render the full canonical run; sizes not present in the live Shopify
 * variant list (or marked unavailable) are rendered as disabled buttons so
 * customers see consistent inventory rather than gaps that look like missing
 * SKUs.
 *
 * Add a per-category override here when a new category ships with a different
 * size run (hats, socks, etc.). Categories without an override fall back to
 * APPAREL_SIZES.
 */

export const APPAREL_SIZES = ['S', 'M', 'L', 'XL', '2XL'] as const

const SIZES_BY_CATEGORY: Partial<Record<Category, readonly string[]>> = {
  shirts:           APPAREL_SIZES,
  hoodies:          APPAREL_SIZES,
  'masked-hoodies': APPAREL_SIZES,
  joggers:          APPAREL_SIZES,
}

export function getCanonicalSizes(category: Category): readonly string[] {
  return SIZES_BY_CATEGORY[category] ?? APPAREL_SIZES
}
