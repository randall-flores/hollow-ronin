/*
 * Storefront API access to live Hollow Ronin products.
 *
 * Source of truth for: handle, title, variant IDs, prices, availability,
 * color, and the join key `custom.design_family` metafield.
 *
 * Editorial content (story, accent, clan, etc.) lives in `lib/products.ts`
 * and is joined at `lib/product-merge.ts` via the design_family metafield.
 */

const SHOP_DOMAIN  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT   =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ??
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const API_VERSION  = '2024-10'

export type ColorSlug = 'BLACK' | 'WHITE'

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
  variants(first: 50) {
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

function normalizeColor(raw: string | null | undefined): ColorSlug {
  return raw?.toUpperCase() === 'WHITE' ? 'WHITE' : 'BLACK'
}

function normalize(node: RawProductNode): ShopifyProduct | null {
  if (!node.designFamily?.value) return null
  const variants: ShopifyVariant[] = node.variants.edges.map(({ node: v }) => {
    const sizeOpt = v.selectedOptions.find((o) => o.name.toLowerCase() === 'size')
    const size    = sizeOpt?.value ?? v.title.split('/').pop()?.trim() ?? v.title
    return {
      id:        v.id,
      size:      size.trim().toUpperCase(),
      available: v.availableForSale,
      price:     Number(v.price.amount),
    }
  })
  return {
    handle:        node.handle,
    productId:     node.id,
    title:         node.title,
    designFamily:  node.designFamily.value,
    color:         normalizeColor(node.color?.value),
    price:         Number(node.priceRange.minVariantPrice.amount),
    currencyCode:  node.priceRange.minVariantPrice.currencyCode,
    featuredImage: node.featuredImage
      ? { url: node.featuredImage.url, alt: node.featuredImage.altText ?? node.title }
      : null,
    variants,
  }
}

export async function getAllShopifyProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query AllProducts {
      products(first: 50, sortKey: CREATED_AT, reverse: true) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  `
  type Resp = { products: { edges: Array<{ node: RawProductNode }> } }
  const data = await storefront<Resp>(query)
  return data.products.edges
    .map(({ node }) => normalize(node))
    .filter((p): p is ShopifyProduct => p !== null)
}

export async function getShopifyProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) { ${PRODUCT_FIELDS} }
    }
  `
  type Resp = { product: RawProductNode | null }
  const data = await storefront<Resp>(query, { handle })
  return data.product ? normalize(data.product) : null
}
