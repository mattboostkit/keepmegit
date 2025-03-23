'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from 'next-sanity';
import BlogPostCard from '../../components/BlogPostCard';
import NewsletterForm from '../../components/NewsletterForm';
import { clientConfig } from '../../lib/sanity';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Fetch posts and categories
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch categories
        const client = createClient(clientConfig);
        const categoriesQuery = `*[_type == "category"] {
          _id,
          title,
          "slug": slug.current
        }`;
        const categoriesData = await client.fetch(categoriesQuery);
        setCategories(categoriesData.map(category => category.slug));
        
        // Fetch posts
        const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          "slug": slug.current,
          publishedAt,
          excerpt,
          "featuredImage": mainImage.asset->url,
          "categories": categories[]->slug.current,
          "author": author->{name, "image": image.asset->url}
        }`;
        const postsData = await client.fetch(postsQuery);
        setPosts(postsData);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [postsPerPage]);
  
  // Filter posts by category and implement URL-based filtering
  useEffect(() => {
    // Check if we have a category in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categories]);
  
  // Filter posts by category
  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.categories && post.categories.includes(activeCategory));
  
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    
    // Update URL with category parameter
    const url = new URL(window.location);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url);
  };
  
  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // If loading
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }
  
  // If error
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p>{error}</p>
        </div>
        <div className="text-center">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Insights, news, and updates from the world of fragrances and packaging
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full ${
                activeCategory === 'all'
                  ? 'bg-teal-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition duration-300`}
            >
              All Posts
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category
                    ? 'bg-teal-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition duration-300`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
              </button>
            ))}
          </div>
          
          {/* Blog Posts Grid */}
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No posts found in this category.</p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="mt-4 bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition duration-300"
              >
                View All Posts
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredPosts.length > postsPerPage && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${
                      currentPage === index + 1
                        ? 'bg-teal-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition duration-300`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Stay updated with our latest articles, news, and special offers.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
