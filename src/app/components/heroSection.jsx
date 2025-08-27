// components/HeroSection.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import Countdown from './Countdown'; // adjust if your Countdown sits elsewhere

export default function HeroSection() {
  return (
    <SectionWrapper
  id="hero"
  variant="default"
  className="relative min-h-[85vh] flex items-center overflow-hidden !py-2"
>
      {/* background artwork */}
      <div
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/digital-rain.svg')" }}
      />

      {/* dark gradient overlay for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]">
            Join the Novetoken Presale 🚀
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
            Be part of the future of decentralized finance. Secure your tokens early and unlock exclusive benefits.
          </p>

          {/* Countdown */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <Countdown endDate="2025-09-15T23:59:59" />
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              href="#presale"
              className="px-6 py-3 rounded-2xl text-lg font-semibold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-black shadow-lg hover:scale-105 transition-transform"
            >
              Buy Now
            </Link>
            <Link
              href="#whitepaper"
              className="px-6 py-3 rounded-2xl text-lg font-semibold border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition"
            >
              Read Whitepaper
            </Link>
          </div>
        </motion.div>

        {/* Right Graphic */}
        <motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  className="flex justify-center lg:justify-end px-4 mt-12"
>
  <Image
    src="/nova.webp"
    alt="Novetoken"
    width={480}
    height={480}
    className="w-80 md:w-[480px] drop-shadow-[0_0_40px_rgba(0,255,255,0.3)]"
  />
</motion.div>

      </div>

      {/* subtle top glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 pointer-events-none" />
    </SectionWrapper>
  );
}
