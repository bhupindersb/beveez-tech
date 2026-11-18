import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Building2, BriefcaseBusiness, Code2, ShoppingCart, Users, Workflow } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industries We Work With',
  description: 'Explore how Beveez Tech approaches digital products, websites and workflow solutions for real estate, software, commerce, professional services and growing businesses.',
  alternates: { canonical: '/industries' },
}

const sectors = [
  { title: 'Real Estate & Property', icon: Building2, intro: 'Make property journeys easier to navigate for buyers, sellers and brokers.', challenges: ['Property discovery spread across multiple channels', 'Slow enquiry handling and fragmented follow-up', 'The need for clear, trustworthy digital experiences'], opportunities: ['Requirement-led discovery and matching experiences', 'Broker, seller and buyer-facing portals', 'Lead capture, notifications and workflow automation'], related: 'UNLIVO', href: '/products/unlivo' },
  { title: 'SaaS & Software', icon: Code2, intro: 'Give software products a clear story and a useful, maintainable digital foundation.', challenges: ['Explaining complex products in simple language', 'Helping users understand features and workflows', 'Keeping technical knowledge accessible'], opportunities: ['Product websites and conversion journeys', 'Documentation and knowledge experiences', 'Scalable web application interfaces'], related: 'Docs AI', href: '/products/docs-ai' },
  { title: 'E-commerce & Digital Commerce', icon: ShoppingCart, intro: 'Build better customer journeys around the tools and platforms your business already uses.', challenges: ['Disconnected marketing and sales workflows', 'Affiliate and referral programmes managed manually', 'Storefront performance and usability issues'], opportunities: ['WordPress and commerce integrations', 'Affiliate management workflows', 'Performance-focused storefront experiences'], related: 'AffilixWP', href: '/products/affilixwp' },
  { title: 'Professional & B2B Services', icon: BriefcaseBusiness, intro: 'Turn expertise into a clear online experience that helps the right customers take the next step.', challenges: ['Services that are difficult to explain online', 'Enquiries that need qualification and follow-up', 'Repetitive customer questions and admin'], opportunities: ['Credibility-led websites and landing pages', 'Lead capture and qualification journeys', 'Knowledge-based assistants and workflow automation'], related: 'Beveez AI (in development)', href: '/products/beveez-ai' },
  { title: 'Startups & Growing Teams', icon: Users, intro: 'Launch with a sound foundation and evolve the platform as the business learns and grows.', challenges: ['Limited time and resources for digital delivery', 'Unclear product positioning or launch journeys', 'Technology choices that become difficult to maintain'], opportunities: ['MVP and product launch websites', 'Modern web application development', 'Practical integrations and ongoing improvements'], related: 'Custom product development', href: '/services' },
  { title: 'Workflow-led Businesses', icon: Workflow, intro: 'Make everyday processes more consistent with focused software and automation.', challenges: ['Repeated manual tasks across teams', 'Information scattered across tools', 'Customer hand-offs that are easy to miss'], opportunities: ['Custom dashboards and internal tools', 'AI-assisted knowledge and support workflows', 'Integrations, alerts and process automation'], related: 'Custom digital systems', href: '/contact' },
]

export default function IndustriesPage() {
  return (
    <main className="bg-[#f2f1f6]">
      <section className="px-5 pb-16 pt-36 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#147da5]">Industries & use cases</p>
          <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight text-[#002b3a] md:text-6xl">We learn how your business works before we decide what to build.</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#52656d]">We work across different kinds of businesses, from software products and property platforms to professional services and growing teams. These are the problems and opportunities we understand—not a list of industries we claim to have served.</p>
        </div>
      </section>
      <section className="px-5 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl space-y-6">
          {sectors.map((sector, index) => {
            const Icon = sector.icon
            return (
              <article key={sector.title} id={sector.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="grid gap-8 rounded-3xl border border-[#002b3a]/10 bg-white p-7 md:grid-cols-[0.85fr_1.15fr] md:p-10">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf6fa] text-[#147da5]"><Icon size={24} /></div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#147da5]">0{index + 1}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#002b3a] md:text-3xl">{sector.title}</h2>
                  <p className="mt-4 leading-7 text-[#52656d]">{sector.intro}</p>
                  <Link href={sector.href} className="mt-6 inline-flex items-center gap-2 font-semibold text-[#087ba4] hover:gap-3">Explore {sector.related} <ArrowUpRight size={17} /></Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f6f7f8] p-6">
                    <h3 className="font-semibold text-[#002b3a]">Common challenges</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#52656d]">{sector.challenges.map((item) => <li key={item}>• {item}</li>)}</ul>
                  </div>
                  <div className="rounded-2xl bg-[#eaf6fa] p-6">
                    <h3 className="font-semibold text-[#002b3a]">Where technology can help</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#52656d]">{sector.opportunities.map((item) => <li key={item}>• {item}</li>)}</ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#002b3a] px-7 py-12 text-center text-white md:px-14 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#65c6db]">Your business is not a template</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold md:text-4xl">Let’s work out what the right digital solution looks like.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/75">Tell us what you are trying to improve. We’ll help identify whether you need a website, a product, an integration or a more focused workflow.</p>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e] px-7 py-4 font-semibold text-white">Discuss your project <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </main>
  )
}
