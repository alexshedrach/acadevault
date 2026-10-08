"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Link2,
  Download,
  MessageCircle,
  Menu,
  X,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/utils/cn";
import Tilt from "react-parallax-tilt";
import { debounce } from "lodash";
import { fetchFAQs } from "@/data/fetchFAQs";

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const faqVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const FAQsAndLearnSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndices, setActiveIndices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Popularity");
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [feedback, setFeedback] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const faqsPerPage = 6;

  // Simulate API fetch
  const loadFAQs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFAQs();
      setFaqs(data);
      setFilteredFaqs(data);
    } catch (err) {
      setError("Failed to load FAQs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFAQs();
  }, [loadFAQs]);

  // Debounced search
  const debouncedSearch = debounce((query) => setSearchQuery(query), 300);

  // Handle filters and sorting
  useEffect(() => {
    let result = faqs;
    // Category filter
    if (categoryFilter !== "All") {
      result = faqs.filter((category) => category.category === categoryFilter);
    }
    // Tag filter
    if (tagFilter !== "All") {
      result = result
        .map((category) => ({
          ...category,
          questions: category.questions.filter((faq) =>
            faq.tags.includes(tagFilter)
          ),
        }))
        .filter((category) => category.questions.length > 0);
    }
    // Difficulty filter
    if (difficultyFilter !== "All") {
      result = result
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (faq) => faq.difficulty === difficultyFilter
          ),
        }))
        .filter((category) => category.questions.length > 0);
    }
    // Search filter
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
    // Sort
    result = result.map((category) => ({
      ...category,
      questions: [...category.questions].sort((a, b) => {
        if (sortOption === "Popularity") return b.popularity - a.popularity;
        if (sortOption === "Alphabetical")
          return a.question.localeCompare(b.question);
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }),
    }));
    setFilteredFaqs(result);
    setCurrentPage(1);
    // Update URL query params
    const params = new URLSearchParams({
      category: categoryFilter,
      tag: tagFilter,
      difficulty: difficultyFilter,
      sort: sortOption,
      search: searchQuery,
    });
    window.history.replaceState({}, "", `?${params}`);
  }, [
    searchQuery,
    categoryFilter,
    tagFilter,
    difficultyFilter,
    sortOption,
    faqs,
  ]);

  // Toggle FAQ
  const toggleFAQ = (categoryIndex, faqIndex) => {
    setActiveIndices((prev) => ({
      ...prev,
      [`${categoryIndex}-${faqIndex}`]: !prev[`${categoryIndex}-${faqIndex}`],
    }));
    // Track analytics
    console.log(
      `Opened FAQ: ${filteredFaqs[categoryIndex].questions[faqIndex].id}`
    );
  };

  // Handle feedback
  const handleFeedback = (faqId, isHelpful) => {
    setFeedback((prev) => ({ ...prev, [faqId]: isHelpful }));
    console.log(
      `Feedback for FAQ ${faqId}: ${isHelpful ? "Helpful" : "Not Helpful"}`
    );
  };

  // Copy FAQ link
  const copyFAQLink = (faqId) => {
    const url = `${window.location.origin}/faqs#faq-${faqId}`;
    navigator.clipboard.writeText(url);
    alert("FAQ link copied to clipboard!");
  };

  // Download PDF (mock)
  const downloadPDF = (category) => {
    alert(`Downloading ${category} guide... (Mocked)`);
  };

  // Pagination logic
  const totalQuestions = filteredFaqs.reduce(
    (sum, category) => sum + category.questions.length,
    0
  );
  const totalPages = Math.ceil(totalQuestions / faqsPerPage);
  const paginatedFaqs = infiniteScroll
    ? filteredFaqs
    : filteredFaqs
        .map((category) => ({
          ...category,
          questions: category.questions.slice(
            (currentPage - 1) * faqsPerPage,
            currentPage * faqsPerPage
          ),
        }))
        .filter((category) => category.questions.length > 0);

  // Infinite scroll
  useEffect(() => {
    if (!infiniteScroll) return;
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [infiniteScroll, currentPage, totalPages]);

  // Categories, tags, difficulties
  const categories = ["All", ...faqs.map((cat) => cat.category)];
  const tags = [
    "All",
    ...new Set(faqs.flatMap((cat) => cat.questions.flatMap((faq) => faq.tags))),
  ];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  // Popular FAQs
  const popularFAQs = faqs
    .flatMap((cat) => cat.questions)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <section
      role="region"
      aria-labelledby="faq-heading"
      className={cn(
        "py-24 bg-gradient-to-br from-gray-50 to-blue-100 relative overflow-hidden min-h-screen",
        highContrast && "bg-gray-800 text-white"
      )}
    >
      {/* Particle Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-50 top-10 left-20" />
        <div className="absolute w-1 h-1 bg-indigo-400 rounded-full animate-ping opacity-50 top-40 right-30" />
        <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50 bottom-20 left-50" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          variants={animationsEnabled ? sectionVariants : null}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
            <h1
              id="faq-heading"
              className={cn(
                "text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3 text-center",
                highContrast ? "text-white" : "text-gray-800"
              )}
            >
              <motion.span
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <HelpCircle className="w-10 h-10 text-blue-600" />
              </motion.span>
              Acadevault FAQs & Learning Hub
              <span className="absolute bottom-0 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2" />
            </h1>
          </Tilt>
          <p
            className={cn(
              "mt-4 text-lg text-center max-w-3xl mx-auto",
              highContrast ? "text-gray-300" : "text-gray-600"
            )}
          >
            Explore answers to common questions and learn how to maximize your
            Acadevault experience.
          </p>
        </motion.div>

        {/* Popular FAQs Carousel */}
        <div className="mb-12 sticky top-0 bg-white/80 backdrop-blur-sm z-20 p-4 rounded-lg shadow-md">
          <h2
            className={cn(
              "text-xl font-semibold mb-4",
              highContrast ? "text-white" : "text-gray-800"
            )}
          >
            Popular Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {popularFAQs.map((faq) => (
              <motion.a
                key={faq.id}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "p-4 rounded-lg border bg-white/50 shadow-sm",
                  highContrast && "text-gray-900 bg-gray-700 border-gray-600"
                )}
                href={`#faq-${faq.id}`}
              >
                <p className="text-sm font-medium text-blue-600 truncate">
                  {faq.question}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div
            className={cn(
              "md:w-1/4 md:sticky top-20 h-fit",
              sidebarOpen
                ? "block fixed inset-0 bg-white z-90 p-6"
                : "hidden md:block"
            )}
          >
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h2 className="text-xl font-semibold">Categories</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-600"
                aria-label="Close sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => {
                    setCategoryFilter(category);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg cursor-pointer",
                    categoryFilter === categoryFilter
                      ? "bg-blue-100 text-blue-600"
                      : highContrast
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100",
                    highContrast ? "text-white" : "text-gray-800"
                  )}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600",
                    highContrast && "bg-gray-700 text-white border-gray-600"
                  )}
                  aria-label="Search FAQs"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg border-gray-300 focus:ring-blue-600",
                  highContrast && "bg-gray-700 text-white border-gray-600"
                )}
                aria-label="Filter by category"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg border-gray-300 focus:ring-blue-600",
                  highContrast && "bg-gray-700 text-white border-gray-600"
                )}
                aria-label="Filter by tag"
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg border-gray-300 focus:ring-blue-600",
                  highContrast && "bg-gray-700 text-white border-gray-600"
                )}
                aria-label="Filter by difficulty"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg border-gray-300 focus:ring-blue-600",
                  highContrast && "bg-gray-700 text-white border-gray-600"
                )}
                aria-label="Sort FAQs"
              >
                <option value="Popularity">Popularity</option>
                <option value="Alphabetical">Alphabetical</option>
                <option value="Recent">Recent</option>
              </select>
            </div>

            {/* Preferences */}
            <div className="flex justify-end gap-3 mb-4">
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200",
                  highContrast && "bg-gray-600 text-white"
                )}
                aria-label="Toggle high contrast mode"
              >
                {highContrast ? "Normal Mode" : "High Contrast"}
              </button>
              <button
                onClick={() => setInfiniteScroll(!infiniteScroll)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200",
                  highContrast && "bg-gray-600 text-white"
                )}
                aria-label="Toggle infinite scroll"
              >
                {infiniteScroll ? "Pagination" : "Infinite Scroll"}
              </button>
              <button
                onClick={() => setAnimationsEnabled(!animationsEnabled)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200",
                  highContrast && "bg-gray-600 text-white"
                )}
                aria-label="Toggle animations"
              >
                {animationsEnabled ? "Disable Animations" : "Enable Animations"}
              </button>
            </div>

            {/* FAQs & Learn Content */}
            {loading ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : totalQuestions === 0 ? (
              <div className="text-center text-gray-600">No FAQs found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedFaqs.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-6">
                    {/* Learn Section */}
                    <motion.div
                      variants={animationsEnabled ? sectionVariants : null}
                      initial="hidden"
                      animate="visible"
                      className={cn(
                        "p-6 rounded-lg backdrop-blur-sm bg-white/30 border-gray-200 shadow-lg border",
                        highContrast &&
                          "text-white bg-gray-900/80 border-gray-600"
                      )}
                    >
                      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                        <h3
                          className={cn(
                            "text-2xl font-semibold mb-2",
                            highContrast ? "text-white" : "text-gray-800"
                          )}
                        >
                          Learn About {category.category}
                        </h3>
                      </Tilt>
                      <p
                        className={cn(
                          "text-sm mb-4",
                          highContrast ? "text-gray-300" : "text-gray-600"
                        )}
                      >
                        {category.learnContent.summary}
                      </p>
                      <div className="relative h-40 mb-4">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-lg">
                          <PlayCircle className="w-12 h-12 text-gray-500" />
                          <span className="ml-2 text-gray-500">
                            Video Placeholder
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={category.learnContent.guideUrl}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
                          aria-label={`Download ${category.category} guide`}
                          onClick={() => downloadPDF(category.category)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Guide
                        </a>
                        <a
                          href={category.learnContent.videoUrl}
                          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200"
                          aria-label={`Watch ${category.category} video`}
                        >
                          Watch Video
                        </a>
                      </div>
                    </motion.div>

                    {/* FAQs */}
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <motion.div
                          key={faq.id}
                          id={`faq-${faq.id}`}
                          whileHover={
                            animationsEnabled ? { scale: 1.02 } : null
                          }
                          className={cn(
                            "rounded-lg backdrop-blur-sm bg-white/30 border-gray-200 shadow-lg border overflow-hidden",
                            highContrast &&
                              "bg-gray-900/80 border-gray-600 text-white"
                          )}
                        >
                          <button
                            onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                            aria-expanded={
                              activeIndices[`${categoryIndex}-${faqIndex}`]
                            }
                            aria-controls={`faq-content-${faq.id}`}
                          >
                            <span
                              className={cn(
                                "text-lg font-medium",
                                highContrast ? "text-white" : "text-gray-800"
                              )}
                            >
                              {faq.question}
                            </span>
                            <motion.span
                              animate={{
                                rotate: activeIndices[
                                  `${categoryIndex}-${faqIndex}`
                                ]
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
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={
                                  animationsEnabled ? faqVariants : null
                                }
                                className="px-6 pb-4"
                              >
                                <p
                                  className={cn(
                                    "text-base leading-relaxed",
                                    highContrast
                                      ? "text-gray-200"
                                      : "text-gray-700"
                                  )}
                                >
                                  {faq.answer}
                                </p>
                                <div className="mt-4 flex gap-3 flex-wrap">
                                  <button
                                    onClick={() => handleFeedback(faq.id, true)}
                                    className={cn(
                                      "flex items-center gap-2 text-sm",
                                      feedback[faq.id] === true
                                        ? "text-green-600"
                                        : highContrast
                                        ? "text-gray-300"
                                        : "text-gray-600",
                                      "hover:text-green-600"
                                    )}
                                    aria-label="Mark as helpful"
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                    Helpful
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleFeedback(faq.id, false)
                                    }
                                    className={cn(
                                      "flex items-center gap-2 text-sm",
                                      feedback[faq.id] === false
                                        ? "text-red-600"
                                        : highContrast
                                        ? "text-gray-300"
                                        : "text-gray-600",
                                      "hover:text-red-600"
                                    )}
                                    aria-label="Mark as not helpful"
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                    Not Helpful
                                  </button>
                                  <button
                                    onClick={() => copyFAQLink(faq.id)}
                                    className={cn(
                                      "flex items-center gap-2 text-sm",
                                      highContrast
                                        ? "text-gray-300"
                                        : "text-gray-600",
                                      "hover:text-blue-600"
                                    )}
                                    aria-label="Copy FAQ link"
                                  >
                                    <Link2 className="w-4 h-4" />
                                    Copy Link
                                  </button>
                                </div>
                                {faq.related.length > 0 && (
                                  <div className="mt-4">
                                    <p
                                      className={cn(
                                        "text-sm font-medium",
                                        highContrast
                                          ? "text-gray-300"
                                          : "text-gray-600"
                                      )}
                                    >
                                      Related FAQs:
                                    </p>
                                    <ul className="list-disc pl-5 text-sm">
                                      {faq.related.map((relatedId) => {
                                        const relatedFAQ = faqs
                                          .flatMap((cat) => cat.questions)
                                          .find((q) => q.id === relatedId);
                                        return (
                                          <li key={relatedId}>
                                            <a
                                              href={`#faq-${relatedId}`}
                                              className="text-blue-600 hover:underline"
                                            >
                                              {relatedFAQ?.question}
                                            </a>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!infiniteScroll && totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium",
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : highContrast
                          ? "bg-gray-600 text-white hover:bg-gray-500"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Mobile Sidebar Toggle */}
            <button
              className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-full"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open category sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Live Chat Support */}
            <div className="fixed bottom-4 right-4 z-50">
              <motion.button
                whileHover={animationsEnabled ? { scale: 1.1 } : null}
                whileTap={animationsEnabled ? { scale: 0.9 } : null}
                className="p-4 bg-blue-600 text-white rounded-full shadow-lg"
                aria-label="Open live chat support"
                onClick={() =>
                  alert("Opening live chat... (Mock functionality)")
                }
              >
                <MessageCircle className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsAndLearnSection;
