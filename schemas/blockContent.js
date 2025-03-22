export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
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
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO',
          validation: Rule => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption text for the image',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      title: 'Code Block',
      options: {
        language: 'javascript',
        languageAlternatives: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'Python', value: 'python'},
          {title: 'PHP', value: 'php'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'Shell', value: 'bash'},
          {title: 'JSON', value: 'json'},
        ]
      }
    },
    {
      type: 'object',
      name: 'callout',
      title: 'Callout',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Type',
          options: {
            list: [
              {title: 'Tip', value: 'tip'},
              {title: 'Warning', value: 'warning'},
              {title: 'Note', value: 'note'},
            ]
          }
        },
        {
          name: 'content',
          type: 'text',
          title: 'Content',
        }
      ],
      preview: {
        select: {
          type: 'type',
          content: 'content'
        },
        prepare({type, content}) {
          return {
            title: `${type?.charAt(0).toUpperCase()}${type?.slice(1) || ''}: ${content?.substring(0, 50)}...`,
          }
        }
      }
    }
  ],
}
