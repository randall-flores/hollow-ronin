/*
 * Storefront API access to live Hollow Ronin products.
 *
 * Source of truth for: handle, title, variant IDs, prices, availability,
 * color, and the join key `custom.design_family` metafield.
 *
 * Color resolution: variant `selectedOptions.Color` is the canonical source.
 * Product-level `custom.color` metafield is read only as a fallback for
 * Drop 001/002/003-era products where the option name was inconsistent.
 *
 * Multi-color products (Drop 004+): one Shopify product carries multiple
 * Color option values. `normalize()` splits these into N synthetic
 * ShopifyProduct entries (one per color) with handles of the form
 * `{base-handle}-{color-slug}` so the downstream `product-merge` family
 * model — which already groups per-color shops by `designFamily` — keeps
 * working unchanged.
 *
 * Editorial content (story, accent, clan, etc.) lives in `lib/products.ts`
 * and is joined at `lib/product-merge.ts` via the design_family metafield.
 */

import { type ColorSlug, normalizeColor, colorToHandleSlug } from './colors'

const SHOP_DOMAIN  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT   =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ??
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const API_VERSION  = '2024-10'

export type { ColorSlug }

export type ShopifyVariant = {
  id:        string
  size:      string
  available: boolean
  price:     number
}

export type ShopifyProduct = {
  handle:        string
  productId:     string
  title:         string
  designFamily:  string
  color:         ColorSlug
  price:         number
  currencyCode:  string
  featuredImage: { url: string; alt: string } | null
  variants:      ShopifyVariant[]
}

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> }

async function storefront<T>(
  query:     string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!SHOP_DOMAIN || !STOREFRONT) {
    throw new Error(
      'Shopify env vars missing — set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN',
    )
  }
  const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method:  'POST',
    headers: {
      'Content-Type':                      'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600, tags: ['shopify-products'] },
  })
  const json = (await res.json()) as GraphQLResponse<T>
  if (json.errors?.length) {
    throw new Error(`Shopify: ${json.errors.map((e) => e.message).join('; ')}`)
  }
  if (!json.data) throw new Error('Shopify: empty response')
  return json.data
}

type RawProductNode = {
  id:            string
  handle:        string
  title:         string
  featuredImage: { url: string; altText: string | null } | null
  priceRange:    { minVariantPrice: { amount: string; currencyCode: string } }
  designFamily:  { value: string } | null
  color:         { value: string } | null
  variants: {
    edges: Array<{
      node: {
        id:               string
        title:            string
        availableForSale: boolean
        price:            { amount: string }
        selectedOptions:  Array<{ name: string; value: string }>
      }
    }>
  }
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
  designFamily: metafield(namespace: "custom", key: "design_family") { value }
  color:        metafield(namespace: "custom", key: "color")         { value }
  variants(first: 100) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount }
        selectedOptions { name value }
      }
    }
  }
`

type ExpandedVariant = {
  id:        string
  size:      string
  color:     ColorSlug
  available: boolean
  price:     number
}

function expandVariants(node: RawProductNode): ExpandedVariant[] {
  return node.variants.edges.map(({ node: v }) => {
    const colorOpt = v.selectedOptions.find((o) => o.name.toLowerCase() === 'color')
    const sizeOpt  = v.selectedOptions.find((o) => o.name.toLowerCase() === 'size')
    const color    = colorOpt
      ? normalizeColor(colorOpt.value)
      : normalizeColor(node.color?.value)
    const size = (sizeOpt?.value ?? v.title.split('/').pop()?.trim() ?? v.title).trim().toUpperCase()
    return {
      id:        v.id,
      size,
      color,
      available: v.availableForSale,
      price:     Number(v.price.amount),
    }
  })
}

function normalize(node: RawProductNode): ShopifyProduct[] {
  if (!node.designFamily?.value) return []

  const expanded = expandVariants(node)
  if (expanded.length === 0) return []

  const baseHandle  = node.handle
  const baseTitle   = node.title
  const designFam   = node.designFamily.value
  const currency    = node.priceRange.minVariantPrice.currencyCode
  const fallbackPx  = Number(node.priceRange.minVariantPrice.amount)
  const featuredImg = node.featuredImage
    ? { url: node.featuredImage.url, alt: node.featuredImage.altText ?? node.title }
    : null

  // Group variants by their color.
  const byColor = new Map<ColorSlug, ExpandedVariant[]>()
  for (const v of expanded) {
    const list = byColor.get(v.color) ?? []
    list.push(v)
    byColor.set(v.color, list)
  }

  // Single-color product (Drop 001/002/003 pattern) — keep the original
  // Shopify handle so existing PDP URLs and sitemap entries stay stable.
  if (byColor.size === 1) {
    const [color, sizes] = byColor.entries().next().value as [ColorSlug, ExpandedVariant[]]
    return [{
      handle:        baseHandle,
      productId:     node.id,
      title:         baseTitle,
      designFamily:  designFam,
      color,
      price:         Math.min(...sizes.map((s) => s.price)) || fallbackPx,
      currencyCode:  currency,
      featuredImage: featuredImg,
      variants:      sizes.map(({ id, size, available, price }) => ({ id, size, available, price })),
    }]
  }

  // Multi-color product (Drop 004+) — emit one synthetic ShopifyProduct
  // per color so `product-merge.ts:buildFamilies` (which groups by
  // designFamily into a family with multiple per-color variants) keeps
  // working without code change. Synthetic handles are app-local routes
  // only; cart/checkout still uses the real variant IDs from Shopify.
  const result: ShopifyProduct[] = []
  for (const [color, sizes] of byColor.entries()) {
    result.push({
      handle:        `${baseHandle}-${colorToHandleSlug(color)}`,
      productId:     node.id,
      title:         baseTitle,
      designFamily:  designFam,
      color,
      price:         Math.min(...sizes.map((s) => s.price)) || fallbackPx,
      currencyCode:  currency,
      featuredImage: featuredImg,
      variants:      sizes.map(({ id, size, available, price }) => ({ id, size, available, price })),
    })
  }
  return result
}

export async function getAllShopifyProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query AllProducts {
      products(first: 100, sortKey: CREATED_AT, reverse: true) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  `
  type Resp = { products: { edges: Array<{ node: RawProductNode }> } }
  const data = await storefront<Resp>(query)
  return data.products.edges.flatMap(({ node }) => normalize(node))
}
