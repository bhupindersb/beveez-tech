import { sanityClient } from './client'

export async function getAboutPage() {
  return sanityClient.fetch(`
    *[_type == "aboutPage" && slug.current == "about"][0]{
      hero {
        backgroundImage,
        headline,
        subText,
        ctaText,
        ctaUrl
      },
      values[] {
        title,
        description,
        icon {
          asset->{ url }
        }
      },
      seo {
        seoTitle,
        seoDescription,
        seoImage {
          asset->{ url }
        }
      }
    }
  `)
}
