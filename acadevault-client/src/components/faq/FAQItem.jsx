"use client";

import React, { useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * FAQItem
 *
 * A single question/answer pair that can expand or collapse.
 */
export default function FAQItem({ faq, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div
      id={`faq-item-${faq.id}`}
      className="border border-gray-300 shadow-sm rounded-md"
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className="w-full flex justify-between items-center px-5 py-4
                   text-gray-800 hover:text-blue-600 focus:outline-none"
      >
        <span className="font-medium text-lg">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown />
        </motion.div>
      </button>

      {/* Answer Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden text-gray-600 px-5 pb-4"
          >
            <p ref={contentRef}>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

FAQItem.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
