export default {
  name: 'glassPage',
  title: 'Glass Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'glassCategories',
      title: 'Glass Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Category Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Category Description',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Category Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ]
        }
      ]
    },
    {
      name: 'processSections',
      title: 'Process Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{type: 'block'}],
            },
            {
              name: 'image',
              title: 'Section Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ]
        }
      ]
    },
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for browser tabs and social sharing',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description for search engines',
      rows: 3,
    },
  ],
}
