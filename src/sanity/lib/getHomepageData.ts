import { sanityClient } from '@/sanity/lib/client'

export async function getHomepageData() {
  return sanityClient.fetch(
    `
{
  "page": *[_type == "page" && slug.current == "home"][0]{
    heroBackground,
    heroHighlightImage,
    heroHeadline,
    heroHighlight,
    heroSubheadline,
    heroPrimaryCtaText,
    heroPrimaryCtaUrl,
    heroSecondaryCtaText,
    heroSecondaryCtaUrl
  },

  "trust": *[_type match "trust*"][0],

  "servicesSection": *[_type == "servicesSection"][0],

  "services": *[_type == "service"] | order(order asc),

  "whyChooseUs": *[_type == "whyChooseUs"][0],

  "whoWeWorkWith": *[_type == "whoWeWorkWith"][0],

  "pricingSection": *[_type == "pricingSection"][0],

  "pricingPlans": *[_type == "pricingPlan"] | order(order asc),

  "ctaSection": *[_type == "ctaSection"][0],

  "blogs": *[_type match "post*"] | order(publishedAt desc)[0...50]
}
`,
    {},
    { next: { revalidate: 86400 } }
  )
}