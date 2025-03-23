'use client';

import React, { useState, useEffect } from 'react';

const ProductEnquiryButton = ({ product }) => {
  const [isInEnquiry, setIsInEnquiry] = useState(false);
  
  // Check if product is in enquiry list on component mount
  useEffect(() => {
    const savedEnquiry = localStorage.getItem('glassEnquiryList');
    if (savedEnquiry) {
      try {
        const enquiryList = JSON.parse(savedEnquiry);
        setIsInEnquiry(enquiryList.some(item => item._id === product._id));
      } catch (e) {
        console.error('Error loading enquiry list from localStorage', e);
      }
    }
  }, [product._id]);
  
  // Handle adding/removing product from enquiry list
  const handleEnquiryToggle = () => {
    const savedEnquiry = localStorage.getItem('glassEnquiryList');
    let enquiryList = [];
    
    if (savedEnquiry) {
      try {
        enquiryList = JSON.parse(savedEnquiry);
      } catch (e) {
        console.error('Error parsing enquiry list', e);
      }
    }
    
    const isInList = enquiryList.some(item => item._id === product._id);
    
    if (isInList) {
      // Remove from list
      enquiryList = enquiryList.filter(item => item._id !== product._id);
      setIsInEnquiry(false);
    } else {
      // Add to list
      enquiryList.push(product);
      setIsInEnquiry(true);
    }
    
    localStorage.setItem('glassEnquiryList', JSON.stringify(enquiryList));
  };
  
  return (
    <button 
      onClick={handleEnquiryToggle}
      className={`px-6 py-3 rounded-md text-center transition ${
        isInEnquiry 
          ? "bg-teal-800 text-white hover:bg-teal-900" 
          : "bg-teal-700 text-white hover:bg-teal-800"
      }`}
    >
      {isInEnquiry ? 'Remove from Enquiry' : 'Add to Enquiry'}
    </button>
  );
};

export default ProductEnquiryButton;
