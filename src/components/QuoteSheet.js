'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Quote Sheet Tool
 * Allows customers to request detailed quotes for perfume packaging
 */
export default function QuoteSheet() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    productType: '',
    quantity: '',
    bottleSize: '',
    customisation: [],
    timeline: '',
    additionalInfo: '',
    marketing: false
  });
  
  // Form submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle customisation checkbox changes
  const handleCustomisationChange = (option) => {
    const updatedCustomisations = [...formData.customisation];
    
    if (updatedCustomisations.includes(option)) {
      // Remove if already selected
      const index = updatedCustomisations.indexOf(option);
      updatedCustomisations.splice(index, 1);
    } else {
      // Add if not selected
      updatedCustomisations.push(option);
    }
    
    setFormData({
      ...formData,
      customisation: updatedCustomisations
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // In a real implementation, this would submit to an API endpoint
      // For now, we'll simulate a successful submission with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success message
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        productType: '',
        quantity: '',
        bottleSize: '',
        customisation: [],
        timeline: '',
        additionalInfo: '',
        marketing: false
      });
    } catch (err) {
      console.error('Error submitting quote request:', err);
      setError('There was an error submitting your request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  // If form has been submitted successfully, show success message
  if (submitted) {
    return (
      <motion.div
        variants={successVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Quote Request Received</h3>
        
        <p className="text-gray-600 mb-6">
          Thank you for your interest in KeepMe's perfume packaging solutions. Our team will review your requirements and get back to you within 24-48 hours with a detailed quote.
        </p>
        
        <button
          onClick={() => setSubmitted(false)}
          className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-teal-800 mb-6">Request a Quote</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-gray-700 font-medium mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Project Requirements */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Requirements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="productType" className="block text-gray-700 font-medium mb-1">
                Product Type *
              </label>
              <select
                id="productType"
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select a product type</option>
                <option value="perfume">Perfume Bottle</option>
                <option value="cologne">Cologne Bottle</option>
                <option value="essential">Essential Oil Bottle</option>
                <option value="cosmetic">Cosmetic Container</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-1">
                Estimated Quantity *
              </label>
              <select
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select quantity range</option>
                <option value="500-1000">500-1,000 units</option>
                <option value="1001-2500">1,001-2,500 units</option>
                <option value="2501-5000">2,501-5,000 units</option>
                <option value="5001-10000">5,001-10,000 units</option>
                <option value="10001+">10,001+ units</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="bottleSize" className="block text-gray-700 font-medium mb-1">
                Bottle Size
              </label>
              <select
                id="bottleSize"
                name="bottleSize"
                value={formData.bottleSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select bottle size</option>
                <option value="15ml">15ml</option>
                <option value="30ml">30ml</option>
                <option value="50ml">50ml</option>
                <option value="100ml">100ml</option>
                <option value="custom">Custom size</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timeline" className="block text-gray-700 font-medium mb-1">
                Project Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Select timeline</option>
                <option value="urgent">Urgent (1-2 months)</option>
                <option value="standard">Standard (3-4 months)</option>
                <option value="flexible">Flexible (5+ months)</option>
                <option value="planning">Just planning ahead</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Customisation Options (select all that apply)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'embossing', label: 'Embossing' },
                { id: 'screenPrinting', label: 'Screen Printing' },
                { id: 'hotStamping', label: 'Hot Stamping' },
                { id: 'customColour', label: 'Custom Colour' },
                { id: 'customShape', label: 'Custom Shape' },
                { id: 'specialCap', label: 'Special Cap/Closure' }
              ].map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={formData.customisation.includes(option.id)}
                    onChange={() => handleCustomisationChange(option.id)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor={option.id} className="ml-2 text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="additionalInfo" className="block text-gray-700 font-medium mb-1">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Please provide any additional details about your project..."
            ></textarea>
          </div>
        </div>
        
        {/* Marketing Consent */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="marketing"
              name="marketing"
              type="checkbox"
              checked={formData.marketing}
              onChange={handleChange}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="marketing" className="text-gray-600">
              I agree to receive marketing communications from KeepMe. You can unsubscribe at any time.
            </label>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={submitting}
            className={`bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-6 rounded-md transition-colors ${
              submitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Submit Quote Request'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
