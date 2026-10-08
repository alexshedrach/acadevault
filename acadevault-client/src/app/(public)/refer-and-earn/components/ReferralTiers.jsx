"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { FaMedal, FaCrown, FaStar, FaGem } from "react-icons/fa";

// Tier data with extended benefits
const tiers = [
  {
    level: "Bronze",
    icon: <FaMedal className="text-bronze-500 text-4xl" />,
    target: "1-10 Referrals",
    commission: "5% Commission",
    perks: [
      "Access to basic referral dashboard",
      "Standard support",
      "Monthly payout eligibility",
    ],
    gradient: "from-bronze-500/20 to-yellow-600/20",
    progress: 10,
  },
  {
    level: "Silver",
    icon: <FaStar className="text-silver-400 text-4xl" />,
    target: "11-50 Referrals",
    commission: "7% Commission",
    perks: [
      "Advanced dashboard analytics",
      "Priority email support",
      "Bi-weekly payouts",
    ],
    gradient: "from-silver-400/20 to-gray-500/20",
    progress: 50,
  },
  {
    level: "Gold",
    icon: <FaCrown className="text-gold-400 text-4xl" />,
    target: "51-200 Referrals",
    commission: "10% Commission",
    perks: [
      "Exclusive course discounts",
      "Dedicated account manager",
      "Weekly payouts",
    ],
    gradient: "from-gold-400/20 to-yellow-500/20",
    progress: 200,
  },
  {
    level: "Platinum",
    icon: <FaGem className="text-indigo-400 text-4xl" />,
    target: "200+ Referrals",
    commission: "15% Commission + Premium Perks",
    perks: [
      "Free premium course subscriptions",
      "VIP support with 24/7 chat",
      "Instant payouts",
      "Custom referral campaigns",
    ],
    gradient: "from-indigo-500/20 to-purple-500/20",
    progress: 300,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" },
};

export default function ReferralTiers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Memoize tiers data to prevent re-renders
  const memoizedTiers = useMemo(() => tiers, []);

  // Mock user referrals (in production, fetch from API or context)
  const userReferrals = 45; // Example: user has 45 referrals

  return (
    <section
      className="relative py-10 text-white"
      aria-label="Referral Tiers Program"
      ref={ref}
    >
      <motion.div
        className="text-center pt-6 pb-10 bg-white/5 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-400">
          Climb the Referral Tiers
        </h3>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto mt-4">
          Unlock higher commissions and exclusive academic perks as you refer
          more creators and learners to Acadevault.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {memoizedTiers.map((tier, idx) => {
          const isActive =
            userReferrals >= (idx === 0 ? 1 : memoizedTiers[idx - 1].progress);
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className={`relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl group overflow-hidden ${
                isActive ? "ring-2 ring-yellow-400" : ""
              }`}
              role="region"
              aria-label={`${tier.level} Tier`}
              tabIndex={0}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon with Badge Effect */}
                <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tier.icon}
                </div>

                {/* Tier Level */}
                <h4 className="text-xl font-bold text-yellow-300 mb-2">
                  {tier.level}
                </h4>

                {/* Target and Commission */}
                <p className="text-sm text-blue-100 mb-2">{tier.target}</p>
                <p className="text-lg font-semibold text-white">
                  {tier.commission}
                </p>

                {/* Perks List */}
                <ul className="mt-4 text-sm text-blue-200 space-y-2">
                  {tier.perks.map((perk, perkIdx) => (
                    <li
                      key={perkIdx}
                      className="flex items-center gap-2 justify-center"
                    >
                      <FaStar className="text-yellow-400 text-xs" />
                      {perk}
                    </li>
                  ))}
                </ul>

                {/* Progress Indicator */}
                <div className="w-full mt-6">
                  <div className="bg-white/10 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${
                          userReferrals <= tier.progress
                            ? (userReferrals / tier.progress) * 100
                            : 100
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-blue-200 mt-2">
                    {isActive
                      ? "Achieved!"
                      : `Refer ${tier.progress - userReferrals} more`}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
