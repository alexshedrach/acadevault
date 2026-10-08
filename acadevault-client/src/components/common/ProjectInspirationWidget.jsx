"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Lightbulb, AlertCircle } from "lucide-react";
import { cn } from "@/utils/cn";

const sampleTitles = [
  "The Impact of Climate Change on Coastal Ecosystems",
  "Analyzing Machine Learning Algorithms for Predictive Analytics",
  "Exploring the Role of Social Media in Modern Political Campaigns",
  "A Comparative Study of Renewable Energy Adoption in Europe",
  "The Psychological Effects of Remote Work on Employee Productivity",
];

const tips = [
  "Be specific: Include key concepts or focus areas in your title.",
  "Keep it concise: Aim for 10-15 words to clearly convey your topic.",
  "Use strong keywords: Reflect the main theme or discipline of your project.",
  "Avoid jargon: Ensure your title is clear to a broad academic audience.",
];

export default function ProjectInspirationWidget({ topic, email }) {
  const [suggestions, setSuggestions] = useState([]);
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const [isLoading, setIsLoading] = useState(false); // Placeholder for loading state
  const [error, setError] = useState(null); // Placeholder for error state

  // Simulate dynamic suggestions based on topic input
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call or processing delay
    const timeout = setTimeout(() => {
      const keywords = topic.toLowerCase().split(" ");
      const filteredSuggestions = sampleTitles
        .filter((title) =>
          keywords.some((keyword) => title.toLowerCase().includes(keyword))
        )
        .slice(0, 3); // Limit to 3 suggestions

      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : sampleTitles.slice(0, 3) // Fallback to random titles
      );
      setIsLoading(false);
    }, 500); // Simulated delay
    return () => clearTimeout(timeout);
  }, [topic]);

  // Rotate tips every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Suggest discipline based on email domain
  const suggestedDiscipline = email.includes(".edu")
    ? "Academic Research (e.g., Social Sciences, STEM)"
    : "General Academic Writing";

  return (
    <motion.fieldset
      className={cn(
        "bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200",
        "space-y-5 text-gray-700 h-full"
      )}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="complementary"
      aria-label="Project inspiration and tips"
    >
      <legend className="text-lg font-semibold text-gray-900 flex items-center gap-2 px-2">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        Project Inspiration
      </legend>

      <div className="space-y-4 -mt-4">
        {/* Suggestions Section */}
        <div>
          <p className="text-sm font-semibold text-gray-800">Suggested Titles</p>
          {isLoading ? (
            <div className="mt-2 space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-5 bg-gray-200 rounded animate-pulse"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : error ? (
            <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          ) : (
            <ul className="mt-2 space-y-2 text-sm">
              <AnimatePresence>
                {suggestions.map((title, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2"
                  >
                    <BookOpen className="w-4 h-4 mt-0.5 text-gray-500" />
                    <span>{title}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* Tip Section */}
        <div>
          <p className="text-sm font-medium text-gray-800">Tip of the Moment</p>
          <motion.p
            key={currentTip}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-sm text-gray-600 italic"
          >
            {currentTip}
          </motion.p>
        </div>

        {/* Discipline Suggestion */}
        <div>
          <p className="text-sm font-medium text-gray-800">
            Suggested Discipline
          </p>
          <p className="mt-2 text-sm text-gray-600">{suggestedDiscipline}</p>
        </div>
      </div>
    </motion.fieldset>
  );
}
