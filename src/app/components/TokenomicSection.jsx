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

const randomPosition = (max) => Math.random() * max;

export default function TokenomicSection() {
  const token = {
    name: "Nova Coin",
    symbol: "NVC",
    totalSupply: 1000000000,
    taxBuy: 2,
    taxSell: 3,
  };

  const distribution = [
    { label: "Team", value: 200000000, color: "#6366F1" },
    { label: "Liquidity", value: 300000000, color: "#EC4899" },
    { label: "Marketing", value: 100000000, color: "#FBBF24" },
    { label: "Presale", value: 400000000, color: "#22D3EE" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const total = token.totalSupply;

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

  // Sparks like Hero
  const sparks = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: randomPosition(100),
    y: randomPosition(100),
    delay: Math.random() * 2,
  }));

  return (
    <section
      id="tokenomics"
      className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden"
    >
      {/* Neon Grid Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: [0, 5, -5, 0], y: [0, 5, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <React.Fragment key={i}>
            <div
              className="absolute inset-y-0 border-r border-cyan-400/20"
              style={{ left: `${(i / 20) * 100}%` }}
            />
            <div
              className="absolute inset-x-0 border-b border-fuchsia-400/20"
              style={{ top: `${(i / 20) * 100}%` }}
            />
          </React.Fragment>
        ))}
      </motion.div>

      {/* Sparks */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            top: `${spark.y}%`,
            left: `${spark.x}%`,
            backgroundColor: '#00FFFF',
            boxShadow: '0 0 10px #00FFFF',
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: spark.delay }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-fuchsia-500">
          Tokenomics
        </h2>

        {/* Main Flex Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          
          {/* Left – Donut Chart */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-52 h-52 md:w-64 md:h-64">
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
                <circle cx="0" cy="0" r="0.5" fill="black" />
              </svg>

              {/* Tooltip */}
              {hoveredIndex !== null && (
                <div className="absolute -translate-x-1/2 -translate-y-full left-1/2 top-1/2 
                bg-black/80 backdrop-blur-lg text-white text-xs px-2 py-1 rounded-lg shadow-lg pointer-events-none">
                  {distribution[hoveredIndex].label}:{" "}
                  <AnimatedNumber value={distribution[hoveredIndex].value} /> (
                  <AnimatedNumber
                    value={(distribution[hoveredIndex].value / total) * 100}
                    suffix="%"
                  />)
                </div>
              )}
            </div>
          </div>

          {/* Right – Token Info (Boxed with glowing underline) */}
          <div className="flex-1 flex flex-col gap-4 w-full max-w-sm justify-center">
            {[
              { label: "Name", value: token.name },
              { label: "Symbol", value: token.symbol },
              { label: "Total Supply", value: <AnimatedNumber value={token.totalSupply} /> },
              { label: "Taxes", value: <>Buy <AnimatedNumber value={token.taxBuy} suffix="%" /> / Sell <AnimatedNumber value={token.taxSell} suffix="%" /></> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative flex justify-between items-center p-3 bg-black/30 rounded-xl border border-gray-700 group"
              >
                <span className="text-gray-300 text-sm font-normal">{item.label}:</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-fuchsia-500 
                  font-extrabold text-lg relative">
                  {item.value}
                  {/* Glowing underline */}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-pink-400 to-fuchsia-500 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm rounded"></span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
