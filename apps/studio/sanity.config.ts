import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {resolve} from './src/sanity/presentation/resolve'

export default defineConfig({
  name: 'default',
  title: 'Nina Blog',

  projectId: 'q19duczp',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
