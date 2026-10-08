"use client";

import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function ReferralSteps({ type, steps, itemVariants }) {
  const isSeller = type === "seller";
  return (
    <motion.div
      variants={itemVariants}
      className={`p-8 rounded-2xl shadow-xl ${
        isSeller
          ? "bg-white text-gray-800"
          : "bg-blue-900/50 text-blue-100 backdrop-blur-md"
      }`}
      role="region"
      aria-label={`${isSeller ? "Seller" : "Buyer"} Referral Steps`}
    >
      <h3
        className={`text-2xl font-bold mb-6 ${
          isSeller ? "text-indigo-900" : "text-yellow-400"
        }`}
      >
        {isSeller ? "Academic Seller Referral" : "Learner Referral"}
      </h3>
      <ul
        className={
          isSeller ? "list-decimal list-inside space-y-4" : "space-y-6"
        }
      >
        {steps.map((step, index) => (
          <li
            key={index}
            className={`leading-relaxed ${
              isSeller ? "text-base" : "flex items-start gap-4 text-sm"
            }`}
          >
            {!isSeller && (
              <AiOutlineCheckCircle
                className="text-yellow-400 mt-1"
                size={20}
              />
            )}
            {step}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
