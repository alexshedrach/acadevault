export const getWriterTier = (writer) => {
  // Guard clause for invalid input
  if (
    !writer ||
    typeof writer.rating !== "number" ||
    typeof writer.completedProjects !== "number"
  ) {
    return { label: "Unknown", color: "bg-gray-500 text-white" };
  }

  if (writer.rating >= 4.9 && writer.completedProjects >= 150) {
    return { label: "Elite Writer", color: "bg-yellow-400 text-black" };
  } else if (writer.rating >= 4.7 && writer.completedProjects >= 100) {
    return { label: "Top Rated", color: "bg-gray-300 text-black" };
  }
  return { label: "Trusted", color: "bg-orange-300 text-black" };
};
