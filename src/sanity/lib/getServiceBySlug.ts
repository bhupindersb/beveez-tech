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
        backgroundImage{
          asset->{ url }
        }
      },
      problem{
        heading,
        content
      },
      whatWeDo,
      process,
      deliverables,
      faq[]{
        question,
        answer
      },
      cta{
        heading,
        subText,
        buttonText,
        buttonUrl
      }
    }
    `,
    { slug }
  )
}
