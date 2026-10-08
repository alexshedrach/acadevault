"use client";

import React, { useState } from "react";
import { ThumbsUp, Flag, ShieldCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/Button";
import Avatar from "../common/Avatar";
import { StarRatingDisplay } from "../rating/StarRating";

export default function ReviewCard({ review }) {
  const { user = {}, rating, comment, createdAt, verified, platform } = review;
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "just now";

  const isLongComment = comment.length > 200;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-md border p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatarUrl || "/avatars/default-avatar.png"}
            name={user.name}
            size="md"
            status={user.status}
            fallback={user.name}
            className="ring-1 ring-gray-200"
          />
          <div className="flex flex-col">
            <p
              className="font-semibold text-sm text-gray-900 truncate max-w-[140px]"
              title={user.name}
            >
              {user.name || "Anonymous"}
            </p>
            <p className="text-xs text-gray-400">{formattedTime}</p>
          </div>
        </div>
      </div>
      <StarRatingDisplay
        average={rating}
        count={0}
        maxStars={5}
        size={20}
        color="#facc15"
        inactiveColor="#d1d5db"
      />

      {/* Comment Body */}
      <div className="text-sm text-gray-700 leading-relaxed mb-4 break-words">
        {isLongComment ? (
          <>
            {isExpanded ? comment : comment.slice(0, 200) + "... "}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-600 hover:underline text-xs ml-1"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          </>
        ) : (
          comment
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          {verified && (
            <span
              className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full"
              title="Verified Purchase"
            >
              <ShieldCheck className="w-4 h-4" />
              Verified
            </span>
          )}
          {platform && (
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full italic">
              {platform}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Mark review as helpful"
            title="Helpful"
          >
            <ThumbsUp className="w-5 h-5 text-gray-400 hover:text-blue-500" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            aria-label="Report review"
            title="Report"
          >
            <Flag className="w-5 h-5 text-gray-400 hover:text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
}
