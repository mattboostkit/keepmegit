// Test script for Sanity connection
const { createClient } = require('next-sanity');

// Create Sanity client with explicit token
const client = createClient({
  projectId: '2yws8jj2',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

console.log('Sanity client configured with:');
console.log('- Project ID:', '2yws8jj2');
console.log('- Dataset:', 'production');
console.log('- API Version:', '2023-05-03');

async function testConnection() {
  try {
    // Simple query to test connection
    const result = await client.fetch(`*[_type == "post"][0...10]`);
    console.log('Connection successful!');
    console.log('Found', result.length, 'posts');
    console.log('First post:', result[0] ? result[0].title : 'No posts found');
    return result;
  } catch (error) {
    console.error('Error connecting to Sanity:', error);
    return null;
  }
}

testConnection();
