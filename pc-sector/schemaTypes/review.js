// schemaTypes/review.js
export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Review Title (e.g., "Cyberpunk 2077 Review")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gameReviewed',
      title: 'Game Reviewed',
      type: 'reference',
      to: [{type: 'game'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating (e.g., 1-10 or 1-5)',
      type: 'number',
      description: 'Define your rating scale, e.g., 1-10. Add validation if needed.',
      validation: (Rule) => Rule.required().min(1).max(10), // Example: 1-10 scale
    },
    {
      name: 'summary', // A short "verdict" or summary
      title: 'Review Summary / Verdict',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List the good points, one per entry.',
    },
    {
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List the negative points, one per entry.',
    },
    {
      name: 'body',
      title: 'Full Review Text',
      type: 'blockContent', // Use your rich text editor
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Review Header Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt', type: 'string', title: 'Alternative text', validation: Rule => Rule.required(), options: {isHighlighted: true}
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      description: 'Select or create relevant tags for this review.',
    },
    // tags, SEO from article.js could be relevant here too
  ],
  initialValue: {
    publishedAt: new Date().toISOString(),
  },
  orderings: [
    {
      title: 'Publication Date, Newest First',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      gameName: 'gameReviewed.name', // Fetch related game name
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, gameName, media, publishedAt} = selection
      return {
        title: title || 'Untitled Review',
        subtitle: `${gameName ? 'Review of ' + gameName : 'Game not specified'} - ${
          publishedAt ? new Date(publishedAt).toLocaleDateString() : ''
        }`,
        media: media,
      }
    },
  },
}