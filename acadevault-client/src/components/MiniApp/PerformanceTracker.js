"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { fadeIn, cardVariants } from "@/lib/animations";
import  useAnalytics  from "@/hooks/useAnalytics";

// Mock data for different timeframes
const mockData = {
  daily: {
    clicks: 120,
    conversions: 12,
    earnings: 180,
    chartData: [20, 30, 25, 35, 10],
  },
  weekly: {
    clicks: 840,
    conversions: 84,
    earnings: 1260,
    chartData: [100, 150, 120, 170, 80, 140, 80],
  },
  monthly: {
    clicks: 3600,
    conversions: 360,
    earnings: 5400,
    chartData: [300, 400, 350, 450, 200, 500, 400, 350, 300, 350],
  },
};

const PerformanceTracker = () => {
  const [timeframe, setTimeframe] = useState("daily");
  const { trackEvent } = useAnalytics();
  const data = mockData[timeframe];
  const maxChartValue = Math.max(...data.chartData, 1);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    trackEvent("performance_timeframe_changed", { timeframe: newTimeframe });
  };

  return (
    <motion.div
      className="p-6 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BarChart2 className="w-6 h-6 text-blue-600" />
        Performance Tracker
      </h3>
      <div className="flex gap-2 mb-4">
        {["daily", "weekly", "monthly"].map((tf) => (
          <button
            key={tf}
            onClick={() => handleTimeframeChange(tf)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm",
              timeframe === tf
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            )}
            aria-label={`View ${tf} performance metrics`}
          >
            {tf.charAt(0).toUpperCase() + tf.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {[
          { label: "Clicks", value: data.clicks },
          { label: "Conversions", value: data.conversions },
          { label: "Earnings", value: `$${data.earnings}` },
        ].map(({ label, value }, idx) => (
          <motion.div
            key={label}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={idx}
            className="p-4 bg-white/50 rounded-lg text-center"
          >
            <p className="text-lg font-semibold text-blue-600">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
          </motion.div>
        ))}
      </div>
      <div className="h-32 flex items-end gap-1">
        {data.chartData.map((value, idx) => (
          <motion.div
            key={idx}
            initial={{ height: 0 }}
            animate={{ height: `${(value / maxChartValue) * 100}%` }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="flex-1 bg-blue-600 rounded-t"
            title={`${value} ${timeframe === "daily" ? "clicks" : "events"}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PerformanceTracker;
