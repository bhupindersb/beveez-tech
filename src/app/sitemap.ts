import { getBlogs } from '@/sanity/lib/getBlogs'

export default async function sitemap() {

  const blogs = await getBlogs(100)

  const blogUrls = blogs.map((post: any) => ({
    url: `https://beveez.tech/blog/${post.slug.current}`,
    lastModified: post.publishedAt || new Date()
  }))

  const staticPages = [
    {
      url: 'https://beveez.tech',
      lastModified: new Date()
    },
    {
      url: 'https://beveez.tech/about',
      lastModified: new Date()
    },
    {
      url: 'https://beveez.tech/services',
      lastModified: new Date()
    },
    {
      url: 'https://beveez.tech/start-project',
      lastModified: new Date()
    },
    {
      url: 'https://beveez.tech/free-audit',
      lastModified: new Date()
    },
    {
      url: 'https://beveez.tech/blog',
      lastModified: new Date()
    }
  ]

  return [...staticPages, ...blogUrls]
}