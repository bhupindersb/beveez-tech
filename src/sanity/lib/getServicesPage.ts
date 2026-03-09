import { sanityClient } from '@/sanity/lib/client'

export async function getServicesPage() {
  return sanityClient.fetch(`
    *[
      _type == "page" &&
      template == "services"
    ][0]{
      hero{
        headline,
        subText,
        primaryCtaText,
        primaryCtaUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        backgroundImage{ asset->{ url } }
      },

      heroIcons[]{
        label,
        description,
        icon{ asset->{ url } }
      },

      serviceDetails[]{
        heading,
        subText,
        description,
        includes,
        ctaText,
        ctaUrl,
        accent,
        visual{
          type,
          image{ asset->{ url } }
        }
      },

      ctaOverride{
        heading,
        subText,
        primaryCtaText,
        primaryCtaUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        backgroundImage{ asset->{ url } }
      }
    }
  `)
}

