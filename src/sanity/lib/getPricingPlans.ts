import { sanityClient } from './client'

export async function getPricingPlans() {
  return sanityClient.fetch(`
    *[_type == "pricingPlan"] | order(order asc){
      title,
      description,
      price,
      bestFor,
      features,
      highlighted,
      paymentProvider,
      paymentLink,
      ctaText,
      order,
      planType
    }
  `)
}