import { sanityClient } from './client'

export async function getPricingPage() {
  return sanityClient.fetch(
    `
    *[
      _type == "page" &&
      template == "pricing"
    ][0]{
      pricingHero{
        headline,
        subText
      },

      pricingPlans[]->{
        title,
        description,
        price,
        bestFor,
        features,
        ctaText,
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

      howItWorks,

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
