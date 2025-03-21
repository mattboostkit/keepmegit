'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BlogPostCard({ title, excerpt, imageUrl, category, date, slug }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card blog-card transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
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
        <div className="text-gray-500 text-sm mb-2">{date}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <a 
          href={`/blog/${slug}`} 
          className="inline-block text-teal-700 font-medium hover:text-teal-900 transition-colors"
        >
          Read More →
        </a>
      </div>
    </div>
  );
}
