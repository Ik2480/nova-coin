"use client";

import { useState } from "react";

export default function PresaleWidget() {
  const [amount, setAmount] = useState("");

  return (
    <div className="w-full max-w-sm rounded-2xl bg-gray-900/70 backdrop-blur-md p-6 shadow-xl border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">🚀 Join Presale</h3>

      {/* Input field */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Amount (ETH/USDT)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
        />
      </div>

      {/* Buy Button */}
      <button
        onClick={() => alert(`Buying ${amount || 0} tokens...`)}
        className="w-full rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] py-3 font-bold text-black hover:opacity-90 transition"
      >
        Buy Tokens
      </button>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progress</span>
          <span>65%</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]"
            style={{ width: "65%" }}
          />
        </div>
      </div>

      {/* Presale Info */}
      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <p>Price: <span className="text-white font-semibold">1 ETH = 5000 NOVA</span></p>
        <p>Soft Cap: <span className="text-white font-semibold">200 ETH</span></p>
        <p>Hard Cap: <span className="text-white font-semibold">500 ETH</span></p>
      </div>
    </div>
  );
}
