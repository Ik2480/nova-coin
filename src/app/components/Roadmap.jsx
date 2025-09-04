'use client';

import { motion } from "framer-motion";

const roadmapItems = [
  { title: "Phase 1", date: "Q1 2025", description: "Token presale launch and early community building.", icon: "🚀" },
  { title: "Phase 2", date: "Q2 2025", description: "Exchange listings and strategic partnerships.", icon: "💹" },
  { title: "Phase 3", date: "Q3 2025", description: "Product development and NFT integrations.", icon: "🛠️" },
  { title: "Phase 4", date: "Q4 2025", description: "Global marketing campaign and ecosystem expansion.", icon: "🌐" },
];

// Motion variants
const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };
const cardVariants = { 
  hidden: { opacity: 0, y: 50, scale: 0.95 }, 
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } } 
};

// Neon color cycle
const neonColors = ["#00FF7F", "#00FFFF", "#FF00FF"];

const RoadmapCard = ({ item, index }) => {
  const color = neonColors[index % neonColors.length];

  return (
    <motion.div
      className="flex flex-col justify-between items-center text-center
                 w-56 min-h-[220px] p-4 
                 bg-black/50 backdrop-blur-md 
                 border rounded-2xl shadow-lg 
                 transition-transform duration-300 cursor-pointer shrink-0"
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
      style={{ borderColor: color, boxShadow: `0 0 8px ${color}` }}
    >
      <div>
        <div className="text-2xl mb-2">{item.icon}</div>
        <h3 className="text-base font-semibold mb-1 text-white">{item.title}</h3>
        <span className="text-xs text-gray-400 mb-2 block">{item.date}</span>
        <p className="text-sm text-gray-300">{item.description}</p>
      </div>
    </motion.div>
  );
};

const Roadmap = () => {
  return (
    <section
      id="roadmap"
      className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col justify-center items-center py-4"
    >
      {/* Neon Grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: [0, 5, -5, 0], y: [0, 5, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>
            <div className="absolute inset-y-0 border-r border-cyan-400/20" style={{ left: `${(i / 20) * 100}%` }} />
            <div className="absolute inset-x-0 border-b border-fuchsia-400/20" style={{ top: `${(i / 20) * 100}%` }} />
          </div>
        ))}
      </motion.div>

      {/* Sparks */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: "#00FFFF",
            boxShadow: "0 0 10px #00FFFF",
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Section Header */}
      <h2
        className="text-3xl md:text-5xl font-extrabold text-center mb-14 bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(to right, #00FF7F, #00FFFF, #FF00FF)" }}
      >
        Roadmap
      </h2>

      {/* Roadmap Cards */}
      <motion.div
        className="flex justify-start gap-6 relative z-10 overflow-x-auto no-scrollbar px-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {roadmapItems.map((item, index) => (
          <RoadmapCard key={index} item={item} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default Roadmap;
