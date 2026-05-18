import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ProductPage, { type RelatedItem } from '@/components/three/ProductPage'
import { getAllFamilies, getAllHandles, getFamilyByHandle, type EnrichedFamily, type EnrichedVariant } from '@/lib/product-merge'
import { productGalleryImages } from '@/lib/card-images'
import { colorToFolder } from '@/lib/colors'
import type { ProductImage } from '@/lib/products'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const handles = await getAllHandles()
    return handles.map((slug) => ({ slug }))
  } catch (err) {
    console.warn('[products/[slug]] generateStaticParams: Shopify fetch failed', err)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let resolved: { family: EnrichedFamily; active: EnrichedVariant } | null = null
  try {
    resolved = await getFamilyByHandle(slug)
  } catch {
    return { title: 'Not found' }
  }
  if (!resolved) return { title: 'Not found' }
  const { family, active } = resolved
  const ogImage = active.featuredImage?.url ?? null
  return {
    title:       family.name,
    description: family.blurb || family.story,
    alternates:  { canonical: `/products/${active.handle}` },
    openGraph: {
      type:        'website' as const,
      title:       `${family.name} · HOLLOW RONIN`,
      description: family.blurb || family.story,
      url:         `/products/${active.handle}`,
      images:      ogImage ? [{ url: ogImage, alt: family.name }] : undefined,
    },
    twitter: {
      card:        'summary_large_image' as const,
      title:       `${family.name} · HOLLOW RONIN`,
      description: family.blurb || family.story,
      images:      ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resolved = await getFamilyByHandle(slug).catch(() => null)
  if (!resolved) notFound()

  const { family, active } = resolved

  const galleryByHandle: Record<string, ProductImage[]> = {}
  for (const v of family.variants) {
    const images = productGalleryImages({
      imageFolder: family.imageFolder,
      color:       v.color,
      clan:        family.clan,
      name:        family.name,
    })
    galleryByHandle[v.handle] = images.length > 0
      ? images
      : v.featuredImage
        ? [{ url: v.featuredImage.url, alt: v.featuredImage.alt }]
        : []
  }

  const allFamilies = await getAllFamilies().catch(() => [] as EnrichedFamily[])
  const related: RelatedItem[] = allFamilies
    .filter((f) => f.category === family.category && f.designFamily !== family.designFamily)
    .slice(0, 4)
    .map((f) => {
      const folderColor = colorToFolder(f.lead.color)
      const isBackHero = f.category === 'shirts' || f.category === 'tees' || f.category === 'hoodies' || f.category === 'masked-hoodies'
      const fallback = isBackHero
        ? `/mockups/${f.imageFolder}/${folderColor}/tee-${f.imageFolder}-back-${folderColor}.png`
        : `/mockups/${f.imageFolder}/${folderColor}/tee-${f.imageFolder}-front-${folderColor}.png`
      const localGallery = productGalleryImages({
        imageFolder: f.imageFolder,
        color:       f.lead.color,
        clan:        f.clan,
        name:        f.name,
      })
      const heroImage = localGallery.find((i) => /back/.test(i.url)) ?? localGallery[0]
      return {
        handle: f.lead.handle,
        name:   f.name,
        price:  f.lead.price,
        image:  heroImage ?? { url: fallback, alt: `${f.name} — back design` },
        bg:     f.bg,
        accent: f.accent,
      }
    })

  // Suspense boundary is required because ProductPage uses useSearchParams()
  // (for color-swap shallow routing). Without it, Next.js 16 strict-prerender
  // refuses to statically generate /products/[slug] routes.
  return (
    <Suspense fallback={null}>
      <ProductPage
        family={family}
        active={active}
        galleryByHandle={galleryByHandle}
        related={related}
      />
    </Suspense>
  )
}
