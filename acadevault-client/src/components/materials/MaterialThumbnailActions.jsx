"use client";

import Link from "next/link";
import Image from "next/image";
import { StatusTag } from "@/components/common/StatusTag";
import HoverableActionBar from "@/components/ui/HoverableActionBar";
import { getImageUrl } from "@/utils/getImageUrl";
import { memo } from "react";
import PropTypes from "prop-types";

export const Thumbnail = memo(function Thumbnail({
  slug,
  title,
  thumbnail,
  promoTag,
  isFree,
  material,
  showActions,
  onWishlist,
  onCompare,
  onAddToCart,
  onQuickView,
}) {

  const materialId = material._id
  

  return (
    <div className="relative w-full h-[160px]">
      {/* Thumbnail Image */}
      <Link
        href={`/materials/${slug}`}
        target="_blank"
        className="block w-full h-full"
      >
        <Image
          src={getImageUrl(thumbnail)}
          alt={title || "Academic Material"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </Link>

      {/* Status Tag (e.g. “Sale” or “Free”) */}
      {promoTag && (
        <StatusTag
          label={promoTag.label}
          type={promoTag.type}
          position="bottom-right"
          animation
        />
      )}

      {/* Hoverable Action Bar (with independent ContextMenu trigger) */}
      {showActions && (
        <HoverableActionBar
          isFree={isFree}
          onWishlist={() => onWishlist?.(materialId)}
          onCompare={() => onCompare?.(materialId)}
          onAddToCart={() => onAddToCart?.(materialId)}
          onQuickView={() => onQuickView?.(material)}
        />
      )}
    </div>
  );
});

Thumbnail.displayName = "Thumbnail";
Thumbnail.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  promoTag: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
  }),
  isFree: PropTypes.bool,
  showActions: PropTypes.bool,
  onWishlist: PropTypes.func,
  onCompare: PropTypes.func,
  onAddToCart: PropTypes.func,
  materialId: PropTypes.string.isRequired,
};
