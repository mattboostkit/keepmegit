'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FragranceCalculator from '../../components/FragranceCalculator';
import QuoteSheet from '../../components/QuoteSheet';
import { generateFAQSchema } from '../../lib/structuredData';
import Script from 'next/script';
import Image from 'next/image';

/**
 * Tools Page
 * Showcases interactive tools for customers to engage with KeepMe's services
 */
export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('calculator');
  
  // FAQ data for structured data
  const faqs = [
    {
      question: 'How accurate is the Fragrance Calculator?',
      answer: 'The Fragrance Calculator provides estimates based on typical industry pricing. For precise quotes tailored to your specific requirements, please use our Quote Sheet tool or contact us directly.'
    },
    {
      question: 'How long does it take to receive a quote after submission?',
      answer: 'We typically respond to quote requests within 24-48 hours during business days. Complex projects may require additional time for a comprehensive assessment.'
    },
    {
      question: 'Can I request samples before placing a large order?',
      answer: 'Yes, we offer prototype samples for qualified projects. This can be requested through our Quote Sheet tool by mentioning it in the additional information section.'
    },
    {
      question: 'What information do I need to provide for an accurate quote?',
      answer: 'The more details you can provide, the better. Key information includes quantity, bottle size, material preferences, customisation requirements, and project timeline.'
    },
    {
      question: 'Do you offer design services for custom packaging?',
      answer: 'Yes, our in-house design team can create custom packaging designs based on your brand guidelines and requirements. This service can be included in your quote request.'
    }
  ];
  
  // Generate structured data for FAQs
  const faqSchema = generateFAQSchema(faqs);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <div className="tools-page">
      {/* Structured Data */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Interactive Packaging Tools
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-8"
          >
            Use our interactive tools to estimate costs, explore options, and request custom quotes for your perfume packaging needs.
          </motion.p>
        </div>
      </section>
      
      {/* Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Tool Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-6 py-3 text-lg font-medium rounded-l-lg ${
                  activeTab === 'calculator'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                Fragrance Calculator
              </button>
              
              <button
                onClick={() => setActiveTab('quote')}
                className={`px-6 py-3 text-lg font-medium rounded-r-lg ${
                  activeTab === 'quote'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                Request a Quote
              </button>
            </div>
          </div>
          
          {/* Active Tool */}
          <div className="max-w-5xl mx-auto">
            {activeTab === 'calculator' ? (
              <FragranceCalculator />
            ) : (
              <QuoteSheet />
            )}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose KeepMe?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive perfume packaging solutions with quality, innovation, and sustainability at our core.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Premium Quality',
                description: 'Our glass bottles and packaging materials meet the highest industry standards, ensuring your fragrance is presented perfectly.',
                icon: '/images/icons/quality.svg'
              },
              {
                title: 'Custom Design',
                description: 'From concept to production, our design team works with you to create unique packaging that reflects your brand identity.',
                icon: '/images/icons/design.svg'
              },
              {
                title: 'Sustainable Options',
                description: 'We offer eco-friendly packaging solutions, including recycled materials and refillable bottle designs.',
                icon: '/images/icons/sustainability.svg'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src={benefit.icon || '/images/icons/placeholder.svg'}
                    alt={benefit.title}
                    width={32}
                    height={32}
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our tools and services.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="mb-6 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Start Your Project?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-8"
          >
            Contact our team today to discuss your perfume packaging requirements and discover how KeepMe can help bring your vision to life.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="/contact"
              className="inline-block bg-white text-teal-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
