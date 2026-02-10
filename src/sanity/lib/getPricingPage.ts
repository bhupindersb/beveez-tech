import { sanityClient } from '@/sanity/lib/client'

export async function getPricingPage() {
  return sanityClient.fetch(`
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

      howItWorks,

      "pricingPlans": pricingPlans[]->{
        planType,
        title,
        description,
        price,
        monthlyPrice,
        bestFor,
        features,
        highlighted,
        ctaText,
        ctaUrl,
        order
      } | order(order asc),

      "pricingAddons": pricingAddons[]{
        title,
        description,
        price,
        ctaText,
        ctaUrl,
        order
      } | order(order asc),

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
  `)
}
