import React from "react";

export const StarFull = ({ size, color }) => (
  <svg
    fill={color}
    stroke={color}
    viewBox="0 0 20 20"
    width={size}
    height={size}
  >
    <path d="M10 15l-5.878 3.09L5.82 12.5 1.64 8.41l6.092-.88L10 2.5l2.268 5.03 6.092.88-4.18 4.09 1.698 5.59z" />
  </svg>
);



export const StarHalf= ({ size, color }) => (
  <svg viewBox="0 0 20 20" width={size} height={size}>
    <defs>
      <linearGradient id="halfGradient">
        <stop offset="50%" stopColor={color} />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      fill="url(#halfGradient)"
      stroke={color}
      d="M10 15l-5.878 3.09L5.82 12.5 1.64 8.41l6.092-.88L10 2.5l2.268 5.03 6.092.88-4.18 4.09 1.698 5.59z"
    />
  </svg>
);


export const StarEmpty = ({ size, color }) => (
  <svg
    fill="none"
    stroke={color}
    viewBox="0 0 20 20"
    width={size}
    height={size}
  >
    <path d="M10 15l-5.878 3.09L5.82 12.5 1.64 8.41l6.092-.88L10 2.5l2.268 5.03 6.092.88-4.18 4.09 1.698 5.59z" />
  </svg>
);
