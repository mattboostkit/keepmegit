'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className="nav-link hover:text-teal-700 font-medium">
            About Us
          </Link>
          
          {/* Services Dropdown */}
          <div className="relative group">
            <button 
              className="nav-link hover:text-teal-700 font-medium flex items-center"
              onClick={() => toggleDropdown('services')}
            >
              Services
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ${activeDropdown === 'services' ? 'block' : 'hidden'} group-hover:block`}>
              <Link href="/services/fragrance-manufacturing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Fragrance Manufacturing
              </Link>
              <Link href="/services/glass-packaging" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Glass & Packaging
              </Link>
              <Link href="/services/full-service-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Full-Service Solutions
              </Link>
            </div>
          </div>
          
          <Link href="/products" className="nav-link hover:text-teal-700 font-medium">
            Products
          </Link>
          <Link href="/glass" className="nav-link hover:text-teal-700 font-medium">
            Glass
          </Link>
          
          {/* Tools Dropdown */}
          <div className="relative group">
            <button 
              className="nav-link hover:text-teal-700 font-medium flex items-center"
              onClick={() => toggleDropdown('tools')}
            >
              Tools
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ${activeDropdown === 'tools' ? 'block' : 'hidden'} group-hover:block`}>
              <Link href="/tools/quote-sheet" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Quote Sheet
              </Link>
              <Link href="/tools/fragrance-calculator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                Fragrance Calculator
              </Link>
            </div>
          </div>
          
          <Link href="/blog" className="nav-link hover:text-teal-700 font-medium">
            Blog
          </Link>
          <Link href="/contact" className="nav-link hover:text-teal-700 font-medium">
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/tools/quote-sheet" className="btn btn-primary">
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
            <Link href="/about" className="nav-link block py-2" onClick={toggleMenu}>
              About Us
            </Link>
            
            {/* Mobile Services Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full py-2"
                onClick={() => toggleDropdown('mobileServices')}
              >
                <span>Services</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'mobileServices' && (
                <div className="pl-4 mt-2 border-l-2 border-teal-700">
                  <Link href="/services/fragrance-manufacturing" className="block py-2" onClick={toggleMenu}>
                    Fragrance Manufacturing
                  </Link>
                  <Link href="/services/glass-packaging" className="block py-2" onClick={toggleMenu}>
                    Glass & Packaging
                  </Link>
                  <Link href="/services/full-service-solutions" className="block py-2" onClick={toggleMenu}>
                    Full-Service Solutions
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/products" className="nav-link block py-2" onClick={toggleMenu}>
              Products
            </Link>
            <Link href="/glass" className="nav-link block py-2" onClick={toggleMenu}>
              Glass
            </Link>
            
            {/* Mobile Tools Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full py-2"
                onClick={() => toggleDropdown('mobileTools')}
              >
                <span>Tools</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {activeDropdown === 'mobileTools' && (
                <div className="pl-4 mt-2 border-l-2 border-teal-700">
                  <Link href="/tools/quote-sheet" className="block py-2" onClick={toggleMenu}>
                    Quote Sheet
                  </Link>
                  <Link href="/tools/fragrance-calculator" className="block py-2" onClick={toggleMenu}>
                    Fragrance Calculator
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/blog" className="nav-link block py-2" onClick={toggleMenu}>
              Blog
            </Link>
            <Link href="/contact" className="nav-link block py-2" onClick={toggleMenu}>
              Contact
            </Link>
            <Link href="/tools/quote-sheet" className="btn btn-primary block text-center" onClick={toggleMenu}>
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
