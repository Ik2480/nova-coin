// components/sections/TokenomicsSection.jsx
'use client';

import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import SectionWrapper from './SectionWrapper';

const allocationData = [
  { name: 'Presale', value: 30, color: '#00FFFF' },
  { name: 'Liquidity', value: 20, color: '#FF00FF' },
  { name: 'Marketing', value: 15, color: '#FF8C00' },
  { name: 'Team & Advisors', value: 15, color: '#8A2BE2' },
  { name: 'Ecosystem & Development', value: 20, color: '#00FA9A' },
];

const totalTokens = 100_000_000_000; // 100B tokens

export default function TokenomicsSection() {
  return (
    <SectionWrapper id="tokenomics" variant="dark">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-orbitron leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] to-[#00FFFF]">
          Tokenomics
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          A fair and transparent distribution model that ensures long-term sustainability and growth.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center relative"
        >
          <div className="w-full max-w-lg aspect-square">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-gray-400 text-sm">Total Supply</span>
              <span className="text-white text-3xl md:text-4xl font-bold mt-1">
                {totalTokens.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Allocation List */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col space-y-8"
        >
          <ul className="space-y-4">
            {allocationData.map((item, index) => (
              <li key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-900 border border-gray-800">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <span className="text-lg font-semibold text-gray-200">{item.name}</span>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-white text-lg font-bold">{item.value}%</span>
                  <p className="text-gray-400 text-sm">
                    {(totalTokens * (item.value / 100)).toLocaleString()} Tokens
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Key Metrics */}
          <div className="mt-8 border-t border-gray-800 pt-8">
            <h3 className="text-xl font-bold font-inter mb-4 text-gray-200">Key Metrics</h3>
            <div className="space-y-2 text-gray-400">
              <p>
                <span className="font-semibold text-gray-300">Token Symbol:</span> $GLITCH
              </p>
              <p>
                <span className="font-semibold text-gray-300">Blockchain:</span> Ethereum (ERC-20)
              </p>
              <p>
                <span className="font-semibold text-gray-300">Contract:</span> 0x123...abc
                <span className="ml-2 text-blue-400 cursor-pointer">(Click to copy)</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
