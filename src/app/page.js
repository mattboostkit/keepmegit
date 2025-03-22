'use client';

import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ToolCard from '../components/ToolCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import BlogPostCard from '../components/BlogPostCard';
import Link from 'next/link';
import Image from 'next/image';
import { getHomePage, getServices, getBlogPosts, getTestimonials } from '../lib/sanity';

export default function HomePage() {
  const [homeData, setHomeData] = useState({
    title: "Premium Glass & Fragrance Solutions",
    subtitle: "Crafting bespoke packaging and scent experiences for luxury brands."
  });
  const [services, setServices] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real data from Sanity
        const fetchedHomePage = await getHomePage();
        const fetchedServices = await getServices();
        const fetchedBlogPosts = await getBlogPosts({ limit: 3 });
        const fetchedTestimonials = await getTestimonials();
        
        // If no home data is returned yet, use placeholder data for development
        const finalHomeData = fetchedHomePage || {
          title: "Flawless Fragrances, Expertly Crafted",
          subtitle: "Your end to end partner in fragrance and packaging",
          heroImage: null
        };
        
        // If no services are returned yet, use placeholder data for development
        const finalServices = fetchedServices && fetchedServices.length > 0 ? fetchedServices : [
          {
            title: "Fragrance Manufacturing",
            description: "Expert formulation and production of custom fragrances for candles, diffusers, and personal care products.",
            image: null,
            slug: { current: 'fragrance-manufacturing' }
          },
          {
            title: "Glass & Packaging",
            description: "Premium glass containers and custom packaging solutions for the fragrance and lifestyle industry.",
            image: null,
            slug: { current: 'glass-packaging' }
          },
          {
            title: "Full-Service Solutions",
            description: "End-to-end support from concept development to final fulfilment, including logistics and distribution.",
            image: null,
            slug: { current: 'full-service-solutions' }
          }
        ];
        
        // If no blog posts are returned yet, use placeholder data for development
        const finalBlogPosts = fetchedBlogPosts && fetchedBlogPosts.length > 0 ? fetchedBlogPosts : [
          {
            title: "The Art of Fragrance Formulation",
            excerpt: "Explore the creative process behind developing signature scents for luxury brands.",
            featuredImage: null,
            slug: { current: 'art-of-fragrance-formulation' },
            publishedAt: new Date().toISOString(),
            categories: ["Industry Insights"]
          },
          {
            title: "Sustainable Packaging Trends in 2025",
            excerpt: "Discover how eco-friendly packaging solutions are transforming the fragrance industry.",
            featuredImage: null,
            slug: { current: 'sustainable-packaging-trends' },
            publishedAt: new Date().toISOString(),
            categories: ["Product Innovations"]
          },
          {
            title: "Behind the Scenes: Glass Manufacturing Process",
            excerpt: "An inside look at how premium glass containers are crafted for luxury fragrance brands.",
            featuredImage: null,
            slug: { current: 'glass-manufacturing-process' },
            publishedAt: new Date().toISOString(),
            categories: ["Behind the Scenes"]
          }
        ];
        
        // If no testimonials are returned yet, use placeholder data for development
        const finalTestimonials = fetchedTestimonials && fetchedTestimonials.length > 0 ? fetchedTestimonials : [
          {
            quote: "KeepMe delivered exceptional quality glass packaging for our luxury fragrance line. Their attention to detail and customer service exceeded our expectations.",
            author: "Jane Smith",
            company: "Luxury Scents Co."
          },
          {
            quote: "Working with KeepMe on our custom fragrance formulation was a seamless experience. They truly understood our brand vision and translated it perfectly.",
            author: "Michael Johnson",
            company: "Ambience Home"
          },
          {
            quote: "The team at KeepMe provided expert guidance throughout our product development journey. Their full-service approach saved us time and resources.",
            author: "Sarah Williams",
            company: "Essence Beauty"
          }
        ];
        
        setHomeData(finalHomeData);
        setServices(finalServices);
        setBlogPosts(finalBlogPosts);
        setTestimonials(finalTestimonials);
        setIsLoading(false);
        
        console.log('Fetched homepage data from Sanity:', { 
          homeData: finalHomeData, 
          services: finalServices,
          blogPosts: finalBlogPosts,
          testimonials: finalTestimonials
        });
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection 
        title={homeData.title}
        subtitle={homeData.subtitle}
      />
      
      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">End-to-End Fragrance & Packaging Solutions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From concept to production, we provide comprehensive services for brands in the fragrance and lifestyle industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                imageUrl={service.image}
                link={`/services/${service.slug.current}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tools to Support Your Business</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Utilise our interactive tools to streamline your product development process and get instant information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ToolCard
              title="Quote Sheet"
              description="Get an instant quote for your fragrance and packaging needs with our comprehensive quoting tool."
              imageUrl={null}
              link="/tools/quote-sheet"
              buttonText="Create Quote"
            />
            <ToolCard
              title="Fragrance Calculator"
              description="Calculate fragrance quantities and costs for your products based on volume and concentration requirements."
              imageUrl={null}
              link="/tools/fragrance-calculator"
              buttonText="Use Calculator"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Portfolio</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our range of premium products and past projects.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* These would ideally be pulled from Sanity */}
            <div className="aspect-square bg-gray-200 relative group overflow-hidden">
              <div className="absolute inset-0 bg-teal-800 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-medium">Luxury Diffusers</span>
              </div>
            </div>
            <div className="aspect-square bg-gray-300 relative group overflow-hidden">
              <div className="absolute inset-0 bg-teal-800 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-medium">Custom Bottles</span>
              </div>
            </div>
            <div className="aspect-square bg-gray-400 relative group overflow-hidden">
              <div className="absolute inset-0 bg-teal-800 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-medium">Candle Collection</span>
              </div>
            </div>
            <div className="aspect-square bg-gray-500 relative group overflow-hidden">
              <div className="absolute inset-0 bg-teal-800 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-medium">Premium Packaging</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/products" className="btn btn-secondary">View All</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          </div>
          
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* About Us Snapshot */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Working with KeepMe</h2>
              <p className="text-gray-600 mb-6">
                KeepMe is a leading manufacturer of fragrances and premium glass packaging for the lifestyle sector. 
                With decades of experience and a commitment to quality, we partner with brands to create exceptional products.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-700 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Expert fragrance formulation and manufacturing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-700 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Premium glass and packaging solutions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-700 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Dedicated customer service and support</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-700 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Sustainable and eco-friendly options</span>
                </li>
              </ul>
              <Link href="/about" className="btn btn-primary">Learn More About Us</Link>
            </div>
            <div className="bg-gray-200 h-80 flex items-center justify-center">
              {/* This would ideally be an image from Sanity */}
              <div className="text-gray-500">Company Image</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest trends and news from the fragrance and packaging industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPostCard key={index} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/blog" className="btn btn-secondary">View All Posts</Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Create Something Together</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We offer expert advice on every aspect of fragrance manufacturing and packaging solutions.
          </p>
          <Link href="/contact" className="btn bg-white text-teal-800 hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
