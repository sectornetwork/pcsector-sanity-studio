// schemaTypes/developer.js
export default {
  name: 'developer',
  title: 'Developer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Developer Name',
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
      name: 'website',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    },
    // {
    //   name: 'description',
    //   title: 'Description',
    //   type: 'text'
    // }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
}