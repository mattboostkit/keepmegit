import { createClient } from 'next-sanity';

// Your Sanity project configuration
const projectId = '2yws8jj2';
const dataset = 'production';
const apiVersion = '2023-05-03';

// Configuration for server-side usage
export const serverConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
};

// Configuration for client-side usage
export const clientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Add CORS configuration for Vercel deployment
  cors: {
    allowOrigins: [
      'http://localhost:3000',
      'https://keepme-git.vercel.app',
      'https://*.vercel.app',
      process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : '',
    ].filter(Boolean),
  },
};

// Create a server-side client
export const serverClient = createClient(serverConfig);

// Create a client-side client
export const client = createClient(clientConfig);

// Server-side Sanity client (for use in server components)
// export const serverClient = createClient({
//   projectId: '2yws8jj2', // Sanity project ID for KeepMe
//   dataset: 'production',
//   apiVersion: '2023-05-03',
//   useCdn: false, // Set to true for production
// });

// CORS allowed origins
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://keepmegit-git-main-matt-boostkit-projects.vercel.app',
//   'https://keepmegit.vercel.app'
// ];

// Client-side Sanity client (for use in client components)
// export const clientConfig = {
//   projectId: '2yws8jj2',
//   dataset: 'production',
//   apiVersion: '2023-05-03',
//   useCdn: true,
// };

// export const client = createClient(clientConfig);

export async function getHomePage() {
  return serverClient.fetch(`*[_type == "homePage"][0]`);
}

export async function getGlassPage() {
  return serverClient.fetch(`*[_type == "glassPage"][0]`);
}

export async function getAboutPage() {
  try {
    const aboutPage = await serverClient.fetch(`*[_type == "aboutPage"][0]{
      ...,
      "heroImage": heroImage.asset->url,
      "teamMembers": teamMembers[]{
        ...,
        "image": image.asset->url
      },
      "milestones": milestones[]{
        ...,
        "image": image.asset->url
      },
      "facilities": facilities[]{
        ...,
        "image": image.asset->url
      }
    }`);
    
    return aboutPage;
  } catch (error) {
    console.error('Error fetching About page from Sanity:', error);
    return null;
  }
}

export async function getBlogPosts({ limit = 10, skip = 0, category = null }) {
  try {
    let query = `*[_type == "post"]`;
    if (category) {
      query += ` && categories[]->slug.current == "${category}"`;
    }
    query += ` | order(publishedAt desc)[${skip}...${skip + limit}]{
      _id,
      title,
      slug,
      excerpt,
      "featuredImage": featuredImage.asset->url,
      "categories": categories[]->title,
      publishedAt,
      "author": author->{name, "image": image.asset->url}
    }`;
    
    console.log('Executing Sanity query:', query);
    console.log('With client config:', {
      projectId: serverClient.config().projectId,
      dataset: serverClient.config().dataset,
      apiVersion: serverClient.config().apiVersion,
      useCdn: serverClient.config().useCdn
    });
    
    const posts = await serverClient.fetch(query);
    console.log(`Fetched ${posts.length} posts from Sanity`);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts from Sanity:', error);
    return [];
  }
}

export async function getBlogPost(slug) {
  try {
    console.log('Fetching blog post with slug:', slug);
    const post = await serverClient.fetch(`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      body,
      "featuredImage": featuredImage.asset->url,
      "categories": categories[]->title,
      publishedAt,
      "author": author->{name, bio, "image": image.asset->url},
      "relatedPosts": *[_type == "post" && _id != ^._id && count(categories[@._ref in ^.categories[]._ref]) > 0][0...3]{
        _id,
        title,
        slug,
        "featuredImage": featuredImage.asset->url,
        publishedAt
      }
    }`, { slug });
    console.log('Fetched blog post from Sanity:', post);
    return post;
  } catch (error) {
    console.error('Error fetching blog post from Sanity:', error);
    return null;
  }
}

export async function getCategories() {
  try {
    const categories = await serverClient.fetch(`*[_type == "category"]{
      _id,
      title,
      slug
    } | order(title asc)`);
    console.log(`Fetched ${categories.length} categories from Sanity`);
    return categories;
  } catch (error) {
    console.error('Error fetching categories from Sanity:', error);
    return [];
  }
}

export async function getServices() {
  return serverClient.fetch(`*[_type == "service"]{
    _id,
    title,
    description,
    "image": image.asset->url,
    slug
  }`);
}

export async function getProducts() {
  return serverClient.fetch(`*[_type == "product"]{
    _id,
    title,
    description,
    "image": image.asset->url,
    "gallery": gallery[]{
      "url": asset->url,
      alt,
      caption
    },
    category,
    subcategory,
    productCode,
    featured,
    slug,
    specifications,
    dimensions,
    materials,
    finishOptions,
    decorationOptions,
    minimumOrderQuantity,
    leadTime
  }`);
}

export async function getTestimonials() {
  return serverClient.fetch(`*[_type == "testimonial"]{
    _id,
    name,
    company,
    quote,
    rating
  }`);
}

export async function getGlassProducts() {
  return serverClient.fetch(`*[_type == "product" && category == "glass"]{
    _id,
    title,
    description,
    "image": image.asset->url,
    "gallery": gallery[]{
      "url": asset->url,
      alt,
      caption
    },
    category,
    subcategory,
    productCode,
    featured,
    slug,
    specifications,
    dimensions,
    materials,
    finishOptions,
    decorationOptions,
    minimumOrderQuantity,
    leadTime
  } | order(subcategory asc, title asc)`);
}

// Helper function to log Sanity client errors
export function logSanityError(error, operation) {
  console.error(`Sanity ${operation} error:`, error);
  if (error.response) {
    console.error('Response status:', error.response.status);
    console.error('Response data:', error.response.data);
  }
  if (error.request) {
    console.error('Request details:', error.request);
  }
}
