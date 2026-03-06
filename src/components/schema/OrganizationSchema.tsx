export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Beveez Tech",
    url: "https://beveez.tech",
    logo: "https://beveez.tech/logo.png",
    sameAs: [
      "https://www.linkedin.com/company/beveez-tech"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}