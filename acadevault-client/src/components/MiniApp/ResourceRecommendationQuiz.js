"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { fadeIn, cardVariants } from "@/lib/animations";
import useAnalytics from "@/hooks/useAnalytics";

const questions = [
  {
    id: "subject",
    question: "What subject are you studying?",
    options: [
      "Mathematics",
      "Physics",
      "Literature",
      "Computer Science",
      "Other",
    ],
    type: "select",
  },
  {
    id: "level",
    question: "What is your academic level?",
    options: ["High School", "Undergraduate", "Graduate", "Professional"],
    type: "select",
  },
  {
    id: "goal",
    question: "What is your learning goal?",
    options: [
      "Exam Preparation",
      "Research",
      "Skill Development",
      "General Knowledge",
    ],
    type: "select",
  },
];

// Mock resource recommendations based on answers
const getRecommendations = (answers) => {
  return [
    {
      title: `Introduction to ${answers.subject || "Your Subject"}`,
      description: `A comprehensive guide for ${
        answers.level || "your level"
      } students.`,
      link: `/resources/${(answers.subject || "subject").toLowerCase()}`,
    },
    {
      title: `${answers.goal || "Your Goal"} Resource Pack`,
      description: `Curated materials to support ${
        answers.goal || "your goal"
      }.`,
      link: `/resources/${(answers.goal || "goal")
        .toLowerCase()
        .replace(" ", "-")}`,
    },
  ];
};

const ResourceRecommendationQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const { trackEvent } = useAnalytics();

  const handleAnswer = (value) => {
    setError("");
    setAnswers({ ...answers, [questions[step].id]: value });
    trackEvent("quiz_answer", { question: questions[step].id, answer: value });
  };

  const handleNext = () => {
    if (!answers[questions[step].id]) {
      setError("Please select an option");
      trackEvent("quiz_error", { error: "No option selected", step });
      return;
    }
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const recommendations = getRecommendations(answers);
      setResults(recommendations);
      trackEvent("quiz_completed", { answers });
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
    setError("");
    trackEvent("quiz_restarted");
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <motion.div
      className="p-6 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-blue-600" />
        Resource Recommendation Quiz
      </h3>
      {!results ? (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
            >
              <h4 className="text-lg font-medium text-gray-700 mb-4">
                {questions[step].question}
              </h4>
              <div className="space-y-2">
                {questions[step].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={cn(
                      "w-full p-3 rounded-lg text-left",
                      answers[questions[step].id] === option
                        ? "bg-blue-600 text-white"
                        : "bg-white/50 hover:bg-gray-100"
                    )}
                    aria-label={`Select ${option}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          {error && (
            <p className="text-red-500 text-sm" role="alert">
              {error}
            </p>
          )}
          <button
            onClick={handleNext}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            aria-label={
              step < questions.length - 1 ? "Next question" : "See results"
            }
          >
            {step < questions.length - 1 ? "Next" : "See Results"}{" "}
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-700">
            Recommended Resources
          </h4>
          {results.map((resource, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={idx}
              className="p-4 bg-white/50 rounded-lg"
            >
              <a
                href={resource.link}
                className="font-semibold text-blue-600 hover:underline"
                aria-label={`View ${resource.title}`}
              >
                {resource.title}
              </a>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </motion.div>
          ))}
          <button
            onClick={handleRestart}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            aria-label="Restart quiz"
          >
            Take Quiz Again
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ResourceRecommendationQuiz;
