'use client';

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

const randomPosition = (max) => Math.random() * max;

export default function PresaleHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [tokenAmount, setTokenAmount] = useState('');
  const [coin, setCoin] = useState('ETH');
  const widgetRef = useRef(null);
  const imageRef = useRef(null);

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

  const sparks = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: randomPosition(100),
    y: randomPosition(100),
    delay: Math.random() * 2,
  }));

  // Reduce image height (but keep width and other styles intact)
  useLayoutEffect(() => {
    const adjustImageHeight = () => {
      if (widgetRef.current && imageRef.current) {
        const widgetHeight = widgetRef.current.offsetHeight;
        // Reduce image height slightly to 90% of widget
        imageRef.current.style.height = `${widgetHeight * 0.9}px`;
      }
    };
    adjustImageHeight();
    window.addEventListener('resize', adjustImageHeight);
    return () => window.removeEventListener('resize', adjustImageHeight);
  }, []);

  const stats = [
    { text: 'Max Supply: 1M', color: '#00FFFF' },
    { text: 'Presale: 50%', color: '#FF00FF' },
    { text: 'Soft Cap: 10K ETH', color: '#193636ff' },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col justify-center items-center py-10 lg:py-20">
      {/* Neon Grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: [0, 5, -5, 0], y: [0, 5, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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

      {/* Hero Content */}
      <div className="relative z-6 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center flex-1 px-4 sm:px-8 lg:px-12 py-2 gap-8 text-white">
        {/* Left Section - Heading + Image */}
        <div className="flex-[3] min-w-[300px] flex flex-col items-end gap-6 self-start max-w-[36rem]">
          {/* Heading */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-end w-full -mt-1"
          >
            <div className="inline-block text-right w-full">
              <h1
                className="text-2xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent relative"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #00FF7F, #00FFFF, #FF00FF)',
                  WebkitTextStroke: '1px #ffffff33',
                  textShadow: '0 4px 20px rgba(0,255,127,0.5)',
                }}
              >
                Superhero Presale
              </h1>
              <p className="mt-2 text-base sm:text-lg lg:text-xl text-gray-300 max-w-md ml-auto">
                Join the most futuristic crypto adventure.
              </p>
            </div>
          </motion.div>

          {/* Image reduced height */}
          <motion.div
            className="flex justify-end items-start mb-4 relative w-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.img
              ref={imageRef}
              src="/superhero.webp"
              alt="Superhero"
              className="w-72 sm:w-80 md:w-96 lg:w-[30rem] xl:w-[34rem] 2xl:w-[36rem] rounded-4xl self-end"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Right Section - Widget with stats inside */}
        <div className="flex-[1.3] min-w-[350px] max-w-md flex flex-col items-center lg:items-end gap-6 self-start">
          <motion.div
            ref={widgetRef}
            className="w-full p-6 bg-black/50 rounded-2xl backdrop-blur-md shadow-lg relative overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 0px #00FF7F',
                '0 0 20px #00FF7F',
                '0 0 0px #00FF7F',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ border: '2px solid #00FF7F' }}
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Presale Countdown
            </h2>

            <div className="flex justify-around text-sm mb-4">
              {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-bold text-xl">
                    {Object.values(timeLeft)[idx]}
                  </div>
                  <div>{label}</div>
                </div>
              ))}
            </div>

            {/* Stat Boxes */}
            <div className="flex flex-wrap justify-center lg:justify-between gap-3 w-full mb-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="flex-1 p-3 text-xs bg-black/50 rounded-xl shadow-xl text-center border min-w-[90px]"
                  style={{ borderColor: stat.color }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 20px ${stat.color}`,
                  }}
                >
                  {stat.text}
                </motion.div>
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
              <div className="h-4 w-1/2 bg-[#00FF7F] animate-pulse"></div>
            </div>

            <button
              className="w-full py-3 text-lg font-bold text-black rounded-xl transition mb-4"
              style={{ backgroundColor: '#00FF7F' }}
            >
              Buy Tokens
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
