"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, CheckCircle } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, ease: "easeOut", duration: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" },
};

// Security features data
const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
    title: "Watermark Protection",
    desc: "All materials are auto-watermarked on download to prevent unauthorized sharing.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    title: "Secure Payments",
    desc: "Payouts processed via Paystack & Stripe ensure encrypted, reliable transactions.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
    title: "Plagiarism Checks",
    desc: "Uploads are scanned by Turnitin and other industry tools to guarantee originality.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: "GDPR Compliance",
    desc: "Your personal and financial data is handled under strict GDPR-compliant protocols.",
  },
];

// Trust badges data
const badges = [
  { src: "/media/trust-badge-ssl.png", alt: "SSL Secure" },
  { src: "/media/trustpilot.png", alt: "Trustpilot Rated" },
  { src: "/media/accredited.png", alt: "Accredited Platform" },
];

export function SecurityTrustSubsection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      role="region"
      aria-labelledby="security-trust-heading"
      className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Section Header */}
      <div className="relative flex items-center gap-3">
        <motion.span
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
          className="p-3 bg-indigo-50 rounded-full"
        >
          <ShieldCheck className="w-6 h-6 text-indigo-600" />
        </motion.span>
        <h2
          id="security-trust-heading"
          className="text-3xl font-bold text-gray-800"
        >
          Security & Trust
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full" />
        </h2>
      </div>

      <p className="text-gray-600 leading-relaxed max-w-2xl">
        We safeguard your content and earnings with industry-leading measures,
        so you can sell with complete peace of mind.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            role="article"
            aria-label={feat.title}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition"
            variants={cardVariants}
            whileHover="hover"
          >
            <div>{feat.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {feat.title}
              </h3>
              <p className="text-gray-600 text-sm">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {badges.map((b, i) => (
          <motion.img
            key={i}
            src={b.src}
            alt={b.alt}
            className="h-12 object-contain"
            variants={cardVariants}
            whileHover={{ scale: 1.1 }}
            loading="lazy"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
