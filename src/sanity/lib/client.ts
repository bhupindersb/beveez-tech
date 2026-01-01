import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: 't3775is3',
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: false,
})
