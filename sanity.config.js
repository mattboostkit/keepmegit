/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/studio` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'keepme',
  title: 'KeepMe CMS',
  projectId: '2yws8jj2',
  dataset: 'production',
  plugins: [
    deskTool(),
    visionTool(),
    codeInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
