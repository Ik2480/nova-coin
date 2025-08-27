// components/sections/WhySection.jsx
'use client';

import { motion } from 'framer-motion';
import {
  IconRocket,
  IconLock,
  IconNetwork,
  IconCoin,
} from '@tabler/icons-react';
import SectionWrapper from './SectionWrapper';

const cardData = [
  {
    icon: IconRocket,
    title: 'Scalable & Efficient',
    description:
      'Built on a high-throughput blockchain, our platform ensures lightning-fast transactions with minimal gas fees.',
  },
  {
    icon: IconLock,
    title: 'Unmatched Security',
    description:
      'Audited smart contracts and cutting-edge encryption protocols protect your assets and data at all times.',
  },
  {
    icon: IconNetwork,
    title: 'True Decentralization',
    description:
      'A community-governed DAO and a distributed network guarantee a future free from central authority.',
  },
  {
    icon: IconCoin,
    title: 'Built-in Utility',
    description:
      'Beyond a simple token, we offer staking, governance, and exclusive access to our ecosystem features.',
  },
];

const glitchVariants = {
  initial: { x: 0, y: 0 },
  hover: {
    x: [0, 2, -2, 2, -2, 0],
    y: [0, 2, -2, 2, -2, 0],
    transition: {
      duration: 0.5,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

export default function WhySection() {
  return (
    <SectionWrapper id="why" variant="dark">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-orbitron leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          We’re not just another presale. We’re building the future of decentralized finance, one block at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="relative p-8 rounded-xl border border-gray-800 bg-gray-900 transition-colors duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 255, 255, 0.2)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="absolute inset-0 bg-transparent rounded-xl pointer-events-none"
              variants={glitchVariants}
              initial="initial"
              whileHover="hover"
            />
            <div className="relative z-10 flex flex-col items-start space-y-4">
              <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <card.icon size={36} stroke={1.5} />
              </div>
              <h3 className="text-xl font-semibold font-inter text-gray-100">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
