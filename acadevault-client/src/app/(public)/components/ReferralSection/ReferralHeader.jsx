"use client";

import React from "react";

/**
 * Displays the header with a glowing background, main title, and subtitle.
 * Uses utility classes for styling and a subtle pulse animation.
 */
export default function ReferralHeader() {
  return (
    <div className="bg-blue-700 text-white text-center py-6 rounded-md shadow-lg relative overflow-hidden">
      {/* Main title with emphasis on “AcadeVault Referral Program” */}
      <h2 className="text-3xl md:text-4xl font-bold tracking-wide animate-pulse">
        🚀 Unlock Unlimited Earnings with{" "}
        <span className="text-orange-300">AcadeVault Referral Program 🔥</span>
      </h2>

      {/* Subtitle highlighting the commission potential */}
      <p className="text-lg font-semibold mt-2">
        <span className="text-red-400 font-bold">Earn up to 30% Bonus</span>{" "}
        when you refer a Seller or Buyer!
      </p>

      {/* Semi-transparent animated glow overlay */}
      <div className="absolute inset-0 bg-glow animate-pulse opacity-30" />
    </div>
  );
}
