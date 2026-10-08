import { ACADEMIC_DEGREES, ACADEMIC_LEVELS } from '../constants/enums.js';

// Function to Get Degrees by Academic Level
export const getDegreesByLevel = (level) => {
  if (!Object.values(ACADEMIC_LEVELS).includes(level)) {
    throw new Error(`Invalid academic level: ${level}`);
  }
  return Object.entries(ACADEMIC_DEGREES)
    .filter(([, degree]) => degree.level === level) // Only filter by the degree object
    .map(([code, degree]) => ({ code, ...degree })); // Keep the degree code in the output
};
