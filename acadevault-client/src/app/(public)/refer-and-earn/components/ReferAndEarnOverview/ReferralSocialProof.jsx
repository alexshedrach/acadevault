"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { FaUsers, FaDollarSign, FaClock } from "react-icons/fa";

// Trust metrics data
const trustMetrics = [
  {
    icon: <FaUsers className="text-yellow-400 text-3xl" />,
    value: "25,000+",
    label: "Active Referrers",
  },
  {
    icon: <FaDollarSign className="text-green-400 text-3xl" />,
    value: "$1.2M+",
    label: "Payouts Processed",
  },
  {
    icon: <FaClock className="text-indigo-400 text-3xl" />,
    value: "<24h",
    label: "Payout Time",
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

export default function ReferralSocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Memoize data to prevent re-renders
  const memoizedMetrics = useMemo(() => trustMetrics, []);

  return (
    <section
      className="relative py-8 px-6 md:px-12 lg:px-20 text-white"
      aria-labelledby="social-proof-heading"
      ref={ref}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h3
          id="social-proof-heading"
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500"
        >
          Why Referrers Trust Acadevault
        </h3>
        <p className="text-lg text-blue-100 max-w-3xl mx-auto mt-4">
          Join a thriving academic community of educators, students, and
          researchers earning through Acadevault’s trusted referral program.
        </p>
      </motion.div>

      {/* Trust Metrics */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {memoizedMetrics.map((metric, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover="hover"
            className="relative bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg group text-center"
            role="region"
            aria-label={metric.label}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="mb-2 flex justify-center">{metric.icon}</div>
              <h4 className="text-2xl font-bold text-white">{metric.value}</h4>
              <p className="text-sm text-blue-200 mt-2">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        className="flex justify-center gap-6 flex-wrap mt-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {[
          { src: "/media/trust-badge-ssl.png", alt: "SSL Secure" },
          { src: "/media/trustpilot.png", alt: "Trustpilot Rated" },
          { src: "/media/accredited.png", alt: "Accredited Platform" },
        ].map((badge, idx) => (
          <motion.img
            key={idx}
            src={badge.src}
            alt={badge.alt}
            className="w-20 md:w-24 object-contain"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            loading="lazy"
          />
        ))}
      </motion.div>
    </section>
  );
}
