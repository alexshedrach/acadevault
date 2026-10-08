"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Search, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { fetchReferralFAQs } from "@/data/fetchReferralFAQsData";

// Mock API data (replace with real API call in production)

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const faqVariants = {
  collapsed: { height: 0, opacity: 0 },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export default function ReferralFAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndices, setActiveIndices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const faqsPerPage = 8;

  // Simulate API fetch
  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoading(true);
        const data = await fetchReferralFAQs();
        setFaqs(data);
        setFilteredFaqs(data);
      } catch (err) {
        setError("Failed to load FAQs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadFAQs();
  }, []);

  // Handle search and category filtering
  useEffect(() => {
    let result = faqs;
    if (categoryFilter !== "All") {
      result = faqs.filter((category) => category.category === categoryFilter);
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (faq) =>
              faq.question.toLowerCase().includes(query) ||
              faq.answer.toLowerCase().includes(query)
          ),
        }))
        .filter((category) => category.questions.length > 0);
    }
    setFilteredFaqs(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, categoryFilter, faqs]);

  // Toggle FAQ accordion
  const toggleFAQ = (categoryIndex, faqIndex) => {
    setActiveIndices((prev) => ({
      ...prev,
      [`${categoryIndex}-${faqIndex}`]: !prev[`${categoryIndex}-${faqIndex}`],
    }));
  };

  // Pagination logic
  const totalQuestions = filteredFaqs.reduce(
    (sum, category) => sum + category.questions.length,
    0
  );
  const totalPages = Math.ceil(totalQuestions / faqsPerPage);
  const paginatedFaqs = filteredFaqs
    .map((category) => ({
      ...category,
      questions: category.questions.slice(
        (currentPage - 1) * faqsPerPage,
        currentPage * faqsPerPage
      ),
    }))
    .filter((category) => category.questions.length > 0);

  // Category options
  const categories = ["All", ...faqs.map((cat) => cat.category)];

  return (
    <section
      role="region"
      aria-labelledby="faq-heading"
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3 text-gray-800 relative"
          >
            <motion.span
              whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
            >
              <HelpCircle className="w-10 h-10 text-blue-600 animate-bounce" />
            </motion.span>
            Referral Program FAQs
            <span className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2" />
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about earning rewards through our
            referral program.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
              aria-label="Search FAQs"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* FAQ Content */}
        {loading ? (
          <div className="text-center text-gray-600">Loading FAQs...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : totalQuestions === 0 ? (
          <div className="text-center text-gray-600">
            No FAQs found for your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
                  {category.category}
                </h3>
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200"
                  >
                    <button
                      onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                      className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                      aria-expanded={
                        activeIndices[`${categoryIndex}-${faqIndex}`]
                      }
                      aria-controls={`faq-content-${faq.id}`}
                    >
                      <span className="text-lg font-medium text-gray-800">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{
                          rotate: activeIndices[`${categoryIndex}-${faqIndex}`]
                            ? 180
                            : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-blue-600" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {activeIndices[`${categoryIndex}-${faqIndex}`] && (
                        <motion.div
                          id={`faq-content-${faq.id}`}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={faqVariants}
                          className="overflow-hidden px-6 pb-4"
                        >
                          <p className="text-gray-700 text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
