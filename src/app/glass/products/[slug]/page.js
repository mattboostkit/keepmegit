import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../../../../lib/sanity';
import SEO from '../../../../components/SEO';
import ProductEnquiryButton from '../../../../components/glass/ProductEnquiryButton';

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const products = await getProducts();
  const product = products.find(p => p.slug?.current === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | KeepMe',
      description: 'The requested glass product could not be found.',
    };
  }
  
  return {
    title: `${product.title} | Glass Products | KeepMe`,
    description: product.metaDescription || product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const products = await getProducts();
  const product = products.find(p => p.slug?.current === params.slug);
  
  if (!product) {
    notFound();
  }
  
  // Find related products (same subcategory)
  const relatedProducts = products
    .filter(p => 
      p.category === 'glass' && 
      p.subcategory === product.subcategory && 
      p._id !== product._id
    )
    .slice(0, 3);
  
  return (
    <>
      <SEO 
        title={`${product.title} | Glass Products | KeepMe`}
        description={product.metaDescription || product.description}
        type="product"
        product={{
          name: product.title,
          description: product.description,
          image: product.image,
          sku: product.productCode,
        }}
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/glass" className="hover:text-teal-700">Glass</Link>
          <span className="mx-2">/</span>
          <Link href="/glass/products" className="hover:text-teal-700">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            {product.image && (
              <div className="relative h-96 w-full mb-4 border rounded overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
            
            {/* Gallery */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.gallery.map((image, index) => (
                  <div key={index} className="relative h-24 border rounded overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:opacity-80 transition cursor-pointer"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            
            {product.productCode && (
              <p className="text-gray-500 mb-4">Product Code: {product.productCode}</p>
            )}
            
            <div className="prose mb-6">
              <p>{product.description}</p>
            </div>
            
            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {/* Dimensions */}
                {product.dimensions?.height && (
                  <div className="flex justify-between">
                    <span className="font-medium">Height:</span>
                    <span>{product.dimensions.height}mm</span>
                  </div>
                )}
                
                {product.dimensions?.width && (
                  <div className="flex justify-between">
                    <span className="font-medium">Width/Diameter:</span>
                    <span>{product.dimensions.width}mm</span>
                  </div>
                )}
                
                {product.dimensions?.depth && (
                  <div className="flex justify-between">
                    <span className="font-medium">Depth:</span>
                    <span>{product.dimensions.depth}mm</span>
                  </div>
                )}
                
                {product.dimensions?.capacity && (
                  <div className="flex justify-between">
                    <span className="font-medium">Capacity:</span>
                    <span>{product.dimensions.capacity}ml</span>
                  </div>
                )}
                
                {product.dimensions?.weight && (
                  <div className="flex justify-between">
                    <span className="font-medium">Weight:</span>
                    <span>{product.dimensions.weight}g</span>
                  </div>
                )}
                
                {/* Custom Specifications */}
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex justify-between col-span-2">
                    <span className="font-medium">{spec.title}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
                
                {/* Materials */}
                {product.materials && product.materials.length > 0 && (
                  <div className="flex justify-between col-span-2">
                    <span className="font-medium">Materials:</span>
                    <span>{product.materials.map(m => 
                      m.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    ).join(', ')}</span>
                  </div>
                )}
                
                {/* Minimum Order */}
                {product.minimumOrderQuantity && (
                  <div className="flex justify-between col-span-2">
                    <span className="font-medium">Minimum Order:</span>
                    <span>{product.minimumOrderQuantity.toLocaleString()} units</span>
                  </div>
                )}
                
                {/* Lead Time */}
                {product.leadTime && (
                  <div className="flex justify-between col-span-2">
                    <span className="font-medium">Lead Time:</span>
                    <span>{product.leadTime} {product.leadTime === 1 ? 'week' : 'weeks'}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Decoration Options */}
            {product.decorationOptions && product.decorationOptions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Decoration Options</h2>
                <ul className="list-disc list-inside space-y-1">
                  {product.decorationOptions.map((option, index) => (
                    <li key={index}>
                      {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/glass/decoration" 
                  className="inline-block mt-4 text-teal-700 hover:underline"
                >
                  Learn more about our decoration options
                </Link>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ProductEnquiryButton product={product} />
              
              <Link 
                href="/contact" 
                className="bg-white border border-teal-700 text-teal-700 px-6 py-3 rounded-md text-center hover:bg-gray-50 transition"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                  {relatedProduct.image && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{relatedProduct.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedProduct.description}</p>
                    
                    <Link 
                      href={`/glass/products/${relatedProduct.slug.current}`} 
                      className="text-teal-700 font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
