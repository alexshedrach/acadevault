"use client";

import React from "react";
import ReferralHeader from "./ReferralHeader";
import ReferralHero from "./ReferralHero";
import ReferralFeatures from "./ReferralFeatures";

/**
 * Root container for the entire Referral Section.
 * Assembles Header, Hero, and Features subsections.
 */
export default function ReferralSection() {
  return (
    <section className="pb-2 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 text-white relative">
      {/* Top header with glow */}
      <ReferralHeader />

      <div className="container mx-auto px-6">
        {/* Hero area: image on one side, text/CTA on the other */}
        <ReferralHero />

        {/* Three key referral features */}
        <ReferralFeatures />
      </div>
    </section>
  );
}
