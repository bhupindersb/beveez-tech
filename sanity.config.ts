import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './src/sanity/structure'
import { codeInput } from '@sanity/code-input'

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
    types: schemaTypes,
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],
})
