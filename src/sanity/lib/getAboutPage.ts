import { sanityClient } from './client'

export async function getAboutPage() {
  return sanityClient.fetch(
    `
    *[
      _type == "page" &&
      slug.current == "about" &&
      template == "about"
    ][0]{
      aboutHero{
        headline,
        subText,
        ctaText,
        ctaUrl,
        backgroundImage{
          asset->{
            url
          }
        }
      },
      values[]{
        title,
        description,
        icon{
          asset->{
            url
          }
        }
      },
      whoWeWorkWith{
        headline,
        description,
        sideNote,
        footerText,
        audiences[]{
          title,
          description,
          icon{
            asset->{
              url
            }
          }
        }
      }
    }
    `
  )
}
