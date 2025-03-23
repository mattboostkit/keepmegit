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
          {title: 'Glass Products', value: 'glass'},
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'For glass products, this could be a series number or collection name',
    },
    {
      name: 'productCode',
      title: 'Product Code',
      type: 'string',
      description: 'Unique identifier for the product (e.g., K163-VA1)',
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Mark this product as featured to highlight it on the website',
      initialValue: false,
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
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        {
          name: 'height',
          title: 'Height (mm)',
          type: 'number',
        },
        {
          name: 'width',
          title: 'Width/Diameter (mm)',
          type: 'number',
        },
        {
          name: 'depth',
          title: 'Depth (mm)',
          type: 'number',
        },
        {
          name: 'capacity',
          title: 'Capacity (ml)',
          type: 'number',
        },
        {
          name: 'weight',
          title: 'Weight (g)',
          type: 'number',
        }
      ]
    },
    {
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Clear Glass', value: 'clear-glass'},
          {title: 'Frosted Glass', value: 'frosted-glass'},
          {title: 'Coloured Glass', value: 'coloured-glass'},
          {title: 'Crystal Glass', value: 'crystal-glass'},
          {title: 'Recycled Glass', value: 'recycled-glass'},
        ]
      }
    },
    {
      name: 'finishOptions',
      title: 'Finish Options',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Available finish options for this product',
    },
    {
      name: 'decorationOptions',
      title: 'Decoration Options',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Screen Printing', value: 'screen-printing'},
          {title: 'Hot Stamping', value: 'hot-stamping'},
          {title: 'Embossing', value: 'embossing'},
          {title: 'Debossing', value: 'debossing'},
          {title: 'Etching', value: 'etching'},
          {title: 'Metallisation', value: 'metallisation'},
        ]
      }
    },
    {
      name: 'minimumOrderQuantity',
      title: 'Minimum Order Quantity',
      type: 'number',
      description: 'The minimum quantity that can be ordered',
    },
    {
      name: 'leadTime',
      title: 'Lead Time (weeks)',
      type: 'number',
      description: 'Estimated lead time for production in weeks',
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
