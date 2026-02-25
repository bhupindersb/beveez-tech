import { sanityClient } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

interface BlogPostProps {
  params: { slug: string }
}

// -------------------------
// Reading Time Helper
// -------------------------
function calculateReadingTime(blocks: any[]) {
  if (!blocks) return 1

  const text = blocks
    .map(block =>
      block.children?.map((child: any) => child.text).join('')
    )
    .join(' ')

  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// -------------------------
// SEO Metadata
// -------------------------
export async function generateMetadata(
  { params }: BlogPostProps
): Promise<Metadata> {
  const post = await sanityClient.fetch(
    `
    *[_type == "blogSection" && slug.current == $slug][0]{
      title,
      excerpt,
      coverImage{
        asset->{
          url
        }
      }
    }
  `,
    { slug: params.slug }
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
      url: `https://beveez.tech/blog/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.asset?.url
        ? [post.coverImage.asset.url]
        : [],
    },
  }
}

// -------------------------
// PAGE
// -------------------------
export default async function BlogPost({ params }: BlogPostProps) {
  const post = await sanityClient.fetch(
    `
    *[_type == "blogSection" && slug.current == $slug][0]{
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
    }
  `,
    { slug: params.slug }
  )

  if (!post) return notFound()

  const relatedPosts = await sanityClient.fetch(
    `
    *[_type == "blogSection" && _id != $id]
    | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      coverImage
    }
  `,
    { id: post._id }
  )

  const readingTime = calculateReadingTime(post.content)

  return (
    <article className="pt-[140px] pb-[120px]">
      <div className="mx-auto max-w-[900px] px-6">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-darkOrange">Home</Link> /{' '}
          <Link href="/blog" className="hover:text-darkOrange">Blog</Link> /{' '}
          <span className="text-darkBlue">{post.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-[42px] md:text-[56px] font-heading font-bold text-darkBlue leading-tight">
          {post.title}
        </h1>

        {/* Date + Reading Time */}
        {post.publishedAt && (
          <p className="mt-4 text-sm text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString()} · {readingTime} min read
          </p>
        )}

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative mt-10 aspect-[16/9] rounded-3xl overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(1600).height(900).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-10 text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg prose-headings:font-heading prose-headings:text-darkBlue prose-p:text-gray-700 prose-a:text-darkOrange prose-img:rounded-2xl prose-img:shadow-lg max-w-none mt-12">
          <PortableText value={post.content} />
        </div>

        {/* Author Block */}
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

        {/* Related Posts */}
        {relatedPosts?.length > 0 && (
          <section className="mt-24">
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
          </section>
        )}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              datePublished: post.publishedAt,
              author: {
                '@type': 'Person',
                name: post.author?.name,
              },
            }),
          }}
        />
      </div>
    </article>
  )
}