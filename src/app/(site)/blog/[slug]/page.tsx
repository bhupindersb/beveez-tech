import { sanityClient } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export default async function BlogPost({ params }: any) {
  const post = await sanityClient.fetch(`
    *[_type == "blogSection" && slug.current == $slug][0]{
      title,
      coverImage,
      content
    }
  `, { slug: params.slug })

  if (!post) return null

  return (
    <article className="py-[120px]">
      <div className="mx-auto max-w-[800px] px-6">

        <h1 className="text-[48px] font-heading font-bold text-darkBlue">
          {post.title}
        </h1>

        {post.coverImage && (
          <div className="relative mt-8 aspect-[16/9] rounded-3xl overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(1600).height(900).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg mt-10">
          {/* Portable Text can be added later */}
        </div>
      </div>
    </article>
  )
}
