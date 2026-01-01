import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

export default function BlogSection({ blogs }: { blogs: any[] }) {
  if (!blogs?.length) return null

  return (
    <section className="pt-0 pb-[60px] md:pb-[120px]">
      <div className="mx-auto max-w-[1280px] px-6">

        {/* SECTION HEADER */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-[48px] md:text-[72px] font-heading font-bold text-darkBlue leading-none">
            Insights & Articles
          </h2>
          <Link
            href="/blog"
            className="text-darkOrange font-semibold hover:underline whitespace-nowrap"
          >
            View all →
          </Link>
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post._id}
              className="group"
            >
              {/* IMAGE */}
              {post.coverImage && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={urlFor(post.coverImage).width(600).height(450).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="mt-6">
                <h3 className="text-xl font-heading font-semibold text-darkBlue">
                  {post.title}
                </h3>

                <p className="mt-3 text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug.current}`}
                  className="mt-4 inline-block font-semibold text-darkOrange"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
