'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ServiceCard({ title, description, imageUrl, link }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card service-card transition-all duration-300 h-full"
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
          <div className="w-full h-full bg-teal-700 flex items-center justify-center text-white">
            {title}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href={link} 
          className="inline-block text-teal-700 font-medium hover:text-teal-900 transition-colors"
        >
          Learn More →
        </a>
      </div>
    </div>
  );
}
