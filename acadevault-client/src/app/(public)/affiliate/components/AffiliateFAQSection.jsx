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
} from "lucide-react";
import { cn } from "@/utils/cn";
import Tilt from "react-parallax-tilt";
import { debounce } from "lodash";

// Mock API data (replace with real API call in production)
const fetchAffiliateFAQs = async () => {
  return [
    {
      category: "Program Basics",
      questions: [
        {
          id: 1,
          question: "Who can join the Acadevault affiliate program?",
          answer:
            "Anyone with an audience interested in academic resources, including bloggers, educators, students, and content creators, can join. No minimum audience size is required.",
          tags: ["Beginner", "Eligibility"],
          related: [2, 3],
          popularity: 90,
        },
        {
          id: 2,
          question: "How do I apply to become an affiliate?",
          answer:
            "Sign up on our affiliate portal, submit your details, and get approved within 2-3 business days. No fees are required.",
          tags: ["Beginner", "Application"],
          related: [1, 4],
          popularity: 85,
        },
        {
          id: 3,
          question: "Do I need a website to join?",
          answer:
            "No, you can promote via social media, email, or other channels, but a website can enhance your earning potential.",
          tags: ["Beginner", "Requirements"],
          related: [1, 2],
          popularity: 80,
        },
        {
          id: 4,
          question: "What is the affiliate program’s duration?",
          answer:
            "Your affiliate account remains active indefinitely unless terminated for policy violations.",
          tags: ["Beginner", "Program"],
          related: [2, 5],
          popularity: 70,
        },
      ],
    },
    {
      category: "Earnings & Payouts",
      questions: [
        {
          id: 5,
          question: "How much can I earn as an affiliate?",
          answer:
            "Earn 15% commission on each sale, up to $100 per transaction. Top affiliates earn $10,000+/month with high traffic.",
          tags: ["Earnings", "Commission"],
          related: [6, 7],
          popularity: 95,
        },
        {
          id: 6,
          question: "When do I get paid?",
          answer:
            "Commissions are paid monthly via Paystack or Stripe, provided you meet the $50 minimum payout threshold.",
          tags: ["Payouts", "Payment"],
          related: [5, 8],
          popularity: 90,
        },
        {
          id: 7,
          question: "Are there any hidden fees?",
          answer:
            "No platform fees. Only standard payment gateway fees (1-3%) apply to payouts.",
          tags: ["Payouts", "Fees"],
          related: [5, 6],
          popularity: 85,
        },
        {
          id: 8,
          question: "Can I reinvest my earnings?",
          answer:
            "Yes, use your earnings to purchase Acadevault materials or services, or withdraw as cash.",
          tags: ["Earnings", "Reinvestment"],
          related: [6, 7],
          popularity: 80,
        },
      ],
    },
    {
      category: "Promotion Tools",
      questions: [
        {
          id: 9,
          question: "What can I promote as an affiliate?",
          answer:
            "Promote Acadevault’s materials, writer services, or subscription plans using your unique affiliate links or banners.",
          tags: ["Promotion", "Products"],
          related: [10, 11],
          popularity: 90,
        },
        {
          id: 10,
          question: "What tools are provided for promotion?",
          answer:
            "Access banners, widgets, email templates, and deep links in your affiliate dashboard.",
          tags: ["Tools", "Marketing"],
          related: [9, 12],
          popularity: 85,
        },
        {
          id: 11,
          question: "Can I create custom affiliate links?",
          answer:
            "Yes, generate custom deep links to specific products or categories via the dashboard.",
          tags: ["Tools", "Links"],
          related: [9, 10],
          popularity: 80,
        },
        {
          id: 12,
          question: "How do I optimize my promotions?",
          answer:
            "Use our analytics to identify high-performing content and follow our best practices guide.",
          tags: ["Promotion", "Optimization"],
          related: [10, 11],
          popularity: 75,
        },
      ],
    },
    {
      category: "Tracking & Analytics",
      questions: [
        {
          id: 13,
          question: "How do I track my earnings?",
          answer:
            "Monitor clicks, conversions, and commissions in real-time via your affiliate dashboard.",
          tags: ["Tracking", "Analytics"],
          related: [14, 15],
          popularity: 95,
        },
        {
          id: 14,
          question: "What metrics are available?",
          answer:
            "Track impressions, clicks, conversion rates, and revenue by campaign, link, or time period.",
          tags: ["Analytics", "Metrics"],
          related: [13, 16],
          popularity: 90,
        },
        {
          id: 15,
          question: "How long do cookies last?",
          answer:
            "Our 30-day cookie window ensures you earn commissions for purchases made within 30 days of a click.",
          tags: ["Tracking", "Cookies"],
          related: [13, 14],
          popularity: 85,
        },
        {
          id: 16,
          question: "Can I export my analytics data?",
          answer:
            "Yes, download reports in CSV or PDF format from your dashboard.",
          tags: ["Analytics", "Export"],
          related: [14, 15],
          popularity: 80,
        },
      ],
    },
    {
      category: "Rules & Compliance",
      questions: [
        {
          id: 17,
          question: "What are the affiliate program rules?",
          answer:
            "Follow our terms: no spamming, no self-referrals, and disclose your affiliate status per FTC guidelines.",
          tags: ["Rules", "Compliance"],
          related: [18, 19],
          popularity: 85,
        },
        {
          id: 18,
          question: "Can I use paid ads for promotion?",
          answer:
            "Yes, but avoid bidding on Acadevault brand terms or using misleading ads.",
          tags: ["Rules", "Ads"],
          related: [17, 20],
          popularity: 80,
        },
        {
          id: 19,
          question: "What happens if I violate policies?",
          answer:
            "Violations may lead to withheld commissions or account suspension.",
          tags: ["Compliance", "Violations"],
          related: [17, 18],
          popularity: 75,
        },
        {
          id: 20,
          question: "Do I need to disclose my affiliate links?",
          answer:
            "Yes, include a clear disclosure (e.g., 'This is an affiliate link') to comply with regulations.",
          tags: ["Compliance", "Disclosure"],
          related: [18, 19],
          popularity: 70,
        },
      ],
    },
    {
      category: "Support & Resources",
      questions: [
        {
          id: 21,
          question: "What support is available for affiliates?",
          answer:
            "Access 24/7 support via email, live chat, or phone, plus guides and webinars.",
          tags: ["Support", "Resources"],
          related: [22, 23],
          popularity: 90,
        },
        {
          id: 22,
          question: "Are there training resources?",
          answer:
            "Yes, our affiliate portal offers tutorials, case studies, and monthly webinars.",
          tags: ["Resources", "Training"],
          related: [21, 24],
          popularity: 85,
        },
        {
          id: 23,
          question: "How do I contact support?",
          answer:
            "Use the support portal in your dashboard or email affiliates@acadevault.com.",
          tags: ["Support", "Contact"],
          related: [21, 22],
          popularity: 80,
        },
        {
          id: 24,
          question: "Can I suggest new features for the program?",
          answer:
            "Yes, submit feedback via the dashboard’s 'Suggest a Feature' form.",
          tags: ["Resources", "Feedback"],
          related: [22, 23],
          popularity: 75,
        },
      ],
    },
  ];
};

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

const AffiliateFAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndices, setActiveIndices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Popularity");
  const [infiniteScroll, setInfiniteScroll] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [feedback, setFeedback] = useState({});
  const faqsPerPage = 6;

  // Simulate API fetch with caching
  const loadFAQs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAffiliateFAQs();
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

  // Handle filtering and sorting
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
      questions: [...category.questions].sort((a, b) =>
        sortOption === "Popularity"
          ? b.popularity - a.popularity
          : a.question.localeCompare(b.question)
      ),
    }));
    setFilteredFaqs(result);
    setCurrentPage(1);
    // Update URL query params
    const params = new URLSearchParams({
      category: categoryFilter,
      tag: tagFilter,
      sort: sortOption,
      search: searchQuery,
    });
    window.history.replaceState({}, "", `?${params}`);
  }, [searchQuery, categoryFilter, tagFilter, sortOption, faqs]);

  // Toggle FAQ accordion
  const toggleFAQ = (categoryIndex, faqIndex) => {
    setActiveIndices((prev) => ({
      ...prev,
      [`${categoryIndex}-${faqIndex}`]: !prev[`${categoryIndex}-${faqIndex}`],
    }));
  };

  // Handle feedback
  const handleFeedback = (faqId, isHelpful) => {
    setFeedback((prev) => ({ ...prev, [faqId]: isHelpful }));
    // Simulate API call for feedback
    console.log(
      `Feedback for FAQ ${faqId}: ${isHelpful ? "Helpful" : "Not Helpful"}`
    );
  };

  // Copy FAQ link
  const copyFAQLink = (faqId) => {
    const url = `${window.location.origin}/affiliate-faq#faq-${faqId}`;
    navigator.clipboard.writeText(url);
    alert("FAQ link copied to clipboard!");
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

  // Infinite scroll handler
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

  // Download PDF (mock)
  const downloadPDF = () => {
    alert("Generating PDF... (Mock functionality)");
    // In production, use a library like jsPDF to generate PDF
  };

  // Categories and tags
  const categories = ["All", ...faqs.map((cat) => cat.category)];
  const tags = [
    "All",
    ...new Set(faqs.flatMap((cat) => cat.questions.flatMap((faq) => faq.tags))),
  ];

  // Popular FAQs
  const popularFAQs = faqs
    .flatMap((cat) => cat.questions)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <section
      role="region"
      aria-labelledby="faq-heading"
      className={cn(
        "py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden",
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
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
            <h2
              id="faq-heading"
              className={cn(
                "text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3 relative",
                highContrast ? "text-white" : "text-gray-800"
              )}
            >
              <motion.span
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <HelpCircle className="w-10 h-10 text-blue-600" />
              </motion.span>
              Affiliate Program FAQs
              <span className="absolute bottom-0 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2" />
            </h2>
          </Tilt>
          <p
            className={cn(
              "mt-4 text-lg max-w-2xl mx-auto",
              highContrast ? "text-gray-300" : "text-gray-500"
            )}
          >
            Your guide to maximizing earnings with Acadevault’s affiliate
            program.
          </p>
        </motion.div>

        {/* Popular FAQs Carousel */}
        <div className="mb-12">
          <h3
            className={cn(
              "text-2xl font-semibold mb-4",
              highContrast ? "text-white" : "text-gray-800"
            )}
          >
            Popular Questions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {popularFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "p-4 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg",
                  highContrast && "bg-gray-700 border-gray-600 text-white"
                )}
              >
                <a
                  href={`#faq-${faq.id}`}
                  className="text-lg font-medium hover:text-blue-600"
                >
                  {faq.question}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search FAQs..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className={cn(
                "w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600",
                highContrast && "bg-gray-700 text-white border-gray-600"
              )}
              aria-label="Search FAQs"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={cn(
              "px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600",
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
              "px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600",
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
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={cn(
              "px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600",
              highContrast && "bg-gray-700 text-white border-gray-600"
            )}
            aria-label="Sort FAQs"
          >
            <option value="Popularity">Popularity</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>

        {/* Accessibility & Preferences */}
        <div className="flex justify-end gap-4 mb-4">
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
            onClick={downloadPDF}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700",
              highContrast && "bg-blue-800"
            )}
            aria-label="Download FAQs as PDF"
          >
            <Download className="inline w-4 h-4 mr-2" />
            Download PDF
          </button>
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
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <h3
                    className={cn(
                      "text-2xl font-semibold border-b-2 border-blue-600 pb-2",
                      highContrast ? "text-white" : "text-gray-800"
                    )}
                  >
                    {category.category}
                  </h3>
                </Tilt>
                {category.questions.map((faq, faqIndex) => (
                  <motion.div
                    key={faq.id}
                    id={`faq-${faq.id}`}
                    whileHover={{ scale: 1.02 }}
                    className={cn(
                      "rounded-xl backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg overflow-hidden",
                      highContrast &&
                        "bg-gray-700/50 border-gray-600 text-white"
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
                          className="px-6 pb-4"
                        >
                          <p
                            className={cn(
                              "text-base leading-relaxed",
                              highContrast ? "text-gray-300" : "text-gray-700"
                            )}
                          >
                            {faq.answer}
                          </p>
                          <div className="mt-4 flex gap-4">
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
                              onClick={() => handleFeedback(faq.id, false)}
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
            ))}
          </div>
        )}

        {/* Pagination */}
        {!infiniteScroll && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}
          </div>
        )}

        {/* Live Chat Support */}
        <div className="fixed bottom-4 right-4 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-blue-600 text-white rounded-full shadow-lg"
            aria-label="Open live chat support"
            onClick={() => alert("Opening live chat... (Mock functionality)")}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AffiliateFAQSection;
