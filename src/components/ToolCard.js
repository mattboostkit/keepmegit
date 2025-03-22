'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ToolCard({ title, description, imageUrl, link, buttonText }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card tool-card transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 overflow-hidden bg-teal-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center text-white">
              {title.charAt(0)}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-10rem)]">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Link 
          href={link} 
          className="btn btn-primary w-full text-center"
        >
          {buttonText || 'Use Tool'}
        </Link>
      </div>
    </div>
  );
}
