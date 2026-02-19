import { getServiceBySlug, getAllServiceSlugs } from '@/sanity/lib/getServiceBySlug'
import { notFound } from 'next/navigation'
import ServiceClient from './ServiceClient'

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()

  return slugs.map((slug: string) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: any) {
  const data = await getServiceBySlug(params.slug)

  if (!data) return {}

  return {
    title: data?.seo?.seoTitle || data.title,
    description: data?.seo?.seoDescription,
  }
}

export default async function ServicePage({ params }: any) {
  const data = await getServiceBySlug(params.slug)

  if (!data) return notFound()

  return <ServiceClient data={data} />
}
