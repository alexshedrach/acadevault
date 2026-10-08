"use client";

import React from "react";
import ReferralFeatureItem from "./ReferralFeatureItem";

/**
 * Container for the grid of three referral features.
 * Each feature is a reusable <ReferralFeatureItem />.
 */
export default function ReferralFeatures() {
  const features = [
    {
      id: "high-commission",
      title: "🎯 High Commission Rates",
      description: "Earn a 30% bonus for every successful referral. No limits!",
    },
    {
      id: "live-stats",
      title: "📊 Live Referral Stats",
      description: "Track your clicks, signups, and earnings in real-time.",
    },
    {
      id: "milestone-rewards",
      title: "🏆 Milestone Rewards",
      description: "Reach referral milestones and unlock exclusive bonuses!",
    },
  ];

  return (
    <div className="grid gap-6 mt-12 md:grid-cols-3">
      {features.map((feat) => (
        <ReferralFeatureItem
          key={feat.id}
          title={feat.title}
          description={feat.description}
        />
      ))}
    </div>
  );
}
