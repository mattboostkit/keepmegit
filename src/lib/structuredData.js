/**
 * Structured data utilities for SEO
 * Generates JSON-LD structured data for various content types
 */

/**
 * Generate organization structured data
 * @returns {Object} JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KeepMe',
    url: 'https://keepme.com',
    logo: 'https://keepme.com/logo.png',
    sameAs: [
      'https://facebook.com/keepme',
      'https://twitter.com/keepme',
      'https://instagram.com/keepme',
      'https://linkedin.com/company/keepme'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+44-123-456-7890',
      contactType: 'customer service',
      availableLanguage: ['English']
    }
  };
}

/**
 * Generate product structured data
 * @param {Object} product - Product data
 * @returns {Object} JSON-LD structured data for product
 */
export function generateProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'KeepMe'
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock'
    }
  };
}

/**
 * Generate article structured data for blog posts
 * @param {Object} post - Blog post data
 * @returns {Object} JSON-LD structured data for article
 */
export function generateArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'KeepMe Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'KeepMe',
      logo: {
        '@type': 'ImageObject',
        url: 'https://keepme.com/logo.png'
      }
    },
    description: post.excerpt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://keepme.com/blog/${post.categories?.[0]}/${post.slug.current}`
    }
  };
}

/**
 * Generate FAQ structured data
 * @param {Array} faqs - Array of FAQ items with question and answer properties
 * @returns {Object} JSON-LD structured data for FAQPage
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate breadcrumb structured data
 * @param {Array} items - Array of breadcrumb items with name and url properties
 * @returns {Object} JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
