import { sanityClient } from './client'

export async function getContactPage() {
  return sanityClient.fetch(`
    *[_type == "page" && template == "contact"][0]{
      title,
      seo {
        seoTitle,
        seoDescription
      },
      contactHero {
        headline,
        subText,
        backgroundImage {
          asset->{url}
        }
      },
      contactTrustPoints,
      contactTestimonial {
        quote,
        author
      }
    }
  `)
}
