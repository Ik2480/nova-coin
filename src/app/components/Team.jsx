'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

const teamMembers = [
  { photo: '/team/member1.webp', name: 'Alice Johnson', role: 'Founder & CEO', socials: { twitter: '#', linkedin: '#', github: '#' } },
  { photo: '/team/member2.webp', name: 'Bob Smith', role: 'Lead Developer', socials: { twitter: '#', linkedin: '#', github: '#' } },
  { photo: '/team/member3.webp', name: 'David Kim', role: 'Marketing Head', socials: { twitter: '#', linkedin: '#', github: '#' } },
  { photo: '/team/member4.webp', name: 'Clara Lee', role: 'Blockchain Architect', socials: { twitter: '#', linkedin: '#', github: '#' } },
];

export default function TeamSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <section
      id="team"
      className="relative py-20 px-6 lg:px-12 overflow-hidden 
                 bg-gradient-to-br from-gray-950 via-black to-gray-900"
    >
      {/* 🔹 Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] 
                      bg-[size:40px_40px] pointer-events-none" />

      {/* Floating neon orbs */}
      <motion.div
        animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        className="absolute w-36 h-36 bg-emerald-500/20 rounded-full top-10 left-10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -15, 15, 0], y: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
        className="absolute w-48 h-48 bg-green-400/20 rounded-full bottom-20 right-0 blur-3xl pointer-events-none"
      />

      {/* Section Heading */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-center 
                     text-transparent bg-clip-text 
                     bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 
                     mb-14 relative z-10">
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
            className="relative flex flex-col items-center p-8 
                       bg-black/40 backdrop-blur-md
                       border border-green-400/60 
                       rounded-2xl shadow-lg 
                       hover:shadow-[0_0_20px_#00FF7F] 
                       transition-all duration-300"
          >
            {/* Member Photo */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-green-400 shadow-md mb-4">
              <Image
                src={member.photo}
                alt={`${member.name} photo`}
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Name & Role */}
            <h3 className="text-lg font-semibold text-white">{member.name}</h3>
            <p className="text-sm text-gray-300 mb-4">{member.role}</p>

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
                  className="text-gray-200 hover:text-blue-400 transition-colors"
                >
                  <IconBrandTwitter size={22} />
                </a>
              )}
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-blue-500 transition-colors"
                >
                  <IconBrandLinkedin size={22} />
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-white transition-colors"
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
