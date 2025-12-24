import type { Metadata } from 'next'
import { sanityClient } from '@/sanity/lib/client'

/* ---------------------------
   DATA FETCHING
---------------------------- */

async function getHomePage() {
  return sanityClient.fetch(`
    *[_type == "page" && slug.current == "home"][0]{
      title,
      heroHeadline,
      heroSubheadline,
      seoTitle,
      seoDescription
    }
  `)
}

async function getServices() {
  return sanityClient.fetch(`
    *[_type == "service"]{
      _id,
      name,
      description,
      features,
      priceFrom
    }
  `)
}

async function getPricing() {
  return sanityClient.fetch(`
    *[_type == "pricing"]{
      _id,
      planName,
      price,
      features,
      highlighted
    }
  `)
}

/* ---------------------------
   SEO METADATA
---------------------------- */

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()

  return {
    title:
      page?.seoTitle ||
      'Beveez Tech — Performance-First Web Development',
    description:
      page?.seoDescription ||
      'High-performance websites, headless WordPress, and speed optimization for businesses targeting growth.',
    openGraph: {
      title: page?.seoTitle,
      description: page?.seoDescription,
      url: 'https://beveez.tech',
      siteName: 'Beveez Tech',
      type: 'website',
    },
  }
}

/* ---------------------------
   PAGE
---------------------------- */

export default async function Home() {
  const [page, services, pricing] = await Promise.all([
    getHomePage(),
    getServices(),
    getPricing(),
  ])

  if (!page) {
    return <div className="p-10">Homepage not found</div>
  }

  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {page.heroHeadline}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {page.heroSubheadline}
        </p>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Services</h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {services.map((service: any) => (
              <div
                key={service._id}
                className="bg-white p-8 rounded-xl border"
              >
                <h3 className="text-xl font-semibold">
                  {service.name}
                </h3>
                <p className="mt-3 text-gray-600">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2 text-sm">
                  {service.features?.map((f: string) => (
                    <li key={f}>✔ {f}</li>
                  ))}
                </ul>

                {service.priceFrom && (
                  <p className="mt-6 font-medium">
                    From ${service.priceFrom}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Pricing</h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pricing.map((plan: any) => (
              <div
                key={plan._id}
                className={`p-8 rounded-xl border ${
                  plan.highlighted
                    ? 'border-black shadow-lg'
                    : 'border-gray-200'
                }`}
              >
                <h3 className="text-xl font-semibold">
                  {plan.planName}
                </h3>
                <p className="mt-4 text-3xl font-bold">
                  {plan.price}
                </p>

                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features?.map((f: string) => (
                    <li key={f}>✔ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
