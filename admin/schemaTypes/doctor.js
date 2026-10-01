import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Doctor name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'For example: Orthopaedic Surgeon',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: [{type: 'department'}],
      description: 'The doctor uses the timings of this department.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Portrait photo (taller than wide works best).',
    }),
    defineField({
      name: 'order',
      title: 'Order on the website',
      type: 'number',
      description: 'Smaller numbers show first. Example: 1, 2, 3.',
    }),
  ],
  orderings: [
    {title: 'Website order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}, {field: 'name', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', role: 'role', dept: 'department.name', media: 'photo'},
    prepare: ({title, role, dept, media}) => ({title, subtitle: [role, dept].filter(Boolean).join(' / '), media}),
  },
})
