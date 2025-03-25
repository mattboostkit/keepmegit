'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductFilters = ({ subcategories, materials, products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [activeMaterial, setActiveMaterial] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiryList, setEnquiryList] = useState([]);
  const [showEnquiryList, setShowEnquiryList] = useState(false);

  // Filter products when filter criteria change
  useEffect(() => {
    let result = [...products];
    
    // Filter by subcategory
    if (activeSubcategory !== 'All') {
      result = result.filter(product => product.subcategory === activeSubcategory);
    }
    
    // Filter by material
    if (activeMaterial !== 'All') {
      result = result.filter(product => 
        product.materials && product.materials.includes(activeMaterial)
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(term) || 
        (product.description && product.description.toLowerCase().includes(term))
      );
    }
    
    setFilteredProducts(result);
  }, [activeSubcategory, activeMaterial, searchTerm, products]);

  // Add or remove product from enquiry list
  const handleAddToEnquiry = (product) => {
    const isInList = enquiryList.some(item => item._id === product._id);
    
    if (isInList) {
      setEnquiryList(enquiryList.filter(item => item._id !== product._id));
    } else {
      setEnquiryList([...enquiryList, product]);
    }
  };

  // Check if a product is in the enquiry list
  const isInEnquiry = (productId) => {
    return enquiryList.some(item => item._id === productId);
  };

  // Clear all products from enquiry list
  const clearEnquiryList = () => {
    setEnquiryList([]);
  };

  return (
    <div className="mb-16">
      {/* Enquiry List Toggle Button */}
      {enquiryList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => setShowEnquiryList(!showEnquiryList)}
            className="bg-teal-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-teal-800 transition duration-300 flex items-center"
          >
            <span className="mr-2">Enquiry List</span>
            <span className="bg-white text-teal-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {enquiryList.length}
            </span>
          </button>
        </div>
      )}
      
      {/* Enquiry List Modal */}
      {showEnquiryList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Your Enquiry List</h3>
                <button 
                  onClick={() => setShowEnquiryList(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              {enquiryList.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your enquiry list is empty.</p>
              ) : (
                <div className="space-y-4">
                  {enquiryList.map(product => (
                    <div key={product._id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">{product.title}</h4>
                        {product.subcategory && (
                          <p className="text-sm text-gray-600">{product.subcategory}</p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleAddToEnquiry(product)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <button 
                  onClick={clearEnquiryList}
                  className="text-red-500 hover:text-red-700 font-medium"
                  disabled={enquiryList.length === 0}
                >
                  Clear All
                </button>
                <button 
                  className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition duration-300"
                  disabled={enquiryList.length === 0}
                >
                  Submit Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Filter Products</h2>
        
        {/* Search Bar */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Products
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subcategory Filter */}
          <div>
            <h3 className="font-medium mb-3 text-gray-700">Filter by Type:</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setActiveSubcategory('All')}
                className={`px-4 py-2 rounded-md text-sm transition duration-300 ${
                  activeSubcategory === 'All' 
                    ? 'bg-teal-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              {subcategories.map((subcategory) => (
                <button 
                  key={subcategory}
                  onClick={() => setActiveSubcategory(subcategory)}
                  className={`px-4 py-2 rounded-md text-sm transition duration-300 ${
                    activeSubcategory === subcategory 
                      ? 'bg-teal-700 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </div>
          
          {/* Material Filter */}
          <div>
            <h3 className="font-medium mb-3 text-gray-700">Filter by Material:</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setActiveMaterial('All')}
                className={`px-4 py-2 rounded-md text-sm transition duration-300 ${
                  activeMaterial === 'All' 
                    ? 'bg-teal-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Materials
              </button>
              {materials.map((material) => (
                <button 
                  key={material}
                  onClick={() => setActiveMaterial(material)}
                  className={`px-4 py-2 rounded-md text-sm transition duration-300 ${
                    activeMaterial === material 
                      ? 'bg-teal-700 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
        </p>
        
        {enquiryList.length > 0 && (
          <p className="text-teal-700">
            <span className="font-medium">{enquiryList.length}</span> {enquiryList.length === 1 ? 'item' : 'items'} in your enquiry list
          </p>
        )}
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No products match your current filters.</p>
          <button 
            onClick={() => {
              setActiveSubcategory('All');
              setActiveMaterial('All');
              setSearchTerm('');
            }}
            className="text-teal-700 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onAddToEnquiry={handleAddToEnquiry}
              isInEnquiry={isInEnquiry(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
