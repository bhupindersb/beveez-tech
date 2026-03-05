import { sanityClient } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import ReadingProgress from '@/components/ReadingProgress'
import FadeInHeading from '@/components/FadeInHeading'
import CodeBlock from '@/components/CodeBlock'
import TableOfContents from '@/components/TableOfContents'

// ==============================
// Reading Time Helper
// ==============================
function calculateReadingTime(blocks: any[]) {
  if (!blocks) return 1
  const text = blocks
    .map(block =>
      block.children?.map((child: any) => child.text).join('')
    )
    .join(' ')
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// ==============================
// PortableText Styling
// ==============================
const portableTextComponents: PortableTextComponents = {

  block: {
    h2: ({ children }) => (
      <FadeInHeading as="h2">
        {children}
      </FadeInHeading>
    ),

    h3: ({ children }) => (
      <FadeInHeading as="h3">
        {children}
      </FadeInHeading>
    ),

    normal: ({ children }) => (
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        {children}
      </p>
    ),
  },

  types: {
    code: ({ value }) => (
      <CodeBlock
        code={value.code}
        language={value.language || 'javascript'}
      />
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-darkBlue">
        {children}
      </strong>
    ),

    code: ({ children }) => (
      <code className="bg-darkBlue/5 text-darkOrange px-2 py-1 rounded-md text-sm font-mono">
        {children}
      </code>
    ),
  },
}

// ==============================
// SEO
// ==============================
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

  const { slug } = await params

  const post = await sanityClient.fetch(
    `*[_type == "blogSection" && slug.current == $slug][0]{
      title,
      excerpt,
      coverImage{ asset->{ url } }
    }`,
    { slug }
  )

  if (!post) return {}

  return {
    title: `${post.title} | Beveez Tech`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.asset?.url
        ? [{ url: post.coverImage.asset.url }]
        : [],
      type: 'article',
    },
  }
}

// ==============================
// PAGE
// ==============================
export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const post = await sanityClient.fetch(
    `*[_type == "blogSection" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      coverImage,
      content,
      publishedAt,
      excerpt,
      author->{
        name,
        image,
        bio
      }
    }`,
    { slug }
  )

  if (!post) return notFound()

  const relatedPosts = await sanityClient.fetch(
    `*[_type == "blogSection" && _id != $id]
     | order(publishedAt desc)[0...3]{
      _id, title, slug, coverImage
     }`,
    { id: post._id }
  )

  const readingTime = calculateReadingTime(post.content)

  return (
    <>
      <ReadingProgress />

      {/* HERO */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-[160px] pb-20">
        <div className="mx-auto max-w-[1100px] px-6">

          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/">Home</Link> /{' '}
            <Link href="/blog">Blog</Link> /{' '}
            <span className="text-darkBlue">{post.title}</span>
          </nav>

          <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight text-darkBlue max-w-4xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-xl text-gray-600 max-w-3xl">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
            {post.publishedAt && (
              <span>
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            )}
            <span>· {readingTime} min read</span>
          </div>

        </div>
      </section>

      {/* COVER IMAGE */}
      {post.coverImage && (
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="relative mt-12 aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={urlFor(post.coverImage).width(1600).height(900).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <section className="pb-[120px] pt-16">
        <TableOfContents />
        <div className="mx-auto max-w-[820px] px-6">

          <PortableText
            value={post.content}
            components={portableTextComponents}
          />

          {/* AUTHOR */}
          {post.author && (
            <div className="mt-20 p-8 bg-gray-50 rounded-3xl flex gap-6 items-center">
              {post.author.image && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(post.author.image).width(200).height(200).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-heading font-semibold text-lg">
                  {post.author.name}
                </h4>
                <p className="text-gray-600 mt-2">
                  {post.author.bio}
                </p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-24 bg-darkBlue text-white p-12 rounded-3xl text-center">
            <h3 className="text-3xl font-heading font-bold">
              Want to Improve Your Website Performance?
            </h3>
            <p className="mt-4 text-lg text-gray-300">
              Get a free website performance audit and actionable recommendations.
            </p>
            <Link
              href="/start-project"
              className="inline-block mt-8 bg-darkOrange text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition"
            >
              Get Free Audit
            </Link>
          </div>

          {/* RELATED */}
          {relatedPosts?.length > 0 && (
            <div className="mt-24">
              <h3 className="text-3xl font-heading font-bold mb-8 text-darkBlue">
                Related Articles
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((item: any) => (
                  <Link
                    key={item._id}
                    href={`/blog/${item.slug.current}`}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src={urlFor(item.coverImage).width(600).height(450).url()}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <h4 className="mt-4 font-semibold text-darkBlue group-hover:text-darkOrange transition">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}