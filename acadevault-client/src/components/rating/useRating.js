"use client";
import { useState, useEffect, useCallback } from "react";

export function useRating({
  value = 0,
  maxStars = 5,
  allowHalf = true,
  readOnly = false,
  onChange,
}) {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const getType = useCallback(
    (index) => {
      const idx = index + 1;
      if (idx <= rating) return "full";
      if (allowHalf && rating >= idx - 0.5 && rating < idx) return "half";
      return "empty";
    },
    [rating, allowHalf]
  );

  const handleClick = useCallback(
    (index) => {
      if (readOnly || !onChange) return;
      const newRating =
        allowHalf && hover === index - 0.5 ? index - 0.5 : index;
      setRating(newRating);
      onChange(newRating);
    },
    [hover, allowHalf, onChange, readOnly]
  );

  return { rating, hover, setHover, getType, handleClick };
}
