export default {
  name: 'homePage',
  title: 'Home Page',
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
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
    },
    {
      name: 'aboutContent',
      title: 'About Content',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [{type: 'reference', to: {type: 'service'}}],
    },
    {
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{type: 'reference', to: {type: 'product'}}],
    },
    {
      name: 'ctaTitle',
      title: 'Call to Action Title',
      type: 'string',
    },
    {
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'text',
    },
    {
      name: 'ctaButton',
      title: 'Call to Action Button Text',
      type: 'string',
    },
    {
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'string',
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
