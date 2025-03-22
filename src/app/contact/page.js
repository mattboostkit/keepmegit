'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    services: {
      fragranceManufacturing: false,
      glassPackaging: false,
      fullServiceSolutions: false
    }
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: {
          ...prev.services,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    // In a real implementation, this would submit to a backend API
    // For now, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your enquiry. We\'ll be in touch shortly!'
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      services: {
        fragranceManufacturing: false,
        glassPackaging: false,
        fullServiceSolutions: false
      }
    });
  };
  
  // Contact information
  const contactInfo = {
    address: {
      line1: 'KeepMe Headquarters',
      line2: '123 Manufacturing Way',
      city: 'Manchester',
      postcode: 'M1 2AB',
      country: 'United Kingdom'
    },
    phone: '+44 (0) 123 456 7890',
    email: 'enquiries@keepme.co.uk',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/company/keepme',
      twitter: 'https://twitter.com/keepme',
      instagram: 'https://www.instagram.com/keepme'
    },
    hours: {
      weekdays: '9:00 AM - 5:30 PM',
      weekends: 'Closed'
    }
  };
  
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-700 to-teal-900"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have a question or want to discuss your next project? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {formStatus.submitted && (
                <div className={`mb-6 p-4 rounded-md ${formStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 font-medium mb-2">
                    Services of Interest (Select all that apply)
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fragranceManufacturing"
                        name="fragranceManufacturing"
                        checked={formData.services.fragranceManufacturing}
                        onChange={handleChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor="fragranceManufacturing" className="ml-2 block text-sm text-gray-700">
                        Fragrance Manufacturing
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="glassPackaging"
                        name="glassPackaging"
                        checked={formData.services.glassPackaging}
                        onChange={handleChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor="glassPackaging" className="ml-2 block text-sm text-gray-700">
                        Glass & Packaging
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fullServiceSolutions"
                        name="fullServiceSolutions"
                        checked={formData.services.fullServiceSolutions}
                        onChange={handleChange}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor="fullServiceSolutions" className="ml-2 block text-sm text-gray-700">
                        Full-Service Solutions
                      </label>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <svg className="h-5 w-5 text-teal-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </h3>
                  <address className="not-italic text-gray-600">
                    {contactInfo.address.line1}<br />
                    {contactInfo.address.line2}<br />
                    {contactInfo.address.city}, {contactInfo.address.postcode}<br />
                    {contactInfo.address.country}
                  </address>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <svg className="h-5 w-5 text-teal-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone
                  </h3>
                  <p className="text-gray-600">
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-teal-700">
                      {contactInfo.phone}
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <svg className="h-5 w-5 text-teal-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </h3>
                  <p className="text-gray-600">
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-teal-700">
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <svg className="h-5 w-5 text-teal-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Business Hours
                  </h3>
                  <div className="text-gray-600">
                    <p>Monday - Friday: {contactInfo.hours.weekdays}</p>
                    <p>Saturday - Sunday: {contactInfo.hours.weekends}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href={contactInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href={contactInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href={contactInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-700">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Interactive Map Would Be Embedded Here</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about working with KeepMe.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What information should I prepare before contacting you?</h3>
                <p className="text-gray-600">
                  It's helpful to have details about your project, including product type, target market, estimated quantities, timeline, and any specific requirements or preferences for fragrance and packaging.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Do you offer samples before full production?</h3>
                <p className="text-gray-600">
                  Yes, we provide samples of both fragrances and packaging options as part of our development process. This allows you to evaluate and approve the product before proceeding to full-scale production.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What are your minimum order quantities?</h3>
                <p className="text-gray-600">
                  Our minimum order quantities vary depending on the product type and complexity. We work with businesses of all sizes and can discuss options to suit your specific needs.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How long does the development process typically take?</h3>
                <p className="text-gray-600">
                  The timeline varies based on project complexity. Simple projects might take 4-6 weeks, while more complex ones could take 8-12 weeks. We'll provide a detailed timeline during our initial consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
