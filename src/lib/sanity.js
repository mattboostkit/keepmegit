import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'your-project-id', // Will be replaced with actual Sanity project ID
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false, // Set to true for production
});

export async function getHomePage() {
  return client.fetch(`*[_type == "homePage"][0]`);
}

export async function getGlassPage() {
  return client.fetch(`*[_type == "glassPage"][0]`);
}

export async function getBlogPosts({ limit = 10, skip = 0, category = null }) {
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
  
  return client.fetch(query);
}

export async function getBlogPost(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
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
    }`,
    { slug }
  );
}

export async function getCategories() {
  return client.fetch(`*[_type == "category"]{
    _id,
    title,
    slug
  }`);
}

export async function getServices() {
  return client.fetch(`*[_type == "service"]{
    _id,
    title,
    description,
    "image": image.asset->url,
    slug
  }`);
}

export async function getProducts() {
  return client.fetch(`*[_type == "product"]{
    _id,
    title,
    description,
    "image": image.asset->url,
    category,
    slug
  }`);
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"]{
    _id,
    quote,
    author,
    company
  }`);
}
