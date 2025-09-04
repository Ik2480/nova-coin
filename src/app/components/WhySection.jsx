'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { IconRocket, IconLock, IconNetwork, IconCoin } from '@tabler/icons-react';

const features = [
  { icon: IconRocket, title: 'Scalable & Efficient', description: 'Built on a high-throughput blockchain, lightning-fast transactions with minimal gas fees.' },
  { icon: IconLock, title: 'Unmatched Security', description: 'Audited smart contracts and encryption protocols to protect your assets and data.' },
  { icon: IconNetwork, title: 'True Decentralization', description: 'Community-governed DAO ensures a future free from central authority.' },
  { icon: IconCoin, title: 'Built-in Utility', description: 'Staking, governance, and exclusive access to ecosystem features.' },
];

export default function WhySection() {
  const headingRef = useRef(null);

  return (
    <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Header */}
      <div ref={headingRef} className="text-center mb-12 relative z-20">
        <h2 className="text-2xl md:text-4xl font-bold font-orbitron leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
          Why Choose Us?
        </h2>
      </div>

      {/* Desktop Features with horizontal line */}
      <div className="hidden md:flex relative z-10 max-w-5xl mx-auto justify-between items-center h-[220px]">
        {/* Horizontal line above numbers */}
        <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 z-0" />

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.3 }}
            viewport={{ once: true }}
            className={`relative flex flex-col items-center text-center max-w-[220px] z-10 ${i === 0 || i === 1 ? 'mt-4' : ''}`}
          >
            <div className="relative mb-2">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 w-14 h-14 bg-green-400/30 blur-2xl rounded-full" />
              <div className="relative w-14 h-14 rounded-full bg-black/80 border border-green-400/60 flex items-center justify-center text-green-400 font-bold shadow-[0_0_20px_#22c55e]">
                {i + 1}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="text-sm text-gray-300 mt-1 leading-snug">{f.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden relative z-10 overflow-x-auto snap-x snap-mandatory flex gap-6 pb-4 -mx-4 px-4 mt-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="min-w-[80%] snap-center flex flex-col items-center text-center bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-green-400/50 shadow-[0_0_20px_#22c55e]/30"
          >
            <div className="relative w-14 h-14 rounded-full bg-black/80 border border-green-400/60 flex items-center justify-center text-green-400 font-bold shadow-[0_0_15px_#22c55e]">
              {i + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}