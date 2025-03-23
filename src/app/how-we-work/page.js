'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ProcessTimeline from '../../components/ProcessTimeline';
import { generateBreadcrumbSchema } from '../../lib/structuredData';
import Script from 'next/script';

/**
 * How We Work Page
 * Showcases KeepMe's process and approach to perfume packaging
 */
export default function HowWeWorkPage() {
  // Breadcrumb data for structured data
  const breadcrumbs = [
    { name: 'Home', url: 'https://keepme.com/' },
    { name: 'How We Work', url: 'https://keepme.com/how-we-work' }
  ];
  
  // Generate structured data for breadcrumbs
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
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
    <div className="how-we-work-page">
      {/* Structured Data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-700 to-teal-900 z-0"></div>
        <div className="absolute inset-0 w-full h-full bg-black opacity-30 z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How We Work
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Our collaborative approach ensures your perfume packaging perfectly represents your brand and captivates your customers.
          </motion.p>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              Our Approach to Excellence
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              At KeepMe, we believe that exceptional perfume packaging is the result of a thoughtful, collaborative process. We work closely with our clients at every stage, from initial concept to final delivery, ensuring that each project reflects the brand's unique identity and meets the highest standards of quality and craftsmanship.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Process Timeline Section */}
      <ProcessTimeline />
      
      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide our approach to every project and partnership.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                title: 'Quality',
                description: 'We never compromise on quality, ensuring that every bottle and package meets our exacting standards.',
                icon: '/images/icons/quality.svg'
              },
              {
                title: 'Innovation',
                description: 'We constantly explore new materials, techniques, and designs to create packaging that stands out.',
                icon: '/images/icons/innovation.svg'
              },
              {
                title: 'Sustainability',
                description: 'We are committed to environmentally responsible practices and sustainable packaging solutions.',
                icon: '/images/icons/sustainability.svg'
              },
              {
                title: 'Partnership',
                description: 'We view our clients as partners, working collaboratively to achieve shared success.',
                icon: '/images/icons/partnership.svg'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src={value.icon || '/images/icons/placeholder.svg'}
                    alt={value.title}
                    width={32}
                    height={32}
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from brands that have trusted KeepMe with their perfume packaging needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "KeepMe transformed our packaging concept into a stunning reality. Their attention to detail and commitment to quality exceeded our expectations.",
                author: "Sarah Johnson",
                company: "Lumière Fragrances",
                image: "/images/testimonials/testimonial-1.jpg"
              },
              {
                quote: "The collaborative process with KeepMe was seamless from start to finish. They truly understood our brand and delivered packaging that perfectly captures our essence.",
                author: "David Williams",
                company: "Essence Collective",
                image: "/images/testimonials/testimonial-2.jpg"
              },
              {
                quote: "Working with KeepMe has been a game-changer for our brand. Their innovative approach to sustainable packaging has helped us reduce our environmental footprint without compromising on luxury.",
                author: "Emily Chen",
                company: "Verdant Scents",
                image: "/images/testimonials/testimonial-3.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-50 rounded-lg p-6 shadow-md"
              >
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/images/testimonials/placeholder.jpg"}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
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
            Contact our team today to discuss your perfume packaging requirements and discover how our process can bring your vision to life.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="/contact"
              className="inline-block bg-white text-teal-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors"
            >
              Contact Us
            </a>
            
            <a
              href="/tools"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-700 font-medium py-3 px-8 rounded-md transition-colors"
            >
              Try Our Tools
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
