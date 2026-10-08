"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryFilterSection from "./CategoryFilterSection";
import DealsGridSection from "./DealsGridSection";
import { dummyDeals } from "../dummyDeals";

const categories = ["All", "Engineering", "Past Questions", "Research"];


const getTimeLeft = (expiresAt) => {
  const now = new Date().getTime();
  const timeLeft = Date.parse(expiresAt) - now;
  if (timeLeft <= 0) return { formatted: "Expired" };
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  return { formatted: `${days}d ${hours}h ${minutes}m ${seconds}s` };
};

function ClientPromotions() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [timers, setTimers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const updateTimers = useCallback(() => {
    const newTimers = {};
    dummyDeals.forEach((deal) => {
      const { formatted } = getTimeLeft(deal.expiresAt);
      newTimers[deal.id] = formatted;
    });
    setTimers(newTimers);
  }, []);

  useEffect(() => {
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [updateTimers]);

  useEffect(() => {
    setIsLoading(true);
    try {
      const now = new Date().getTime();
      let deals = dummyDeals.filter(
        (deal) =>
          Date.parse(deal.expiresAt) > now &&
          (activeCategory === "All" || deal.category === activeCategory)
      );

      // Apply sorting
      if (sortBy === "price-asc") {
        deals.sort(
          (a, b) =>
            parseFloat(a.price.replace("₦", "")) -
            parseFloat(b.price.replace("₦", ""))
        );
      } else if (sortBy === "price-desc") {
        deals.sort(
          (a, b) =>
            parseFloat(b.price.replace("₦", "")) -
            parseFloat(a.price.replace("₦", ""))
        );
      } else if (sortBy === "rating-desc") {
        deals.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === "expires-soon") {
        deals.sort((a, b) => Date.parse(a.expiresAt) - Date.parse(b.expiresAt));
      }

      // Apply pagination
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setFilteredDeals(deals.slice(start, end));
      setError(null);
    } catch (err) {
      setError("Failed to load deals. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, sortBy, timers, page]);

  const handleShare = useCallback((deal) => {
    if (navigator.share) {
      navigator
        .share({
          title: deal.title,
          text: `${deal.description} - Get ${deal.discount} off!`,
          url: `https://acadevault.com/materials/${deal.slug}`,
        })
        .catch((err) => console.warn("Share failed:", err));
    } else {
      navigator.clipboard
        .writeText(`https://acadevault.com/materials/${deal.slug}`)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link."));
    }
  }, []);

  const totalPages = Math.ceil(dummyDeals.length / itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50"
    >
      <CategoryFilterSection
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    
      <DealsGridSection
        deals={filteredDeals}
        timers={timers}
        isLoading={isLoading}
        error={error}
        handleShare={handleShare}
      />
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="container mx-auto px-4 py-8 flex justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-700 transition"
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-700 transition"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default ClientPromotions;
