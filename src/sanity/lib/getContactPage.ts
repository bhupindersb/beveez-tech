import { client } from './client'

export async function getContactPage() {
  return client.fetch(`
    *[_type == "page" && template == "contact"][0]{
      title,
      seo,
      hero{
        headline,
        subText,
        backgroundImage{
          asset->{url}
        }
      },
      trustPoints,
      testimonial{
        quote,
        author
      }
    }
  `)
}
