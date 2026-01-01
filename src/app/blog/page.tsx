import { getBlogs } from '@/sanity/lib/getBlogs'
import BlogSection from '@/components/BlogSection'

export default async function BlogPage() {
  const blogs = await getBlogs(50)

  return (
    <main>
      <BlogSection blogs={blogs} />
    </main>
  )
}
