'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: 'What is NovaToken?',
    answer:
      'NovaToken is a next-gen Web3 token designed for decentralized finance, early-backer rewards, and community governance.',
  },
  {
    question: 'How can I participate in the presale?',
    answer:
      'Connect your wallet using the presale widget and choose your desired tier to buy tokens during the presale period.',
  },
  {
    question: 'Is NovaToken audited?',
    answer:
      'Yes! Our smart contracts are fully audited, and we display the audit badge in the TrustPanel section.',
  },
  {
    question: 'What wallets are supported?',
    answer:
      'You can use MetaMask, RainbowKit, or any wallet supported by Wagmi to connect and participate.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-20 px-6 lg:px-12 overflow-hidden 
                 bg-gradient-to-br from-gray-950 via-black to-gray-900"
    >
      {/* 🔹 Grid Background */}
      <div className="absolute inset-0 
                      bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] 
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
                     mb-12 relative z-10">
        Frequently Asked Questions
      </h2>

      {/* FAQ List */}
      <div className="flex flex-col gap-4 relative z-10 max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-black/40 backdrop-blur border border-green-400/40
                       rounded-2xl shadow-lg cursor-pointer
                       transition-transform hover:scale-105 duration-300"
            onClick={() => toggleIndex(index)}
            layout
          >
            {/* Question */}
            <div className="px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-100">
                {item.question}
              </h3>
              <span className="text-green-400 text-xl font-bold">
                {openIndex === index ? '−' : '+'}
              </span>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-300 text-sm"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
