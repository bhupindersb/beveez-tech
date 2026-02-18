import { sanityClient } from './client'

export async function getContactPage() {
  return sanityClient.fetch(`
    *[_type == "page" && template == "contact"][0]{
      title,
      seo {
        seoTitle,
        seoDescription,
        seoImage {
          asset->{url}
        }
      },
      hero {
        headline,
        subText,
        backgroundImage {
          asset->{url}
        }
      },
      trustPoints,
      testimonial {
        quote,
        author
      }
    }
  `)
}
