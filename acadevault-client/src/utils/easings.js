export const easeInQuad = (t) => t * t;
export const easeOutQuad = (t) => t * (2 - t);
export const easeInOutQuad = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export const easeOutCubic = (t) => --t * t * t + 1;
export const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
