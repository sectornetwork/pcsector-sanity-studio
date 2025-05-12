// schemaTypes/blockContent.js
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block', // The default rich text block
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
              },
            ],
          },
          // Example: Internal link to another document
          // {
          //   name: 'internalLink',
          //   type: 'object',
          //   title: 'Internal link',
          //   fields: [
          //     {
          //       name: 'reference',
          //       type: 'reference',
          //       title: 'Reference',
          //       to: [
          //         { type: 'article' },
          //         { type: 'game' },
          //         // Add other types you want to link to
          //       ]
          //     }
          //   ]
          // }
        ],
      },
    },
    {
      type: 'image', // Allow images directly in the rich text editor
      options: {hotspot: true},
      fields: [ // Optional: Add fields like alt text to images in block content
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          options: {
            isHighlighted: true // Makes it stand out in the editor
          }
        }
      ]
    },
    // Example: Add a YouTube embed object
    // {
    //   type: 'object',
    //   name: 'youtubeEmbed',
    //   title: 'YouTube Embed',
    //   fields: [
    //     {
    //       name: 'url',
    //       type: 'url',
    //       title: 'YouTube Video URL'
    //     }
    //   ],
    //   // You'd also need a component in your frontend to render this
    // }
  ],
}