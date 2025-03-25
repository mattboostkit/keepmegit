'use client';

import Image from 'next/image';

export default function SanityImage({ 
  src, 
  alt, 
  width = 800,
  height = 600,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  className = '',
  objectFit = 'cover',
  ...props 
}) {
  // Handle missing images
  if (!src) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`} 
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width, 
          height: typeof height === 'number' ? `${height}px` : height 
        }}
      >
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  // Add image transformation parameters if not already present
  // Only add parameters for Sanity CDN URLs
  const imageUrl = src.includes('cdn.sanity.io') && !src.includes('?') 
    ? `${src}?w=${width}&h=${height}&fit=crop&auto=format` 
    : src;

  return (
    <Image
      src={imageUrl}
      alt={alt || 'Image'}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit }}
      {...props}
    />
  );
}
