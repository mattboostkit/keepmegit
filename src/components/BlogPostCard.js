'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogPostCard({ post }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract data from post object
  const { title, excerpt, featuredImage, categories = [], publishedAt, slug } = post || {};
  const category = categories && categories.length > 0 ? categories[0] : null;
  
  // Format date if available
  const formattedDate = publishedAt ? format(new Date(publishedAt), 'd MMMM yyyy') : '';
  
  return (
    <div 
      className="card blog-card transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            KeepMe Blog
          </div>
        )}
        {category && (
          <span className="absolute top-4 left-4 bg-teal-700 text-white px-3 py-1 text-sm rounded">
            {category}
          </span>
        )}
      </div>
      <div className="p-6">
        {formattedDate && <div className="text-gray-500 text-sm mb-2">{formattedDate}</div>}
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          href={`/blog/${slug?.current || '#'}`} 
          className="inline-block text-teal-700 font-medium hover:text-teal-900 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
