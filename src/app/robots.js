export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://keepme.com/sitemap.xml', // Replace with your actual domain
  };
}
