"use client";

import React from "react";
import { Info } from "lucide-react";

export default function FAQSuggestions({
  faqs = [],
  onClick,
  maxSuggestions = 5,
}) {
  if (!faqs.length) {
    return (
      <div className="flex items-center gap-2 text-sm italic text-gray-500">
        <Info size={16} /> No suggestions available.
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {faqs.slice(0, maxSuggestions).map((f, i) => (
        <button
          key={i}
          onClick={() => onClick(f.question)}
          className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          {f.question}
        </button>
      ))}
    </div>
  );
}
