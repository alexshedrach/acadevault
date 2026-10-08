import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";

const MinimalMaterialCard = ({ material, onClick }) => {
  const imageUrl = getImageUrl(material.thumbnail);
  const title = material.title;
  const rating = material.rating || 4.5;
  const reviews = material.numReviews || 200;
  const finalPrice = material.finalPrice?.formatted || "₦0";
  const totalHours = material.duration || "0 total hours";
  const updated = material.updated || "Updated N/A";

  return (
    <div
      onClick={onClick}
      className="w-72 shrink-0 cursor-pointer rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative h-36 w-full rounded-md overflow-hidden mb-3">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold leading-tight text-gray-800 line-clamp-2 mb-1">
        {title}
      </h3>

      {/* Duration & Update */}
      <div className="text-xs text-gray-600 mb-1">
        {totalHours} • {updated}
      </div>

      {/* Rating */}
      <div className="flex items-center text-sm text-yellow-600 font-medium gap-1 mb-1">
        <span>{rating.toFixed(1)}</span>
        <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-500" />
        <span className="text-gray-500 text-xs">
          ({reviews.toLocaleString()})
        </span>
      </div>

      {/* Price */}
      <div className="text-right text-base font-bold text-gray-800">
        {finalPrice}
      </div>
    </div>
  );
};

export default MinimalMaterialCard;
