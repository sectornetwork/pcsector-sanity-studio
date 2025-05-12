// schemaTypes/tag.js
export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the tag (e.g., "RPG", "Indie Games", "Ray Tracing").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      description: 'A short description of what this tag represents, for internal use or potential display.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare(selection) {
      const {title, description} = selection
      return {
        title: title,
        subtitle: description || 'Tag',
      }
    },
  },
}