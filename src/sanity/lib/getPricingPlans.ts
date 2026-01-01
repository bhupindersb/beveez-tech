import { sanityClient } from './client'

export async function getPricingPlans() {
  return sanityClient.fetch(`
    *[_type == "pricingPlan"] | order(order asc)
  `)
}
