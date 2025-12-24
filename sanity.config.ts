import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Schemas
import {page} from './schemaTypes/page'
import {service} from './schemaTypes/services'
import {pricing} from './schemaTypes/pricing'

// Optional custom structure (safe to keep)
import {structure} from './src/sanity/structure'

// Hardcoded for Studio stability (we will clean this later)
const projectId = 't3775is3'
const dataset = 'production'
const apiVersion = '2023-10-01'

export default defineConfig({
  name: 'default',
  title: 'Beveez Tech Studio',

  basePath: '/sanity',

  projectId,
  dataset,
  apiVersion,

  schema: {
    types: [page, service, pricing],
  },

  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
