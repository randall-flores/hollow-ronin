import { notFound } from 'next/navigation'
import ProductPage from '@/components/three/ProductPage'
import { PRODUCTS, getProduct } from '@/lib/products'
import { productGalleryImages } from '@/lib/card-images'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product  = getProduct(slug)
  if (!product) return { title: 'Not found' }
  const ogImage = product.images[0]?.url
  return {
    title:       product.name,
    description: product.blurb || product.story,
    alternates:  { canonical: `/products/${product.slug}` },
    openGraph: {
      type:        'website' as const,
      title:       `${product.name} · HOLLOW RONIN`,
      description: product.blurb || product.story,
      url:         `/products/${product.slug}`,
      images:      ogImage ? [{ url: ogImage, alt: product.name }] : undefined,
    },
    twitter: {
      card:        'summary_large_image' as const,
      title:       `${product.name} · HOLLOW RONIN`,
      description: product.blurb || product.story,
      images:      ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product  = getProduct(slug)
  if (!product) notFound()
  const galleryProduct = { ...product, images: productGalleryImages(product) }
  return <ProductPage product={galleryProduct} />
}
