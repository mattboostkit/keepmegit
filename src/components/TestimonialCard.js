'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TestimonialCard({ quote, author, company, imageUrl }) {
  return (
    <div className="testimonial-card bg-white p-6 rounded-lg shadow-md">
      <div className="quote-mark text-4xl text-teal-700 opacity-50 mb-4">"</div>
      <p className="quote text-gray-700 italic mb-6">{quote}</p>
      <div className="author-info flex items-center">
        <div className="author-image relative w-12 h-12 rounded-full overflow-hidden mr-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={author}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
              {author.split(' ').map(name => name[0]).join('')}
            </div>
          )}
        </div>
        <div>
          <h4 className="author-name font-semibold">{author}</h4>
          <p className="company-name text-sm text-gray-500">{company}</p>
        </div>
      </div>
    </div>
  );
}
