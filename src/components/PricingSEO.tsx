'use client'

import Script from 'next/script'

interface PricingPlan {
  title: string
  description?: string
  price?: string
  ctaUrl?: string
}

interface PricingFaq {
  question: string
  answer: string
}

interface Props {
  plans: PricingPlan[]
  faqs?: PricingFaq[]
}

export default function PricingSEO({ plans, faqs = [] }: Props) {
  const offers = plans
    .filter(p => p.price)
    .map(p => ({
      '@type': 'Offer',
      name: p.title,
      price: p.price?.replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: p.ctaUrl || 'https://beveez.tech/pricing',
      description: p.description,
    }))

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Beveez Tech Web Services',
    description:
      'Professional website design, development, SEO, and performance optimization services.',
    brand: {
      '@type': 'Brand',
      name: 'Beveez Tech',
    },
    offers,
  }

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <>
      <Script
        id="pricing-product-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      {faqSchema && (
        <Script
          id="pricing-faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  )
}
