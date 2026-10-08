"use client";

import { motion } from "framer-motion";

export default function ReferralBenefitCard({ icon, title, desc, itemVariants }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl group overflow-hidden"
      role="region"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h4 className="font-semibold text-xl text-white mb-3">{title}</h4>
        <p className="text-sm text-blue-100 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
