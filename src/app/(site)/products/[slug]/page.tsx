import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { products } from '@/lib/products'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  if (!product) return {}

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Beveez Tech`,
      description: product.description,
      url: `/products/${product.slug}`,
      type: 'website',
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  if (!product) notFound()

  const Icon = product.icon
  const isExternal = product.href.startsWith('https://')

  return (
    <main className="min-h-screen bg-[#f2f1f6]">
      <section className="px-5 pb-24 pt-36 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#147da5] transition hover:text-[#cf5a20]"
          >
            <ArrowLeft size={16} /> All products
          </Link>

          <div className="mt-12 grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#147da5] shadow-sm">
                <Icon size={31} strokeWidth={1.7} />
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#147da5]">
                {product.category}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-semibold tracking-tight text-[#002b3a] md:text-6xl">
                  {product.name}
                </h1>
                {product.status === 'coming-soon' && (
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    In development
                  </span>
                )}
              </div>
              <p className="mt-5 text-xl font-medium leading-8 text-[#263f49] md:text-2xl">
                {product.tagline}
              </p>
              <p className="mt-6 max-w-2xl leading-8 text-[#5a6b71]">
                {product.description}
              </p>
              {product.status === 'coming-soon' && (
                <p className="mt-4 text-sm leading-6 text-[#7b5a20]">
                  This product is in development. The capabilities described
                  here represent its planned direction and may change before
                  launch.
                </p>
              )}
              <div className="mt-9 flex flex-wrap gap-4">
                {isExternal ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-7 py-4 font-semibold text-white transition hover:brightness-110"
                  >
                    {product.ctaLabel} <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-7 py-4 font-semibold text-white transition hover:brightness-110"
                  >
                    {product.ctaLabel} <ArrowUpRight size={18} />
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-[#002b3a]/20 px-7 py-4 font-semibold text-[#002b3a] transition hover:bg-white"
                >
                  Contact Beveez Tech
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl bg-[#002b3a] p-8 text-white md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#65c6db]">
                At a glance
              </p>
              <p className="mt-6 text-sm text-white/60">Designed for</p>
              <p className="mt-2 text-lg font-medium leading-7">{product.audience}</p>
              <div className="my-8 h-px bg-white/15" />
              <p className="text-sm text-white/60">What it focuses on</p>
              <ul className="mt-5 space-y-4">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 leading-6">
                    <Check size={18} className="mt-1 shrink-0 text-[#65c6db]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-20 max-w-3xl border-t border-[#002b3a]/10 pt-10 md:mt-28">
            <h2 className="text-2xl font-semibold text-[#002b3a] md:text-3xl">
              About {product.name}
            </h2>
            <p className="mt-5 text-base leading-8 text-[#5a6b71]">
              {product.overview}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
