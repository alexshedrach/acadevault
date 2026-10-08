"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Search } from "lucide-react";
import { fetchVendorFAQs } from "@/data/fetchVendorFAQsData";

// --- 1) Custom hook for fetching + debounced search ---
function useFAQs(fetcher, delay = 300) {
  const [faqs, setFaqs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetcher()
      .then((data) => {
        if (mounted) {
          setFaqs(data);
          setFiltered(data);
        }
      })
      .catch(() => {
        if (mounted) setError("Could not load FAQs. Try again later.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [fetcher]);

  // Debounced filter
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query.trim()) {
        setFiltered(faqs);
      } else {
        const q = query.toLowerCase();
        setFiltered(
          faqs
            .map((cat) => ({
              ...cat,
              questions: cat.questions.filter(
                (f) =>
                  f.question.toLowerCase().includes(q) ||
                  f.answer.toLowerCase().includes(q)
              ),
            }))
            .filter((cat) => cat.questions.length > 0)
        );
      }
    }, delay);
    return () => clearTimeout(handler);
  }, [query, faqs, delay]);

  return { filtered, query, setQuery, loading, error };
}

// --- 2) Search bar component ---
function SearchBar({ value, onChange }) {
  return (
    <div className="max-w-xl mx-auto mb-8">
      <label htmlFor="faq-search" className="sr-only">
        Search FAQs
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          id="faq-search"
          type="search"
          placeholder="Search FAQs..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

// --- 3) Accordion item (question + answer) ---
const accordionVariants = {
  collapsed: { opacity: 0, height: 0 },
  open: { opacity: 1, height: "auto" },
};

function AccordionItem({ id, question, answer, isOpen, onToggle }) {
  const buttonRef = useRef(null);

  // Handle Enter/Space to toggle
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        onClick={() => onToggle(id)}
        onKeyDown={handleKeyDown}
        className="w-full px-5 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 text-blue-500"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-button-${id}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={accordionVariants}
            transition={{ duration: 0.3 }}
            className="px-5 pb-5 text-gray-700"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- 4) Individual category section ---
function CategoryAccordion({ category, faqs, activeId, onToggle }) {
  return (
    <section aria-labelledby={`cat-${category}`} className="space-y-4">
      <h3
        id={`cat-${category}`}
        className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-1"
      >
        {category}
      </h3>
      <div className="space-y-2">
        {faqs.map((f) => (
          <AccordionItem
            key={f.id}
            id={f.id}
            question={f.question}
            answer={f.answer}
            isOpen={activeId === f.id}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}

// --- 5) Skeleton loader for FAQs ---
function FAQSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-6 bg-gray-200 rounded animate-pulse mb-4"
          style={{ width: `${80 + i * 5}%` }}
        />
      ))}
    </div>
  );
}

// --- 6) Main VendorsFAQSection ---
export default function VendorsFAQSection() {
  const { filtered, query, setQuery, loading, error } =
    useFAQs(fetchVendorFAQs);
  const [activeId, setActiveId] = useState(null);

  const handleToggle = useCallback(
    (id) => setActiveId((prev) => (prev === id ? null : id)),
    []
  );

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <HelpCircle className="w-10 h-10 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about becoming an AcadeVault
              vendor.
            </p>
          </motion.div>
        </div>

        <SearchBar value={query} onChange={setQuery} />

        {loading ? (
          <FAQSkeleton />
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-600">
            No FAQs match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filtered.map((cat) => (
              <CategoryAccordion
                key={cat.category}
                category={cat.category}
                faqs={cat.questions}
                activeId={activeId}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
