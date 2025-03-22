export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating from 1 to 5',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this testimonial as featured',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      media: 'image',
    },
  },
}
