import {defineArrayMember, defineField, defineType} from 'sanity'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default defineType({
  name: 'department',
  title: 'Department',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Department name',
      type: 'string',
      description: 'For example: Orthopaedics',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'consultant',
      title: 'Consultant shown above the timings',
      type: 'string',
      description: 'For example: Orthopaedic Specialist, or the doctor name',
    }),
    defineField({
      name: 'schedule',
      title: 'Consultation timings',
      type: 'array',
      description:
        'Add one row for each day the doctors are available. These timings show on the home page and on the Doctors page. Leave empty if timings are not ready.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'dayTiming',
          title: 'Day',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {list: DAYS, layout: 'dropdown'},
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'times',
              title: 'Time slots',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              description: 'Type each slot like this: 4:30 pm to 5:30 pm. Add more than one slot if needed.',
              validation: (r) => r.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'day', times: 'times'},
            prepare: ({title, times}) => ({title, subtitle: (times || []).join(', ')}),
          },
        }),
      ],
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
    select: {title: 'name', schedule: 'schedule'},
    prepare: ({title, schedule}) => ({
      title,
      subtitle: schedule && schedule.length ? `${schedule.length} day(s) with timings` : 'Timings not added yet',
    }),
  },
})
