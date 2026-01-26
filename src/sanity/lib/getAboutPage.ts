import { sanityClient } from '@/sanity/lib/client'

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
          asset->{ url }
        }
      },

      values[]{
        title,
        description,
        icon{
          asset->{ url }
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
            asset->{ url }
          }
        }
      },

      ourApproach{
        heading,
        subText,
        steps[]{
          number,
          title,
          description
        },
        visual{
          backgroundImage{ asset->{ url } },
          mainImage{ asset->{ url } },
          subText
        }
      },

      whyChooseUsAbout{
        heading,
        points,
        description,
        testimonial{
          quote,
          author
        }
      },

      ctaOverride{
        heading,
        subText,

        backgroundImage{
          asset->{
            _id,
            url
          }
        },

        primaryCtaText,
        primaryCtaUrl,
        secondaryCtaText,
        secondaryCtaUrl
      }

    }
    `
  )
}
