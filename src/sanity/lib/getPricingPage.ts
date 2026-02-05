import { sanityClient } from '@/sanity/lib/client'

export async function getPricingPage() {
  return sanityClient.fetch(
    `
    *[
      _type == "page" &&
      template == "pricing"
    ][0]{
      /* HERO */
      pricingHero{
        headline,
        subText
      },

      /* PLANS */
      pricingPlans[]->{
        title,
        description,
        price,
        bestFor,
        features,
        ctaText,
        ctaUrl,
        highlighted,
        paymentProvider,
        paymentLink,
        order
      } | order(order asc),

      /* ADDONS */
      pricingAddons[]{
        title,
        description,
        price
      },

      /* FAQ */
      pricingFaqs[]{
        question,
        answer
      },

      /* CTA */
      ctaOverride{
        heading,
        subText,
        primaryCtaText,
        primaryCtaUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        backgroundImage{
          asset->{ url }
        }
      }
    }
    `
  )
}
