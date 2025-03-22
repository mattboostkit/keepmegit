'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { getBlogPost } from '../../../../lib/sanity';

export async function generateMetadata({ params }) {
  try {
    const post = await getBlogPost(params.slug);
    console.log('Generating metadata for post:', post);
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.'
      };
    }
    
    return {
      title: `${post.title} | KeepMe Blog`,
      description: post.excerpt || 'Read our latest blog post on KeepMe.'
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | KeepMe',
      description: 'Read our latest blog post on KeepMe.'
    };
  }
}

export default async function BlogPostPage({ params }) {
  console.log('Rendering blog post page with params:', params);
  
  try {
    const post = await getBlogPost(params.slug);
    console.log('Fetched blog post:', post);
    
    if (!post) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">Post Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, the blog post you are looking for does not exist or has been removed.</p>
          <Link href="/blog" className="btn btn-primary">
            Return to Blog
          </Link>
        </div>
      );
    }

    const [loading, setLoading] = useState(false);
    const [commentName, setCommentName] = useState('');
    const [commentEmail, setCommentEmail] = useState('');
    const [commentText, setCommentText] = useState('');
    const [commentSubmitted, setCommentSubmitted] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          // Fetch data from Sanity
          const fetchedPost = await getBlogPost(params.slug);
          
          if (fetchedPost) {
            console.log('Fetched blog post from Sanity:', fetchedPost);
          } else {
            console.log('Post not found in Sanity');
          }
          
          setLoading(false);
        } catch (error) {
          console.error('Error fetching blog post:', error);
          setLoading(false);
        }
      };

      if (params.slug) {
        fetchPost();
      }
    }, [params.slug]);

    // Render loading state
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-16 h-16 border-t-4 border-teal-700 border-solid rounded-full animate-spin"></div>
          <p className="ml-4 text-gray-600">Loading post...</p>
        </div>
      );
    }
    
    return (
      <div className="blog-post-page">
        {/* Breadcrumbs */}
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto px-4">
            <div className="text-sm text-gray-600">
              <Link href="/" className="hover:text-teal-700">Home</Link>
              <span className="mx-2">&gt;</span>
              <Link href="/blog" className="hover:text-teal-700">Blog</Link>
              <span className="mx-2">&gt;</span>
              <Link href={`/blog?category=${post.categories[0]}`} className="hover:text-teal-700">{post.categories[0]}</Link>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-800">{post.title}</span>
            </div>
          </div>
        </div>
        
        {/* Post Header */}
        <header className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center text-sm text-gray-600 gap-4">
              <Link href={`/blog?category=${post.categories[0]}`} className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 font-medium hover:bg-teal-200">
                {post.categories[0]}
              </Link>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {format(new Date(post.publishedAt), 'd MMMM yyyy')}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author.name}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            
            <p className="text-xl text-gray-600 mb-8">{post.body[0].children[0].text}</p>
            
            {post.featuredImage && (
              <div className="post-featured-image mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </header>
        
        {/* Post Content */}
        <article className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {post.body.map((block, index) => {
                switch (block._type) {
                  case 'block':
                    return <p key={index} className="mb-6">{block.children[0].text}</p>;
                  case 'heading':
                    return <h2 key={index} className="text-2xl font-bold mt-12 mb-6">{block.children[0].text}</h2>;
                  case 'image':
                    return (
                      <figure key={index} className="my-8">
                        <div className="rounded-lg overflow-hidden shadow-md">
                          {block.asset?.url ? (
                            <Image 
                              src={block.asset.url} 
                              alt={block.alt || "Blog post image"} 
                              width={800} 
                              height={450} 
                              className="w-full h-auto"
                            />
                          ) : (
                            <div className="bg-gray-200 w-full h-64 flex items-center justify-center">
                              <span className="text-gray-400">Image placeholder</span>
                            </div>
                          )}
                        </div>
                        {block.caption && <figcaption className="text-center text-gray-600 mt-2">{block.caption}</figcaption>}
                      </figure>
                    );
                  case 'code':
                    return (
                      <div key={index} className="my-8">
                        <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-400">{block.language || 'code'}</span>
                          </div>
                          <pre className="text-sm">
                            <code>{block.code}</code>
                          </pre>
                        </div>
                      </div>
                    );
                  case 'callout':
                    const calloutColors = {
                      tip: 'bg-green-50 border-green-500 text-green-700',
                      warning: 'bg-amber-50 border-amber-500 text-amber-700',
                      note: 'bg-blue-50 border-blue-500 text-blue-700'
                    };
                    const calloutIcons = {
                      tip: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      warning: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      ),
                      note: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )
                    };
                    return (
                      <div key={index} className={`my-8 p-4 border-l-4 ${calloutColors[block.type || 'note']}`}>
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {calloutIcons[block.type || 'note']}
                          </div>
                          <div>
                            <h4 className="font-bold capitalize mb-2">{block.type || 'Note'}</h4>
                            <p>{block.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  case 'quote':
                    return (
                      <blockquote key={index} className="border-l-4 border-teal-700 pl-4 py-2 my-8 italic text-gray-700">
                        <p className="mb-2">{block.children[0].text}</p>
                        {block.attribution && (
                          <cite className="not-italic font-medium">— {block.attribution}</cite>
                        )}
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </div>
            
            {/* Share Buttons */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">Share This Post</h3>
              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-teal-700">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-teal-700">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-teal-700">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-teal-700">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.438-.645 1.438-1.44s-.643-1.44-1.438-1.44z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
        
        {/* Author Bio */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-6">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full mb-4 md:mb-0 md:mr-6 flex-shrink-0 flex items-center justify-center">
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={128}
                    height={128}
                    className="rounded-full"
                  />
                ) : (
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                <p className="text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Comments Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Comments ({post.relatedPosts.length})</h2>
            
            {post.relatedPosts.length > 0 ? (
              <div className="space-y-6 mb-12">
                {post.relatedPosts.map((comment, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">{comment.title.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{comment.title}</h4>
                        <p className="text-sm text-gray-600">{format(new Date(comment.publishedAt), 'd MMMM yyyy')}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.body[0].children[0].text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mb-8">Be the first to comment on this article.</p>
            )}
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6">Leave a Comment</h3>
              
              {commentSubmitted && (
                <div className="mb-6 p-4 rounded-md bg-green-50 text-green-700">
                  Thank you for your comment. It will be reviewed and published shortly.
                </div>
              )}
              
              <form onSubmit={(e) => {
                e.preventDefault();
                setCommentSubmitted(true);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Your email will not be published.</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                    Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary py-2 px-6"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Related Posts */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Articles</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explore more content related to this topic
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {post.relatedPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.body[0].children[0].text}</p>
                  <p className="text-sm text-gray-600 mt-2">{format(new Date(post.publishedAt), 'd MMMM yyyy')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
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
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setSubscriptionStatus('success');
                }} className="max-w-md mx-auto">
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
                  <p className="text-xs text-gray-500 mt-1">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p className="text-gray-600 mb-8">An error occurred while rendering the blog post.</p>
        <Link href="/blog" className="btn btn-primary">
          Return to Blog
        </Link>
      </div>
    );
  }
}
