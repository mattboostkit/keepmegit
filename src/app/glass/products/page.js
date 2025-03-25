import React from 'react';
import { getGlassProducts } from '../../../lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import SEO from '../../../components/SEO';
import ProductCard from '../../../components/glass/ProductCard';
import ProductFilters from '../../../components/glass/ProductFilters';

export const metadata = {
  title: 'Glass Product Range | KeepMe',
  description: 'Explore our premium glass product range for the fragrance, beauty, and lifestyle industry. View our extensive collection and add products to your enquiry list.',
};

export default async function GlassProductsPage() {
  // Fetch glass products from Sanity
  const glassProducts = await getGlassProducts();
  
  // Extract all subcategories for filtering
  const subcategories = [...new Set(glassProducts.map(product => product.subcategory || 'Other'))];
  
  // Extract all materials for filtering
  const allMaterials = glassProducts.reduce((acc, product) => {
    if (product.materials && product.materials.length) {
      product.materials.forEach(material => {
        if (!acc.includes(material)) acc.push(material);
      });
    }
    return acc;
  }, []);

  return (
    <>
      <SEO 
        title="Glass Product Range | KeepMe"
        description="Explore our premium glass product range for the fragrance, beauty, and lifestyle industry. View our extensive collection and add products to your enquiry list."
        type="product"
        keywords="glass products, fragrance bottles, perfume bottles, cosmetic packaging, glass packaging, premium glass, UK glass manufacturer"
        structuredData={{
          "@type": "ItemList",
          "itemListElement": glassProducts.slice(0, 10).map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": product.title,
              "description": product.description,
              "image": product.image,
              "sku": product._id
            }
          }))
        }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">Glass Product Range</h1>
          
          <p className="text-lg text-center max-w-3xl mx-auto mb-8 text-gray-700 leading-relaxed">
            Our extensive range of glass products caters to the fragrance, beauty, and lifestyle industries.
            From standard bottles to custom designs, we offer high-quality solutions for your brand. 
            Browse our collection below and add items to your enquiry list.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/glass/decoration" className="bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition-colors duration-300 text-center shadow-sm">
              Decoration Options
            </Link>
            <Link href="/glass/gallery" className="bg-white text-teal-700 border border-teal-700 px-6 py-3 rounded-md hover:bg-teal-50 transition-colors duration-300 text-center">
              View Gallery
            </Link>
            <Link href="/contact" className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors duration-300 text-center shadow-sm">
              Request a Quote
            </Link>
          </div>
        </div>
        
        {/* Key Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="text-teal-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Premium Quality</h3>
            <p className="text-gray-600">
              All our glass products are manufactured to the highest standards, ensuring clarity, durability, and exceptional finish.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="text-teal-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Customisation Options</h3>
            <p className="text-gray-600">
              Tailor our products to your brand with various decoration techniques, colours, and finishes to create a unique identity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="text-teal-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast Turnaround</h3>
            <p className="text-gray-600">
              With efficient manufacturing processes and dedicated project management, we deliver your glass products on time, every time.
            </p>
          </div>
        </div>
        
        {/* Client-side Product Filters and Enquiry List */}
        <ProductFilters 
          subcategories={subcategories} 
          materials={allMaterials}
          products={glassProducts}
        />
        
        {/* Custom Solutions */}
        <div className="mt-16 bg-gradient-to-r from-teal-50 to-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Custom Glass Solutions</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Can't find what you're looking for? We offer bespoke glass solutions tailored to your specific requirements.
                Our team of experts can help bring your vision to life with custom designs, unique finishes, and innovative manufacturing capabilities.
              </p>
              
              <ul className="mb-6 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-teal-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Custom shapes and sizes to match your brand vision
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-teal-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Speciality glass formulations and colours
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-teal-700 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Prototype development and small batch production
                </li>
              </ul>
              
              <Link 
                href="/contact" 
                className="bg-teal-700 text-white px-6 py-3 rounded-md inline-block hover:bg-teal-800 transition-colors duration-300 shadow-sm"
              >
                Discuss Your Custom Requirements
              </Link>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Image 
                  src="/images/custom-glass-solution.jpg" 
                  alt="Custom Glass Solutions" 
                  width={400} 
                  height={300}
                  className="rounded-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="hidden h-[300px] w-full items-center justify-center bg-gray-100 rounded-md"
                >
                  <p className="text-gray-500 text-center">Custom Glass Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sustainability Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Commitment to Sustainability</h2>
          <p className="mb-6 text-gray-700">
            At KeepMe, we're committed to sustainable manufacturing practices. Our glass products are:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <h3 className="font-medium text-gray-800 mb-2">Recyclable</h3>
              <p className="text-sm text-gray-600">100% recyclable materials that can be reused indefinitely</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="font-medium text-gray-800 mb-2">Energy Efficient</h3>
              <p className="text-sm text-gray-600">Produced using energy-efficient manufacturing processes</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
              <h3 className="font-medium text-gray-800 mb-2">Non-Toxic</h3>
              <p className="text-sm text-gray-600">Free from harmful chemicals and safe for consumer use</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="font-medium text-gray-800 mb-2">Reduced Footprint</h3>
              <p className="text-sm text-gray-600">Optimised shipping and packaging to reduce carbon footprint</p>
            </div>
          </div>
          
          <Link 
            href="/about/sustainability" 
            className="text-teal-700 font-medium hover:text-teal-800 hover:underline transition duration-300 inline-flex items-center"
          >
            Learn more about our sustainability initiatives
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
