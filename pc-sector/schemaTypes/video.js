// schemaTypes/video.js
export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Video Title',
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
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoUrl',
      title: 'Video URL (e.g., YouTube, Vimeo)',
      type: 'url',
      description: 'Paste the full URL of the video (e.g., https://www.youtube.com/watch?v=XYZ)',
      // You might want to add validation for specific video platforms if needed
    },
    // Alternatively, if you only use YouTube, you might prefer:
    // {
    //   name: 'youtubeVideoId',
    //   title: 'YouTube Video ID',
    //   type: 'string',
    //   description: 'Only the ID part of the YouTube URL (e.g., for "https://www.youtube.com/watch?v=dQw4w9WgXcQ", the ID is "dQw4w9WgXcQ")',
    // },
    {
      name: 'thumbnail',
      title: 'Custom Thumbnail (Optional)',
      type: 'image',
      options: {hotspot: true},
      description: 'Upload a custom thumbnail. If not provided, your frontend might try to fetch one from the video service.',
      fields: [
        {
          name: 'alt', type: 'string', title: 'Alternative text', validation: Rule => Rule.required(), options: {isHighlighted: true}
        }
      ]
    },
    {
      name: 'description',
      title: 'Video Description / Summary',
      type: 'text', // or 'blockContent' for richer descriptions
    },
    {
      name: 'associatedGame',
      title: 'Associated Game (Optional)',
      type: 'reference',
      to: [{type: 'game'}],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      options: {
        layout: 'tags',
      },
    },
  ],
  initialValue: {
    publishedAt: new Date().toISOString(),
  },
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      videoUrl: 'videoUrl',
      // youtubeVideoId: 'youtubeVideoId' // if using that field
    },
    prepare(selection) {
      const {title, media, videoUrl} = selection
      return {
        title: title || 'Untitled Video',
        subtitle: videoUrl || 'No URL',
        media: media, // You might need a custom component to show a video thumbnail here if not using 'image' type for media
      }
    },
  },
}