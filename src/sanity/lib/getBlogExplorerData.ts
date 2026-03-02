import { sanityClient } from './client'

export async function getBlogExplorerData(
  page: number,
  pageSize: number
) {
  const offset = (page - 1) * pageSize

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
        content, // 👈 ADD THIS
        categories[]->{
            _id,
            title,
            slug
        }
      }
      `,
      {
        offset,
        end: offset + pageSize,
      }
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