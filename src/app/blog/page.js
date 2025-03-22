'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from 'next-sanity';
import BlogPostCard from '../../components/BlogPostCard';
import { clientConfig } from '../../lib/sanity';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  
  const postsPerPage = 6;
  
  // Fetch data from Sanity
  useEffect(() => {
    const client = createClient(clientConfig);
    
    const fetchData = async () => {
      try {
        // Fetch data from Sanity
        let postsQuery = `*[_type == "post"] | order(publishedAt desc)[0...100]{
          _id,
          title,
          slug,
          excerpt,
          "featuredImage": featuredImage.asset->url,
          "categories": categories[]->title,
          publishedAt,
          "author": author->{name, "image": image.asset->url}
        }`;
        
        let categoriesQuery = `*[_type == "category"]{
          _id,
          title,
          slug
        }`;
        
        const fetchedPosts = await client.fetch(postsQuery);
        const fetchedCategories = await client.fetch(categoriesQuery);
        
        if (fetchedCategories && fetchedCategories.length > 0) {
          setCategories(fetchedCategories.map(cat => cat.title));
        }
        
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
          setTotalPages(Math.ceil(fetchedPosts.length / postsPerPage));
        }
        
        setIsLoading(false);
        console.log('Fetched blog data from Sanity:', { 
          posts: fetchedPosts, 
          categories: fetchedCategories 
        });
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter posts by category
  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.categories.includes(activeCategory));
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Featured posts (latest 3 posts)
  const featuredPosts = [...posts].sort((a, b) => 
    new Date(b.publishedAt) - new Date(a.publishedAt)
  ).slice(0, 3);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };
  
  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    // In a real implementation, this would submit to a backend API
    // For now, we'll just simulate a successful submission
    if (newsletterEmail) {
      setSubscriptionStatus('success');
      setNewsletterEmail('');
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus(null);
      }, 3000);
    }
  };
  
  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-700 to-teal-900"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Latest Insights</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Industry news, trends, and insights from the KeepMe team
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-teal-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category
                      ? 'bg-teal-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="mb-16">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-t-4 border-teal-700 border-solid rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No posts found in this category.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post, index) => (
                    <BlogPostCard key={index} post={post} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-10 h-10 rounded-md ${
                            currentPage === number
                              ? 'bg-teal-700 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Featured Posts */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Posts</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explore our most popular and insightful articles
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogPostCard key={index} post={post} />
              ))}
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest industry insights and company news
            </p>
            
            {subscriptionStatus === 'success' ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
                Thank you for subscribing! You'll receive our next newsletter.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary whitespace-nowrap px-6 py-2"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
