'use client';

import { useState, useEffect } from 'react';
import { createClient } from 'next-sanity';
import { clientConfig } from '../../../../lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import CommentForm from '../../../../components/CommentForm';
import NewsletterForm from '../../../../components/NewsletterForm';

export default function BlogPostClient({ slug }) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const client = createClient(clientConfig);
    
    const fetchPost = async () => {
      try {
        if (!slug) return;
        
        const query = `*[_type == "post" && slug.current == $slug][0]{
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
        }`;
        
        const fetchedPost = await client.fetch(query, { slug });
        
        if (fetchedPost) {
          console.log('Fetched blog post from Sanity:', fetchedPost);
          setPost(fetchedPost);
        } else {
          console.log('Post not found in Sanity');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-teal-700 border-solid rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600">Loading post...</p>
      </div>
    );
  }
  
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
          
          {post.body && post.body[0] && post.body[0].children && post.body[0].children[0] && (
            <p className="text-xl text-gray-600 mb-8">{post.body[0].children[0].text}</p>
          )}
          
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
            {post.body && post.body.map((block, index) => {
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
          <h2 className="text-2xl font-bold mb-8">Comments</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6">Leave a Comment</h3>
            <CommentForm />
          </div>
        </div>
      </section>
      
      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Articles</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Explore more content related to this topic
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {post.relatedPosts.map((relatedPost, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-2">{relatedPost.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{format(new Date(relatedPost.publishedAt), 'd MMMM yyyy')}</p>
                  <Link href={`/blog/${relatedPost.slug.current}`} className="mt-4 inline-block text-teal-700">
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter Signup */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest industry insights and company news
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
