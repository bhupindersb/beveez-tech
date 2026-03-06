export default function BreadcrumbSchema({ title, slug }: any) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://beveez.tech"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://beveez.tech/blog"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://beveez.tech/blog/${slug}`
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}