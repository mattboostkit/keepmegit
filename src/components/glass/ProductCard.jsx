'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToEnquiry, isInEnquiry }) => {
  return (
    <motion.div 
      className="product-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {product.image && (
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-sm font-medium">
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-medium">{product.title}</h3>
          {product.productCode && (
            <span className="text-sm text-gray-500">Product Code: {product.productCode}</span>
          )}
        </div>
        
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {/* Specifications Preview */}
        {product.dimensions && (
          <div className="mb-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              {product.dimensions.capacity && (
                <div>
                  <span className="font-medium">Volume:</span> {product.dimensions.capacity}ml
                </div>
              )}
              {product.dimensions.height && (
                <div>
                  <span className="font-medium">Height:</span> {product.dimensions.height}mm
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <Link 
            href={`/glass/products/${product.slug.current}`} 
            className="text-teal-700 font-medium hover:underline"
          >
            View Details
          </Link>
          
          <button 
            onClick={() => onAddToEnquiry(product)}
            className={`text-sm px-3 py-1 rounded transition ${
              isInEnquiry 
                ? "bg-teal-700 text-white hover:bg-teal-800" 
                : "border border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white"
            }`}
          >
            {isInEnquiry ? 'Remove from Enquiry' : 'Add to Enquiry'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
