'use client';
import React, { useState, useMemo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

function AnimatedNumber({ value, duration = 2, prefix = "", suffix = "" }) {
  const controls = useAnimation();
  const [display, setDisplay] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      controls.start({
        val: value,
        transition: { duration, ease: "easeOut" },
      });
    }
  }, [isInView, value, controls, duration]);

  return (
    <motion.span
      ref={ref}
      animate={controls}
      initial={{ val: 0 }}
      onUpdate={(latest) => setDisplay(latest.val)}
    >
      {prefix}{Math.round(display).toLocaleString()}{suffix}
    </motion.span>
  );
}

export default function TokenomicSection() {
  // ---------- Token Info ----------
  const token = {
    name: "Nova Coin",
    symbol: "NVC",
    totalSupply: 1000000000, // 1B tokens
    taxBuy: 2,
    taxSell: 3,
  };

  // ---------- Distribution ----------
  const distribution = [
    { label: "Team", value: 200000000, color: "#6366F1" },       // 20%
    { label: "Liquidity", value: 300000000, color: "#EC4899" },  // 30%
    { label: "Marketing", value: 100000000, color: "#FBBF24" },  // 10%
    { label: "Presale", value: 400000000, color: "#22D3EE" },    // 40%
  ];

  // ---------- helpers ----------
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const total = token.totalSupply;

  // compute arcs for donut chart
  const arcs = useMemo(() => {
    let cumulative = 0;
    return distribution.map((d) => {
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
  }, [distribution, total]);

  return (
    <section
      id="tokenomics"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 
      bg-gradient-to-b from-white via-indigo-50/50 to-pink-50/50 overflow-hidden"
    >
      {/* Floating continuation orbs (same vibe as Hero) */}
      <motion.div
        animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
        transition={{ repeat: Infinity, duration: 35, ease: 'easeInOut' }}
        className="absolute w-80 h-80 bg-indigo-400/15 rounded-full -top-20 -left-20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -15, 15, 0], y: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 40, ease: 'easeInOut' }}
        className="absolute w-96 h-96 bg-pink-400/15 rounded-full bottom-0 right-0 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 10, -10, 0], y: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 50, ease: 'easeInOut' }}
        className="absolute w-72 h-72 bg-cyan-400/10 rounded-full top-1/3 left-1/2 -translate-x-1/2 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-pink-600">
          Tokenomics
        </h2>

        {/* Token Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-10">
          <div className="p-4 bg-white/30 backdrop-blur rounded-xl border border-white/40">
            <p className="text-gray-700 text-sm">Name</p>
            <p className="font-bold">{token.name}</p>
          </div>
          <div className="p-4 bg-white/30 backdrop-blur rounded-xl border border-white/40">
            <p className="text-gray-700 text-sm">Symbol</p>
            <p className="font-bold">{token.symbol}</p>
          </div>
          <div className="p-4 bg-white/30 backdrop-blur rounded-xl border border-white/40">
            <p className="text-gray-700 text-sm">Total Supply</p>
            <p className="font-bold">
              <AnimatedNumber value={token.totalSupply} />
            </p>
          </div>
          <div className="p-4 bg-white/30 backdrop-blur rounded-xl border border-white/40">
            <p className="text-gray-700 text-sm">Taxes</p>
            <p className="font-bold">
              Buy <AnimatedNumber value={token.taxBuy} suffix="%" /> / 
              Sell <AnimatedNumber value={token.taxSell} suffix="%" />
            </p>
          </div>
        </div>

        {/* Distribution & Pie */}
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
                  className={`transition-all duration-300 ${
                    hoveredIndex === i
                      ? 'scale-105 filter drop-shadow-[0_0_12px]'
                      : ''
                  }`}
                />
              ))}
              <circle cx="0" cy="0" r="0.5" fill="white" />
            </svg>

            {/* Tooltip */}
            {hoveredIndex !== null && (
              <div className="absolute -translate-x-1/2 -translate-y-full left-1/2 top-1/2 
              bg-white/80 backdrop-blur-lg text-gray-900 text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none">
                {distribution[hoveredIndex].label}:{" "}
                <AnimatedNumber value={distribution[hoveredIndex].value} /> (
                <AnimatedNumber
                  value={(distribution[hoveredIndex].value / total) * 100}
                  suffix="%"
                />)
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {distribution.map((d, i) => (
              <div
                key={d.label}
                className="flex items-center justify-between cursor-pointer p-2 rounded-xl 
                bg-white/20 backdrop-blur border border-white/30 hover:scale-105 transition-transform duration-200"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: d.color }}></span>
                  <span className="text-sm font-medium text-gray-800">{d.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  <AnimatedNumber value={(d.value / total) * 100} suffix="%" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
