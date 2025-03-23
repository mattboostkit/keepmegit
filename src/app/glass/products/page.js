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
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Glass Product Range</h1>
        
        <div className="mb-12">
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            Our extensive range of glass products caters to the fragrance, beauty, and lifestyle industries.
            From standard bottles to custom designs, we offer high-quality solutions for your brand.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Link href="/glass/decoration" className="bg-teal-700 text-white px-6 py-3 rounded-md hover:bg-teal-800 transition">
              Decoration Options
            </Link>
            <Link href="/contact" className="border border-teal-700 text-teal-700 px-6 py-3 rounded-md hover:bg-gray-50 transition">
              Request a Quote
            </Link>
          </div>
        </div>
        
        {/* Client-side Product Filters and Enquiry List */}
        <ProductFilters 
          subcategories={subcategories} 
          materials={allMaterials}
          products={glassProducts}
        />
        
        {/* Custom Solutions */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Custom Glass Solutions</h2>
          <p className="mb-6">
            Can't find what you're looking for? We offer custom glass solutions tailored to your specific requirements.
            Our team can help bring your vision to life with bespoke designs and manufacturing capabilities.
          </p>
          
          <Link 
            href="/contact" 
            className="bg-teal-700 text-white px-6 py-3 rounded-md inline-block hover:bg-teal-800 transition"
          >
            Discuss Your Custom Requirements
          </Link>
        </div>
      </div>
    </>
  );
}
