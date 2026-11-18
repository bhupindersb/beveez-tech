import Link from 'next/link'
import { ArrowUpRight, Building2, BriefcaseBusiness, Code2, ShoppingCart, Users, Workflow } from 'lucide-react'

const industries = [
  { title: 'Real Estate & Property', description: 'Digital experiences and workflows for property discovery, buyer enquiries, brokers and property businesses.', icon: Building2 },
  { title: 'SaaS & Software', description: 'Product websites, developer-focused tools, documentation experiences and scalable application interfaces.', icon: Code2 },
  { title: 'E-commerce & Digital Commerce', description: 'Conversion-focused storefront experiences, WordPress integrations and systems that support online sales.', icon: ShoppingCart },
  { title: 'Professional & B2B Services', description: 'Clear service websites, lead-generation journeys and practical automation for firms that sell expertise.', icon: BriefcaseBusiness },
  { title: 'Startups & Growing Teams', description: 'From a first launch to a more capable digital platform, build the right foundation without unnecessary complexity.', icon: Users },
  { title: 'Operations & Workflow-led Businesses', description: 'Purpose-built tools that reduce repetitive work, connect information and make customer processes easier to manage.', icon: Workflow },
]

export default function IndustriesSection() {
  return (
    <section className="bg-[#f2f1f6] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#147da5]">Industries & use cases</p>
            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-tight text-[#002b3a] md:text-6xl">
              Technology shaped around the way your business works.
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#52656d] md:justify-self-end">
            Different industries have different customers, workflows and constraints. We start with the problem and shape the right digital experience around it.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <article key={industry.title} className="rounded-3xl border border-[#002b3a]/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf6fa] text-[#147da5]"><Icon size={24} /></div>
                <h3 className="mt-6 text-xl font-semibold text-[#002b3a]">{industry.title}</h3>
                <p className="mt-3 leading-7 text-[#5a6b71]">{industry.description}</p>
              </article>
            )
          })}
        </div>
        <div className="mt-9 text-center">
          <Link href="/industries" className="inline-flex items-center gap-2 rounded-full bg-[#002b3a] px-7 py-4 font-semibold text-white transition hover:bg-[#06465a]">
            Explore industries <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
