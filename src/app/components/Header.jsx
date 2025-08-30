'use client'

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Tokenomics", href: "/#tokenomics" },
  { label: "Why NOVA", href: "/#why" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const pathname = usePathname?.() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Shadow on scroll for sticky navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on ESC and trap focus when open (basic)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (open && e.key === "Tab") {
        const focusable = drawerRef.current?.querySelectorAll("a, button");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (document.activeElement === last && !e.shiftKey) {
          e.preventDefault();
          first.focus();
        } else if (document.activeElement === first && e.shiftKey) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-focus first link when opening
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => firstLinkRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // simplified: only compares pathname
  const isActive = (href) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold">NT</span>
              <span className="hidden sm:inline-block font-semibold text-lg tracking-wide">
                Novetoken
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-2 py-1 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  isActive(item.href)
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 rounded-full transition-all duration-200 ${
                    isActive(item.href) ? "w-full bg-indigo-500" : "w-0 bg-indigo-400"
                  }`}
                  aria-hidden
                />
              </Link>
            ))}
          </nav>

          {/* right controls */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex">
              <button
                type="button"
                aria-label="Toggle theme"
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  const root = document.documentElement;
                  root.classList.toggle("dark");
                }}
                title="Toggle theme"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-10.66l-.7.7M4.34 13.66l-.7.7M21 12h-1M4 12H3m15.66 4.66l-.7-.7M6.34 6.34l-.7-.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            id="mobile-menu"
            ref={drawerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <motion.button
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="absolute right-0 top-0 h-full w-full max-w-xs bg-white dark:bg-gray-900 shadow-xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold">NT</span>
                  <span className="font-semibold">Novetoken</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 flex flex-col gap-3" aria-label="Mobile primary">
                {NAV.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={i === 0 ? firstLinkRef : undefined}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                      isActive(item.href)
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6">
                <a
                  href="#"
                  className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Connect Wallet
                </a>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
