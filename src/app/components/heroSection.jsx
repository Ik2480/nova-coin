"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero({
  presaleStart = new Date(Date.now() + 1000 * 60 * 60 * 24),
  initialRaised = 12500,
  goal = 50000,
}) {
  return (
    <section className="relative w-full py-16 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Background circles */}
      <motion.div
        animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        className="absolute w-48 h-48 bg-indigo-500/20 rounded-full top-10 left-10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -15, 15, 0], y: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        className="absolute w-64 h-64 bg-pink-500/20 rounded-full bottom-20 right-0 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 35, ease: "easeInOut" }}
        className="absolute w-36 h-36 bg-indigo-400/20 rounded-full top-1/2 left-1/3 blur-3xl pointer-events-none"
      />

      {/* New container for content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Left: Branding & copy */}
          <div className="md:col-span-7 order-2 md:order-1 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xl font-medium w-max shadow">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-black font-bold">
                  NT
                </span>
                <span>Presale live soon</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-pink-600"
              >
                NovaToken — Fueling the next-gen web3 economy
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.6 }}
                className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed"
              >
                Join the presale to secure discounted tiers, earn early-backer bonuses, and unlock community governance. Fast, fair, and designed for long-term growth.
              </motion.p>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-tr from-white/20 to-white/10 backdrop-blur border border-white/20 shadow-md">
                <h4 className="text-sm font-semibold text-gray-700">Mini Roadmap</h4>
                <ol className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Presale & token distribution</li>
                  <li>• Launch on DEX + CEX applications</li>
                  <li>• LP farming & staking v1</li>
                </ol>
              </div>
            </motion.div>
          </div>

          {/* Right: Widget + stat boxes */}
          <div className="md:col-span-5 order-1 md:order-2 flex flex-col items-center w-full">
            {/* Presale Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full max-w-md mx-auto"
            >
              <PresaleWidget startDate={presaleStart} initialRaised={initialRaised} goal={goal} />
            </motion.div>

            {/* Stat Boxes below the widget */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-6 w-full">
              {[
                { label: "Soft Cap", value: `$${(goal * 0.5).toLocaleString()}` },
                { label: "Max Supply", value: "1,000,000 NT" },
                { label: "Initial Price", value: "$0.02" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex-1 min-w-[150px] max-w-full"
                >
                  <StatCard label={stat.label} value={stat.value} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-white/10 border border-white/20 hover:scale-105 transition-transform duration-300 shadow-lg">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold mt-1 text-gray-800">{value}</div>
    </div>
  );
}

/* ---------------------- PresaleWidget & helpers ---------------------- */
function PresaleWidget({ startDate, initialRaised = 0, goal = 50000 }) {
  const TIERS = useMemo(
    () => [
      { name: "Early Bird", price: 0.01, cap: 10000 },
      { name: "Tier 1", price: 0.015, cap: 15000 },
      { name: "Tier 2", price: 0.02, cap: 25000 },
    ],
    []
  );

  const [raised, setRaised] = useState(initialRaised);
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(startDate));
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let raf = null;
    const target = initialRaised;
    let current = Math.max(0, initialRaised - Math.floor(Math.random() * 300));
    const start = performance.now();
    const duration = 1200;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const value = Math.floor(current + (target - current) * p);
      setRaised(value);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [initialRaised]);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(startDate)), 1000);
    return () => clearInterval(id);
  }, [startDate]);

  const percent = Math.min(100, Math.floor((raised / goal) * 100));

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-tr from-indigo-100/70 via-pink-50/50 to-white/20 backdrop-blur border border-white/20 shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-gray-500">Presale</div>
          <div className="text-2xl font-bold tracking-tight text-gray-800">${raised.toLocaleString()}</div>
          <div className="text-sm text-gray-600">raised of ${goal.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Starts in</div>
          <div className="font-mono font-semibold text-gray-800">{formatTimeLeft(timeLeft)}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.9 }}
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-pink-400 to-pink-500 shadow-md"
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <div>{percent}%</div>
          <div>${raised.toLocaleString()} / ${goal.toLocaleString()}</div>
        </div>
      </div>

      {/* Tiers */}
      <div className="mt-4 space-y-3">
        {TIERS.map((t) => (
          <div key={t.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
            <div className="text-sm">
              <div className="font-medium text-gray-700">{t.name}</div>
              <div className="text-xs text-gray-500">${t.price.toFixed(3)} per NT</div>
            </div>
            <div className="text-sm font-semibold text-gray-800">{t.cap.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        {/* Replaced alert() with a console log to avoid disrupting the UI. */}
        <button
          onClick={() => console.log("Connect Wallet button clicked - This would connect to a wallet.")}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/20 text-sm font-semibold hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Connect Wallet
        </button>
        <button
          onClick={() => setOpenModal(true)}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm font-semibold hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
        >
          Buy Tokens
        </button>
      </div>

      {/* Modal & Error toast remain unchanged */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpenModal(false)} />
            <div className="relative z-10 w-full max-w-md p-6 rounded-2xl bg-white dark:bg-gray-900">
              <h3 className="text-lg font-semibold">Buy Tokens (placeholder)</h3>
              <p className="mt-2 text-sm text-gray-600">
                This modal is a placeholder — wire your buy flow here.
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setOpenModal(false)} className="px-3 py-2 rounded-md text-sm">Cancel</button>
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setError("Simulated error: insufficient funds");
                  }}
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm"
                >
                  Simulate Buy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 p-3 rounded-md bg-red-600 text-white text-sm"
          >
            <div className="flex items-center justify-between">
              <div>{error}</div>
              <button onClick={() => setError(null)} className="text-sm font-semibold">Dismiss</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------- Helpers ---------------------- */
function calcTimeLeft(target) {
  const now = Date.now();
  const t = new Date(target).getTime() - now;
  if (t <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((t / (1000 * 60)) % 60);
  const seconds = Math.floor((t / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function formatTimeLeft(t) {
  if (!t) return "--:--:--";
  if (t.days > 0) return `${t.days}d ${String(t.hours).padStart(2, "0")}h`;
  return `${String(t.hours).padStart(2, "0")}:${String(t.minutes).padStart(2, "0")}:${String(t.seconds).padStart(2, "0")}`;
}
