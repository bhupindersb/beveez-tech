import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

function calculateReadingTime(text: string) {
  const wordsPerMinute = 200
  const words = text?.split(/\s+/).length || 0
  return Math.ceil(words / wordsPerMinute)
}

export default function BlogSection({ blogs }: { blogs: any[] }) {
  if (!blogs?.length) return null

  const limitedBlogs = blogs.slice(0, 3)

  return (
    <section className="pt-0 pb-[80px] md:pb-[120px]">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* HEADER */}
        <div className="mb-14 flex items-center justify-between">
          <h2 className="text-[44px] md:text-[64px] font-heading font-bold text-darkBlue leading-none">
            Insights & Articles
          </h2>

          <Link
            href="/blog"
            className="text-darkOrange font-semibold hover:underline"
          >
            View all →
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {limitedBlogs.map((post) => {
            const readingTime = calculateReadingTime(post.excerpt)

            return (
              <article
                key={post._id}
                className="group transition duration-300 hover:-translate-y-1"
              >

                {/* IMAGE */}
                {post.coverImage && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={urlFor(post.coverImage).width(600).height(450).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="mt-6">

                  {/* CATEGORY */}
                  {post.category && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-darkOrange">
                      {post.category.title}
                    </span>
                  )}

                  {/* TITLE */}
                  <h3 className="mt-2 text-xl font-heading font-semibold text-darkBlue leading-snug group-hover:text-darkOrange transition">
                    <Link href={`/blog/${post.slug.current}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* EXCERPT */}
                  <p className="mt-3 text-gray-600 line-clamp-3 text-[15px]">
                    {post.excerpt}
                  </p>

                  {/* META */}
                  <div className="mt-4 text-sm text-gray-500 flex items-center gap-2 flex-wrap">

                    {post.author?.name && (
                      <span>By {post.author.name}</span>
                    )}

                    {post.publishedAt && (
                      <>
                        <span>•</span>
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </>
                    )}

                    <span>•</span>
                    <span>{readingTime} min read</span>

                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}