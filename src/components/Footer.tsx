import Image from 'next/image'
import Link from 'next/link'

const products = [
  { label: 'All Products', url: '/products' },
  { label: 'UNLIVO', url: '/products/unlivo' },
  { label: 'AffilixWP', url: '/products/affilixwp' },
  { label: 'Docs AI', url: '/products/docs-ai' },
  { label: 'Beveez AI', url: '/products/beveez-ai' },
]

function FooterLinks({ title, items }: { title: string; items: { label: string; url: string }[] }) {
  return (
    <div>
      <h3 className="mb-5 text-base font-semibold text-white">{title}</h3>
      <ul className="space-y-3 text-sm text-white/75">
        {items.filter(item => item?.url && item?.label).map((item, i) => (
          <li key={i}>
            <Link href={`/${item.url.replace(/^\//, '')}`} className="transition-colors hover:text-[#65c6db] focus-visible:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer({ data }: any) {
  if (!data) return null
  const quickLinks = [{ label: 'Industries', url: '/industries' }, ...(data.quickLinks ?? []).filter((item: any) => item?.url?.replace(/^\//, '') !== 'industries')]

  return (
    <footer className="w-full px-4 pb-8 md:px-[30px] md:pb-[60px]">
      <div className="overflow-hidden rounded-[24px] bg-darkBlue text-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid gap-5 border-b border-white/15 py-10 md:grid-cols-2 md:py-12">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#65c6db]">Let's connect</p>
              <h2 className="mb-3 text-2xl font-semibold">Have a question? Let's talk.</h2>
              <p className="mb-5 text-sm leading-relaxed text-white/75">Whether you need a new website, a custom software solution or help choosing one of our products, we'd love to hear from you.</p>
              <a href="tel:+916283100489" className="inline-flex items-center gap-3 text-lg font-semibold text-white transition hover:text-[#65c6db]">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5l3 .7a2 2 0 0 1 1.7 2Z"/></svg>
                +91 62831 00489
              </a>
            </div>
            <div className="rounded-2xl border border-[#65c6db]/30 bg-gradient-to-br from-[#2497c8]/20 to-white/5 p-6 md:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#65c6db]">Start something great</p>
              <h2 className="mb-3 text-2xl font-semibold">Ready to bring your idea to life?</h2>
              <p className="mb-5 text-sm leading-relaxed text-white/75">Tell us about your project. Let's explore how design, development and AI can help your business move forward.</p>
              <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">Request a Quote <span aria-hidden="true">→</span></Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" aria-label="Beveez Tech home">
                {data.logo?.asset?.url ? <Image src={data.logo.asset.url} alt="Beveez Tech" width={160} height={40} className="h-9 w-auto" /> : <span className="text-xl font-semibold">Beveez Tech</span>}
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">We build digital experiences, custom software and AI-powered products that help businesses grow and work smarter.</p>
              <Link href="/about" className="mt-5 inline-block text-sm font-semibold text-[#65c6db] hover:underline">About Beveez Tech →</Link>
            </div>
            <FooterLinks title="Quick Links" items={quickLinks} />
            <FooterLinks title="Products" items={products} />
            <FooterLinks title="Services" items={data.services ?? []} />
            <FooterLinks title="Legal" items={data.legal ?? []} />
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 py-6 text-center text-xs text-white/70 sm:flex-row sm:text-left">
            <p>{data.copyright}</p>
            <p>Design. Development. Innovation.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
