'use client';

import { motion } from 'framer-motion';

export const MilestoneTimeline = ({ milestones }) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-teal-200"></div>
      
      {/* Timeline Items */}
      <div className="space-y-16">
        {milestones.map((milestone, index) => (
          <div key={index} className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="md:w-1/2"></div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-teal-700 rounded-full text-white z-10"
            >
              {milestone.year.slice(-2)}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm ml-6 md:ml-0 md:mx-6"
            >
              <div className="font-bold text-teal-700 mb-2">{milestone.year}</div>
              <p>{milestone.description}</p>
              {milestone.image && (
                <div className="mt-4 rounded-md overflow-hidden">
                  <img src={milestone.image} alt={`${milestone.year} - ${milestone.description}`} className="w-full h-auto" />
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
