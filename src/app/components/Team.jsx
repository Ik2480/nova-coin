'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

const teamMembers = [
  { photo: '/team/member1.webp', name: 'Alice Johnson', role: 'Founder & CEO', socials: { twitter: '#', linkedin: '#', github: '#' } },
  { photo: '/team/member2.webp', name: 'Bob Smith', role: 'Lead Developer', socials: { twitter: '#', linkedin: '#', github: '#' } },
  { photo: '/team/member3.webp', name: 'Clara Lee', role: 'Blockchain Architect', socials: { twitter: '#', linkedin: '#', github: '#' } },
  { photo: '/team/member4.webp', name: 'David Kim', role: 'Marketing Head', socials: { twitter: '#', linkedin: '#', github: '#' } },
];

export default function TeamSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <section
      id="team"
      className="relative py-20 px-6 lg:px-12 bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
    >
      {/* Floating gradient orbs like WhySection */}
      <motion.div
        animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        className="absolute w-36 h-36 bg-indigo-500/20 rounded-full top-10 left-10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -15, 15, 0], y: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
        className="absolute w-48 h-48 bg-pink-500/20 rounded-full bottom-20 right-0 blur-3xl pointer-events-none"
      />

      {/* Section Heading */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-pink-600 mb-14">
        Meet the Team
      </h2>

      {/* Team Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
        initial="hidden"
        animate="show"
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col items-center p-8 bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg border border-white/20 dark:border-gray-700 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            {/* Member Photo */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/30 shadow-md mb-4">
              <Image
                src={member.photo}
                alt={`${member.name} photo`}
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Name & Role */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{member.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{member.role}</p>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="flex gap-5 mt-2"
            >
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
                >
                  <IconBrandTwitter size={22} />
                </a>
              )}
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-full"
                >
                  <IconBrandLinkedin size={22} />
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full"
                >
                  <IconBrandGithub size={22} />
                </a>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
