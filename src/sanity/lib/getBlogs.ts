import { sanityClient } from './client'

export async function getBlogs(limit = 3) {
  return sanityClient.fetch(`
    *[_type == "blog"]
    | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      publishedAt
    }
  `, { limit })
}
