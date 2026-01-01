import { sanityClient } from './client'

export async function getServices() {
  return sanityClient.fetch(`
    *[_type == "service"] | order(_createdAt asc){
      _id,
      title,
      description,
      image
    }
  `)
}
