import { useMemo } from "react";

/**
 * Default objectives to fall back on when none are provided.
 */
const DEFAULT_LEARNING_OBJECTIVES = [
  "Become an advanced, confident, and modern React developer from scratch",
  "Become job-ready by working with libraries and tools used in professional projects",
  "Think like a senior React engineer with advanced design patterns",
  "State management: thinking about state, where to place, local vs. global, UI vs. remote",
  "Build 10+ beautiful projects, including two HUGE professional real-world apps",
  "Join my other 1,900,000+ happy students on this journey",
  "Next.js 'App' router with cutting-edge React Server Components + Server Actions",
  "Build reusable, composable, and versatile components",
  "Build many custom hooks, reusable in your future projects",
];

/**
 * @typedef MaterialDetail
 * @property {string[]} [learningObjectives] – An optional array of goals provided by the API.
 */

/**
 * Custom hook to retrieve or default the list of learning objectives.
 *
 * @param {MaterialDetail | null | undefined} materialDetail
 * @returns {string[]} A non-empty array of learning objectives.
 */
export function useLearningObjectives(
  materialDetail
) {
  return useMemo(() => {
    const { learningObjectives } = materialDetail ?? {};

    // Only accept a non-empty array of strings; otherwise, use defaults.
    if (
      Array.isArray(learningObjectives) &&
      learningObjectives.length > 0 &&
      learningObjectives.every((item) => typeof item === "string" && item.trim() !== "")
    ) {
      return learningObjectives;
    }

    return DEFAULT_LEARNING_OBJECTIVES;
  }, [materialDetail]);
}
