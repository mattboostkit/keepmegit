'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export const FacilityCard = ({ facility }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      {facility.image && (
        <div className="relative h-60 w-full">
          <Image 
            src={facility.image} 
            alt={facility.name} 
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{facility.name}</h3>
        <p className="text-gray-600 mb-4">{facility.description}</p>
        
        {facility.features && facility.features.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-2">Key Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {facility.features.map((feature, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-gray-600"
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};
