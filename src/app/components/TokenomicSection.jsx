'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function TokenomicSection() {
  const data = [
    { label: "Team", value: 20, color: "#6366F1" },
    { label: "Liquidity", value: 30, color: "#EC4899" },
    { label: "Marketing", value: 10, color: "#FBBF24" },
    { label: "Presale", value: 40, color: "#22D3EE" },
  ];

  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const arcs = useMemo(() => {
    let cumulative = 0;
    return data.map((d) => {
      const startAngle = (cumulative / total) * 2 * Math.PI;
      cumulative += d.value;
      const endAngle = (cumulative / total) * 2 * Math.PI;

      const x1 = Math.cos(startAngle - Math.PI / 2);
      const y1 = Math.sin(startAngle - Math.PI / 2);
      const x2 = Math.cos(endAngle - Math.PI / 2);
      const y2 = Math.sin(endAngle - Math.PI / 2);

      const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

      const path = `
        M ${x1} ${y1}
        A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2}
        L 0 0
        Z
      `;
      return { ...d, path };
    });
  }, [data, total]);

  return (
    <section
      id="tokenomics"
      className="relative w-full py-16 px-4 sm:px-6 lg:px-8 
                 bg-gradient-to-br from-indigo-100 via-white to-pink-100 
                 dark:from-indigo-950 dark:via-gray-900 dark:to-pink-950
                 overflow-hidden"
    >
      {/* Floating gradient circles like Hero */}
      <motion.div
        animate={{ x: [0, 15, -15, 0], y: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        className="absolute w-36 h-36 bg-indigo-400/20 rounded-full top-10 left-10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -10, 10, 0], y: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
        className="absolute w-48 h-48 bg-pink-400/20 rounded-full bottom-20 right-0 blur-3xl pointer-events-none"
      />

      {/* ✅ MATCH HeroSection width */}
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-extrabold text-center mb-12 
                       text-transparent bg-clip-text 
                       bg-gradient-to-r from-indigo-600 via-pink-500 to-pink-600">
          Tokenomics
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Donut Chart */}
          <div className="relative w-64 h-64 md:w-72 md:h-72">
            <svg viewBox="-1 -1 2 2" className="w-full h-full rotate-[-90deg]">
              {arcs.map((arc, i) => (
                <path
                  key={arc.label}
                  d={arc.path}
                  fill={arc.color}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    transform: hoveredIndex === i ? "scale(1.05)" : "scale(1)",
                    filter: hoveredIndex === i ? `drop-shadow(0 0 12px ${arc.color})` : "none",
                    transformOrigin: "center center",
                  }}
                />
              ))}
              <circle
                cx="0"
                cy="0"
                r="0.5"
                fill="currentColor"
                className="text-white pointer-events-none"
              />
            </svg>

            {/* Tooltip */}
            {hoveredIndex !== null && (
              <div className="absolute -translate-x-1/2 -translate-y-3/4 
                              left-1/2 top-1/2 
                              bg-white/80 dark:bg-gray-800/90 
                              backdrop-blur-lg text-gray-900 dark:text-gray-100 
                              text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none">
                {data[hoveredIndex].label}: {data[hoveredIndex].value} (
                {((data[hoveredIndex].value / total) * 100).toFixed(1)}%)
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {data.map((d, i) => (
              <div
                key={d.label}
                className="flex items-center justify-between cursor-pointer 
                           p-2 rounded-xl 
                           bg-white/20 dark:bg-gray-800/40 
                           backdrop-blur border border-white/20 dark:border-gray-700 
                           hover:scale-105 transition-transform duration-200"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: d.color }}
                  ></span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {d.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {((d.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
