import { sanityClient } from './client'

export async function getSiteSettings() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0]{
      logo{
        asset->{
          url
        }
      },
      navigation[]{
        label,
        url
      },
      navCtaText,
      navCtaUrl
    }
  `)
}
