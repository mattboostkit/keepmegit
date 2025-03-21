'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1">
            <div className="mb-4">
              <Link href="/">
                <div className="w-40 h-12 bg-teal-700 text-white flex items-center justify-center">
                  KeepMe Logo
                </div>
              </Link>
            </div>
            <p className="mb-4">
              Expert fragrance manufacturers & premium glass packaging solutions.
            </p>
            <div className="social-icons flex space-x-4">
              <a href="#" className="text-white hover:text-teal-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-teal-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm2.99 15h-2v-6h2v6zm-1-6.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM18 15h-2v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V15h-2V9h2v1.25c.75-.75 1.75-1.25 2.5-1.25 1.93 0 3.5 1.57 3.5 3.5V15z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-teal-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-teal-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-teal-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/glass" className="hover:text-teal-300">
                  Glass
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">123 KeepMe Way</p>
              <p className="mb-2">London, UK</p>
              <p className="mb-2">
                <a href="tel:+441234567890" className="hover:text-teal-300">
                  +44 1234 567890
                </a>
              </p>
              <p className="mb-2">
                <a href="mailto:info@keepme.co.uk" className="hover:text-teal-300">
                  info@keepme.co.uk
                </a>
              </p>
            </address>
          </div>

          {/* Newsletter Signup */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded text-gray-800"
              />
              <button
                type="submit"
                className="bg-teal-700 hover:bg-teal-600 px-4 py-2 rounded"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} KeepMe. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-teal-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-teal-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
