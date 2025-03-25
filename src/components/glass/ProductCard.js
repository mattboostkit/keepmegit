import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product, onAddToEnquiry, isInEnquiry }) => {
  const {
    _id,
    title,
    description,
    image,
    subcategory,
    materials,
    dimensions,
    capacity,
    minOrderQuantity
  } = product;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-white">
      <div className="relative h-64 w-full bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {subcategory && (
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-md">
              {subcategory}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-4">
          {dimensions && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 mr-2">Dimensions:</span>
              <span className="text-gray-600">{dimensions}</span>
            </div>
          )}
          
          {capacity && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 mr-2">Capacity:</span>
              <span className="text-gray-600">{capacity}</span>
            </div>
          )}
          
          {minOrderQuantity && (
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 mr-2">Min Order:</span>
              <span className="text-gray-600">{minOrderQuantity}</span>
            </div>
          )}
        </div>
        
        {materials && materials.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {materials.map((material) => (
              <span key={material} className="bg-teal-50 text-teal-700 text-xs px-3 py-1 rounded-md">
                {material}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <Link 
            href={`/glass/products/${_id}`}
            className="text-teal-700 font-medium hover:text-teal-800 hover:underline transition duration-300 inline-flex items-center"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          
          <button
            onClick={() => onAddToEnquiry(product)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-300 ${
              isInEnquiry 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                : 'bg-teal-700 text-white hover:bg-teal-800'
            }`}
          >
            {isInEnquiry ? 'Remove from Enquiry' : 'Add to Enquiry'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
