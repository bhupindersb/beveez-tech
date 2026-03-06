import BlogSection from './BlogSection'
import { getBlogs } from '@/sanity/lib/getBlogs'

export default async function BlogSectionWrapper() {
  const blogs = await getBlogs(50)

  return <BlogSection blogs={blogs} />
}