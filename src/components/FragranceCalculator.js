'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Interactive Fragrance Calculator
 * Helps customers estimate costs for perfume packaging
 */
export default function FragranceCalculator() {
  // State for calculator inputs
  const [quantity, setQuantity] = useState(1000);
  const [bottleSize, setBottleSize] = useState(50);
  const [bottleType, setBottleType] = useState('standard');
  const [capType, setCapType] = useState('standard');
  const [packaging, setPackaging] = useState('basic');
  const [customisation, setCustomisation] = useState([]);
  
  // State for calculator results
  const [totalCost, setTotalCost] = useState(0);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [leadTime, setLeadTime] = useState('');
  
  // Pricing constants (in GBP)
  const BOTTLE_BASE_PRICE = {
    standard: 0.75,
    premium: 1.25,
    luxury: 2.50,
  };
  
  const CAP_PRICE = {
    standard: 0.25,
    premium: 0.50,
    luxury: 1.00,
  };
  
  const PACKAGING_PRICE = {
    basic: 0.50,
    branded: 1.00,
    luxury: 2.00,
  };
  
  const CUSTOMISATION_PRICE = {
    embossing: 0.35,
    screenPrinting: 0.50,
    hotStamping: 0.75,
    customColour: 0.60,
  };
  
  // Size multiplier
  const getSizeMultiplier = (size) => {
    if (size <= 30) return 0.8;
    if (size <= 50) return 1.0;
    if (size <= 100) return 1.3;
    return 1.6;
  };
  
  // Quantity discount
  const getQuantityDiscount = (qty) => {
    if (qty >= 10000) return 0.75;
    if (qty >= 5000) return 0.85;
    if (qty >= 2500) return 0.90;
    return 1.0;
  };
  
  // Calculate lead time
  const calculateLeadTime = () => {
    let weeks = 4; // Base lead time
    
    // Add time for larger quantities
    if (quantity >= 10000) weeks += 3;
    else if (quantity >= 5000) weeks += 2;
    else if (quantity >= 2500) weeks += 1;
    
    // Add time for customisations
    weeks += customisation.length * 0.5;
    
    // Add time for premium/luxury options
    if (bottleType === 'luxury' || capType === 'luxury' || packaging === 'luxury') {
      weeks += 1;
    }
    
    return `${Math.ceil(weeks)} weeks`;
  };
  
  // Calculate total cost
  const calculateCost = () => {
    // Base cost per unit
    const sizeMultiplier = getSizeMultiplier(bottleSize);
    const bottlePrice = BOTTLE_BASE_PRICE[bottleType] * sizeMultiplier;
    const capPrice = CAP_PRICE[capType];
    const packagingPrice = PACKAGING_PRICE[packaging];
    
    // Customisation costs
    const customisationPrice = customisation.reduce((total, item) => {
      return total + CUSTOMISATION_PRICE[item];
    }, 0);
    
    // Total per unit before quantity discount
    const unitPrice = bottlePrice + capPrice + packagingPrice + customisationPrice;
    
    // Apply quantity discount
    const discountedUnitPrice = unitPrice * getQuantityDiscount(quantity);
    
    // Calculate total
    const total = discountedUnitPrice * quantity;
    
    return {
      total: parseFloat(total.toFixed(2)),
      unitPrice: parseFloat(discountedUnitPrice.toFixed(2))
    };
  };
  
  // Update calculations when inputs change
  useEffect(() => {
    const { total, unitPrice } = calculateCost();
    setTotalCost(total);
    setCostPerUnit(unitPrice);
    setLeadTime(calculateLeadTime());
  }, [quantity, bottleSize, bottleType, capType, packaging, customisation]);
  
  // Handle customisation toggle
  const handleCustomisationToggle = (option) => {
    if (customisation.includes(option)) {
      setCustomisation(customisation.filter(item => item !== option));
    } else {
      setCustomisation([...customisation, option]);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-teal-800 mb-6">Fragrance Packaging Calculator</h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Calculator Inputs */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Order Quantity
            </label>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">500</span>
              <span className="text-lg font-semibold">{quantity.toLocaleString()}</span>
              <span className="text-sm text-gray-500">20,000</span>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Bottle Size (ml)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[30, 50, 100].map((size) => (
                <button
                  key={size}
                  onClick={() => setBottleSize(size)}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    bottleSize === size
                      ? 'bg-teal-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {size}ml
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Bottle Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Standard' },
                { id: 'premium', label: 'Premium' },
                { id: 'luxury', label: 'Luxury' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setBottleType(option.id)}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    bottleType === option.id
                      ? 'bg-teal-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Cap Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Standard' },
                { id: 'premium', label: 'Premium' },
                { id: 'luxury', label: 'Luxury' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setCapType(option.id)}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    capType === option.id
                      ? 'bg-teal-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Packaging
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'basic', label: 'Basic' },
                { id: 'branded', label: 'Branded' },
                { id: 'luxury', label: 'Luxury' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPackaging(option.id)}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    packaging === option.id
                      ? 'bg-teal-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Customisations
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'embossing', label: 'Embossing' },
                { id: 'screenPrinting', label: 'Screen Printing' },
                { id: 'hotStamping', label: 'Hot Stamping' },
                { id: 'customColour', label: 'Custom Colour' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleCustomisationToggle(option.id)}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    customisation.includes(option.id)
                      ? 'bg-teal-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Calculator Results */}
        <motion.div variants={itemVariants} className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Estimated Quote</h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 mb-1">Total Cost (Estimated)</p>
              <p className="text-3xl font-bold text-teal-700">£{totalCost.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Cost Per Unit</p>
              <p className="text-2xl font-semibold text-teal-700">£{costPerUnit.toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-gray-600 mb-1">Estimated Lead Time</p>
              <p className="text-2xl font-semibold text-teal-700">{leadTime}</p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                This is an estimate only. Contact us for a precise quote tailored to your specific requirements.
              </p>
              
              <a
                href="/contact?subject=Quote%20Request"
                className="block w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
              >
                Request Detailed Quote
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
