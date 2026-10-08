// Animation variants for background image movement
export const animationVariants = {
  "kenburns-left": {
    initial: { scale: 1.05, x: 0 },
    animate: { scale: 1.1, x: -20 },
  },
  "kenburns-right": {
    initial: { scale: 1.05, x: 0 },
    animate: { scale: 1.1, x: 20 },
  },
  "zoom-out": { initial: { scale: 1.1 }, animate: { scale: 1.0 } },
  static: { initial: { scale: 1 }, animate: { scale: 1 } },
};

// Button styles for reusability
export const BUTTON_VARIANTS = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  tertiary:
    "border border-white text-white hover:bg-white hover:text-black shadow-md",
  gradient:
    "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700",
};
