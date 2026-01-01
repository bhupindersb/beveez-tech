import { sanityClient } from './client'

export async function getServicesSection() {
  return sanityClient.fetch(`
    *[_type == "servicesSection"][0]{
      heading,
      subText
    }
  `)
}
