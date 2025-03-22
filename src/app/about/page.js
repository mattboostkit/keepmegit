'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getAboutPage } from '../../lib/sanity';

export default function About() {
  // In a real implementation, this would fetch data from Sanity
  // const aboutData = await getAboutPage();
  
  // Placeholder data
  const aboutData = {
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
    team: [
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
    history: {
      founded: '2002',
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
      ]
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-700 to-teal-900"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{aboutData.title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{aboutData.intro}</p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700">{aboutData.mission}</p>
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
            {aboutData.values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-teal-700 text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind our exceptional products and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.team.map((member, index) => (
              <div key={index} className="team-member text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 bg-gray-200 flex items-center justify-center">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} width={160} height={160} className="object-cover" />
                  ) : (
                    <div className="text-gray-400 text-3xl">{member.name.charAt(0)}</div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-teal-700 mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our History</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry leadership, explore our journey over the years.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-teal-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {aboutData.history.milestones.map((milestone, index) => (
                <div key={index} className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white z-10">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm ml-6 md:ml-0 md:mx-6">
                    <div className="font-bold text-teal-700 mb-2">{milestone.year}</div>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're looking to develop a custom fragrance, need premium packaging solutions, or want to explore partnership opportunities, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-teal-800 hover:bg-opacity-90 px-8 py-3 rounded-md font-medium text-lg">
              Contact Us
            </Link>
            <Link href="/services" className="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md font-medium text-lg">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
