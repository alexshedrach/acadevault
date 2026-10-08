'use client '
import { motion } from "framer-motion";
import {
  Calculator
} from "lucide-react";
import { useState } from "react";
import { fadeIn, cardVariants, timelineVariants } from "@/lib/animations";


export const CommissionCalculator = () => {
  const [traffic, setTraffic] = useState(1000);
  const [conversionRate, setConversionRate] = useState(5);
  const [averageSale, setAverageSale] = useState(50);
  const commissionRate = 0.2;
  const estimatedEarnings = (
    traffic *
    (conversionRate / 100) *
    averageSale *
    commissionRate
  ).toFixed(2);

  return (
    <motion.div
      className="p-6 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-blue-600" />
        Estimate Your Earnings
      </h3>
      {/* Inputs */}
      {[
        {
          label: "Monthly Traffic",
          value: traffic,
          set: setTraffic,
          min: 0,
        },
        {
          label: "Conversion Rate (%)",
          value: conversionRate,
          set: setConversionRate,
          min: 0,
          max: 100,
          step: 0.1,
        },
        {
          label: "Average Sale ($)",
          value: averageSale,
          set: setAverageSale,
          min: 0,
          step: 0.01,
        },
      ].map(({ label, value, set, ...rest }) => (
        <div key={label}>
          <label className="block text-sm text-gray-600">{label}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => set(Number(e.target.value))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
            {...rest}
          />
        </div>
      ))}
      <p className="text-lg font-semibold text-blue-600 mt-4">
        Estimated Monthly Earnings: ${estimatedEarnings}
      </p>
    </motion.div>
  );
};
