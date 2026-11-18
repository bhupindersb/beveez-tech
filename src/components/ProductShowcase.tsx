import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { products } from '@/lib/products'

export default function ProductShowcase() {
  return (
    <section className="bg-[#002b3a] px-5 py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#65c6db]">Built in-house. Built to solve real problems.</p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight md:text-6xl">
              We don’t just build for clients. <span className="text-[#65c6db]">We build our own products, too.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-white/75 md:justify-self-end md:text-lg">
            Our products come from the same hands-on approach we bring to client work: understand the problem, build a focused solution, and keep improving it.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {products.map((product) => {
            const Icon = product.icon
            return (
              <article key={product.slug} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-7 transition hover:bg-white/[0.1] md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#65c6db]/15 text-[#65c6db]">
                    <Icon size={24} />
                  </div>
                  <span className={product.status === 'available' ? 'rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200' : 'rounded-full bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-100'}>
                    {product.status === 'available' ? 'Available' : 'In development'}
                  </span>
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#65c6db]">{product.category}</p>
                <h3 className="mt-2 text-2xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-lg font-medium text-white/90">{product.tagline}</p>
                <p className="mt-3 flex-1 leading-7 text-white/65">{product.description}</p>
                <ul className="mt-5 space-y-2">
                  {product.highlights.slice(0, 2).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#65c6db]" />{item}
                    </li>
                  ))}
                </ul>
                <Link href={`/products/${product.slug}`} className="mt-7 inline-flex w-fit items-center gap-2 font-semibold text-[#65c6db] hover:gap-3">
                  Discover {product.name} <ArrowUpRight size={17} />
                </Link>
              </article>
            )
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold transition hover:bg-white hover:text-[#002b3a]">
            Explore all products <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
