// schemaTypes/game.js
export default {
  name: 'game',
  title: 'Game',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Game Name',
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
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date', // Format: YYYY-MM-DD
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      name: 'developers', // Changed from 'developer' to 'developers' for clarity if multiple
      title: 'Developer(s)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'developer'}}],
      validation: (Rule) => Rule.min(1), // Ensure at least one developer
    },
    {
      name: 'publishers', // Changed from 'publisher' to 'publishers'
      title: 'Publisher(s)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'publisher'}}],
    },
    {
      name: 'genres',
      title: 'Genre(s)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'genre'}}],
      validation: (Rule) => Rule.min(1), // Ensure at least one genre
    },
    {
      name: 'description',
      title: 'Description/Summary',
      type: 'text', // Or 'blockContent' if you want rich text here
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt', type: 'string', title: 'Alternative text', validation: Rule => Rule.required(), options: {isHighlighted: true}
        }
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Image Gallery / Screenshots',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          {name: 'alt', type: 'string', title: 'Alt text', validation: Rule => Rule.required()},
          {name: 'caption', type: 'string', title: 'Caption'}
        ]
      }]
    },
    // {
    //   name: 'officialWebsite',
    //   title: 'Official Website URL',
    //   type: 'url',
    // },
    // {
    //   name: 'platforms', // Example: PC, PS5, Xbox Series X
    //   title: 'Platforms',
    //   type: 'array',
    //   of: [{type: 'string'}],
    //   options: { layout: 'tags' }
    // }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'coverImage',
      releaseDate: 'releaseDate',
    },
    prepare(selection) {
      const {title, media, releaseDate} = selection
      const year = releaseDate ? new Date(releaseDate).getFullYear() : ''
      return {
        title: title || 'Untitled Game',
        subtitle: year || 'No release date',
        media: media,
      }
    },
  },
}