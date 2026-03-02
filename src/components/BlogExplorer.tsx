'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  initialBlogs: any[]
  categories: any[]
  totalCount: number
  currentPage: number
  pageSize: number
}

export default function BlogExplorer({
  initialBlogs,
  categories,
  totalCount,
  pageSize,
}: Props) {

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(pageSize)

  // 🔎 Filter Logic
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        !activeCategory ||
        blog.categories?.some(
          (cat: any) => cat.slug?.current === activeCategory
        )

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory, initialBlogs])

  const visibleBlogs = filteredBlogs.slice(0, visibleCount)

  return (
    <section className="relative pb-[140px]">

      {/* ================= STICKY FILTER BAR ================= */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-[1280px] px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-darkOrange"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                !activeCategory
                  ? 'bg-darkBlue text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              All
            </button>

            {categories.map((cat: any) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat.slug.current)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  activeCategory === cat.slug.current
                    ? 'bg-darkBlue text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ================= MASONRY GRID ================= */}
      <div className="mx-auto max-w-[1280px] px-6 mt-16">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >

          {visibleBlogs.map((post: any) => (
            <motion.article
              key={post._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="break-inside-avoid bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >

              {/* Featured Image with Gradient Overlay */}
              {post.coverImage && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(post.coverImage).width(600).height(450).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              <div className="p-6">

                {/* Category Badge */}
                {post.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((cat: any) => (
                      <span
                        key={cat._id}
                        className="text-xs bg-darkOrange/10 text-darkOrange px-3 py-1 rounded-full"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                )}

                <Link href={`/blog/${post.slug.current}`}>
                  <h3 className="text-xl font-heading font-semibold text-darkBlue group-hover:text-darkOrange transition">
                    {post.title}
                  </h3>
                </Link>

                <p className="mt-3 text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 px-2 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </motion.article>
          ))}

        </motion.div>

        {/* ================= LOAD MORE ================= */}
        {visibleCount < filteredBlogs.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + pageSize)}
              className="bg-darkBlue text-white px-8 py-4 rounded-full hover:bg-darkOrange transition"
            >
              Load More
            </button>
          </div>
        )}

        {/* ================= NEWSLETTER ================= */}
        <div className="mt-24 bg-darkBlue text-white p-12 rounded-3xl text-center">
          <h3 className="text-3xl font-heading font-bold">
            Join 1,000+ Founders Improving Their Websites
          </h3>
          <p className="mt-4 text-gray-300 text-lg">
            Get actionable SEO and performance insights straight to your inbox.
          </p>
          <form className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-6 py-4 rounded-full text-black w-full md:w-[320px]"
            />
            <button
              type="submit"
              className="bg-darkOrange px-8 py-4 rounded-full hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}