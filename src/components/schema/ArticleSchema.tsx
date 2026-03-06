export default function ArticleSchema({ post }: { post: any }) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: {
      "@type": "Person",
      name: post.author?.name
    },
    publisher: {
      "@type": "Organization",
      name: "Beveez Tech",
      logo: {
        "@type": "ImageObject",
        url: "https://beveez.tech/logo.png"
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: `https://beveez.tech/blog/${post.slug.current}`
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}