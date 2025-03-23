import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '@/components/SEO';

export const metadata = {
  title: 'Glass Gallery | KeepMe',
  description: 'Explore our showcase of premium glass products and decoration techniques for the fragrance, beauty, and lifestyle industry.',
};

// Mock gallery items data (would typically come from Sanity CMS)
const galleryItems = [
  {
    id: 'gallery-1',
    title: 'Luxury Perfume Bottle',
    description: 'Custom designed perfume bottle with gold hot foil decoration',
    category: 'Fragrance',
    techniques: ['Hot Foil Stamping', 'Colour Spraying'],
    image: '/images/gallery/fragrance-1.jpg'
  },
  {
    id: 'gallery-2',
    title: 'Artisan Candle Jar',
    description: 'Hand-finished candle jar with acid etched logo',
    category: 'Home Fragrance',
    techniques: ['Acid Etching', 'Screen Printing'],
    image: '/images/gallery/candle-1.jpg'
  },
  {
    id: 'gallery-3',
    title: 'Premium Diffuser Bottle',
    description: 'Elegant diffuser bottle with multi-color screen printing',
    category: 'Home Fragrance',
    techniques: ['Screen Printing'],
    image: '/images/gallery/diffuser-1.jpg'
  },
  {
    id: 'gallery-4',
    title: 'Cosmetic Cream Jar',
    description: 'Frosted glass jar with embossed brand logo',
    category: 'Beauty',
    techniques: ['Embossing', 'Frosting'],
    image: '/images/gallery/cosmetic-1.jpg'
  },
  {
    id: 'gallery-5',
    title: 'Limited Edition Fragrance',
    description: 'Special edition bottle with digital printed artwork',
    category: 'Fragrance',
    techniques: ['Digital Printing', 'Colour Spraying'],
    image: '/images/gallery/fragrance-2.jpg'
  },
  {
    id: 'gallery-6',
    title: 'Bespoke Spirit Bottle',
    description: 'Custom spirit bottle with metallic screen printing',
    category: 'Spirits',
    techniques: ['Screen Printing', 'Hot Foil Stamping'],
    image: '/images/gallery/spirit-1.jpg'
  },
  {
    id: 'gallery-7',
    title: 'Luxury Serum Dropper',
    description: 'Premium serum bottle with gold accents',
    category: 'Beauty',
    techniques: ['Hot Foil Stamping', 'Colour Spraying'],
    image: '/images/gallery/serum-1.jpg'
  },
  {
    id: 'gallery-8',
    title: 'Artisan Reed Diffuser',
    description: 'Handcrafted diffuser with etched pattern',
    category: 'Home Fragrance',
    techniques: ['Acid Etching'],
    image: '/images/gallery/diffuser-2.jpg'
  },
  {
    id: 'gallery-9',
    title: 'Premium Gift Set',
    description: 'Coordinated glass set with consistent branding',
    category: 'Gift Sets',
    techniques: ['Screen Printing', 'Colour Spraying'],
    image: '/images/gallery/gift-1.jpg'
  },
  {
    id: 'gallery-10',
    title: 'Textured Candle Container',
    description: 'Unique textured glass with embossed details',
    category: 'Home Fragrance',
    techniques: ['Embossing', 'Acid Etching'],
    image: '/images/gallery/candle-2.jpg'
  },
  {
    id: 'gallery-11',
    title: 'Miniature Perfume Collection',
    description: 'Set of miniature bottles with consistent decoration',
    category: 'Fragrance',
    techniques: ['Screen Printing', 'Hot Foil Stamping'],
    image: '/images/gallery/fragrance-3.jpg'
  },
  {
    id: 'gallery-12',
    title: 'Luxury Bath Oil Bottle',
    description: 'Elegant bath oil bottle with metallic decoration',
    category: 'Bath & Body',
    techniques: ['Hot Foil Stamping', 'Digital Printing'],
    image: '/images/gallery/bath-1.jpg'
  }
];

// Get unique categories and techniques for filtering
const categories = [...new Set(galleryItems.map(item => item.category))];
const techniques = [...new Set(galleryItems.flatMap(item => item.techniques))];

export default function GlassGalleryPage() {
  return (
    <>
      <SEO 
        title="Glass Gallery | KeepMe"
        description="Explore our showcase of premium glass products and decoration techniques for the fragrance, beauty, and lifestyle industry."
        type="gallery"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Glass Gallery</h1>
        
        <div className="mb-12">
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            Browse our gallery of premium glass products and decoration techniques.
            These examples showcase our capabilities and the quality of our work.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Link href="/glass/products" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition">
              View Product Range
            </Link>
            <Link href="/glass/decoration" className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-gray-50 transition">
              Decoration Options
            </Link>
          </div>
        </div>
        
        {/* Gallery Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <h3 className="font-medium mr-2">Filter by Category:</h3>
            <button className="px-3 py-1 bg-primary text-white rounded-full text-sm">All</button>
            {categories.map((category) => (
              <button 
                key={category} 
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <h3 className="font-medium mr-2">Filter by Technique:</h3>
            <button className="px-3 py-1 bg-primary text-white rounded-full text-sm">All</button>
            {techniques.map((technique) => (
              <button 
                key={technique} 
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
              >
                {technique}
              </button>
            ))}
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-card group">
              <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-sm">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Image: {item.title}</p>
                </div>
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-white text-primary px-4 py-2 rounded-md font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                  {item.techniques.map((technique) => (
                    <span key={technique} className="bg-primary bg-opacity-10 text-primary text-xs px-2 py-1 rounded">
                      {technique}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Case Studies Section */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-semibold mb-4">Featured Case Studies</h2>
          <p className="mb-6">
            Discover how we've helped brands create distinctive glass packaging solutions.
            Our case studies showcase the journey from concept to finished product.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="case-study-card bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">Luxury Fragrance Rebrand</h3>
              <p className="text-gray-600 mb-4">How we helped a premium fragrance brand refresh their packaging with custom glass bottles.</p>
              <button className="text-primary font-medium hover:underline">Read Case Study</button>
            </div>
            
            <div className="case-study-card bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">Sustainable Packaging Solution</h3>
              <p className="text-gray-600 mb-4">Creating eco-friendly glass packaging for a conscious beauty brand.</p>
              <button className="text-primary font-medium hover:underline">Read Case Study</button>
            </div>
            
            <div className="case-study-card bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">Limited Edition Collection</h3>
              <p className="text-gray-600 mb-4">Developing distinctive packaging for a seasonal limited edition product range.</p>
              <button className="text-primary font-medium hover:underline">Read Case Study</button>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Create Your Own Glass Packaging?</h2>
          <p className="max-w-3xl mx-auto mb-6">
            Whether you're looking for standard products or custom solutions, our team is ready to help.
            Contact us to discuss your glass packaging requirements.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition"
            >
              Contact Us
            </Link>
            <Link 
              href="/tools/quote-sheet" 
              className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-gray-50 transition"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
