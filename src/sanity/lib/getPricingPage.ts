import { sanityClient } from '@/sanity/lib/client'

export async function getPricingPage() {
  return sanityClient.fetch(
    `
    *[
      _type == "page" &&
      template == "pricing"
    ][0]{
      pricingHero{
        headline,
        subText,
        backgroundImage{
            asset->{ url }
        }
      },

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

      pricingAddons[]{
        title,
        description,
        price
      },

      pricingFaqs[]{
        question,
        answer
      },

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
