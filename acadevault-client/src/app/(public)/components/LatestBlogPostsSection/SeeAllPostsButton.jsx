"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const SeeAllPostsButton = () => (
  <div className="mt-16 flex justify-center">
    <motion.a
      href="/blogs"
      className="flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none"
      whileHover={{ scale: 1.08 }}
    >
      See All Posts
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <FaArrowRight className="text-white" />
      </motion.div>
    </motion.a>
  </div>
);

export default SeeAllPostsButton;
