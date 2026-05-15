/*
 * Merge layer — joins live Shopify products to local editorial content.
 *
 * Public API:
 *   - getAllFamilies()                — every design family with all color variants
 *   - getFamiliesByCategory(category) — filtered subset
 *   - getFamilyByHandle(handle)       — find the family that contains the given Shopify handle, plus active variant
 *   - getProductByHandle(handle)      — single Shopify product
 *
 * "Family" = one editorial entry. May have 1 or more Shopify products (color variants).
 */

import {
  getAllShopifyProducts,
  getShopifyProductByHandle,
  type ShopifyProduct,
  type ColorSlug,
} from './shopify-products'
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

function pickLead(variants: EnrichedVariant[]): EnrichedVariant {
  return variants.find((v) => v.color === 'BLACK') ?? variants[0]
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
      continue
    }
    const variants = ships.map(toVariant)
    families.push({
      ...editorial,
      lead:     pickLead(variants),
      variants,
    })
  }
  return families
}

export async function getAllFamilies(): Promise<EnrichedFamily[]> {
  const products = await getAllShopifyProducts()
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

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  return getShopifyProductByHandle(handle)
}

export async function getAllHandles(): Promise<string[]> {
  const products = await getAllShopifyProducts()
  return products.map((p) => p.handle)
}
