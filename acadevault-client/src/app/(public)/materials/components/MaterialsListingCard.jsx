"use client";

import useEffectivePrice from "@/hooks/useEffectivePrice";
import React, { useMemo } from "react";
import ContextMenu from "@/components/ui/ContextMenu";
import HoverableActionBar from "@/components/ui/HoverableActionBar";
import { getDefaultContextMenuItems } from "@/helpers/getDefaultContextMenuItems";
import MaterialShopInfo from "@/components/materials/MaterialShopInfo";

import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { getPromotionTag } from "@/utils/getPromotionTag";
import { StatusTag } from "@/components/common/StatusTag";

import { ThumbsUp, MessageCircle } from "lucide-react";
import { StarRatingDisplay } from "@/components/rating/StarRating";

import PriceDisplay from "@/components/common/PriceDisplay";
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { ExternalLink, Heart, Scale, ShoppingCart } from "lucide-react";

const CardActions = ({
  slug,
  finalPrice,
  isFree,
  loading,
  hasDiscount,
  variant,
  onWishlist,
  onCompare,
  onAddToCart,
}) => {
  const isList = variant === "list";
  const isCompact = variant === "compact";

  return (
    <div
      className={cn("flex items-center justify-between", {
        "pt-4 border-t border-gray-200 mt-4": variant === "grid",
        "flex-col sm:flex-row sm:items-center gap-0 pt-2 border-t border-gray-100 mt-4":
          isList,
        "justify-between p-2": isCompact,
      })}
    >
      {/* Price */}
      <div className="flex items-center gap-2">
        <PriceDisplay
          finalPrice={finalPrice}
          isFree={isFree}
          loading={loading}
          className="items-start"
        />
        {hasDiscount && !isCompact && (
          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase">
            Save {finalPrice.discountPercent}%
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isCompact ? (
          <Link
            href={`/materials/${slug}`}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View
          </Link>
        ) : (
          <>
            <Link href={`/materials/${slug}`}>
              <Button size="sm" className="flex items-center gap-1">
                View Material <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>

            {!isFree && (
              <>
                {isList && (
                  <>
                    <TooltipWrapper label="Wishlist" position="top">
                      <button
                        onClick={onWishlist}
                        className="p-2 rounded-full border"
                      >
                        <Heart className="w-4 h-4 text-gray-500" />
                      </button>
                    </TooltipWrapper>
                    <TooltipWrapper label="Compare" position="top">
                      <button
                        onClick={onCompare}
                        className="p-2 rounded-full border"
                      >
                        <Scale className="w-4 h-4 text-gray-500" />
                      </button>
                    </TooltipWrapper>
                    <TooltipWrapper label="Add to Cart" position="top">
                      <button
                        onClick={onAddToCart}
                        className="p-2 rounded-full border"
                      >
                        <ShoppingCart className="w-4 h-4 text-gray-500" />
                      </button>
                    </TooltipWrapper>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const CardInfo = ({
  title,
  slug,
  department,
  academicLevel,
  academicDegree,
  materialType,
  deliveryFormat,
  digitalContent,
  summary,
  description,
  rating,
  numReviews,
  analytics,
  variant,
  onRate,
}) => {
  const deptName = department?.name ?? "Unknown Department";
  const level = academicLevel ?? "Unknown Level";
  const degree = academicDegree ?? "N/A";
  const typeLabel = materialType ?? "Material";
  const deliveryLabel =
    deliveryFormat === "digital" ? "Digital Download" : "Physical Copy";
  const pageCount = digitalContent?.pageCount ?? "N/A";
  const statsUp = analytics?.upvotes ?? 0;
  const statsComments = analytics?.purchases ?? 0;
  const isCompact = variant === "compact";

  const summaryText =
    variant === "grid"
      ? summary || description || ""
      : variant === "list"
      ? (description?.slice(0, 120) ?? "") + "..."
      : "";

  return (
    <div
      className={
        isCompact ? "p-2" : variant === "grid" ? "p-4" : "flex-1 space-y-2"
      }
    >
      <h3
        className={`font-semibold text-gray-900 ${
          isCompact ? "text-base" : "text-lg"
        } line-clamp-2`}
      >
        {title}
      </h3>

      {!isCompact && (
        <div className="text-xs text-gray-500">
          {deptName} • {degree} ({level})
        </div>
      )}

      {(variant === "grid" || variant === "list") && summaryText && (
        <p
          className={`text-sm text-gray-600 ${
            variant === "grid" ? "line-clamp-2" : ""
          }`}
        >
          {summaryText}
          {variant === "list" && (
            <Link href={`/materials/${slug}`} target="_blank">
              <span className="text-blue-600 hover:underline ml-1">
                Read more
              </span>
            </Link>
          )}
        </p>
      )}

      <div className="text-xs text-gray-500">
        {typeLabel} • {deliveryLabel} • {pageCount} pages
      </div>

      {!isCompact && (
        <div className="flex items-center justify-between mt-2">
          <StarRatingDisplay
            average={rating}
            count={numReviews}
            size={18}
            color="#facc15"
            inactiveColor="#d1d5db"
          />
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <button
              onClick={() => onRate?.("upvote")}
              title="Like"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="hidden sm:inline">{statsUp}</span>
            </button>
            <button
              title="Purchases"
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{statsComments}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MaterialsListingCard = ({
  material,
  variant = "grid",
  contextMenuItems,
  onWishlist,
  onCompare,
  onAddToCart,
  onRate,

  // Slots for advanced overrides
  renderThumbnail,
  renderInfo,
  renderActions,
  renderShopInfo,
}) => {
  const {
    _id: id,
    slug,
    title,
    thumbnail,
    department,
    academicLevel,
    academicDegree,
    materialType,
    deliveryFormat,
    digitalContent,
    summary,
    description,
    price: basePrice,
    rating = 0,
    numReviews = 0,
    analytics = {},
    shop,
  } = material;

  // price logic...
  const { price: finalPrice, loading } = useEffectivePrice({
    materialId: id,
    materialType,
  });
  const isFree = finalPrice?.amount === 0;
  const hasDiscount =
    typeof finalPrice?.originalAmount === "number" &&
    finalPrice.amount < finalPrice.originalAmount;

  const isGrid = variant === "grid";

  // build list‐only menu
  const menuItems = useMemo(
    () =>
      contextMenuItems ?? (!isGrid ? getDefaultContextMenuItems(id, slug) : []),
    [contextMenuItems, isGrid, id, slug]
  );

  const handle = {
    wishlist: () => onWishlist?.(id),
    compare: () => onCompare?.(id),
    addToCart: () => onAddToCart?.(id),
    upvote: () => onRate?.("upvote", id),
  };

  return (
    <div
      className={cn(
        "group relative border-2 border-gray-200 rounded-xl bg-gradient-to-br from-neutral-50 to-white overflow-hidden transition-shadow duration-300",
        {
          "shadow-sm hover:shadow-md": isGrid,
          "flex items-start gap-6 border-b border-gray-200 p-6 hover:shadow-lg":
            variant === "list",
        }
      )}
    >
      {/* Thumbnail */}
      {renderThumbnail ? (
        renderThumbnail({ material, finalPrice, basePrice, variant })
      ) : (
        <CardThumbnail
          slug={slug}
          title={title}
          thumbnail={thumbnail}
          basePrice={basePrice}
          finalPrice={finalPrice}
          showPromo={variant !== "compact"}
          variant={variant}
        />
      )}

      {/* Grid hover bar */}
      {isGrid && (
        <HoverableActionBar
          isFree={isFree}
          onWishlist={handle.wishlist}
          onCompare={handle.compare}
          onAddToCart={handle.addToCart}
        />
      )}

      {/* List context menu */}
      {!isGrid && menuItems.length > 0 && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ContextMenu
            align="right"
            items={menuItems}
            buttonClassName="p-1 focus:ring-2 focus:ring-blue-500 rounded-full"
            menuClassName="min-w-[10rem]"
          />
        </div>
      )}

      {/* Content */}
      <div
        className={cn("flex flex-col justify-between", {
          "p-4 gap-2": isGrid,
          "": variant === "list",
          "p-2": variant === "compact",
        })}
      >
        {renderInfo ? (
          renderInfo({ material, variant, onRate })
        ) : (
          <CardInfo
            {...{
              title,
              slug,
              department,
              academicLevel,
              academicDegree,
              materialType,
              deliveryFormat,
              digitalContent,
              summary,
              description,
              rating,
              numReviews,
              analytics,
              variant,
            }}
            onRate={(action) => onRate?.(action, id)}
          />
        )}

        {renderShopInfo
          ? renderShopInfo({ shop })
          : shop && variant !== "compact" && <MaterialShopInfo shop={shop} />}

        {renderActions ? (
          renderActions({ material, finalPrice, isFree, hasDiscount, loading })
        ) : (
          <CardActions
            slug={slug}
            finalPrice={finalPrice}
            isFree={isFree}
            loading={loading}
            hasDiscount={hasDiscount}
            variant={variant}
            onWishlist={handle.wishlist}
            onCompare={handle.compare}
            onAddToCart={handle.addToCart}
          />
        )}
      </div>
    </div>
  );
};

const CardThumbnail = ({
  slug,
  title,
  thumbnail,
  basePrice = 0,
  finalPrice,
  showPromo = true,
  variant,
}) => {
  const imageUrl = getImageUrl(thumbnail);
  const promoTag =
    showPromo && finalPrice
      ? getPromotionTag({ finalPrice, price: basePrice })
      : null;

  const sizeClasses =
    variant === "grid"
      ? "h-45 w-full"
      : variant === "list"
      ? "w-36 h-36 sm:w-48 sm:h-48"
      : "h-32 w-full";

  return (
    <div className={`relative overflow-hidden ${sizeClasses}`}>
      <Link href={`/materials/${slug}`} target="_blank" className="block">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes={
            variant === "grid"
              ? "(max-width: 768px) 100vw, 33vw"
              : "(max-width: 768px) 30vw, 15vw"
          }
          priority
        />
      </Link>
      {promoTag && (
        <StatusTag
          label={promoTag.label}
          type={promoTag.type}
          position="bottom-right"
          animation
        />
      )}
    </div>
  );
};

export default React.memo(MaterialsListingCard);
