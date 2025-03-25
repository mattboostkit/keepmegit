import Link from 'next/link';
import SEO from '../../components/SEO';

export const metadata = {
  title: 'Glass Packaging Solutions | KeepMe',
  description: 'Premium quality glass and componentry for the fragrance, beauty, and lifestyle industry. UK based glass manufacturer for the fragrance and lifestyle sector.',
};

export default function GlassPage() {
  return (
    <>
      <SEO 
        title="Glass Packaging Solutions | KeepMe"
        description="Premium quality glass and componentry for the fragrance, beauty, and lifestyle industry. UK based glass manufacturer for the fragrance and lifestyle sector."
        type="website"
      />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">UK based Glass Manufacturer for the Fragrance and Lifestyle sector</h1>
          <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">Premium quality glass and componentry for the fragrance, beauty, and lifestyle industry</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/glass/products" className="btn-primary px-6 py-3 rounded-md bg-teal-700 text-white hover:bg-teal-800 transition">
              Explore Product Range
            </Link>
            <Link href="/tools/quote-sheet" className="btn-secondary px-6 py-3 rounded-md border border-teal-700 text-teal-700 hover:bg-teal-50 transition">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* About KeepMe Glass */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">About KeepMe Glass</h2>
          <p className="text-lg mb-8 text-gray-600 max-w-4xl">
            At KeepMe Glass, we specialize in providing high-quality glass packaging solutions for the fragrance, beauty, and lifestyle industries. With decades of experience and a commitment to excellence, we offer a comprehensive range of services from design to delivery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Quality Assurance</h3>
              <p className="text-gray-600">Rigorous quality control processes ensure our glass products meet the highest standards.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Custom Solutions</h3>
              <p className="text-gray-600">Tailored glass packaging solutions designed to meet your specific brand requirements.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-teal-700">Sustainable Practices</h3>
              <p className="text-gray-600">Committed to environmentally responsible manufacturing and packaging solutions.</p>
            </div>
          </div>
          <div className="text-center">
            <Link href="/about" className="inline-block px-6 py-3 text-teal-700 font-medium hover:text-teal-800 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Product Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Fragrance Glass</h3>
              <p className="text-gray-600 mb-4">Premium bottles and containers for perfumes and colognes.</p>
              <Link href="/glass/products?category=fragrance" className="text-teal-700 font-medium hover:text-teal-800">
                View Products →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Candle Glass</h3>
              <p className="text-gray-600 mb-4">Elegant containers for luxury candles and home fragrances.</p>
              <Link href="/glass/products?category=candle" className="text-teal-700 font-medium hover:text-teal-800">
                View Products →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Vial Glass</h3>
              <p className="text-gray-600 mb-4">Precision vials for samples and specialty fragrances.</p>
              <Link href="/glass/products?category=vial" className="text-teal-700 font-medium hover:text-teal-800">
                View Products →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Components</h3>
              <p className="text-gray-600 mb-4">Pumps, caps, and accessories for complete packaging solutions.</p>
              <Link href="/glass/products?category=components" className="text-teal-700 font-medium hover:text-teal-800">
                View Products →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 p-8 rounded-lg hover:border-teal-700 transition">
              <h3 className="text-xl font-semibold mb-4">Glass Manufacturing</h3>
              <p className="text-gray-600">Custom and standard glass bottle manufacturing with attention to detail and quality.</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-lg hover:border-teal-700 transition">
              <h3 className="text-xl font-semibold mb-4">Decoration Services</h3>
              <p className="text-gray-600">Comprehensive decoration options including printing, coating, and embossing.</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-lg hover:border-teal-700 transition">
              <h3 className="text-xl font-semibold mb-4">Filling & Assembly</h3>
              <p className="text-gray-600">End-to-end solutions including filling, capping, and final packaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">Working with KeepMe Glass</h2>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1 text-center">
              <div className="w-16 h-16 bg-teal-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Consultation</h3>
              <p className="text-gray-600">Initial discussion of your requirements and project scope.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1 text-center">
              <div className="w-16 h-16 bg-teal-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Design</h3>
              <p className="text-gray-600">Collaborative design process with prototyping and refinement.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1 text-center">
              <div className="w-16 h-16 bg-teal-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Production</h3>
              <p className="text-gray-600">Manufacturing with rigorous quality control at every stage.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1 text-center">
              <div className="w-16 h-16 bg-teal-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Delivery</h3>
              <p className="text-gray-600">Timely delivery and ongoing support for your products.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decoration Capabilities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Decoration Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="w-full h-64 bg-gray-200 rounded-md"></div>
            <div className="w-full h-64 bg-gray-200 rounded-md"></div>
            <div className="w-full h-64 bg-gray-200 rounded-md"></div>
          </div>
          <div className="text-center">
            <Link href="/glass/decoration" className="inline-block px-6 py-3 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition">
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Create Something Together</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">From concept to delivery, we're your glass packaging partner</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-6 py-3 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition">
              Contact Us
            </Link>
            <Link href="/tools/quote-sheet" className="px-6 py-3 border border-white text-white rounded-md hover:bg-teal-600 transition">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
