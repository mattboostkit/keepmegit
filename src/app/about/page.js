import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity'; // Assuming urlFor is needed for images
import Image from 'next/image';
import SEO from '@/components/SEO'; // Assuming an SEO component exists

// Import specific components for rendering sections
import ValueCard from '@/components/about/ValueCard.jsx';
import TeamMemberCard from '@/components/about/TeamMemberCard.jsx';
import MilestoneTimeline from '@/components/about/MilestoneTimeline.jsx';
import FacilityCard from '@/components/about/FacilityCard.jsx';

// GROQ query to fetch the about page content
const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
  title,
  intro,
  heroImage,
  mission,
  values,
  teamSection,
  teamMembers[] | order(order asc), // Order team members
  historySection,
  milestones[] | order(year asc), // Order milestones by year
  facilitiesSection,
  facilities,
  ctaSection,
  seo
}`;

// Function to fetch data
async function getAboutPageData() {
  try {
    const data = await client.fetch(ABOUT_PAGE_QUERY);
    return data;
  } catch (error) {
    console.error("Failed to fetch About Page data:", error);
    // Return null or throw error based on how you want to handle failures
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata() {
  const data = await getAboutPageData();

  if (!data || !data.seo) {
    return {
      title: 'About Us | KeepMe',
      description: 'Learn more about KeepMe, our mission, values, and team.',
    };
  }

  return SEO({
    title: data.seo.metaTitle,
    description: data.seo.metaDescription,
    imageUrl: data.seo.shareImage ? urlFor(data.seo.shareImage).width(1200).url() : undefined,
    pathname: '/about', // Assuming '/about' is the correct path
  });
}


// The About Page component
export default async function AboutPage() {
  const data = await getAboutPageData();

  if (!data) {
    // Handle the case where data fetching failed
    // You could show a simple error message or redirect
    return <div className="container mx-auto px-4 py-16 text-center">Failed to load page content.</div>;
  }

  // Sort team members and milestones if not already sorted by query (double-check)
  const sortedTeamMembers = data.teamMembers?.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  const sortedMilestones = data.milestones?.sort((a, b) => parseInt(a.year) - parseInt(b.year));


  return (
    <div className="bg-gray-50">
      {/* Hero Section (Optional - using heroImage) */}
      {data.heroImage && (
        <div className="relative h-64 md:h-96 w-full mb-12">
          <Image
            src={urlFor(data.heroImage).url()}
            alt={data.title || 'About Us Hero Image'}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
              {data.title || 'About Us'}
            </h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">

        {/* Introduction Section */}
        {data.intro && (
          <section className="text-center max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700">{data.intro}</p>
          </section>
        )}

        {/* Mission Section */}
        {data.mission && (
          <section className="text-center max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">{data.mission}</p>
          </section>
        )}

        {/* Values Section */}
        {data.values && data.values.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.values.map((value, index) => (
                <ValueCard key={index} value={value} />
              ))}
            </div>
          </section>
        )}

        {/* Team Section */}
        {data.teamSection && sortedTeamMembers && sortedTeamMembers.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">{data.teamSection.heading}</h2>
            {data.teamSection.subheading && <p className="text-gray-600 text-center mb-8">{data.teamSection.subheading}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedTeamMembers.map((member, index) => (
                 <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* History / Milestones Section */}
        {data.historySection && sortedMilestones && sortedMilestones.length > 0 && (
           <section>
             <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">{data.historySection.heading}</h2>
             {data.historySection.subheading && <p className="text-gray-600 text-center mb-8">{data.historySection.subheading}</p>}
             {/* Render MilestoneTimeline component */}
             <MilestoneTimeline milestones={sortedMilestones} />
           </section>
        )}

        {/* Facilities Section */}
        {data.facilitiesSection && data.facilities && data.facilities.length > 0 && (
          <section>
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">{data.facilitiesSection.heading}</h2>
            {data.facilitiesSection.subheading && <p className="text-gray-600 text-center mb-8">{data.facilitiesSection.subheading}</p>}
            {data.facilitiesSection.description && <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">{data.facilitiesSection.description}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.facilities.map((facility, index) => (
                <FacilityCard key={index} facility={facility} />
              ))}
            </div>
          </section>
        )}

        {/* Call to Action Section */}
        {data.ctaSection && (
          <section className="bg-indigo-700 text-white p-8 md:p-12 rounded-lg text-center">
            {data.ctaSection.heading && <h2 className="text-3xl font-semibold mb-4">{data.ctaSection.heading}</h2>}
            {data.ctaSection.text && <p className="mb-6 max-w-2xl mx-auto">{data.ctaSection.text}</p>}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {data.ctaSection.primaryButtonText && data.ctaSection.primaryButtonLink && (
                <a href={data.ctaSection.primaryButtonLink} className="bg-white text-indigo-700 font-semibold py-2 px-6 rounded hover:bg-gray-100 transition duration-200">
                  {data.ctaSection.primaryButtonText}
                </a>
              )}
              {data.ctaSection.secondaryButtonText && data.ctaSection.secondaryButtonLink && (
                <a href={data.ctaSection.secondaryButtonLink} className="bg-transparent border border-white text-white font-semibold py-2 px-6 rounded hover:bg-white hover:text-indigo-700 transition duration-200">
                  {data.ctaSection.secondaryButtonText}
                </a>
              )}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
