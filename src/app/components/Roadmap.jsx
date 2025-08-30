'use client';

import { motion } from "framer-motion";

const roadmapItems = [
  { title: "Phase 1", date: "Q1 2025", description: "Token presale launch and early community building.", icon: "🚀" },
  { title: "Phase 2", date: "Q2 2025", description: "Exchange listings and strategic partnerships.", icon: "💹" },
  { title: "Phase 3", date: "Q3 2025", description: "Product development and NFT integrations.", icon: "🛠️" },
  { title: "Phase 4", date: "Q4 2025", description: "Global marketing campaign and ecosystem expansion.", icon: "🌐" },
];

// Motion variants for staggered cards
const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };
const cardVariants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } } };

const RoadmapCard = ({ item }) => (
  <motion.div
    className="flex flex-col items-center justify-start min-w-[220px] p-6 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
    variants={cardVariants}
  >
    <div className="text-3xl mb-2">{item.icon}</div>
    <h3 className="text-lg font-semibold mb-1 text-gray-900/90">{item.title}</h3>
    <span className="text-sm text-gray-700/80 mb-2">{item.date}</span>
    <p className="text-sm text-gray-700/80 text-center">{item.description}</p>
  </motion.div>
);

const Roadmap = () => {
  return (
    <section
      id="roadmap"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden"
    >
      {/* Floating gradient circles */}
      <motion.div
        animate={{ x: [0, 15, -15, 0], y: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        className="absolute w-36 h-36 bg-indigo-400/20 rounded-full top-10 left-10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -10, 10, 0], y: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        className="absolute w-48 h-48 bg-pink-400/20 rounded-full bottom-20 right-0 blur-3xl pointer-events-none"
      />

      {/* Section Header */}
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-pink-600 mb-12">
        Roadmap
      </h2>

      <motion.div
        className="flex flex-wrap justify-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {roadmapItems.map((item, index) => (
          <RoadmapCard key={index} item={item} />
        ))}
      </motion.div>
    </section>
  );
};

export default Roadmap;
