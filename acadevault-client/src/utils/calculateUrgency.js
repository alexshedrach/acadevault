export const calculateUrgencyText = (deadline) => {
  if (!deadline) return { text: "Not Set", color: "text-gray-500" };
  const diff = Math.ceil(
    (new Date(deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );
  if (diff <= 0) return { text: "Immediate", color: "text-red-600" };
  if (diff <= 3) return { text: "Rush", color: "text-orange-500" };
  if (diff <= 7) return { text: "Standard", color: "text-blue-500" };
  return { text: "Flexible", color: "text-green-500" };
};

export const calculateUrgencyMultiplier = (deadline) => {
  if (!deadline) return 1.0;
  const end = new Date(deadline);
  const today = new Date();
  const diff = Math.ceil(
    (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff <= 0) return 2.0;
  if (diff <= 3) return 1.5;
  if (diff <= 7) return 1.2;
  return 1.0;
};
