import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '@/components/SEO';

export const metadata = {
  title: 'Glass Gallery | KeepMe',
  description: 'Explore our showcase of premium glass products and decoration techniques for the fragrance, beauty, and lifestyle industry.',
  keywords: 'glass gallery, glass packaging examples, decoration techniques, fragrance bottles, candle jars, glass products',
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
    description: 'Elegant diffuser bottle with multi-colour screen printing',
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
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-gray-800">Glass Gallery</h1>
          
          <p className="text-lg text-center max-w-3xl mx-auto mb-8 text-gray-600">
            Browse our gallery of premium glass products and decoration techniques.
            These examples showcase our capabilities and the quality of our work.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/glass/products" className="bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition duration-300 text-center">
              View Product Range
            </Link>
            <Link href="/glass/decoration" className="border border-teal-700 text-teal-700 px-6 py-3 rounded-md hover:bg-teal-50 transition duration-300 text-center">
              Decoration Options
            </Link>
          </div>
        </div>
      </section>
      
      {/* Gallery Filters */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filter Gallery</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 text-gray-700">Filter by Category:</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-teal-700 text-white rounded-md text-sm hover:bg-teal-800 transition duration-300">
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button 
                      key={category} 
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition duration-300"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3 text-gray-700">Filter by Technique:</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-teal-700 text-white rounded-md text-sm hover:bg-teal-800 transition duration-300">
                    All Techniques
                  </button>
                  {techniques.map((technique) => (
                    <button 
                      key={technique} 
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition duration-300"
                    >
                      {technique}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {galleryItems.map((item) => (
              <div key={item.id} id={item.id} className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Image: {item.title}</p>
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white text-teal-700 px-4 py-2 rounded-md font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-100">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-md">
                      {item.category}
                    </span>
                    {item.techniques.map((technique) => (
                      <span key={technique} className="bg-teal-50 text-teal-700 text-xs px-3 py-1 rounded-md">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        
      {/* Case Studies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Featured Case Studies</h2>
            <p className="text-gray-600 mb-10 text-lg">
              Discover how we've helped brands create distinctive glass packaging solutions.
              Our case studies showcase the journey from concept to finished product.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Luxury Fragrance Rebrand</h3>
                <p className="text-gray-600 mb-4">How we helped a premium fragrance brand refresh their packaging with custom glass bottles.</p>
                <Link href="/case-studies/luxury-fragrance" className="text-teal-700 font-medium hover:text-teal-800 hover:underline transition duration-300 inline-flex items-center">
                  Read Case Study
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Sustainable Packaging Solution</h3>
                <p className="text-gray-600 mb-4">Creating eco-friendly glass packaging for a conscious beauty brand.</p>
                <Link href="/case-studies/sustainable-packaging" className="text-teal-700 font-medium hover:text-teal-800 hover:underline transition duration-300 inline-flex items-center">
                  Read Case Study
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Limited Edition Collection</h3>
                <p className="text-gray-600 mb-4">Developing distinctive packaging for a seasonal limited edition product range.</p>
                <Link href="/case-studies/limited-edition" className="text-teal-700 font-medium hover:text-teal-800 hover:underline transition duration-300 inline-flex items-center">
                  Read Case Study
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      {/* Call to Action */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Your Own Glass Packaging?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Whether you're looking for standard products or custom solutions, our team is ready to help.
            Contact us to discuss your glass packaging requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="bg-white text-teal-700 px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300"
            >
              Contact Us
            </Link>
            <Link 
              href="/tools/quote-sheet" 
              className="border border-white text-white px-6 py-3 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
