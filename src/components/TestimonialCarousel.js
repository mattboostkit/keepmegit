'use client';

import { useState } from 'react';

export default function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  
  // If no testimonials are provided, show placeholder
  if (!testimonials || testimonials.length === 0) {
    testimonials = [
      {
        quote: "KeepMe has been an exceptional partner for our fragrance needs. Their attention to detail and quality is unmatched in the industry.",
        author: "Jane Smith",
        company: "Luxury Brands Inc."
      }
    ];
  }
  
  return (
    <div className="testimonial-carousel relative">
      <div className="carousel-content">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`testimonial-slide transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <div className="quote-mark text-4xl text-teal-700 opacity-50 mb-4">"</div>
            <p className="quote text-gray-700 italic mb-6 text-lg">{testimonial.quote}</p>
            <div className="author-info">
              <h4 className="author-name font-semibold">{testimonial.author}</h4>
              <p className="company-name text-sm text-gray-500">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
      >
        <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
      >
        <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dots navigation */}
      <div className="dots-container flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? 'bg-teal-700' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
