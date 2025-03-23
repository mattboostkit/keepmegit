import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '@/components/SEO';

export const metadata = {
  title: 'Glass Decoration Options | KeepMe',
  description: 'Explore our premium glass decoration techniques including screen printing, hot foil stamping, and more.',
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
        description="Explore our premium glass decoration techniques including screen printing, hot foil stamping, and more."
        type="service"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Glass Decoration Options</h1>
        
        <div className="mb-12">
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            Enhance your glass packaging with our wide range of decoration techniques.
            From screen printing to hot foil stamping, we offer solutions to make your products stand out.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Link href="/glass/products" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition">
              View Glass Products
            </Link>
            <Link href="/contact" className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-gray-50 transition">
              Request a Quote
            </Link>
          </div>
        </div>
        
        {/* Decoration Techniques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {decorationTechniques.map((technique) => (
            <div key={technique.id} className="decoration-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Image: {technique.title}</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-medium mb-3">{technique.title}</h3>
                <p className="text-gray-600 mb-4">{technique.description}</p>
                
                <h4 className="font-medium mb-2">Key Benefits:</h4>
                <ul className="list-disc pl-5 mb-4">
                  {technique.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600 mb-1">{benefit}</li>
                  ))}
                </ul>
                
                <button className="text-primary font-medium hover:underline">
                  View Examples
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Combination Techniques */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-semibold mb-4">Combination Techniques</h2>
          <p className="mb-6">
            For truly unique packaging, we can combine multiple decoration techniques.
            Create distinctive designs by pairing screen printing with hot foil stamping,
            or acid etching with colour spraying. Our experts can advise on the best
            combinations for your specific requirements.
          </p>
          
          <Link 
            href="/contact" 
            className="bg-primary text-white px-6 py-3 rounded-md inline-block hover:bg-primary-dark transition"
          >
            Discuss Your Decoration Requirements
          </Link>
        </div>
        
        {/* Design Services */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Design Services</h2>
          <p className="max-w-3xl mx-auto mb-6">
            Need help with your decoration design? Our in-house design team can assist with
            creating artwork that maximizes the impact of your chosen decoration techniques.
            From concept to production-ready files, we're here to help.
          </p>
          
          <Link 
            href="/glass/gallery" 
            className="bg-secondary text-white px-6 py-3 rounded-md inline-block hover:bg-secondary-dark transition"
          >
            View Our Decoration Gallery
          </Link>
        </div>
      </div>
    </>
  );
}
