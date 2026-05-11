import { notFound } from 'next/navigation'
import ProductPage from '@/components/three/ProductPage'
import { PRODUCTS, getProduct } from '@/lib/products'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product  = getProduct(slug)
  if (!product) return { title: 'Not found · HOLLOW RONIN' }
  return {
    title:       `${product.name} · HOLLOW RONIN`,
    description: product.story,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product  = getProduct(slug)
  if (!product) notFound()
  return <ProductPage product={product} />
}
