'use client'

import { useEffect } from 'react'

/* ================= TYPES ================= */

interface ServiceDetail {
  heading: string
  description?: string
  ctaUrl?: string
}

interface Props {
  services: ServiceDetail[]
}

/* ================= COMPONENT ================= */

export default function ServiceSEO({ services }: Props) {
  useEffect(() => {
    if (!services || services.length === 0) return

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      provider: {
        '@type': 'Organization',
        name: 'Beveez',
        url: 'https://beveez.tech',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: service.heading,
            description: service.description,
            url: service.ctaUrl,
          },
        })),
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [services])

  return null
}
