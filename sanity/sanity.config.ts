import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {esESLocale} from '@sanity/locale-es-es'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Catálogo Flora Iquitos',

  projectId: '9m09a5ng',
  dataset: 'production',

  plugins: [structureTool(), esESLocale()],

  schema: {
    types: schemaTypes,
  },
})
