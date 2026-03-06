// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import { defineLive } from 'next-sanity/live'
import { sanityClient } from './client'

import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Live content API
export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

/**
 * Helper to generate optimized Sanity image URLs
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}