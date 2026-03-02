import { getBlogExplorerData } from '@/sanity/lib/getBlogExplorerData'
import BlogHero from '@/components/BlogHero'
import BlogExplorer from '@/components/BlogExplorer'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {

  const { page } = await searchParams

  const currentPage = Number(page || 1)
  const pageSize = 9

  const { blogs, totalCount, categories } =
    await getBlogExplorerData(currentPage, pageSize)

  return (
    <>
      <BlogHero />

      <BlogExplorer
        initialBlogs={blogs}
        categories={categories}
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  )
}