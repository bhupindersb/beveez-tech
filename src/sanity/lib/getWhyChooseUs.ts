import { sanityClient } from './client'

export async function getWhyChooseUs() {
  return sanityClient.fetch(`
    *[_type == "whyChooseUs"][0]{
      ghostHeading,
      heading,
      image,
      points,
      stats[]{
        value,
        suffix,
        title,
        description,
        icon{
          asset->{
            url,
            mimeType
          }
        }
      }
    }
  `)
}
