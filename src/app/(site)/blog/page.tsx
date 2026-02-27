import { getBlogs } from '@/sanity/lib/getBlogs'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

function calculateReadingTime(excerpt: string) {
  const words = excerpt?.split(/\s+/).length || 0
  return Math.max(1, Math.ceil(words / 200))
}

export default async function BlogPage() {
  const blogs = await getBlogs(50)

  if (!blogs?.length) {
    return <div className="pt-40 text-center">No blog posts found.</div>
  }

  const [featured, ...rest] = blogs

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-[160px] pb-20">
        <div className="mx-auto max-w-[1100px] px-6">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-darkBlue">
            Insights & Articles
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl">
            Expert insights on performance optimization, SEO strategies, 
            and modern web development for startups and SaaS businesses.
          </p>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1100px] px-6">
          <Link
            href={`/blog/${featured.slug.current}`}
            className="group block"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

              {featured.coverImage && (
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                  <Image
                    src={urlFor(featured.coverImage).width(1200).height(800).url()}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              <div>
                <span className="text-sm font-semibold text-darkOrange uppercase">
                  Featured Article
                </span>

                <h2 className="mt-4 text-3xl md:text-4xl font-heading font-bold text-darkBlue group-hover:text-darkOrange transition">
                  {featured.title}
                </h2>

                <p className="mt-4 text-gray-600 text-lg">
                  {featured.excerpt}
                </p>

                <div className="mt-6 text-sm text-gray-500">
                  {calculateReadingTime(featured.excerpt)} min read
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="pb-[120px]">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="grid md:grid-cols-3 gap-10">

            {rest.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group"
              >
                <article className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition">

                  {post.coverImage && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={urlFor(post.coverImage).width(600).height(450).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-darkBlue group-hover:text-darkOrange transition">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-gray-600 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 text-sm text-gray-500">
                      {calculateReadingTime(post.excerpt)} min read
                    </div>
                  </div>
                </article>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* OPTIONAL CTA */}
      <section className="pb-[140px]">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="bg-darkBlue text-white p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-heading font-bold">
              Want Help Optimizing Your Website?
            </h3>
            <p className="mt-4 text-gray-300 text-lg">
              We help startups improve performance, SEO rankings, and conversions.
            </p>
            <Link
              href="/start-project"
              className="inline-block mt-8 bg-darkOrange px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}