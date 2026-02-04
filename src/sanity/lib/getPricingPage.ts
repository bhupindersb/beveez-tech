import { sanityClient } from './client'

export async function getPricingPage() {
  return sanityClient.fetch(`
    *[
      _type == "page" &&
      template == "pricing"
    ][0]{

      /* ================= HERO ================= */
      pricingHero{
        headline,
        subText
      },

      /* ================= PLANS ================= */
      pricingPlans[]->{
        title,
        description,
        price,
        bestFor,
        features,
        ctaText,
        ctaUrl,
        highlighted,
        order
      } | order(order asc),

      /* ================= ADD-ONS ================= */
      pricingAddons[]{
        title,
        description,
        price
      },

      /* ================= HOW IT WORKS ================= */
      howItWorks,

      /* ================= FAQ ================= */
      pricingFaqs[]{
        question,
        answer
      },

      /* ================= CTA OVERRIDE ================= */
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
