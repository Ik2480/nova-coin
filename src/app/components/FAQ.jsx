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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16
                 bg-gradient-to-br from-indigo-50 via-white to-pink-50
                 relative overflow-hidden"
    >
      <h2 className="text-3xl font-extrabold text-center
                     text-transparent bg-clip-text
                     bg-gradient-to-r from-indigo-600 via-pink-500 to-pink-600
                     mb-12">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/20 backdrop-blur border border-white/30
                       rounded-2xl shadow-lg cursor-pointer
                       transition-transform hover:scale-105 duration-300"
            onClick={() => toggleIndex(index)}
            layout
          >
            {/* Question */}
            <div className="px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {item.question}
              </h3>
              <span className="text-gray-600 dark:text-gray-300">
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
                  className="px-6 pb-4 text-gray-700 dark:text-gray-200 text-sm"
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
