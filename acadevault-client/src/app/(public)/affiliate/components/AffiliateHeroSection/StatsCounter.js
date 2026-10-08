"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { cn } from "@/utils/cn";
import { usePreferences } from "@/contexts/PreferencesContext";


// Lazy-load CountUp
const CountUp = dynamic(() => import("react-countup"), { ssr: false });

// Animation variants
const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const StatsCounter = ({ stats }) => {
  const { highContrast } = usePreferences();

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={statVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          className={cn(
            "p-6 rounded-lg backdrop-blur-sm bg-white/20 text-center",
            highContrast && "bg-gray-700/50"
          )}
        >
          <motion.p
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
          >
            {stat.prefix || ""}
            <CountUp
              start={0}
              end={stat.value}
              duration={2.5}
              formattingFn={(value) => value.toLocaleString()}
              useEasing
            />
          </motion.p>
          <p className="text-lg">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCounter;
