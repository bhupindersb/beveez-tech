import { sanityClient } from './client'

export async function getServiceBySlug(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "serviceDetail" && slug.current == $slug][0]{
      title,
      seo,
      hero{
        headline,
        subText,
        backgroundImage{
          asset->{ url }
        }
      },
      problem,
      whatWeDo,
      process,
      deliverables,
      faq,
      cta
    }
    `,
    { slug }
  )
}
