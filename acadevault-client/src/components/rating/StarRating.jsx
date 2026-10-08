import React from "react";
import { useRating } from "./useRating";
import { StarButton } from "./StarButton";

export const StarRatingDisplay = ({
  average,
  count,
  maxStars = 5,
  size = 24,
  color = "#facc15",
  inactiveColor = "#d1d5db",
}) => {
  const { getType } = useRating({
    value: average,
    maxStars,
    readOnly: true,
    allowHalf: true,
  });
  return (
    <div
      className="flex items-center space-x-1 select-none cursor-default"
      role="img"
      aria-label={`Rating: ${average} out of ${maxStars}`}
    >
      {Array.from({ length: maxStars }, (_, i) => (
        <StarButton
          key={i}
          index={i + 1}
          type={getType(i)}
          size={size}
          color={color}
          inactiveColor={inactiveColor}
          readOnly
          glow={false}
          animate={false}
          showTooltip={false}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          onClick={() => {}}
        />
      ))}
      <span className="ml-2 text-sm">({count})</span>
    </div>
  );
};

export const StarRatingInput = ({
  value = 0,
  onChange,
  maxStars = 5,
  size = 24,
  color = "#facc15",
  inactiveColor = "#d1d5db",
  glow = false,
  animate = true,
  showTooltip = true,
}) => {
  const { rating, hover, setHover, getType, handleClick } = useRating({
    value,
    maxStars,
    allowHalf: true,
    readOnly: false,
    onChange,
  });

  return (
    <div
      className="flex items-center space-x-1 select-none cursor-pointer"
      role="radiogroup"
      aria-label={`Rating: ${rating} out of ${maxStars}`}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const idx = i + 1;
        const type = getType(i);
        return (
          <StarButton
            key={i}
            index={idx}
            type={type}
            size={size}
            color={color}
            inactiveColor={inactiveColor}
            readOnly={false}
            glow={glow}
            animate={animate}
            showTooltip={showTooltip}
            onMouseEnter={() => setHover(idx)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleClick(idx)}
          />
        );
      })}
    </div>
  );
};


// 🔗 5. Usage

// import React, { useState, useEffect } from "react";
// import { StarRatingDisplay, StarRatingInput } from "@/components/rating";

// const MaterialPage = ({ id }) => {
//   const [avg, setAvg] = useState(0);
//   const [count, setCount] = useState(0);
//   const [userRating, setUserRating] = useState<number | null>(null);

//   useEffect(() => {
//     // fetch average & count
//     fetch(`/api/material/${id}/stats`)
//       .then(r => r.json())
//       .then(({ average, reviews }) => {
//         setAvg(average);
//         setCount(reviews);
//       });
//     // fetch user's rating (if any)
//     fetch(`/api/material/${id}/my-rating`)
//       .then(r => r.json())
//       .then(({ rating }) => setUserRating(rating));
//   }, [id]);

//   const handleUserRate = (newRating: number) => {
//     fetch(`/api/material/${id}/rate`, {
//       method: "POST",
//       body: JSON.stringify({ rating: newRating }),
//       headers: { "Content-Type": "application/json" },
//     }).then(() => {
//       setUserRating(newRating);
//       // optionally re-fetch stats to update avg & count
//     });
//   };

//   return (
//     <div>
//       <h1>Material Title</h1>
//       <StarRatingDisplay average={avg} count={count} />
//       <h2>Your Rating</h2>
//       <StarRatingInput
//         value={userRating ?? 0}
//         onChange={handleUserRate}
//       />
//     </div>
//   );
// };

// export default MaterialPage;