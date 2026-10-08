"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { DEPARTMENT_SORT_OPTIONS } from "@/constants/sortFilterOptions";
import { SortFilterControls } from "@/components/common/SortFilterControls";

// Breadcrumb navigation items
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Departments", isCurrentPage: true },
];

/**
 * Filter bar component for searching and sorting departments
 * @param {Object} props
 * @param {string} props.searchQuery - Current search query
 * @param {Function} props.setSearchQuery - Function to update search query
 * @param {string} props.sortValue - Current sort value
 * @param {Function} props.handleSortChange - Function to handle sort changes
 */
export default function DepartmentFilterBar({
  searchQuery,
  setSearchQuery,
  sortValue,
  handleSortChange,
}) {
  // Animation variants for filter bar
  const filterBarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.nav
      variants={filterBarVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col md:flex-row md:items-center justify-between bg-white/80 backdrop-blur-lg px-6 pt-6 pb-3 shadow-md border border-gray-300 mb-10 rounded-2xl -mt-5"
      role="navigation"
      aria-label="Department filters and navigation"
    >
      {/* Breadcrumbs */}
      <Breadcrumb
        items={breadcrumbItems}
        size="md"
        textColor="text-gray-600"
        activeColor="text-blue-700"
        hoverColor="hover:text-blue-500"
        animate={true}
        className="mb-6 md:mb-0"
      />

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative w-full md:w-80"
        >
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search departments..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm placeholder-gray-500"
            aria-label="Search departments"
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          >
            <Search className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Sort Controls */}
        <SortFilterControls
          sortValue={sortValue}
          onSortChange={handleSortChange}
          sortOptions={DEPARTMENT_SORT_OPTIONS}
          useDropdownSort={true}
          className="w-full md:w-48 z-20"
          aria-label="Sort departments"
        />
      </div>
    </motion.nav>
  );
}
