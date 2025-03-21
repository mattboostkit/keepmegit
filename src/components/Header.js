'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <Link href="/about" className="nav-link">
            About Us
          </Link>
          <Link href="/services" className="nav-link">
            Services
          </Link>
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/glass" className="nav-link">
            Glass
          </Link>
          <Link href="/tools" className="nav-link">
            Tools
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/contact" className="nav-link">
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
            <Link href="/services" className="nav-link block py-2" onClick={toggleMenu}>
              Services
            </Link>
            <Link href="/products" className="nav-link block py-2" onClick={toggleMenu}>
              Products
            </Link>
            <Link href="/glass" className="nav-link block py-2" onClick={toggleMenu}>
              Glass
            </Link>
            <Link href="/tools" className="nav-link block py-2" onClick={toggleMenu}>
              Tools
            </Link>
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
