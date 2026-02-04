import { sanityClient } from './client'

export async function getPricingPage() {
  return sanityClient.fetch(`
    *[
      _type == "page" &&
      template == "pricing"
    ][0]{
      pricingPage{
        hero{
          headline,
          subText
        },
        plans[]{
          title,
          price,
          description,
          bestFor,
          features,
          ctaText,
          ctaUrl,
          highlighted
        },
        addons[]{
          title,
          description
        },
        howItWorks,
        faqs[]{
          question,
          answer
        }
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
