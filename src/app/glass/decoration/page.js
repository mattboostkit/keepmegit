import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '@/components/SEO';

export const metadata = {
  title: 'Glass Decoration Options | KeepMe',
  description: 'Explore our premium glass decoration techniques including screen printing, hot foil stamping, and more for your luxury packaging needs.',
  keywords: 'glass decoration, screen printing, hot foil stamping, acid etching, colour spraying, glass packaging decoration',
};

// Mock decoration techniques data (would typically come from Sanity CMS)
const decorationTechniques = [
  {
    id: 'screen-printing',
    title: 'Screen Printing',
    description: 'Our advanced screen printing technology allows for precise, vibrant designs with up to 6 colours. Perfect for logos, text, and intricate patterns.',
    benefits: [
      'Up to 6 colours',
      'Excellent durability',
      'Cost-effective for larger runs',
      'Suitable for curved surfaces'
    ],
    image: '/images/decoration/screen-printing.jpg'
  },
  {
    id: 'hot-foil',
    title: 'Hot Foil Stamping',
    description: 'Add a touch of luxury with our hot foil stamping. This technique creates metallic or holographic effects that catch the light and elevate your packaging.',
    benefits: [
      'Gold, silver, and custom foil colours',
      'Holographic options available',
      'Premium finish',
      'Excellent for luxury brands'
    ],
    image: '/images/decoration/hot-foil.jpg'
  },
  {
    id: 'acid-etching',
    title: 'Acid Etching',
    description: 'Create subtle, sophisticated designs with our acid etching process. This technique produces a frosted appearance that adds texture and depth.',
    benefits: [
      'Elegant frosted appearance',
      'Permanent decoration',
      'Tactile finish',
      'Subtle branding option'
    ],
    image: '/images/decoration/acid-etching.jpg'
  },
  {
    id: 'spraying',
    title: 'Colour Spraying',
    description: 'Transform clear glass with our colour spraying service. We offer a wide range of finishes including matte, gloss, and metallic effects.',
    benefits: [
      'Full or partial coverage',
      'Wide colour range',
      'Various finishes available',
      'Can be combined with other techniques'
    ],
    image: '/images/decoration/spraying.jpg'
  },
  {
    id: 'digital-printing',
    title: 'Digital Printing',
    description: 'Our digital printing technology allows for photorealistic images and complex designs with unlimited colours. Ideal for small runs and prototyping.',
    benefits: [
      'Unlimited colours',
      'Photorealistic images',
      'Ideal for small runs',
      'Quick turnaround'
    ],
    image: '/images/decoration/digital-printing.jpg'
  },
  {
    id: 'embossing',
    title: 'Embossing',
    description: 'Add dimension to your glass packaging with our embossing techniques. Create raised designs that add a tactile element to your product.',
    benefits: [
      'Tactile branding',
      'Premium appearance',
      'Distinctive shelf presence',
      'Can be combined with other decoration methods'
    ],
    image: '/images/decoration/embossing.jpg'
  }
];

export default function GlassDecorationPage() {
  return (
    <>
      <SEO 
        title="Glass Decoration Options | KeepMe"
        description="Explore our premium glass decoration techniques including screen printing, hot foil stamping, and more for your luxury packaging needs."
        type="service"
      />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-gray-800">Glass Decoration Options</h1>
          
          <p className="text-lg text-center max-w-3xl mx-auto mb-8 text-gray-600">
            Enhance your glass packaging with our wide range of decoration techniques.
            From screen printing to hot foil stamping, we offer solutions to make your products stand out on the shelf.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/glass/products" className="bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition duration-300 text-center">
              View Glass Products
            </Link>
            <Link href="/tools/quote-sheet" className="border border-teal-700 text-teal-700 px-6 py-3 rounded-md hover:bg-teal-50 transition duration-300 text-center">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
        
      {/* Decoration Techniques */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-800">Our Decoration Techniques</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {decorationTechniques.map((technique) => (
              <div key={technique.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-white">
                <div className="relative h-64 w-full bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Image: {technique.title}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">{technique.title}</h3>
                  <p className="text-gray-600 mb-4">{technique.description}</p>
                  
                  <h4 className="font-medium mb-2 text-gray-800">Key Benefits:</h4>
                  <ul className="list-disc pl-5 mb-6">
                    {technique.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-600 mb-1">{benefit}</li>
                    ))}
                  </ul>
                  
                  <Link href={`/glass/gallery#${technique.id}`} className="text-teal-700 font-medium hover:text-teal-800 hover:underline transition duration-300 inline-flex items-center">
                    View Examples
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        
      {/* Combination Techniques */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Combination Techniques</h2>
            <p className="text-gray-600 mb-6">
              For truly unique packaging, we can combine multiple decoration techniques.
              Create distinctive designs by pairing screen printing with hot foil stamping,
              or acid etching with colour spraying. Our experts can advise on the best
              combinations for your specific requirements.
            </p>
            
            <Link 
              href="/contact" 
              className="bg-teal-700 text-white px-6 py-3 rounded-md inline-block hover:bg-teal-800 transition duration-300"
            >
              Discuss Your Decoration Requirements
            </Link>
          </div>
        </div>
      </section>
        
      {/* Design Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Design Services</h2>
          <p className="max-w-3xl mx-auto mb-8 text-gray-600">
            Need help with your decoration design? Our in-house design team can assist with
            creating artwork that maximises the impact of your chosen decoration techniques.
            From concept to production-ready files, we're here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="p-6 border rounded-lg hover:shadow-md transition duration-300">
              <h3 className="text-xl font-medium mb-3 text-gray-800">Concept Development</h3>
              <p className="text-gray-600">We'll work with you to develop decoration concepts that align with your brand identity.</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md transition duration-300">
              <h3 className="text-xl font-medium mb-3 text-gray-800">Technical Artwork</h3>
              <p className="text-gray-600">Our team will prepare production-ready artwork optimised for your chosen decoration technique.</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md transition duration-300">
              <h3 className="text-xl font-medium mb-3 text-gray-800">Sampling</h3>
              <p className="text-gray-600">We provide decoration samples so you can see and feel the quality before full production.</p>
            </div>
          </div>
          
          <Link 
            href="/glass/gallery" 
            className="bg-gray-800 text-white px-6 py-3 rounded-md inline-block hover:bg-gray-700 transition duration-300"
          >
            View Our Decoration Gallery
          </Link>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Enhance Your Glass Packaging?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Contact our team today to discuss how our decoration techniques can elevate your products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-white text-teal-700 px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300">
              Contact Us
            </Link>
            <Link href="/tools/quote-sheet" className="border border-white text-white px-6 py-3 rounded-md hover:bg-teal-600 transition duration-300">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
