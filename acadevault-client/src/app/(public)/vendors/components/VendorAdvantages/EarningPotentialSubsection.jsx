"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DollarSign, Star, ShieldCheck, Briefcase } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
  hover: { scale: 1.05, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)" },
};

export const EarningPotentialSubsection = () => {
  // State & calculations
  const [price, setPrice] = useState(20);
  const royaltyRate = 0.7; // 70% commission
  const monthlySales = 50; // example baseline
  const royalty = useMemo(() => (price * royaltyRate).toFixed(2), [price]);
  const potential = useMemo(
    () => (Number(royalty) * monthlySales).toFixed(2),
    [royalty]
  );

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="p-3 bg-indigo-50 rounded-full"
            >
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </motion.span>
            <h2 className="text-3xl font-bold text-gray-800">
              Maximize Your Earnings
            </h2>
          </div>

          {/* Overview Text */}
          <p className="text-gray-600 leading-relaxed">
            With AcadeVault’s global reach, set your own prices and enjoy up to{" "}
            <span className="font-semibold text-indigo-600">
              {royaltyRate * 100}%
            </span>{" "}
            commission. Our platform handles marketing, delivery, and payouts so
            you can focus on creating quality materials.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Star className="w-5 h-5 text-yellow-500" />,
                title: "Flexible Pricing",
                desc: "Choose any price between $5 and $200 depending on complexity and depth.",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
                title: "Transparent Royalties",
                desc: "Always know exactly what you earn—no hidden fees or surprises.",
              },
              {
                icon: <Briefcase className="w-5 h-5 text-purple-500" />,
                title: "Global Audience",
                desc: "Your materials reach learners in over 100 countries, boosting sales potential.",
              },
              {
                icon: <DollarSign className="w-5 h-5 text-indigo-500" />,
                title: "Fast Payouts",
                desc: "Withdraw earnings via Paystack, Stripe or crypto in under 24 hours.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                className="p-6 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  {card.icon}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Earnings Estimator */}
        <div className="w-full py-12 bg-indigo-50 px-6 rounded-lg border border-indigo-100 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label htmlFor="price-slider" className="text-gray-700 font-medium">
              Set Your Price:{" "}
              <span className="font-semibold text-indigo-600">${price}</span>
            </label>
            <input
              id="price-slider"
              type="range"
              min={5}
              max={200}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full sm:w-1/2 accent-indigo-600"
            />
          </div>
          <p className="mt-4 text-gray-700">
            At <strong>${price}</strong> per sale and an average of{" "}
            <strong>{monthlySales} monthly sales</strong>, you could earn:
          </p>
          <p className="mt-2 text-2xl font-bold text-indigo-700">
            ${potential}
            <span className="text-base font-medium text-gray-600">/month</span>
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 flex justify-center"
          >
            <Link
              href="/dashboard/seller/sales"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-blue-700 transition"
            >
              <DollarSign className="w-5 h-5" />
              Explore Payout Options
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
