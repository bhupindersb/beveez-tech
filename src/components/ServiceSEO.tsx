'use client'

import Script from 'next/script'

interface Service {
  heading: string
  description?: string
  ctaUrl?: string
}

interface Props {
  services: Service[]
}

export default function ServiceSEO({ services }: Props) {
  if (!services || services.length === 0) return null

  const serviceSchemas = services.map(service => ({
    '@type': 'Service',
    name: service.heading,
    description: service.description?.replace(/\n+/g, ' ').trim(),
    provider: {
      '@type': 'Organization',
      name: 'Beveez Tech',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Global',
    },
    url: service.ctaUrl || 'https://beveez.tech/services',
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: serviceSchemas.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: service,
    })),
  }

  return (
    <Script
      id="services-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  )
}
