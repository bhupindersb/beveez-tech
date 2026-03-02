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

function calculateReadingTime(blocks: any[]) {
  if (!blocks) return 1
  const text = blocks
    .map((block: any) =>
      block.children?.map((child: any) => child.text).join('')
    )
    .join(' ')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function BlogExplorer({
  initialBlogs,
  categories,
  pageSize,
}: Props) {

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(pageSize)

  const [featured, ...restBlogs] = initialBlogs

  const filteredBlogs = useMemo(() => {
    return restBlogs.filter((blog) => {
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
  }, [search, activeCategory, restBlogs])

  const visibleBlogs = filteredBlogs.slice(0, visibleCount)

  return (
    <section className="relative pb-[140px]">

      {/* ================= FEATURED ARTICLE ================= */}
      {featured && (
        <div className="mx-auto max-w-[1280px] px-6 mt-16 mb-24">
          <Link
            href={`/blog/${featured.slug.current}`}
            className="group block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl">

              {featured.coverImage && (
                <div className="relative aspect-[16/8]">
                  <Image
                    src={urlFor(featured.coverImage).width(1600).height(900).url()}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              )}

              <div className="absolute bottom-0 p-10 text-white max-w-3xl">
                <span className="uppercase text-sm tracking-wider text-darkOrange">
                  Featured Article
                </span>

                <h2 className="mt-4 text-3xl md:text-4xl font-heading font-bold">
                  {featured.title}
                </h2>

                <p className="mt-4 text-gray-200">
                  {featured.excerpt}
                </p>

                <div className="mt-4 text-sm text-gray-300">
                  {calculateReadingTime(featured.content)} min read
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ================= STICKY FILTER BAR ================= */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-[1280px] px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">

          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-darkOrange"
          />

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
              {post.coverImage && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(post.coverImage).width(600).height(450).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
                  {calculateReadingTime(post.content)} min read
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

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
      </div>
    </section>
  )
}