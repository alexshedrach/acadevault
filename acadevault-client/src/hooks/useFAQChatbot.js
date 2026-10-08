import { useState, useRef, useEffect, useCallback } from "react";
import { fuzzyAnswer } from "@/lib/faqs/fetchFAQs";

export function useFAQChatbot({
  faqs,
  fallbackFAQs = [],
  aiFallback,
  responseDelay = 500,
  fuzzyMatch = false,
}) {
  // Choose the authoritative source: resource-specific or global fallback
  const activeFAQs = faqs.length ? faqs : fallbackFAQs;

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);

  // Auto‑scroll on new messages or typing indicator
  useEffect(() => {
    const c = containerRef.current;
    if (c) c.scrollTop = c.scrollHeight;
  }, [messages, isTyping]);

  const sendQuestion = useCallback(
    async (text) => {
      const question = text.trim();
      if (!question) return;

      // 1) Append the user’s question
      setMessages((prev) => [...prev, { type: "user", text: question }]);
      setIsTyping(true);

      // 2) Try exact match
      const direct = activeFAQs.find((f) =>
        f.question.toLowerCase().includes(question.toLowerCase())
      );

      let answer;

      if (direct) {
        // Exact FAQ found
        answer = direct.answer;
      } else if (aiFallback) {
        // Ask your AI service
        try {
          answer = await aiFallback(question);
        } catch (err) {
          console.error("AI fallback failure:", err);
          answer =
            "Sorry, I’m having trouble right now. Please try again later.";
        }
      } else if (fuzzyMatch && activeFAQs.length) {
        // Use Fuse.js fuzzy matching
        answer = fuzzyAnswer(question, activeFAQs);
      } else if (!activeFAQs.length) {
        // No FAQs at all
        answer = "No FAQs are available for this resource.";
      } else {
        // No match
        answer =
          "I couldn’t find a matching FAQ. Please try rephrasing your question.";
      }

      // 3) Simulate typing delay, then append bot response
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: answer }]);
        setIsTyping(false);
      }, responseDelay);
    },
    [activeFAQs, aiFallback, responseDelay, fuzzyMatch]
  );

  return {
    messages,
    isTyping,
    containerRef,
    sendQuestion,
    activeFAQs,
  };
}
