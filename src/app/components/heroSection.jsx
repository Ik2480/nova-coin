'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const randomPosition = (max) => Math.random() * max;

export default function PresaleHero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [tokenAmount, setTokenAmount] = useState('');
  const [coin, setCoin] = useState('ETH');

  const leftControls = useAnimation();
  const rightControls = useAnimation();

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const interval = setInterval(() => {
      const now = new Date();
      const t = targetDate - now;
      if (t <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(t / (1000 * 60 * 60 * 24)),
          hours: Math.floor((t / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((t / (1000 * 60)) % 60),
          seconds: Math.floor((t / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sparks
  const sparks = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: randomPosition(100),
    y: randomPosition(100),
    delay: Math.random() * 2,
  }));

  // Adjust section positions based on zoom
  useEffect(() => {
    const handleZoom = () => {
      const scale = window.devicePixelRatio;
      const offset = scale < 1 ? (1 - scale) * 80 : 0;
      leftControls.start({ x: offset, transition: { type: 'spring', stiffness: 50, damping: 12 } });
      rightControls.start({ x: -offset, transition: { type: 'spring', stiffness: 50, damping: 12 } });
    };
    handleZoom();
    window.addEventListener('resize', handleZoom);
    return () => window.removeEventListener('resize', handleZoom);
  }, [leftControls, rightControls]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Neon Grid */}
      <motion.div
        className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none"
        animate={{ x: [0, 5, -5, 0], y: [0, 5, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="border-r" style={{ borderColor: '#00FFFF', opacity: 0.2, height: '100%' }} />
            <div className="border-b" style={{ borderColor: '#FF00FF', opacity: 0.2, width: '100%' }} />
          </React.Fragment>
        ))}
      </motion.div>

      {/* Pulsing Circles with Hero inside */}
      <motion.div
        className="absolute inset-y-0 left-1/4 flex justify-center items-center"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-72 h-72 rounded-full border-4 opacity-40" style={{ borderColor: '#FF00FF' }} />
        <div className="absolute w-[26rem] h-[26rem] rounded-full border-2 opacity-25" style={{ borderColor: '#00FFFF' }} />

        {/* Hero Image in center of circles */}
        <motion.img
          src="/superhero.webp"
          alt="Superhero"
          className="absolute w-56 rounded-xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Sparks */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ top: `${spark.y}%`, left: `${spark.x}%`, backgroundColor: '#00FFFF', boxShadow: '0 0 10px #00FFFF' }}
          animate={{ opacity: [0, 1, 0], x: [0, 2, -2, 0], y: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: spark.delay }}
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between h-full px-6 lg:px-20 mt-6 text-white overflow-hidden">
        {/* Left Section with Stats Below */}
        <motion.div animate={leftControls} className="lg:w-1/2 text-left flex flex-col gap-6">
          <div>
            <h1
              className="text-5xl sm:text-7xl font-extrabold bg-clip-text text-transparent animate-text-gradient"
              style={{ backgroundImage: 'linear-gradient(to right, #00FF7F, #00FFFF, #FF00FF)' }}
            >
              Superhero Presale
            </h1>
            <p className="mt-2 text-lg sm:text-2xl text-gray-300 max-w-lg">
              Join the most futuristic crypto adventure. Be part of the mission and secure your tokens now!
            </p>
          </div>

          {/* Stat Boxes moved here */}
          <div className="flex flex-col sm:flex-row gap-3 mt-20 w-">
            {[{ text: 'Max Supply: 1M', color: '#00FFFF' },
              { text: 'Presale: 50%', color: '#FF00FF' },
              { text: 'Soft Cap: 10K ETH', color: '#193636ff' }].map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex-1 p-6 bg-black/50 rounded-xl shadow-xl text-center min-w-[120px] border"
                style={{ borderColor: stat.color }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${stat.color}` }}
              >
                {stat.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Section (Widget) */}
        <motion.div animate={rightControls} className="lg:w-1/2 flex flex-col items-center lg:items-end gap-6">
          {/* Presale Widget with animated glowing border */}
          <motion.div
            className="w-full max-w-xs p-6 sm:p-10 bg-black/50 rounded-2xl backdrop-blur-md shadow-lg relative overflow-hidden mt-8"
            animate={{ boxShadow: ['0 0 0px #00FF7F', '0 0 20px #00FF7F', '0 0 0px #00FF7F'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ border: '2px solid #00FF7F' }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Presale Countdown</h2>

            <div className="flex justify-around text-lg mb-4">
              {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-bold text-xl">{Object.values(timeLeft)[idx]}</div>
                  <div>{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <input
                type="number"
                placeholder="Enter token amount"
                className="w-full p-3 rounded-xl bg-black/70 border border-[#00FF7F] focus:outline-none focus:ring-2"
                style={{ color: '#00FF7F' }}
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
              />
              <select
                className="w-full p-3 rounded-xl bg-black/70 border border-[#00FF7F] focus:outline-none focus:ring-2"
                style={{ color: '#00FF7F' }}
                value={coin}
                onChange={(e) => setCoin(e.target.value)}
              >
                <option value="ETH">ETH</option>
                <option value="USDT">USDT</option>
                <option value="BTC">BTC</option>
              </select>
            </div>

            <div className="h-4 bg-gray-800 rounded-full overflow-hidden mb-4">
              <div className="h-4" style={{ backgroundColor: '#00FF7F', width: '50%', animation: 'pulse 2s infinite' }}></div>
            </div>

            <button
              className="w-full py-3 mt-1 text-lg font-bold text-black rounded-xl transition"
              style={{ backgroundColor: '#00FF7F' }}
            >
              Buy Tokens
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
