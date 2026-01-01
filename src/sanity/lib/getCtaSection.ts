import { sanityClient } from './client'

export async function getCtaSection() {
  return sanityClient.fetch(`
    *[_type == "ctaSection"][0]{
      heading,
      subText,
      backgroundImage,
      primaryCtaText,
      primaryCtaUrl,
      secondaryCtaText,
      secondaryCtaUrl
    }
  `)
}
