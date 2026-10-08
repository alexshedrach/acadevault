export const calculateUrgencyText = (deadline) => {
  if (!deadline) return { text: "Not Set", color: "text-gray-500" };
  const diff = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  if (diff <= 0) return { text: "Immediate", color: "text-red-600" };
  if (diff <= 3) return { text: "Rush", color: "text-orange-500" };
  if (diff <= 7) return { text: "Standard", color: "text-blue-500" };
  return { text: "Flexible", color: "text-green-500" };
};

export const calculateUrgencyMultiplier = (deadline) => {
  if (!deadline) return 1.0;
  const diffHours = (new Date(deadline) - new Date()) / (1000 * 60 * 60);
  if (diffHours <= 12) return 2.5; // Extreme rush
  if (diffHours <= 24) return 2.0;
  if (diffHours <= 72) return 1.5;
  if (diffHours <= 168) return 1.2;
  return 1.0;
};

export const wordCountFromText = (text) => {
  if (!text || typeof text !== "string") return 0;
  return text
    .trim()
    .split(/\s+/g) // Handles multiple types of whitespace
    .filter((word) => /^[a-zA-Z0-9]+$/.test(word)).length; // Filters non-word tokens
};

export const calculateWordCountFeedback = (wordCount, unitType) => {
  const words =
    unitType === "pages" ? (wordCount || 0) * WORDS_PER_PAGE : wordCount || 0;
  if (words <= 1000) return { text: "Small", color: "text-green-500" };
  if (words <= 3000) return { text: "Medium", color: "text-blue-500" };
  return { text: "Large", color: "text-red-500" };
};


// a function to validate deadline against project size to warn users if the deadline is unrealistic (e.g., 10,000 words in 1 day).
export const validateDeadlineFeasibility = (
  wordCount,
  deadline,
  complexity
) => {
  const diffDays = (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24);
  if (wordCount > 5000 && diffDays < 2 && complexity === "Complex") {
    return {
      isFeasible: false,
      message: "Complex projects over 5000 words require at least 2 days.",
    };
  }
  return { isFeasible: true };
};