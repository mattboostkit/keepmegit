'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export const TeamMemberCard = ({ member }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="team-member text-center"
    >
      <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 bg-gray-200 flex items-center justify-center">
        {member.image ? (
          <Image 
            src={member.image} 
            alt={member.name} 
            width={160} 
            height={160} 
            className="object-cover"
          />
        ) : (
          <div className="text-gray-400 text-3xl">{member.name.charAt(0)}</div>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
      <p className="text-teal-700 mb-4">{member.role}</p>
      <p className="text-gray-600">{member.bio}</p>
    </motion.div>
  );
};
