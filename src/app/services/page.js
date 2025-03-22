'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getServices } from '../../lib/sanity';

export default function Services() {
  // In a real implementation, this would fetch data from Sanity
  // const services = await getServices();
  
  // Placeholder data
  const servicesData = {
    title: 'Our Services',
    intro: 'KeepMe provides comprehensive fragrance manufacturing and glass packaging solutions for brands across the lifestyle sector.',
    mainServices: [
      {
        id: 'fragrance-manufacturing',
        title: 'Fragrance Manufacturing',
        shortDescription: 'Expert formulation and production of custom fragrances for candles, diffusers, and personal care products.',
        longDescription: 'Our in-house team of perfumers creates distinctive fragrance compositions tailored to your brand identity and target market. From initial concept to final production, we offer a complete service that includes scent development, formulation, testing, and manufacturing at scale.',
        features: [
          'Custom fragrance development',
          'Small batch production',
          'Large-scale manufacturing',
          'Quality control and testing',
          'Eco-friendly formulations',
          'Fragrance training and consultation'
        ],
        image: null,
        cta: {
          text: 'Learn More about Fragrance Manufacturing',
          link: '/services/fragrance-manufacturing'
        }
      },
      {
        id: 'glass-packaging',
        title: 'Glass & Packaging',
        shortDescription: 'Premium glass containers and custom packaging solutions for the fragrance and lifestyle industry.',
        longDescription: 'We specialise in designing and producing high-quality glass containers and packaging solutions that elevate your product presentation. Our design team works closely with you to create packaging that reflects your brand aesthetics while ensuring functionality and sustainability.',
        features: [
          'Custom glass container design',
          'Standard glass collections',
          'Decorative techniques (frosting, spraying, printing)',
          'Closures and accessories',
          'Packaging design and production',
          'Sustainable packaging options'
        ],
        image: null,
        cta: {
          text: 'Explore Glass & Packaging Solutions',
          link: '/services/glass-packaging'
        }
      },
      {
        id: 'full-service-solutions',
        title: 'Full-Service Solutions',
        shortDescription: 'End-to-end support from concept development to final fulfilment, including logistics and distribution.',
        longDescription: 'Our comprehensive service offering covers every aspect of product development and delivery. From initial concept and design through to manufacturing, filling, packing, and distribution, we provide a seamless solution that simplifies your supply chain and ensures consistent quality.',
        features: [
          'Product concept development',
          'Brand and packaging design',
          'Manufacturing and production',
          'Filling and assembly',
          'Quality assurance',
          'Warehousing and distribution'
        ],
        image: null,
        cta: {
          text: 'Discover Full-Service Solutions',
          link: '/services/full-service-solutions'
        }
      }
    ],
    additionalServices: [
      {
        title: 'Consultation & Training',
        description: 'Expert guidance on fragrance development, product formulation, and market trends.',
        icon: 'chat-bubble'
      },
      {
        title: 'Private Label Production',
        description: 'Create your own branded products utilising our established manufacturing capabilities.',
        icon: 'tag'
      },
      {
        title: 'Product Testing',
        description: 'Comprehensive testing services to ensure quality, safety and regulatory compliance.',
        icon: 'beaker'
      },
      {
        title: 'Sustainable Solutions',
        description: 'Eco-friendly options for fragrances, packaging, and production processes.',
        icon: 'leaf'
      }
    ],
    process: [
      {
        title: 'Initial Consultation',
        description: 'We discuss your requirements, brand vision, and project objectives.'
      },
      {
        title: 'Concept Development',
        description: 'Our team develops fragrance or packaging concepts based on your brief.'
      },
      {
        title: 'Sample Production',
        description: 'We create prototypes and samples for your review and feedback.'
      },
      {
        title: 'Refinement',
        description: 'Based on your feedback, we refine the product until it meets your exact specifications.'
      },
      {
        title: 'Production',
        description: 'Once approved, we move to full-scale production with rigorous quality control.'
      },
      {
        title: 'Delivery & Support',
        description: 'We handle logistics and provide ongoing support for your products.'
      }
    ]
  };

  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'chat-bubble':
        return (
          <svg className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'tag':
        return (
          <svg className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case 'beaker':
        return (
          <svg className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'leaf':
        return (
          <svg className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      default:
        return (
          <svg className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-700 to-teal-900"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{servicesData.title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{servicesData.intro}</p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Service Offerings</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of services designed to meet your fragrance and packaging needs.
            </p>
          </div>
          
          <div className="space-y-24">
            {servicesData.mainServices.map((service, index) => (
              <div key={service.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                <div className="md:w-1/2">
                  <div className="bg-gray-200 h-80 w-full rounded-lg flex items-center justify-center">
                    {service.image ? (
                      <Image src={service.image} alt={service.title} width={600} height={400} className="rounded-lg" />
                    ) : (
                      <div className="text-gray-500">Service Image</div>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-700 mb-6">{service.longDescription}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-teal-700 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={service.cta.link} className="btn btn-primary">
                    {service.cta.text}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Complementary services to enhance your product development journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {renderIcon(service.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              A streamlined approach to bringing your product vision to life.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Process Timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-100"></div>
              
              <div className="space-y-12">
                {servicesData.process.map((step, index) => (
                  <div key={index} className="relative flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right">
                      {index % 2 === 0 ? (
                        <>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </>
                      ) : <div></div>}
                    </div>
                    
                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white my-4 md:my-0">
                      {index + 1}
                    </div>
                    
                    <div className="md:w-1/2 md:pl-12">
                      {index % 2 === 1 ? (
                        <>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </>
                      ) : <div></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your requirements and how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-teal-800 hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg">
              Request a Quote
            </Link>
            <Link href="/tools/quote-sheet" className="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md font-medium text-lg">
              Use Quote Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
