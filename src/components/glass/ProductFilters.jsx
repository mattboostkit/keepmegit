'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';

const ProductFilters = ({ subcategories, materials, products }) => {
  // State for filters
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  // State for enquiry list
  const [enquiryList, setEnquiryList] = useState([]);
  const [showEnquiryList, setShowEnquiryList] = useState(false);
  
  // Load enquiry list from localStorage on component mount
  useEffect(() => {
    const savedEnquiry = localStorage.getItem('glassEnquiryList');
    if (savedEnquiry) {
      try {
        setEnquiryList(JSON.parse(savedEnquiry));
      } catch (e) {
        console.error('Error loading enquiry list from localStorage', e);
      }
    }
  }, []);
  
  // Save enquiry list to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('glassEnquiryList', JSON.stringify(enquiryList));
  }, [enquiryList]);
  
  // Handle adding/removing products from enquiry list
  const handleEnquiryToggle = (product) => {
    setEnquiryList(prevList => {
      const isInList = prevList.some(item => item._id === product._id);
      
      if (isInList) {
        return prevList.filter(item => item._id !== product._id);
      } else {
        return [...prevList, product];
      }
    });
  };
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by subcategory
    if (selectedSubcategory !== 'all' && (product.subcategory || 'Other') !== selectedSubcategory) {
      return false;
    }
    
    // Filter by material
    if (selectedMaterial !== 'all' && 
        (!product.materials || !product.materials.includes(selectedMaterial))) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !(product.productCode && product.productCode.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    return true;
  });
  
  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'capacity':
        const aCapacity = a.dimensions?.capacity || 0;
        const bCapacity = b.dimensions?.capacity || 0;
        return aCapacity - bCapacity;
      case 'height':
        const aHeight = a.dimensions?.height || 0;
        const bHeight = b.dimensions?.height || 0;
        return aHeight - bHeight;
      default:
        return 0;
    }
  });
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedSubcategory('all');
    setSelectedMaterial('all');
    setSearchTerm('');
    setSortBy('name');
  };
  
  // Clear enquiry list
  const clearEnquiry = () => {
    if (confirm('Are you sure you want to clear your enquiry list?')) {
      setEnquiryList([]);
    }
  };
  
  return (
    <div className="mb-16">
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filter Products</h2>
          
          <div className="flex space-x-4">
            <button 
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-teal-700"
            >
              Clear Filters
            </button>
            
            <button 
              onClick={() => setShowEnquiryList(!showEnquiryList)}
              className="flex items-center text-teal-700 font-medium"
            >
              <span className="mr-2">Enquiry List</span>
              <span className="bg-teal-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {enquiryList.length}
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or code"
              className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          
          {/* Subcategory Filter */}
          <div>
            <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
              Collection
            </label>
            <select
              id="subcategory"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Collections</option>
              {subcategories.map(subcategory => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
          
          {/* Material Filter */}
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
              Material
            </label>
            <select
              id="material"
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">All Materials</option>
              {materials.map(material => (
                <option key={material} value={material}>
                  {material.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort By */}
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="featured">Featured</option>
              <option value="capacity">Capacity (Low to High)</option>
              <option value="height">Height (Low to High)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Enquiry List Drawer */}
      <AnimatePresence>
        {showEnquiryList && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEnquiryList(false)}
          >
            <motion.div 
              className="bg-white w-full max-w-md h-full overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Enquiry List ({enquiryList.length})</h2>
                  <button 
                    onClick={() => setShowEnquiryList(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {enquiryList.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Your enquiry list is empty</p>
                    <button 
                      onClick={() => setShowEnquiryList(false)}
                      className="text-teal-700 font-medium hover:underline"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {enquiryList.map(product => (
                        <div key={product._id} className="flex border rounded p-3">
                          {product.image && (
                            <div className="relative h-16 w-16 flex-shrink-0">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          )}
                          
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium">{product.title}</h3>
                            {product.productCode && (
                              <p className="text-sm text-gray-500">Code: {product.productCode}</p>
                            )}
                          </div>
                          
                          <button 
                            onClick={() => handleEnquiryToggle(product)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={clearEnquiry}
                        className="w-full border border-red-500 text-red-500 py-2 rounded hover:bg-red-500 hover:text-white transition"
                      >
                        Clear Enquiry List
                      </button>
                      
                      <Link 
                        href={{
                          pathname: '/contact',
                          query: { enquiry: 'glass', products: enquiryList.map(p => p.productCode || p.title).join(',') }
                        }}
                        className="block w-full bg-teal-700 text-white text-center py-2 rounded hover:bg-teal-800 transition"
                      >
                        Submit Enquiry
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
        </p>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map(product => (
          <ProductCard 
            key={product._id} 
            product={product}
            onAddToEnquiry={handleEnquiryToggle}
            isInEnquiry={enquiryList.some(item => item._id === product._id)}
          />
        ))}
      </div>
      
      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products match your filters</p>
          <button 
            onClick={clearFilters}
            className="text-teal-700 font-medium hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
