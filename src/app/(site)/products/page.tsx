import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Our Products',
  description:
    'Explore products built by Beveez Tech: UNLIVO, AffilixWP, Docs AI and Beveez AI.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Products | Beveez Tech',
    description:
      'Purpose-built digital products for real estate, WordPress, software development and business automation.',
    url: '/products',
    type: 'website',
  },
}

export default function ProductsPage() {
  return (
    <main className="bg-[#f2f1f6]">
      <section className="relative overflow-hidden px-5 pb-16 pt-36 md:pb-24 md:pt-48">
        <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#65c6db]/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2497c8]/20 bg-white/70 px-4 py-2 text-sm font-semibold text-[#176d91]">
            <Sparkles size={16} /> Built by Beveez Tech
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-[#002b3a] md:text-6xl">
            Digital products for
            <span className="gradient-text mt-2 block">real-world work.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#42545b] md:text-lg">
            We build focused tools that solve practical problems — from property
            discovery and WordPress affiliate management to developer
            documentation and business automation.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {products.map((product) => {
            const Icon = product.icon
            return (
              <article
                key={product.slug}
                className="group flex h-full flex-col rounded-3xl border border-[#002b3a]/10 bg-white p-7 shadow-[0_12px_40px_rgba(0,43,58,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,43,58,0.10)] md:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf6fa] text-[#147da5]">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>
                  <span className={product.status === 'available'
                    ? 'rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700'
                    : 'rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700'}>
                    {product.status === 'available' ? 'Available' : 'In development'}
                  </span>
                </div>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#147da5]">
                  {product.category}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#002b3a] md:text-3xl">
                  {product.name}
                </h2>
                <p className="mt-3 text-lg font-medium leading-7 text-[#263f49]">
                  {product.tagline}
                </p>
                <p className="mt-4 flex-1 leading-7 text-[#5a6b71]">
                  {product.description}
                </p>
                <ul className="mt-6 space-y-3 border-t border-[#002b3a]/10 pt-6">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-sm text-[#42545b]">
                      <Check size={17} className="mt-0.5 shrink-0 text-[#2497c8]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-8 inline-flex w-fit items-center gap-2 font-semibold text-[#087ba4] transition group-hover:gap-3"
                >
                  Discover {product.name} <ArrowUpRight size={18} />
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#002b3a] px-7 py-12 text-center text-white md:px-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#65c6db]">
            Have an idea?
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">
            Let’s build something useful.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/75">
            We also work with businesses to design and develop custom digital
            products, websites and automation solutions.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-7 py-4 font-semibold text-white transition hover:brightness-110"
          >
            Talk to our team <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
