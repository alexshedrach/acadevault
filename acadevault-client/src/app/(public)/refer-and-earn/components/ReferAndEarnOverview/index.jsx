"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import ReferralLeaderboard from "./LeaderboardSnippet";
import {
  buyerReferralSteps,
  sellerReferralSteps,
} from "@/data/referralStepsData";
import { referralBenefitsData } from "@/data/referralBenefitsData";
import ReferralBenefitCard from "./ReferralBenefitCard";
import ReferralSteps from "./ReferralSteps";
import ReferralCTA from "./ReferralCTA";
import ReferralTiers from "../ReferralTiers";
import ReferralSocialProof from "./ReferralSocialProof";

// Dynamic import for performance optimization
const CountdownTimer = dynamic(() => import("../CountdownTimer"), {
  ssr: false,
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export default function ReferAndEarnOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Memoize benefits and steps to prevent unnecessary re-renders
  const memoizedBenefits = useMemo(() => referralBenefitsData, []);
  const memoizedSellerSteps = useMemo(() => sellerReferralSteps, []);
  const memoizedBuyerSteps = useMemo(() => buyerReferralSteps, []);

  return (
    <section
      className="border-t-20 border-t-white relative bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-700 text-white py-16 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Refer and Earn Program"
      ref={ref}
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-5 mix-blend-soft-light pointer-events-none" />

      {/* Particle Effect */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-float absolute -top-20 -left-20" />
        <div className="w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-15 animate-float-slow absolute top-40 right-10" />
      </div> */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-25 animate-pulse pointer-events-none" />

      {/* Hero Section */}
      <motion.div
        className="text-center border-b-4 border-yellow-500 inline-block mb-10 pb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
          Refer & Thrive with <span className="text-white">Acadevault</span>
        </h2>
      </motion.div>

      {/* Headline */}
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-md py-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Invite Sellers & Buyers — Earn up to{" "}
          <span className="text-yellow-300">30% Commission</span>
        </h2>

        {/* Subtext */}
        <p className="text-blue-100 text-lg leading-relaxed">
          Empower the academic community by inviting creators and learners to
          Acadevault. Earn substantial rewards for every successful referral.
          AcadeVault’s Referral Program is designed to reward users for every
          successful seller or buyer they bring on board. Whether you're
          referring top academic writers or eager learners looking for premium
          content, you’ll earn passive income from every transaction they
          complete.
        </p>
      </div>

      {/* Seasonal Promotion Countdown */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <p className="text-yellow-400 font-semibold mb-4">
          Limited-Time Offer: 2x Referral Bonus!
        </p>
        <CountdownTimer endDate="2025-12-31T23:59:59" />
      </motion.div>

      {/* Benefits Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {memoizedBenefits.map((item, idx) => (
          <ReferralBenefitCard
            key={idx}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            itemVariants={itemVariants}
          />
        ))}
      </motion.div>

      {/* Referral Steps */}
      <motion.div
        className="grid md:grid-cols-2 gap-12 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <ReferralSteps
          type="seller"
          steps={memoizedSellerSteps}
          itemVariants={itemVariants}
        />
        <ReferralSteps
          type="buyer"
          steps={memoizedBuyerSteps}
          itemVariants={itemVariants}
        />
      </motion.div>

      {/* Referral Tiers */}
      <ReferralTiers />

      {/* Leaderboard Snippet */}
      <ReferralLeaderboard />

      {/* Social Proof */}
      <ReferralSocialProof />

      {/* Call to Action */}
      {/* <ReferralCTA itemVariants={itemVariants} /> */}
    </section>
  );
}
