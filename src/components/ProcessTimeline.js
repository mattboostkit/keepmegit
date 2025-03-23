'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * Interactive Process Timeline Component
 * Displays KeepMe's work process in an engaging timeline format
 */
export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);
  
  // Process steps data
  const steps = [
    {
      id: 1,
      title: 'Initial Consultation',
      description: 'We begin with a thorough consultation to understand your brand, target audience, and specific requirements for your fragrance packaging.',
      icon: '/images/icons/consultation.svg',
      image: '/images/process/consultation.jpg',
      duration: '1-2 weeks'
    },
    {
      id: 2,
      title: 'Concept Development',
      description: 'Our design team creates multiple concepts based on your brief, incorporating your brand identity and market positioning.',
      icon: '/images/icons/design.svg',
      image: '/images/process/design.jpg',
      duration: '2-3 weeks'
    },
    {
      id: 3,
      title: 'Prototyping',
      description: 'We develop physical prototypes of your chosen design, allowing you to see and feel your packaging before full production.',
      icon: '/images/icons/prototype.svg',
      image: '/images/process/prototype.jpg',
      duration: '3-4 weeks'
    },
    {
      id: 4,
      title: 'Refinement',
      description: 'Based on your feedback, we refine the prototypes to ensure they perfectly match your vision and requirements.',
      icon: '/images/icons/refinement.svg',
      image: '/images/process/refinement.jpg',
      duration: '2-3 weeks'
    },
    {
      id: 5,
      title: 'Production',
      description: 'Once approved, we move to full-scale production, maintaining strict quality control throughout the manufacturing process.',
      icon: '/images/icons/production.svg',
      image: '/images/process/production.jpg',
      duration: '4-8 weeks'
    },
    {
      id: 6,
      title: 'Delivery & Support',
      description: 'We carefully package and deliver your products, providing ongoing support for any future requirements or adjustments.',
      icon: '/images/icons/delivery.svg',
      image: '/images/process/delivery.jpg',
      duration: '1-2 weeks'
    }
  ];
  
  // Handle scroll-based activation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      let closestStepIndex = 0;
      let closestDistance = Infinity;
      
      stepsRef.current.forEach((stepRef, index) => {
        if (stepRef) {
          const { top } = stepRef.getBoundingClientRect();
          const distance = Math.abs(top - window.innerHeight / 2);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestStepIndex = index;
          }
        }
      });
      
      setActiveStep(closestStepIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We follow a comprehensive process to ensure your fragrance packaging perfectly represents your brand and delights your customers.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 z-0"></div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isEven = index % 2 === 0;
              
              // Create ref for this step
              const stepRef = (el) => {
                stepsRef.current[index] = el;
              };
              
              return (
                <motion.div
                  key={step.id}
                  ref={stepRef}
                  variants={itemVariants}
                  className={`mb-16 md:mb-24 relative ${isEven ? 'md:text-right' : 'md:text-left'}`}
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full z-10 transition-colors duration-300 ${
                      isActive ? 'bg-teal-700 scale-125' : 'bg-gray-400'
                    }`}
                  ></div>
                  
                  {/* Content container */}
                  <div className="md:grid md:grid-cols-2 items-center gap-8">
                    {/* Image (switches sides based on even/odd) */}
                    <div className={`mb-6 md:mb-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                      <div className={`overflow-hidden rounded-lg shadow-lg transition-transform duration-500 ${
                        isActive ? 'transform scale-105' : ''
                      }`}>
                        <div className="relative h-64 w-full">
                          <Image
                            src={step.image || '/images/process/placeholder.jpg'}
                            alt={step.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Text content */}
                    <div className={`${isEven ? 'md:order-1 md:pr-16' : 'md:order-2 md:pl-16'}`}>
                      <div className={`p-6 bg-white rounded-lg shadow-md transition-all duration-500 ${
                        isActive ? 'transform -translate-y-2 shadow-lg border-l-4 border-teal-700' : ''
                      }`}>
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 mr-3">
                            <span className="font-bold">{step.id}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>Typical duration: {step.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="/contact"
            className="inline-block bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </div>
  );
}
