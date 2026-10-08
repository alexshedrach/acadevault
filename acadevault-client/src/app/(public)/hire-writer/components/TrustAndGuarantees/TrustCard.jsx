"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn"; 

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TrustCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="relative flex items-start gap-4 group transition-transform duration-500"
    >
      {/* Gradient Accent Line */}
      <div className={cn("w-1 rounded-full", item.accent)} />

      <div className="flex-1">
        {/* <div
          className={`absolute inset-y-0 left-0 w-1 rounded-l-xl bg-gradient-to-b ${item.accent}`}
        /> */}

        {/* Number Badge */}
        <div className="flex items-center mb-2">
          <div className="text-sm text-gray-400 font-semibold mr-2 group-hover:text-blue-600 transition-colors duration-300">
            {String(item.id).padStart(2, "0")}
          </div>

          {/* Icon Container */}
          <div
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br text-white text-lg",
              item.accent
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-800 transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}