export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ]
        }
      ]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Fragrance Bottles', value: 'fragrance'},
          {title: 'Cosmetic Containers', value: 'cosmetic'},
          {title: 'Food & Beverage', value: 'food'},
          {title: 'Specialty Glass', value: 'specialty'},
        ],
      },
    },
    {
      name: 'content',
      title: 'Full Content',
      type: 'blockContent',
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Specification Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'value',
              title: 'Specification Value',
              type: 'string',
              validation: Rule => Rule.required()
            }
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
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}
