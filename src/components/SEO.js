'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * SEO Component for optimising pages for search engines
 * Implements proper meta tags and structured data for client components
 * Note: For server components, use the metadata export instead
 */
export default function SEO({ 
  title, 
  description, 
  keywords = [], 
  image, 
  type = 'website',
  canonicalUrl,
  structuredData = null
}) {
  // Default values
  const siteTitle = 'KeepMe | Premium Perfume Packaging Solutions';
  const pageTitle = title ? `${title} | KeepMe` : siteTitle;
  const pageDescription = description || 'KeepMe offers premium perfume packaging solutions, custom glass bottles, and fragrance development services for luxury brands.';
  const defaultImage = 'https://keepme.com/images/og-image.jpg';
  const imageUrl = image || defaultImage;
  
  // Format structured data for script tag
  const structuredDataString = structuredData 
    ? JSON.stringify(structuredData) 
    : null;
  
  // Update title when component mounts or title changes
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <>
      {/* Structured Data */}
      {structuredDataString && (
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataString }}
        />
      )}

      {/* Additional meta tags that can be set client-side */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* Canonical URL */}
      {canonicalUrl && (
        <link rel="canonical" href={canonicalUrl} />
      )}
    </>
  );
}
