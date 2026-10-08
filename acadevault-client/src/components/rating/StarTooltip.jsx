import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const StarTooltip = ({ index }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-10"
    >
      {index} Star{index > 1 ? "s" : ""}
    </motion.div>
  </AnimatePresence>
);
