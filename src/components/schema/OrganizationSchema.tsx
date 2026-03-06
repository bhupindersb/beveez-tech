export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Beveez Tech",
    url: "https://beveez.tech",
    logo: "https://beveez.tech/logo.png",
    sameAs: [
      "https://linkedin.com/company/beveez-tech",
      "https://twitter.com/beveeztech"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}