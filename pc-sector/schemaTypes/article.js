// schemaTypes/article.js
export default {
  name: 'article',
  title: 'Article (News/Editorial)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL part)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    // If you plan to have an "Author" document type later:
    // {
    //   name: 'author',
    //   title: 'Author',
    //   type: 'reference',
    //   to: [{type: 'author'}] // You would need to create an 'author.js' schema
    // },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping and focusing
      },
      fields: [ // Add alt text to mainImage
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: Rule => Rule.required(),
          options: {
            isHighlighted: true,
          }
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'News', value: 'news'},
          {title: 'Editorial', value: 'editorial'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'blockContent', // References the blockContent.js schema
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Short Description',
      type: 'text',
      rows: 3,
      description: 'A short summary of the article for previews and SEO.',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      description: 'Select or create relevant tags for this article.',
      options: {
        layout: 'tags',
      },
    },
    // Basic SEO fields (can be expanded or put into a reusable object)
    // {
    //   name: 'seoTitle',
    //   title: 'SEO Title',
    //   type: 'string',
    //   description: 'Override the main title for SEO purposes (e.g., in browser tabs, search results).',
    // },
    // {
    //   name: 'seoDescription',
    //   title: 'SEO Description',
    //   type: 'text',
    //   rows: 2,
    //   description: 'Override the excerpt for SEO meta description in search results.',
    // }
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
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      media: 'mainImage',
      category: 'category',
    },
    prepare(selection) {
      const {title, date, media, category} = selection
      return {
        title: title || 'Untitled Article',
        subtitle: `${category ? category.charAt(0).toUpperCase() + category.slice(1) : ''} - ${
          date ? new Date(date).toLocaleDateString() : 'No date'
        }`,
        media: media,
      }
    },
  },
}