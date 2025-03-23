'use client';

import { motion } from 'framer-motion';

export const ValueCard = ({ value, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
        {value.icon ? (
          <span className="text-teal-700 text-2xl">{value.icon}</span>
        ) : (
          <span className="text-teal-700 text-2xl font-bold">{index + 1}</span>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-center">{value.title}</h3>
      <p className="text-gray-600 text-center">{value.description}</p>
    </motion.div>
  );
};
