import React from "react";
import { motion } from "framer-motion";

const SortSection = ({ sortBy, setSortBy, sortOptions }) => (
    <div className="container mx-auto px-4 flex justify-end">
      <motion.select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-200 rounded-full px-4 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition"
        aria-label="Sort deals"
        whileHover={{ scale: 1.02 }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </motion.select>
    </div>
);

export default SortSection;
