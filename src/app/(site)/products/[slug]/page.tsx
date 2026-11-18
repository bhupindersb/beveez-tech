import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { products } from '@/lib/products'
import { productGuides } from '@/lib/product-guides'

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
  const guides = productGuides[product.slug] ?? []

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

          <section className="mt-20 grid gap-8 border-t border-[#002b3a]/10 pt-12 md:mt-24 md:grid-cols-2">
            {product.contentSections.map((section) => (
              <article key={section.heading} className="rounded-3xl border border-[#002b3a]/10 bg-white p-7 md:p-8">
                <h2 className="text-2xl font-semibold leading-tight text-[#002b3a]">{section.heading}</h2>
                <p className="mt-4 leading-8 text-[#5a6b71]">{section.body}</p>
                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-[#52656d]">
                        <Check size={17} className="mt-0.5 shrink-0 text-[#2497c8]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>

          <section className="mt-20 grid gap-10 border-t border-[#002b3a]/10 pt-12 md:mt-24 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147da5]">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#002b3a]">A clearer path from first step to useful outcome.</h2>
              <ol className="mt-7 space-y-5">
                {product.workflow.map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f4f7] text-sm font-bold text-[#147da5]">{index + 1}</span>
                    <p className="pt-1 leading-7 text-[#52656d]">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl bg-[#e8f4f7] p-7 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147da5]">Who it can help</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#002b3a]">Practical use cases</h2>
              <ul className="mt-6 space-y-4">
                {product.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3 leading-7 text-[#42545b]">
                    <Check size={18} className="mt-1 shrink-0 text-[#147da5]" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-20 border-t border-[#002b3a]/10 pt-12 md:mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147da5]">Questions and answers</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-[#002b3a] md:text-4xl">Frequently asked questions about {product.name}.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {product.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-[#002b3a]/10 bg-white p-6">
                  <h3 className="text-lg font-semibold text-[#002b3a]">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-[#5a6b71]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-20 border-t border-[#002b3a]/10 pt-12 md:mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147da5]">Explore the details</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-[#002b3a] md:text-4xl">Get to know {product.name} in more detail.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#5a6b71]">Explore focused guides about the product, the people it is designed for and the workflows it supports.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {guides.map((guide) => (
                <Link key={guide.slug} href={`/products/${product.slug}/${guide.slug}`} className="group rounded-2xl border border-[#002b3a]/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#147da5]">{guide.eyebrow}</p>
                  <h3 className="mt-3 text-lg font-semibold leading-7 text-[#002b3a]">{guide.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5a6b71]">{guide.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#087ba4] transition group-hover:gap-3">Read guide <ArrowUpRight size={16}/></span>
                </Link>
              ))}
            </div>
          </section>
          <section className="mt-16 rounded-3xl bg-[#e8f4f7] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147da5]">Part of the Beveez Tech portfolio</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#002b3a]">Explore our other products</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {products.filter((item) => item.slug !== product.slug).map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="flex items-center justify-between rounded-xl border border-[#002b3a]/10 bg-white px-5 py-4 font-semibold text-[#002b3a] transition hover:border-[#147da5]/40">
                  <span>{item.name}<span className="ml-2 text-xs font-normal text-[#607780]">{item.category}</span></span><ArrowUpRight size={17}/>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
