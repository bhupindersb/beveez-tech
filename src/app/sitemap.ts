import { getBlogs } from '@/sanity/lib/getBlogs'

export default async function sitemap() {

  const blogs = await getBlogs(100)

  const blogUrls = blogs.map((post:any) => ({
    url: `https://beveez.tech/blog/${post.slug.current}`,
    lastModified: post.publishedAt
  }))

  return [
    {
      url: 'https://beveez.tech',
      lastModified: new Date(),
    },
    {
      url: 'https://beveez.tech/blog',
      lastModified: new Date(),
    },
    ...blogUrls
  ]
}