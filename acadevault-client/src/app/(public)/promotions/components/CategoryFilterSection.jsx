"use client";

import React from "react";
import { motion } from "framer-motion";
import { SortFilterControls } from "@/components/common/SortFilterControls";

/**
 * Modular filtering section for categories and sort logic
 */
const CategoryFilterSection = ({
  categories = [],
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}) => {
  const filterOptions = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const sortOptions = [
    { value: "default", label: "Select Sort Options" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-desc", label: "Rating: High to Low" },
    { value: "expires-soon", label: "Expiring Soon" },
  ];

  return (
    <section className="bg-white border-b border-gray-100 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Category buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              } border shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-current={activeCategory === cat ? "true" : "false"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Sort & Filter Controls */}
        <SortFilterControls
          showFilters={false} // Set to true if you want filters too
          sortValue={sortBy}
          onSortChange={setSortBy}
          filterValue={activeCategory}
          onFilterChange={setActiveCategory}
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          useDropdownSort={true}
          sortLabel="Sort deals"
          filterLabel="Filter by category"
          // compact
        />
      </div>
    </section>
  );
};

export default CategoryFilterSection;
