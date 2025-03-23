import Image from 'next/image';
import Link from 'next/link';
import { getAboutPage } from '../../lib/sanity';
import SEO from '../../components/SEO';

// Client-side components with animations
import { TeamMemberCard } from '../../components/about/TeamMemberCard';
import { ValueCard } from '../../components/about/ValueCard';
import { MilestoneTimeline } from '../../components/about/MilestoneTimeline';
import { FacilityCard } from '../../components/about/FacilityCard';

export const metadata = {
  title: 'About KeepMe | Premium Fragrance & Glass Packaging',
  description: 'Learn about KeepMe, a leading UK manufacturer of premium fragrances and glass packaging with over two decades of industry experience.',
};

export default async function About() {
  // Fetch data from Sanity
  const aboutData = await getAboutPage();
  
  // Fallback data if Sanity fetch fails
  const fallbackData = {
    title: 'About KeepMe',
    intro: 'KeepMe is a leading manufacturer of premium fragrances and glass packaging in the UK, with over two decades of industry experience.',
    mission: 'Our mission is to provide exceptional quality fragrance formulations and packaging solutions that enhance the customer experience and elevate brands in the marketplace.',
    values: [
      {
        title: 'Quality',
        description: 'We commit to excellence in everything we produce, from the finest fragrance ingredients to precision-engineered glass packaging.'
      },
      {
        title: 'Innovation',
        description: 'We continuously explore new techniques, materials, and designs to provide our clients with cutting-edge solutions.'
      },
      {
        title: 'Sustainability',
        description: 'We prioritise environmentally responsible practices throughout our manufacturing processes and supply chain.'
      },
      {
        title: 'Partnership',
        description: 'We work closely with our clients, building lasting relationships based on trust, transparency and shared success.'
      }
    ],
    teamSection: {
      heading: 'Meet Our Team',
      subheading: 'The passionate professionals behind our exceptional products and services.'
    },
    teamMembers: [
      {
        name: 'Jane Smith',
        role: 'Chief Executive Officer',
        bio: 'Jane brings over 15 years of experience in the fragrance industry, with a passion for innovative product development and sustainable manufacturing practices.',
        image: null
      },
      {
        name: 'Michael Johnson',
        role: 'Head of Fragrance Development',
        bio: 'With a background in chemistry and a trained nose, Michael leads our talented team of perfumers to create distinctive and memorable scents.',
        image: null
      },
      {
        name: 'Sarah Williams',
        role: 'Glass Production Director',
        bio: 'Sarah oversees our glass manufacturing operations, ensuring the highest quality standards and precision in every product we create.',
        image: null
      },
      {
        name: 'David Thompson',
        role: 'Business Development Manager',
        bio: 'David works closely with our clients to understand their needs and deliver tailored solutions that help grow their businesses.',
        image: null
      }
    ],
    historySection: {
      heading: 'Our History',
      subheading: 'From humble beginnings to industry leadership, explore our journey over the years.',
      foundedYear: '2002'
    },
    milestones: [
      {
        year: '2002',
        description: 'Founded as a small fragrance formulation workshop in Yorkshire'
      },
      {
        year: '2008',
        description: 'Expanded operations to include glass packaging production'
      },
      {
        year: '2012',
        description: 'Opened state-of-the-art manufacturing facility in Manchester'
      },
      {
        year: '2018',
        description: 'Launched sustainable packaging initiative'
      },
      {
        year: '2023',
        description: 'Celebrated 20+ years of excellence with expanded global partnerships'
      }
    ],
    facilitiesSection: {
      heading: 'Our Facilities',
      subheading: 'State-of-the-art manufacturing and development centres.',
      description: 'Our modern facilities are equipped with the latest technology to ensure the highest quality products and efficient production processes.'
    },
    facilities: [
      {
        name: 'Manchester Production Centre',
        description: 'Our main manufacturing facility spans 50,000 square feet and houses our glass production and decoration operations.',
        features: [
          'Advanced glass molding technology',
          'Automated quality control systems',
          'Eco-friendly production processes',
          'On-site packaging and fulfillment'
        ]
      },
      {
        name: 'Yorkshire Fragrance Laboratory',
        description: 'Our dedicated fragrance development lab is where our perfumers create and refine custom scents for our clients.',
        features: [
          'State-of-the-art analytical equipment',
          'Extensive ingredient library',
          'Climate-controlled testing environments',
          'Sensory evaluation rooms'
        ]
      }
    ],
    ctaSection: {
      heading: 'Join Our Journey',
      text: 'Whether you\'re looking to develop a custom fragrance, need premium packaging solutions, or want to explore partnership opportunities, we\'d love to hear from you.',
      primaryButtonText: 'Contact Us',
      primaryButtonLink: '/contact',
      secondaryButtonText: 'Our Services',
      secondaryButtonLink: '/services'
    }
  };

  // Use Sanity data if available, otherwise use fallback data
  const pageData = aboutData || fallbackData;

  return (
    <>
      <SEO 
        title={pageData.seo?.metaTitle || metadata.title}
        description={pageData.seo?.metaDescription || metadata.description}
        type="website"
        image={pageData.seo?.shareImage}
      />
      
      <div className="about-page">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center">
          {pageData.heroImage ? (
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={pageData.heroImage} 
                alt={pageData.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-700 to-teal-900"></div>
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </>
          )}
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageData.title}</h1>
            <p className="text-xl max-w-3xl mx-auto">{pageData.intro}</p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700">{pageData.mission}</p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at KeepMe.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pageData.values.map((value, index) => (
                <ValueCard 
                  key={index} 
                  value={value} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{pageData.teamSection?.heading || 'Meet Our Team'}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageData.teamSection?.subheading || 'The passionate professionals behind our exceptional products and services.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pageData.teamMembers.map((member, index) => (
                <TeamMemberCard 
                  key={index} 
                  member={member} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Our Facilities - New Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{pageData.facilitiesSection?.heading || 'Our Facilities'}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-4">
                {pageData.facilitiesSection?.subheading || 'State-of-the-art manufacturing and development centres.'}
              </p>
              {pageData.facilitiesSection?.description && (
                <p className="text-gray-600 max-w-3xl mx-auto">
                  {pageData.facilitiesSection.description}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pageData.facilities.map((facility, index) => (
                <FacilityCard 
                  key={index} 
                  facility={facility} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Our History */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{pageData.historySection?.heading || 'Our History'}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageData.historySection?.subheading || 'From humble beginnings to industry leadership, explore our journey over the years.'}
              </p>
              {pageData.historySection?.foundedYear && (
                <p className="text-lg font-medium text-teal-700 mt-4">
                  Established in {pageData.historySection.foundedYear}
                </p>
              )}
            </div>
            
            <MilestoneTimeline milestones={pageData.milestones} />
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="py-16 bg-teal-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{pageData.ctaSection?.heading || 'Join Our Journey'}</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {pageData.ctaSection?.text || 'Whether you\'re looking to develop a custom fragrance, need premium packaging solutions, or want to explore partnership opportunities, we\'d love to hear from you.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={pageData.ctaSection?.primaryButtonLink || '/contact'} 
                className="btn bg-white text-teal-800 hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg"
              >
                {pageData.ctaSection?.primaryButtonText || 'Contact Us'}
              </Link>
              <Link 
                href={pageData.ctaSection?.secondaryButtonLink || '/services'} 
                className="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md font-medium text-lg"
              >
                {pageData.ctaSection?.secondaryButtonText || 'Our Services'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
