'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // This is a basic example. You would calculate the time until the presale ends.
    const interval = setInterval(() => {
      // Logic to calculate time left
      const now = new Date();
      const presaleEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
      const difference = presaleEndDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center md:justify-start items-center space-x-4 font-mono text-center">
      <div className="bg-gray-800 p-4 rounded-lg">
        <span className="block text-2xl md:text-4xl font-bold text-white">{timeLeft.days}</span>
        <span className="block text-xs md:text-sm text-gray-400 mt-1">Days</span>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <span className="block text-2xl md:text-4xl font-bold text-white">{timeLeft.hours}</span>
        <span className="block text-xs md:text-sm text-gray-400 mt-1">Hours</span>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <span className="block text-2xl md:text-4xl font-bold text-white">{timeLeft.minutes}</span>
        <span className="block text-xs md:text-sm text-gray-400 mt-1">Minutes</span>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <span className="block text-2xl md:text-4xl font-bold text-white">{timeLeft.seconds}</span>
        <span className="block text-xs md:text-sm text-gray-400 mt-1">Seconds</span>
      </div>
    </div>
  );
}