import { getBlogExplorerData } from '@/sanity/lib/getBlogExplorerData'
import BlogHero from '@/components/BlogHero'
import BlogExplorer from '@/components/BlogExplorer'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function BlogPage({ searchParams }: Props) {
  const page = Number(searchParams.page || 1)
  const pageSize = 9

  const { blogs, totalCount, categories } =
    await getBlogExplorerData(page, pageSize)

  return (
    <>
      <BlogHero />

      <BlogExplorer
        initialBlogs={blogs}
        categories={categories}
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
      />
    </>
  )
}