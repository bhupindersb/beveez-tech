import { sanityClient } from './client'

export async function getBlogExplorerData(
  page: number,
  pageSize: number
) {
  const offset = (page - 1) * pageSize
  const end = offset + pageSize

  const [blogs, totalCount, categories] = await Promise.all([
    sanityClient.fetch(
      `
      *[_type == "blogSection"]
      | order(publishedAt desc)[$offset...$end]{
        _id,
        title,
        slug,
        excerpt,
        coverImage,
        publishedAt,
        tags,
        categories[]->{
          _id,
          title,
          slug
        },
        "readingTime": round(length(pt::text(content)) / 5 / 200)
      }
      `,
      { offset, end }
    ),

    sanityClient.fetch(
      `count(*[_type == "blogSection"])`
    ),

    sanityClient.fetch(
      `*[_type == "category"]{
        _id,
        title,
        slug
      }`
    ),
  ])

  return {
    blogs,
    totalCount,
    categories,
  }
}