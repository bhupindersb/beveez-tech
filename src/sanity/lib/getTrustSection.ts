import { sanityClient } from './client'

export async function getTrustSection() {
  return sanityClient.fetch(`
    *[_type == "trust"][0]{
      heading,
      headingIcon{
        asset->{
          url
        }
      },
      items[]{
        title,
        icon{
          asset->{
            url
          }
        }
      }
    }
  `)
}
