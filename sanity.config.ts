import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Beveez Tech Studio',

  projectId: 't3775is3',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
})