import { sanityClient } from '@/sanity/lib/client'

export async function getServicesPage() {
  return sanityClient.fetch(`
    *[
      _type == "servicePage"
    ][0]{
      hero{
        headline,
        subText,
        primaryCtaText,
        primaryCtaUrl,
        backgroundImage{
          asset->{
            url
          }
        }
      },

      heroMetrics[]{
        value,
        label,
        icon{
          asset->{
            url
          }
        }
      },

      problem{
        heading,
        content,
        impactPoints
      },

      whatWeDo,

      process,

      deliverables,

      comparison{
        heading,
        beforePoints,
        afterPoints
      },

      faq[]{
        question,
        answer
      },

      testimonial{
        quote,
        author
      },

      ctaOverride{
        heading,
        subText,
        primaryCtaText,
        primaryCtaUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        backgroundImage{
          asset->{
            url
          }
        }
      }
    }
  `)
}