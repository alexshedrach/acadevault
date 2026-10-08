"use client";

import { Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const ReferralCallToActionSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white overflow-hidden">
      {/* Glow Animation */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-6 text-center space-y-8 max-w-4xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold flex justify-center items-center gap-3"
        >
          <Gift className="w-10 h-10 text-yellow-400" />
          Start Earning Instantly
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto"
        >
          Refer students, educators, and researchers to Acadavault and unlock
          consistent rewards for every successful transaction.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm text-blue-100 max-w-xl mx-auto"
        >
          There’s no limit. The more you refer, the more you earn. Your
          dashboard gives you full control to track your performance,
          commissions, and payout history.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/dashboard/affiliate/referrals" target="_blank"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all"
          >
            Access Referral Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
