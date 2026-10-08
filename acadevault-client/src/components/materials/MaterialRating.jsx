"use client";

import { StarRatingDisplay } from "@/components/rating/StarRating";
import { ThumbsUp, MessageCircle } from "lucide-react";

const MaterialRating = ({
  rating = 0,
  numReviews = 0,
likes = 0,
  comments = 0,
  onRate = null,
  materialId = "",
  className = "",
}) => {
  return (
    <div
      className={`flex gap-6 justify-between items-center text-sm text-gray-600 ${className}`}
    >
      <StarRatingDisplay
        average={rating}
        count={numReviews}
        size={18}
        color="#facc15"
        inactiveColor="#d1d5db"
      />
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          title="Like this material"
          onClick={() => onRate?.("upvote", materialId)}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="hidden sm:inline">{likes}</span>
        </button>

        <button
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          title="Leave a comment"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">{comments}</span>
        </button>
      </div>
    </div>
  );
};

export default MaterialRating;
