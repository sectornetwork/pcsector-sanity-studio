// schemaTypes/genre.js
export default {
  name: 'genre',
  title: 'Genre',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Genre Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}