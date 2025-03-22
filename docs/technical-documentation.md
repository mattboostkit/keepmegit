# KeepMe Website Technical Documentation

## Overview

This technical documentation provides detailed information about the architecture, implementation, and maintenance of the KeepMe website. It is intended for developers and technical staff who will be maintaining and extending the website.

## Technology Stack

The website is built using the following technologies:

- **Frontend Framework**: Next.js 15.2.3
- **Content Management**: Sanity CMS
- **Styling**: Tailwind CSS
- **JavaScript**: ES6+, React Hooks
- **Deployment**: Vercel/Netlify (recommended)
- **SEO**: Custom implementation with structured data

## Project Structure

```
keepme-website/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.jsx          # Homepage
│   │   ├── about/            # About section
│   │   ├── contact/          # Contact section
│   │   ├── glass/            # Glass section
│   │   ├── blog/             # Blog section
│   │   ├── how-we-work/      # Process page with timeline
│   │   └── tools/            # Tools section
│   ├── components/           # Reusable React components
│   │   ├── Header.jsx        # Site header
│   │   ├── Footer.jsx        # Site footer
│   │   ├── SEO.jsx           # SEO component
│   │   └── sections/         # Page section components
│   ├── lib/                  # Utility functions
│   │   ├── sanity.js         # Sanity client configuration
│   │   ├── queries.js        # GROQ queries for Sanity
│   │   ├── seoKeywords.js    # SEO keyword management
│   │   ├── structuredData.js # JSON-LD structured data
│   │   └── sitemap.js        # Sitemap generator
├── sanity/                   # Sanity CMS configuration
│   ├── schemas/              # Content type definitions
│   │   ├── page.js           # Page schema
│   │   ├── post.js           # Blog post schema
│   │   ├── author.js         # Author schema
│   │   ├── category.js       # Category schema
│   │   ├── product.js        # Product schema
│   │   ├── seo.js            # SEO fields schema
│   │   ├── blockContent.js   # Rich text editor schema
│   │   └── sections/         # Page section schemas
│   └── schema.js             # Main schema configuration
├── public/                   # Static assets
├── docs/                     # Documentation
└── package.json              # Project dependencies
```

## Sanity CMS Integration

### Configuration

The Sanity CMS is configured in the `sanity/` directory. The main schema file (`schema.js`) imports all content type definitions from the `schemas/` directory.

### Content Types

The following content types are defined:

1. **Page**: Website pages with flexible sections
2. **Post**: Blog articles
3. **Author**: Blog post authors
4. **Category**: Blog categories
5. **Product**: Glass products
6. **SEO**: Reusable SEO fields

### GROQ Queries

GROQ queries for fetching content from Sanity are defined in `src/lib/queries.js`. These queries are used throughout the application to retrieve content.

## Next.js Implementation

### App Router

The website uses Next.js App Router for routing. Each route is defined in the `src/app/` directory with its own `page.jsx` file.

### Data Fetching

Data is fetched from Sanity using the Sanity client configured in `src/lib/sanity.js`. The client is used to execute GROQ queries defined in `src/lib/queries.js`.

Example:
```javascript
import { client } from '@/lib/sanity';
import { getPageQuery } from '@/lib/queries';

export async function getPageData(slug) {
  return await client.fetch(getPageQuery, { slug });
}
```

### SEO Implementation

SEO is implemented using a custom `SEO` component that adds appropriate meta tags to each page. Structured data is added using the functions in `src/lib/structuredData.js`.

## Interactive Components

### Timeline Component

The interactive timeline component on the How We Work page is implemented using Framer Motion for animations. The component is defined in `src/components/ProcessTimeline.jsx`.

### Quote Sheet Tool

The Quote Sheet tool is a form-based component that allows users to request quotes. It validates input and submits data to a server endpoint.

### Fragrance Calculator

The Fragrance Calculator is an interactive tool that calculates costs based on user inputs. It uses React state to manage calculations in real-time.

## Deployment

### Build Process

To build the website for production:

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Deployment Recommendations

We recommend deploying the website to Vercel or Netlify, which both have excellent support for Next.js applications.

#### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (for preview mode)
3. Deploy

#### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Configure environment variables (same as Vercel)

## Maintenance and Updates

### Updating Dependencies

Regularly update dependencies to ensure security and performance:

```bash
npm update
```

For major version updates, review the changelog of each package to ensure compatibility.

### Adding New Features

When adding new features:

1. Create new components in the appropriate directories
2. Update Sanity schemas if new content types are needed
3. Add new routes in the `src/app/` directory
4. Update documentation

### Troubleshooting

Common issues and solutions:

1. **Sanity connection issues**: Check API tokens and project ID
2. **Build failures**: Ensure all dependencies are installed and compatible
3. **Missing content**: Verify GROQ queries and content structure in Sanity

## Performance Optimization

The website implements several performance optimizations:

1. **Image Optimization**: Using Next.js Image component
2. **Code Splitting**: Automatic code splitting by Next.js
3. **Static Generation**: Pre-rendering pages at build time
4. **Incremental Static Regeneration**: Updating static pages without rebuilding

## Security Considerations

1. **API Tokens**: Keep Sanity API tokens secure and use environment variables
2. **Form Validation**: All forms implement proper validation
3. **Content Security Policy**: Implement appropriate CSP headers
4. **Regular Updates**: Keep all dependencies updated

## Contact and Support

For technical support or questions about this documentation, please contact:

[Your Development Team Contact Information]
