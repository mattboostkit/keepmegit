'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage,
  primaryCta,
  secondaryCta,
  primaryCtaLink,
  secondaryCtaLink
}) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-teal-700 to-teal-900"></div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title || "Expert Fragrance Manufacturers & Premium Glass Packaging"}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {subtitle || "From initial concept to final fulfilment, KeepMe delivers above and beyond customer expectations"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href={primaryCtaLink || "/services"} 
            className="btn bg-white text-teal-800 hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition-all"
          >
            {primaryCta || "Explore Our Services"}
          </Link>
          <Link 
            href={secondaryCtaLink || "/contact"} 
            className="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md font-medium text-lg transition-all"
          >
            {secondaryCta || "Contact Us"}
          </Link>
        </div>
      </div>
    </section>
  );
}
