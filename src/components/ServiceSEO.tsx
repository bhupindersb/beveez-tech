import Head from 'next/head'

interface Props {
  seo?: {
    seoTitle?: string
    seoDescription?: string
  }
  services: {
    heading: string
    description?: string
  }[]
}

export default function ServiceSEO({ seo, services }: Props) {
  const title =
    seo?.seoTitle ?? 'Services | Beveez'

  const description =
    seo?.seoDescription ??
    'Professional web design, WordPress optimization, headless CMS development, and SEO-friendly builds.'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            provider: {
              '@type': 'Organization',
              name: 'Beveez',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Services',
              itemListElement: services.map(service => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: service.heading,
                  description: service.description,
                },
              })),
            },
          }),
        }}
      />
    </Head>
  )
}
