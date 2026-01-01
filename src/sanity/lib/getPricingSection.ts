import { sanityClient } from './client'

export async function getPricingSection() {
  return sanityClient.fetch(`
    *[_type == "pricingSection"][0]
  `)
}
