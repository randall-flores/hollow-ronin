const SHOP_DOMAIN  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT   =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ??
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const API_VERSION  = '2024-10'

type GraphQLResponse<T> = { data?: T; errors?: Array<{ message: string }> }

async function storefront<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!SHOP_DOMAIN || !STOREFRONT) {
    throw new Error('Shopify env vars missing — set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN')
  }
  const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method:  'POST',
    headers: {
      'Content-Type':                       'application/json',
      'X-Shopify-Storefront-Access-Token':  STOREFRONT,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600, tags: ['shopify-products'] },
  })
  const json = (await res.json()) as GraphQLResponse<T>
  if (json.errors?.length) throw new Error(`Shopify: ${json.errors.map(e => e.message).join('; ')}`)
  if (!json.data)         throw new Error('Shopify: empty response')
  return json.data
}

type VariantNode = {
  id:              string
  title:           string
  availableForSale: boolean
  selectedOptions: Array<{ name: string; value: string }>
}

type ProductVariantsResp = {
  product: null | {
    handle:   string
    variants: { edges: Array<{ node: VariantNode }> }
  }
}

export async function getVariantId(handle: string, size: string): Promise<string | null> {
  const data = await storefront<ProductVariantsResp>(
    `query Variants($handle: String!) {
       product(handle: $handle) {
         handle
         variants(first: 50) {
           edges { node {
             id title availableForSale
             selectedOptions { name value }
           } }
         }
       }
     }`,
    { handle },
  )
  const product = data.product
  if (!product) return null
  const want = size.trim().toUpperCase()
  for (const { node } of product.variants.edges) {
    const sizeOpt = node.selectedOptions.find(o => o.name.toLowerCase() === 'size')
    if (sizeOpt && sizeOpt.value.trim().toUpperCase() === want) return node.id
    if (node.title.trim().toUpperCase() === want)               return node.id
  }
  return null
}

type CartCreateResp = {
  cartCreate: {
    cart:        null | { id: string; checkoutUrl: string }
    userErrors:  Array<{ message: string; field?: string[] }>
  }
}

export type CheckoutItem = { handle: string; size: string; qty: number }

export async function createCheckoutUrl(items: CheckoutItem[]): Promise<string> {
  if (items.length === 0) throw new Error('Cart is empty')

  const lines: Array<{ merchandiseId: string; quantity: number }> = []
  const missing: string[] = []
  for (const item of items) {
    const variantId = await getVariantId(item.handle, item.size)
    if (!variantId) { missing.push(`${item.handle} (${item.size})`); continue }
    lines.push({ merchandiseId: variantId, quantity: item.qty })
  }
  if (missing.length) throw new Error(`Variant not found in Shopify: ${missing.join(', ')}`)

  const data = await storefront<CartCreateResp>(
    `mutation CartCreate($input: CartInput!) {
       cartCreate(input: $input) {
         cart { id checkoutUrl }
         userErrors { message field }
       }
     }`,
    { input: { lines } },
  )
  const { cart, userErrors } = data.cartCreate
  if (userErrors?.length) throw new Error(`Shopify: ${userErrors.map(e => e.message).join('; ')}`)
  if (!cart?.checkoutUrl)  throw new Error('Shopify: cart created without checkoutUrl')
  return cart.checkoutUrl
}
