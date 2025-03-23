export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Value Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name from your icon library'
            }
          ]
        }
      ]
    },
    {
      name: 'teamSection',
      title: 'Team Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text'
        }
      ]
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'bio',
              title: 'Biography',
              type: 'text'
            },
            {
              name: 'image',
              title: 'Profile Image',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Lower numbers appear first'
            }
          ]
        }
      ]
    },
    {
      name: 'historySection',
      title: 'History Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text'
        },
        {
          name: 'foundedYear',
          title: 'Founded Year',
          type: 'string'
        }
      ]
    },
    {
      name: 'milestones',
      title: 'Company Milestones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Milestone Image',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'facilitiesSection',
      title: 'Facilities Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Section Subheading',
          type: 'text'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text'
        }
      ]
    },
    {
      name: 'facilities',
      title: 'Facilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Facility Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'image',
              title: 'Facility Image',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'features',
              title: 'Key Features',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    },
    {
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'CTA Heading',
          type: 'string'
        },
        {
          name: 'text',
          title: 'CTA Text',
          type: 'text'
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string'
        },
        {
          name: 'primaryButtonLink',
          title: 'Primary Button Link',
          type: 'string'
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string'
        },
        {
          name: 'secondaryButtonLink',
          title: 'Secondary Button Link',
          type: 'string'
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text'
        },
        {
          name: 'shareImage',
          title: 'Share Image',
          type: 'image'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'About Page'
      }
    }
  }
}
