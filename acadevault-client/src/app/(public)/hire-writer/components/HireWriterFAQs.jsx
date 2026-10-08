"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const allFaqs = [
  {
    question: "How do I hire a writer?",
    answer:
      "Click “Start Your Project,” complete the brief with your requirements, and we’ll match you to a vetted expert in your field.",
  },
  {
    question: "How can I be sure of originality?",
    answer:
      "Every paper is crafted from scratch and comes with a detailed plagiarism report for your peace of mind.",
  },
  {
    question: "Can I communicate with my writer?",
    answer:
      "Yes—message your assigned writer directly through our secure platform and monitor progress in real time.",
  },
  {
    question: "What if I need revisions?",
    answer:
      "You get unlimited revisions within 14 days of delivery; simply request changes and we’ll refine until it’s perfect.",
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Absolutely—your information is encrypted end-to-end, never shared, and fully GDPR compliant.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers. All transactions are securely processed.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "You can cancel within 24 hours of placing your order for a full refund. After that, refunds are prorated based on work completed.",
  },
  {
    question: "Do you offer bulk discounts?",
    answer:
      "Yes! For large-volume projects or recurring orders, contact our sales team at sales@acadevault.com for special pricing.",
  },
];

export default function HireWriterFAQs() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [filter, setFilter] = useState("");

  // Filtered list
  const faqs = useMemo(
    () =>
      allFaqs.filter(({ question, answer }) => {
        const term = filter.toLowerCase();
        return (
          question.toLowerCase().includes(term) ||
          answer.toLowerCase().includes(term)
        );
      }),
    [filter]
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Frequently Asked Questions
        </h2>

        {/* Search / Filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200  bg-gray-50  text-gray-800  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.length ? (
            faqs.map((item, idx) => {
              const isOpen = idx === activeIndex;
              return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left bg-gray-50  hover:bg-gray-100 focus:outline-none"
                  >
                    <span className="font-medium text-gray-900">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { height: "auto", opacity: 1 },
                          collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="px-4 pb-4 bg-white text-gray-700"
                      >
                        <p className="leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">
              No FAQs match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
