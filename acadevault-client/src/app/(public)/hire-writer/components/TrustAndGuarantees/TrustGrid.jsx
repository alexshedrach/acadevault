"use client";

import React from "react";
import { motion } from "framer-motion";
import TrustCard from "./TrustCard";
import { cn } from "@/utils/cn";

const layoutVariants = {
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  columns: "columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6",
  stacked: "space-y-8 border-l border-gray-200 pl-6",
};

export default function TrustGrid({
  items,
  layout = "grid", // stacked, columns, grid
  staggerDelay = 0.15,
  animate = true,
  className = "",
}) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay } },
  };

  return (
    <motion.div
      className={cn(layoutVariants[layout], className)}
      variants={animate ? containerVariants : {}}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : false}
      viewport={{ once: true }}
    >
      {items.map((item) => (
        <TrustCard key={item.id} item={item} />
      ))}
    </motion.div>
  );
}
