// components/layout/Header.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";

const navLinks = [
  { name: "Roadmap", href: "#roadmap" },
  { name: "Tokenomics", href: "#tokenomics" },
  { name: "FAQ", href: "#faq" },
  { name: "Whitepaper", href: "/whitepaper.pdf" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${scrolled ? "bg-gray-950/90 backdrop-blur-md border-b border-gray-800 py-3" : "bg-gray-950/70 backdrop-blur-sm py-4 md:py-6"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <span className="text-xl md:text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]">
            GLITCH
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <ConnectWalletButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-gray-400 focus:outline-none"
          >
            {isMenuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed inset-0 bg-gray-950/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={link.href}
                  className="text-3xl font-bold text-gray-200 hover:text-white transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Wallet button */}
            <motion.div
              custom={navLinks.length}
              variants={navLinkVariants}
              initial="hidden"
              animate="visible"
            >
              <ConnectWalletButton large />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------
   Reusable Connect Wallet Btn
---------------------------- */
function ConnectWalletButton({ large = false }) {
  return (
    <button
      className={`rounded-full font-bold shadow-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black transition-transform duration-300 hover:scale-105
        ${large ? "px-8 py-4 text-lg" : "px-5 py-2 text-sm"}`}
    >
      Connect Wallet
    </button>
  );
}
