import { sanityClient } from './client'

export async function getWhoWeWorkWith() {
  return sanityClient.fetch(`
    *[_type == "whoWeWorkWith"][0]{
      heading,
      intro,
      points,
      closingNote,
      testimonialText,
      testimonialAuthor
    }
  `)
}
