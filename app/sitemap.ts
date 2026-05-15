import type { MetadataRoute } from 'next'
import { getAllHandles } from '@/lib/product-merge'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hollowronin.com'

const STATIC_ROUTES = [
  '',
  '/shop',
  '/shop/shirts',
  '/lookbook',
  '/about',
  '/drops',
  '/shipping',
  '/returns',
  '/privacy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url:             `${SITE_URL}${path}`,
    lastModified:    now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority:        path === '' ? 1.0 : path.startsWith('/shop') ? 0.9 : 0.7,
  }))

  let handles: string[] = []
  try {
    handles = await getAllHandles()
  } catch {
    /* Shopify fetch failed — emit static-only sitemap */
  }

  const productEntries: MetadataRoute.Sitemap = handles.map((handle) => ({
    url:             `${SITE_URL}/products/${handle}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.8,
  }))

  return [...staticEntries, ...productEntries]
}
