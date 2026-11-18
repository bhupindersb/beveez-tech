import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { products } from '@/lib/products'
import { productGuides } from '@/lib/product-guides'

type Props = { params: Promise<{ slug: string; topic: string }> }

export function generateStaticParams() {
  return Object.entries(productGuides).flatMap(([slug, guides]) =>
    guides.map((guide) => ({ slug, topic: guide.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, topic } = await params
  const product = products.find((item) => item.slug === slug)
  const guide = productGuides[slug]?.find((item) => item.slug === topic)
  if (!product || !guide) return {}
  return {
    title: `${guide.title} | ${product.name}`,
    description: guide.intro,
    alternates: { canonical: `/products/${slug}/${topic}` },
    openGraph: { title: `${guide.title} | ${product.name}`, description: guide.intro, url: `/products/${slug}/${topic}`, type: 'article' },
  }
}

export default async function ProductGuidePage({ params }: Props) {
  const { slug, topic } = await params
  const product = products.find((item) => item.slug === slug)
  const guides = productGuides[slug]
  const guide = guides?.find((item) => item.slug === topic)
  if (!product || !guide) notFound()

  const related = guides.filter((item) => item.slug !== topic)
  const isPlanned = product.status === 'coming-soon'

  return (
    <main className="min-h-screen bg-[#f2f1f6]">
      <section className="relative overflow-hidden px-5 pb-16 pt-36 md:pb-20 md:pt-48">
        <div className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#65c6db]/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#607780]">
            <Link href="/products" className="hover:text-[#087ba4]">Products</Link>
            <span>/</span>
            <Link href={`/products/${slug}`} className="hover:text-[#087ba4]">{product.name}</Link>
            <span>/</span>
            <span className="text-[#147da5]">{guide.eyebrow}</span>
          </div>
          {isPlanned && <p className="mt-8 inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">Product in development · Planned direction only</p>}
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#147da5]">{guide.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-tight text-[#002b3a] md:text-6xl">{guide.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#52656d]">{guide.intro}</p>
          <Link href={`/products/${slug}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-[#087ba4] hover:gap-3"><ArrowLeft size={17}/> Back to {product.name}</Link>
        </div>
      </section>

      <section className="px-5 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="space-y-5">
            {guide.sections.map((section, index) => (
              <section key={section.heading} className="rounded-3xl border border-[#002b3a]/10 bg-white p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147da5]">0{index + 1}</p>
                <h2 className="mt-3 text-2xl font-semibold text-[#002b3a]">{section.heading}</h2>
                <p className="mt-4 leading-8 text-[#52656d]">{section.body}</p>
                {section.bullets && <ul className="mt-5 space-y-3">{section.bullets.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#52656d]"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#1689bd]"/>{item}</li>)}</ul>}
              </section>
            ))}
            <div className="rounded-3xl bg-[#002b3a] p-8 text-white md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#65c6db]">Continue exploring</p>
              <h2 className="mt-3 text-2xl font-semibold">See what {product.name} can help you do.</h2>
              <p className="mt-3 leading-7 text-white/70">Visit the product overview for its audience, key focus areas and next steps.</p>
              <Link href={`/products/${slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-6 py-3 font-semibold text-white">Explore {product.name} <ArrowUpRight size={17}/></Link>
            </div>
          </article>

          <aside className="h-fit rounded-3xl border border-[#002b3a]/10 bg-white p-6 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#147da5]">{product.name}</p>
            <h2 className="mt-2 text-lg font-semibold text-[#002b3a]">More about this product</h2>
            <Link href={`/products/${slug}`} className="mt-5 flex items-center justify-between border-b border-[#002b3a]/10 py-3 text-sm font-semibold text-[#52656d] hover:text-[#087ba4]">Product overview <ArrowRight size={16}/></Link>
            {related.map((item) => <Link key={item.slug} href={`/products/${slug}/${item.slug}`} className="flex items-center justify-between gap-3 border-b border-[#002b3a]/10 py-3 text-sm font-semibold text-[#52656d] hover:text-[#087ba4]">{item.title}<ArrowRight size={16} className="shrink-0"/></Link>)}
            <Link href="/products" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#087ba4]">All Beveez products <ArrowUpRight size={16}/></Link>
          </aside>
        </div>
      </section>
    </main>
  )
}
