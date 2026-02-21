import { sanityClient } from './client'

export async function getAllServiceSlugs() {
  const data = await sanityClient.fetch(
    `
    *[_type == "servicePage" && defined(slug.current)]{
      "slug": slug.current
    }
    `
  )

  return data.map((item: any) => item.slug)
}

export async function getServiceBySlug(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "servicePage" && slug.current == $slug][0]{
        title,
        slug,
        seo,

        hero{
            headline,
            subText,
            primaryCtaText,
            primaryCtaUrl,
            backgroundImage{
                asset->{ url }
            }
        },

        heroMetrics[]{
            value,
            label,
            icon{
                asset->{ url }
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

        testimonial{
            quote,
            author
        },

        faq[]{
            question,
            answer,
            highlighted
        },

        ctaOverride{
            heading,
            subText,
            backgroundImage{
            asset->{ url }
            },
            primaryCtaText,
            primaryCtaUrl,
            secondaryCtaText,
            secondaryCtaUrl
        }
    }
    `,
    { slug }
  )
}
