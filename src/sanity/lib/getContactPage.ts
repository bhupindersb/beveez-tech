import { sanityClient } from './client'

export async function getContactPage() {
  return await sanityClient.fetch(`
    *[_type == "contactPage"][0]{
      seo,
      hero{
        headline,
        subText,
        backgroundImage{
          asset->{ url }
        }
      },
      trustPoints,
      testimonial
    }
  `)
}
