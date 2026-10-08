"use client";

import { useState, useEffect, useRef } from "react";

export default function ShopDescription({
  text = "",
  sentenceCount = 2,
  readMore = true,
  showFade = false,
  fadeHeight = 100,
  className = "",
  textClassName = "",
  toggleClassName = "",
}) {
  const [expanded, setExpanded] = useState(false);
  const [shouldFade, setShouldFade] = useState(false);
  const contentRef = useRef(null);

  // Extract full sentences
  const splitSentences = text.match(/[^.!?]+[.!?]+[\])'"`’”]*|\s*$/g) || [];
  const isLong = splitSentences.length > sentenceCount;
  const truncatedText = splitSentences.slice(0, sentenceCount).join(" ").trim();

  useEffect(() => {
    if (showFade && contentRef.current && !expanded) {
      setShouldFade(contentRef.current.scrollHeight > fadeHeight);
    }
  }, [text, sentenceCount, expanded, showFade, fadeHeight]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={contentRef}
        className={`transition-all duration-500 ease-in-out ${
          expanded
            ? "max-h-[1000px]"
            : showFade
            ? `max-h-[${fadeHeight}px] overflow-hidden`
            : ""
        }`}
      >
        <p
          className={`text-base leading-relaxed whitespace-pre-line ${textClassName}`}
        >
          {expanded || !isLong ? text : truncatedText}
        </p>
      </div>

      {/* Optional Fade Effect */}
      {showFade && !expanded && shouldFade && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}

      {/* Toggle */}
      {readMore && isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`mt-2 text-sm font-semibold text-violet-600 hover:underline flex items-center gap-1 ${toggleClassName}`}
        >
          {expanded ? "Show less" : "Read more"}
          <span className="text-lg">{expanded ? "▲" : "▼"}</span>
        </button>
      )}
    </div>
  );
}
