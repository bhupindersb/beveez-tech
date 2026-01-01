// src/sanity/lib/getFooterSettings.ts
import { sanityClient } from './client'

export async function getFooterSettings() {
  return sanityClient.fetch(`
    *[_type == "footerSettings"][0]{
      logo{
        asset->{url}
      },
      quickLinks[]{
        label,
        url
      },
      services[]{
        label,
        url
      },
      legal[]{
        label,
        url
      },
      copyright
    }
  `)
}
