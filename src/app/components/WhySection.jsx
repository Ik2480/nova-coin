'use client';

import { motion } from 'framer-motion';
import { IconRocket, IconLock, IconNetwork, IconCoin } from '@tabler/icons-react';

const cardData = [
  { icon: IconRocket, title: 'Scalable & Efficient', description: 'Built on a high-throughput blockchain, our platform ensures lightning-fast transactions with minimal gas fees.' },
  { icon: IconLock, title: 'Unmatched Security', description: 'Audited smart contracts and cutting-edge encryption protocols protect your assets and data at all times.' },
  { icon: IconNetwork, title: 'True Decentralization', description: 'A community-governed DAO and a distributed network guarantee a future free from central authority.' },
  { icon: IconCoin, title: 'Built-in Utility', description: 'Beyond a simple token, we offer staking, governance, and exclusive access to our ecosystem features.' },
];

const glitchVariants = {
  initial: { x: 0, y: 0 },
  hover: {
    x: [0, 2, -2, 2, -2, 0],
    y: [0, 2, -2, 2, -2, 0],
    transition: { duration: 0.5, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120 } },
};

export default function WhySection() {
  return (
    <section
      id="why"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 
                 bg-gradient-to-br from-indigo-50 via-white to-pink-50 
                 relative overflow-hidden"
    >
      {/* Floating gradient circles */}
      <motion.div
        animate={{ x: [0, 15, -15, 0], y: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        className="absolute w-28 h-28 bg-indigo-400/20 rounded-full top-10 left-10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -10, 10, 0], y: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
        className="absolute w-36 h-36 bg-pink-400/20 rounded-full bottom-20 right-0 blur-3xl pointer-events-none"
      />

      {/* Section Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold font-orbitron leading-tight 
                       text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-600 via-pink-500 to-pink-600">
          Why Choose Us?
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-800 max-w-2xl mx-auto">
          We’re not just another presale. We’re building the future of decentralized finance, one block at a time.
        </p>
      </div>

      {/* Cards in grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="relative p-5 rounded-xl bg-white/70 backdrop-blur-md 
                       border border-white/30 shadow-md 
                       hover:shadow-xl hover:scale-105 
                       transition-transform duration-300 cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute inset-0 bg-transparent rounded-xl pointer-events-none"
              variants={glitchVariants}
              initial="initial"
              whileHover="hover"
            />
            <div className="relative z-10 flex flex-col items-start space-y-3">
              <div className="p-2.5 rounded-full bg-indigo-500/20 text-indigo-700 border border-indigo-500/40">
                <card.icon size={28} stroke={1.5} />
              </div>
              <h3 className="text-lg font-semibold font-inter text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
