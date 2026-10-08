// Calculate estimated delivery based on urgency multiplier
export const getEstimatedDelivery = (deadline, multiplier) => {
  if (!deadline) return "TBD";
  const date = new Date(deadline);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
