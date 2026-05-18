/*
 * Merge layer — joins live Shopify products to local editorial content.
 *
 * Public API:
 *   - getAllFamilies()                — every design family with all color variants
 *   - getFamiliesByCategory(category) — filtered subset
 *   - getFamilyByHandle(handle)       — find the family that contains the given handle, plus active variant
 *   - getAllHandles()                 — every variant handle (including synthetic per-color handles)
 *
 * "Family" = one editorial entry. May have 1 or more Shopify products (color variants).
 */

import {
  getAllShopifyProducts,
  type ShopifyProduct,
} from './shopify-products'
import { type ColorSlug } from './colors'
import {
  EDITORIAL,
  type Editorial,
  type Category,
} from './products'

export type EnrichedVariant = {
  handle:        string
  productId:     string
  title:         string
  color:         ColorSlug
  price:         number
  currencyCode:  string
  featuredImage: { url: string; alt: string } | null
  sizes:         Array<{ id: string; size: string; available: boolean; price: number }>
}

export type EnrichedFamily = Editorial & {
  lead:     EnrichedVariant      // black if both colors exist, otherwise the only variant
  variants: EnrichedVariant[]    // all Shopify products for this design family
}

function toVariant(p: ShopifyProduct): EnrichedVariant {
  return {
    handle:        p.handle,
    productId:     p.productId,
    title:         p.title,
    color:         p.color,
    price:         p.price,
    currencyCode:  p.currencyCode,
    featuredImage: p.featuredImage,
    sizes:         p.variants,
  }
}

function pickLead(variants: EnrichedVariant[], leadColor?: ColorSlug): EnrichedVariant {
  if (leadColor) {
    const override = variants.find((v) => v.color === leadColor)
    if (override) return override
  }
  const priority: ColorSlug[] = [
    'BLACK',
    'MINERAL-BLACK',
    'PEPPER',
    'MINERAL-NAVY',
    'MINERAL-GREY',
    'ESPRESSO',
    'MINERAL-PURPLE',
    'IVORY',
    'WHITE',
  ]
  for (const c of priority) {
    const found = variants.find((v) => v.color === c)
    if (found) return found
  }
  return variants[0]
}

function synthesizePlaceholder(editorial: Editorial): EnrichedFamily {
  const variant: EnrichedVariant = {
    handle:        editorial.designFamily,
    productId:     `placeholder-${editorial.designFamily}`,
    title:         editorial.name,
    color:         'BLACK',
    price:         editorial.placeholderPrice ?? 0,
    currencyCode:  'USD',
    featuredImage: null,
    sizes:         [],
  }
  return { ...editorial, lead: variant, variants: [variant] }
}

function buildFamilies(products: ShopifyProduct[]): EnrichedFamily[] {
  const byFamily = new Map<string, ShopifyProduct[]>()
  for (const p of products) {
    const list = byFamily.get(p.designFamily) ?? []
    list.push(p)
    byFamily.set(p.designFamily, list)
  }

  const families: EnrichedFamily[] = []
  for (const [designFamily, ships] of byFamily.entries()) {
    const editorial = EDITORIAL[designFamily]
    if (!editorial) {
      console.warn(`[product-merge] Shopify products with unknown design_family="${designFamily}" — skipping`)
      continue
    }
    const variants = ships.map(toVariant)
    families.push({
      ...editorial,
      lead:     pickLead(variants, editorial.leadColor),
      variants,
    })
  }

  // Synthesize placeholder families for editorial entries flagged
  // `pendingShopify: true` that aren't represented in the live Shopify catalog
  // (mockups + lore are ready before the Printify/Shopify sync lands).
  for (const editorial of Object.values(EDITORIAL)) {
    if (!editorial.pendingShopify)            continue
    if (byFamily.has(editorial.designFamily)) continue
    families.push(synthesizePlaceholder(editorial))
  }

  return families
}

export async function getAllFamilies(): Promise<EnrichedFamily[]> {
  let products: ShopifyProduct[] = []
  try {
    products = await getAllShopifyProducts()
  } catch (err) {
    // Fail-soft: missing env vars or transient API errors should not nuke the
    // entire catalog. Placeholder-flagged editorial entries still render via
    // buildFamilies; live Shopify families are simply absent until next fetch.
    console.warn('[product-merge] Shopify fetch failed — falling back to placeholders only:', err)
  }
  return buildFamilies(products)
}

export async function getFamiliesByCategory(category: Category): Promise<EnrichedFamily[]> {
  const families = await getAllFamilies()
  return families.filter((f) => f.category === category)
}

export async function getFamilyByHandle(
  handle: string,
): Promise<{ family: EnrichedFamily; active: EnrichedVariant } | null> {
  const families = await getAllFamilies()
  for (const family of families) {
    const active = family.variants.find((v) => v.handle === handle)
    if (active) return { family, active }
  }
  return null
}

export async function getAllHandles(): Promise<string[]> {
  // Pull from families so synthetic per-color handles (Drop 004+) are included.
  // Placeholder-only families have a synthetic handle that points nowhere on
  // Shopify; that's fine — the PDP route returns the synthesized variant.
  const families = await getAllFamilies()
  return families.flatMap((f) => f.variants.map((v) => v.handle))
}
