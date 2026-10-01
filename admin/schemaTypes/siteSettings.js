import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'home', title: 'Home page', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'about', title: 'About'},
  ],
  fields: [
    // Home page
    defineField({name: 'heroTitle', title: 'Main heading', type: 'string', group: 'home'}),
    defineField({name: 'heroText', title: 'Text under the heading', type: 'text', rows: 3, group: 'home'}),
    defineField({
      name: 'heroImage',
      title: 'Top banner photo (optional)',
      type: 'image',
      options: {hotspot: true},
      group: 'home',
    }),
    defineField({name: 'deptIntro', title: 'Departments and services: intro line', type: 'string', group: 'home'}),
    defineField({
      name: 'services',
      title: 'Departments and services',
      type: 'array',
      group: 'home',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'service',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Stethoscope', value: 'steth'},
                  {title: 'Lab flask', value: 'flask'},
                  {title: 'Heartbeat', value: 'pulse'},
                  {title: 'Pill', value: 'pill'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'steth',
            }),
            defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'text', title: 'Description', type: 'text', rows: 3}),
            defineField({
              name: 'linkLabel',
              title: 'Link text (optional)',
              type: 'string',
              description: 'For example: See consultation timings',
            }),
            defineField({
              name: 'linkHref',
              title: 'Link address (optional)',
              type: 'string',
              description: 'Use /#timings for the timings box, /doctors for the Doctors page, or tel:04952656501 to call.',
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'text'}},
        }),
      ],
    }),

    // Contact
    defineField({name: 'name', title: 'Hospital name', type: 'string', group: 'contact'}),
    defineField({name: 'tagline', title: 'Place line (under the name)', type: 'string', group: 'contact', description: 'For example: Ekarool, Unnikulam'}),
    defineField({name: 'landline', title: 'Landline number', type: 'string', group: 'contact'}),
    defineField({name: 'mobile', title: 'Mobile number', type: 'string', group: 'contact'}),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      group: 'contact',
      description: 'Digits only, with country code, no + and no spaces. Example: 919526646501',
      validation: (r) => r.regex(/^\d{10,15}$/, {name: 'digits only'}).error('Use digits only, with country code. Example: 919526646501'),
    }),
    defineField({name: 'address', title: 'Short address', type: 'string', group: 'contact'}),
    defineField({name: 'mapLink', title: 'Google Maps link', type: 'url', group: 'contact'}),
    defineField({
      name: 'mapEmbed',
      title: 'Google Map (shows a live map on the website)',
      type: 'text',
      rows: 3,
      group: 'contact',
      description:
        'On Google Maps: search the hospital, click Share, choose Embed a map, click Copy HTML, and paste it here. If this is filled in, the live map is shown instead of the photo below.',
      validation: (r) =>
        r.custom((v) => (!v || /google\.[a-z.]+\/maps/i.test(v) ? true : 'Paste the embed code from Google Maps (Share, then Embed a map).')),
    }),
    defineField({
      name: 'mapImage',
      title: 'Entrance photo (used when no Google Map is added above)',
      type: 'image',
      options: {hotspot: true},
      group: 'contact',
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact list',
      type: 'array',
      group: 'contact',
      description: 'Rows shown in the Visit or contact us section. Example: Hours / OPD 9 am to 5 pm',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contactRow',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({name: 'footerText', title: 'Footer text', type: 'string', group: 'contact'}),

    // About
    defineField({name: 'aboutTitle', title: 'About heading', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'About text', type: 'text', rows: 6, group: 'about'}),
    defineField({name: 'aboutImage', title: 'About photo (hospital interior or team)', type: 'image', options: {hotspot: true}, group: 'about'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
