// Script to import existing blog posts into Sanity
const { createClient } = require('next-sanity');

// Create Sanity client with explicit token
const client = createClient({
  projectId: '2yws8jj2',
  dataset: 'production',
  apiVersion: '2023-05-03', 
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

console.log('Sanity client configured with:');
console.log('- Project ID:', '2yws8jj2');
console.log('- Dataset:', 'production');
console.log('- API Version:', '2023-05-03');
console.log('- Token provided:', !!process.env.SANITY_API_TOKEN);

// Sample blog post data - replace with your actual blog post data from the site
const blogPosts = [
  {
    title: "The Art of Fragrance Formulation",
    slug: "art-of-fragrance-formulation",
    publishedAt: "2025-03-22T00:00:00Z",
    excerpt: "Explore the creative process behind developing signature scents for luxury brands. Our expert perfumers discuss how they balance artistry and science.",
    categoryNames: ["Industry Insights"],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Explore the creative process behind developing signature scents for luxury brands. Our expert perfumers discuss how they balance artistry and science to create memorable fragrances that resonate with consumers and reflect brand identity.'
          }
        ]
      }
    ]
  },
  {
    title: "Sustainable Packaging Trends in 2025",
    slug: "sustainable-packaging-trends",
    publishedAt: "2025-03-15T00:00:00Z",
    excerpt: "Discover how eco-friendly packaging solutions are transforming the fragrance industry. We examine the latest materials and techniques.",
    categoryNames: ["Product Innovations"],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Discover how eco-friendly packaging solutions are transforming the fragrance industry. We examine the latest materials and techniques that brands are adopting to reduce environmental impact while maintaining luxury appeal.'
          }
        ]
      }
    ]
  },
  {
    title: "Behind the Scenes: Glass Manufacturing Process",
    slug: "glass-manufacturing-process",
    publishedAt: "2025-03-08T00:00:00Z",
    excerpt: "An inside look at how premium glass containers are crafted for luxury fragrance brands, from initial design to final production.",
    categoryNames: ["Behind the Scenes"],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'An inside look at how premium glass containers are crafted for luxury fragrance brands, from initial design to final production. Follow the journey of creating bespoke glass packaging that elevates premium products.'
          }
        ]
      }
    ]
  },
  {
    title: "Case Study: Luxury Hotel Amenities Collection",
    slug: "luxury-hotel-amenities-case-study",
    publishedAt: "2025-03-01T00:00:00Z",
    excerpt: "How we partnered with a renowned hotel chain to create a bespoke line of guest amenities that enhanced their brand experience.",
    categoryNames: ["Case Studies"],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'How we partnered with a renowned hotel chain to create a bespoke line of guest amenities that enhanced their brand experience and delivered a memorable sensory experience for guests.'
          }
        ]
      }
    ]
  },
  {
    title: "How to Choose the Perfect Fragrance for Your Product",
    slug: "choosing-perfect-fragrance",
    publishedAt: "2025-02-22T00:00:00Z",
    excerpt: "A comprehensive guide to selecting and developing the right scent to complement your brand messaging and enhance customer experience.",
    categoryNames: ["How-To Guides"],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'A comprehensive guide to selecting and developing the right scent to complement your brand messaging and enhance customer experience. Learn about fragrance families, notes, and how to align scent with brand identity.'
          }
        ]
      }
    ]
  },
  {
    title: "The Psychology of Scent Marketing",
    slug: "psychology-of-scent-marketing",
    publishedAt: "2025-02-15T00:00:00Z",
    excerpt: "Understanding how fragrance influences consumer behaviour and how brands can leverage this to create meaningful connections.",
    categoryNames: ["Industry Insights"],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Understanding how fragrance influences consumer behaviour and how brands can leverage this to create meaningful connections with their target audience through strategic scent marketing.'
          }
        ]
      }
    ]
  }
];

// First, ensure we have the necessary categories
async function createCategories() {
  console.log('Creating categories...');
  
  // Extract unique category names from all posts
  const categoryNames = [...new Set(blogPosts.flatMap(post => post.categoryNames))];
  
  // Create each category if it doesn't exist
  for (const name of categoryNames) {
    // Check if category already exists
    const existingCategory = await client.fetch(
      `*[_type == "category" && title == $title][0]`,
      { title: name }
    );
    
    if (!existingCategory) {
      console.log(`Creating category: ${name}`);
      await client.create({
        _type: 'category',
        title: name,
        slug: {
          _type: 'slug',
          current: name.toLowerCase().replace(/\s+/g, '-')
        }
      });
    } else {
      console.log(`Category already exists: ${name}`);
    }
  }
}

// Create a default author if none exists
async function createDefaultAuthor() {
  console.log('Checking for default author...');
  
  const existingAuthor = await client.fetch(`*[_type == "author"][0]`);
  
  if (!existingAuthor) {
    console.log('Creating default author: KeepMe Team');
    await client.create({
      _type: 'author',
      name: 'KeepMe Team',
      bio: 'The team behind KeepMe, experts in fragrance and packaging solutions.'
    });
    return await client.fetch(`*[_type == "author" && name == "KeepMe Team"][0]`);
  }
  
  console.log('Using existing author:', existingAuthor.name);
  return existingAuthor;
}

// Import blog posts
async function importBlogPosts() {
  try {
    // Create categories first
    await createCategories();
    
    // Create or get default author
    const author = await createDefaultAuthor();
    
    console.log('Importing blog posts...');
    
    for (const post of blogPosts) {
      // Check if post already exists by slug
      const existingPost = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0]`,
        { slug: post.slug }
      );
      
      if (existingPost) {
        console.log(`Post already exists: ${post.title}`);
        continue;
      }
      
      // Get category references
      const categoryRefs = [];
      for (const categoryName of post.categoryNames) {
        const category = await client.fetch(
          `*[_type == "category" && title == $title][0]`,
          { title: categoryName }
        );
        
        if (category) {
          categoryRefs.push({
            _type: 'reference',
            _ref: category._id
          });
        }
      }
      
      // Create the post document
      console.log(`Creating post: ${post.title}`);
      await client.create({
        _type: 'post',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug
        },
        author: {
          _type: 'reference',
          _ref: author._id
        },
        publishedAt: post.publishedAt,
        excerpt: post.excerpt,
        categories: categoryRefs,
        body: post.body
      });
    }
    
    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing blog posts:', error);
  }
}

// Run the import
importBlogPosts();
