'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (activeDropdown && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown].contains(event.target)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown, event) => {
    event.preventDefault();
    event.stopPropagation();
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              {/* Replace with actual logo */}
              <div className="w-40 h-12 bg-teal-700 text-white flex items-center justify-center">
                KeepMe Logo
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/about" className="nav-link hover:text-teal-700 font-medium text-lg">
            About Us
          </Link>
          
          {/* Services Dropdown */}
          <div 
            className="relative" 
            ref={el => dropdownRefs.current['services'] = el}
          >
            <button 
              className="nav-link hover:text-teal-700 font-medium flex items-center text-lg"
              onClick={(e) => toggleDropdown('services', e)}
            >
              Services
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              className={`absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-10 ${activeDropdown === 'services' ? 'block' : 'hidden'}`}
            >
              <Link href="/services/fragrance-manufacturing" className="block px-4 py-3 text-base text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Fragrance Manufacturing
              </Link>
              <Link href="/services/glass-packaging" className="block px-4 py-3 text-base text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Glass & Packaging
              </Link>
              <Link href="/services/full-service-solutions" className="block px-4 py-3 text-base text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Full-Service Solutions
              </Link>
            </div>
          </div>
          
          <Link href="/products" className="nav-link hover:text-teal-700 font-medium text-lg">
            Products
          </Link>
          <Link href="/glass" className="nav-link hover:text-teal-700 font-medium text-lg">
            Glass
          </Link>
          
          {/* Tools Dropdown */}
          <div 
            className="relative" 
            ref={el => dropdownRefs.current['tools'] = el}
          >
            <button 
              className="nav-link hover:text-teal-700 font-medium flex items-center text-lg"
              onClick={(e) => toggleDropdown('tools', e)}
            >
              Tools
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              className={`absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-10 ${activeDropdown === 'tools' ? 'block' : 'hidden'}`}
            >
              <Link href="/tools/quote-sheet" className="block px-4 py-3 text-base text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Quote Sheet
              </Link>
              <Link href="/tools/fragrance-calculator" className="block px-4 py-3 text-base text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Fragrance Calculator
              </Link>
            </div>
          </div>
          
          <Link href="/blog" className="nav-link hover:text-teal-700 font-medium text-lg">
            Blog
          </Link>
          <Link href="/contact" className="nav-link hover:text-teal-700 font-medium text-lg">
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/tools/quote-sheet" className="btn btn-primary text-base px-5 py-3">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/about" className="nav-link block py-3 text-lg" onClick={toggleMenu}>
              About Us
            </Link>
            
            {/* Mobile Services Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full py-3 text-lg"
                onClick={(e) => toggleDropdown('mobileServices', e)}
              >
                <span>Services</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'mobileServices' && (
                <div className="pl-4 mt-2 border-l-2 border-teal-700">
                  <Link href="/services/fragrance-manufacturing" className="block py-3 text-base" onClick={toggleMenu}>
                    Fragrance Manufacturing
                  </Link>
                  <Link href="/services/glass-packaging" className="block py-3 text-base" onClick={toggleMenu}>
                    Glass & Packaging
                  </Link>
                  <Link href="/services/full-service-solutions" className="block py-3 text-base" onClick={toggleMenu}>
                    Full-Service Solutions
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/products" className="nav-link block py-3 text-lg" onClick={toggleMenu}>
              Products
            </Link>
            <Link href="/glass" className="nav-link block py-3 text-lg" onClick={toggleMenu}>
              Glass
            </Link>
            
            {/* Mobile Tools Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full py-3 text-lg"
                onClick={(e) => toggleDropdown('mobileTools', e)}
              >
                <span>Tools</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'mobileTools' && (
                <div className="pl-4 mt-2 border-l-2 border-teal-700">
                  <Link href="/tools/quote-sheet" className="block py-3 text-base" onClick={toggleMenu}>
                    Quote Sheet
                  </Link>
                  <Link href="/tools/fragrance-calculator" className="block py-3 text-base" onClick={toggleMenu}>
                    Fragrance Calculator
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/blog" className="nav-link block py-3 text-lg" onClick={toggleMenu}>
              Blog
            </Link>
            <Link href="/contact" className="nav-link block py-3 text-lg" onClick={toggleMenu}>
              Contact
            </Link>
            
            <Link href="/tools/quote-sheet" className="btn btn-primary text-center py-3 mt-4" onClick={toggleMenu}>
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
