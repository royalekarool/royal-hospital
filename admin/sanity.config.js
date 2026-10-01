import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import Logo from './components/Logo'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'zcymyfvp'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Documents that exist only once (cannot be created twice or deleted)
const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
  name: 'royal-hospital',
  title: 'Royal Hospital Admin',
  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Royal Hospital')
          .items([
            S.listItem()
              .title('Site settings')
              .id('siteSettings')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings'),
              ),
            S.divider(),
            S.documentTypeListItem('doctor').title('Doctors'),
            S.documentTypeListItem('department').title('Departments and timings'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (prev, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({action}) => !['unpublish', 'delete', 'duplicate'].includes(action))
        : prev,
  },

  studio: {
    components: {logo: Logo},
  },
})
