import { sanityClient } from './client'

export async function getPageSeo(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "page" && slug.current == $slug][0]{
      seoTitle,
      seoDescription,
      seoImage
    }
    `,
    { slug }
  )
}
