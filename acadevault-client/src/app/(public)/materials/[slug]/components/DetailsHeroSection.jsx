"use client";

import ImageWithFallback from "@/components/common/ImageWithFallback";
import { StarRatingDisplay } from "@/components/rating/StarRating";
import { Badge } from "@/components/ui/Badge";
import Breadcrumb from "@/components/ui/Breadcrumb";
import useEffectivePrice from "@/hooks/useEffectivePrice";
import { formatDate } from "@/utils/dateUtils";
import { getImageUrl } from "@/utils/getImageUrl";
import { getMaterialHighlightTag } from "@/utils/materialUtils";
import { ClockIcon } from "lucide-react";
import Link from "next/link";

/**
 * DetailsHeroSection
 *
 * A hero section for a material detail page where:
 *  - The hero image spans the entire section as a background.
 *  - A semi-transparent overlay ensures text remains legible.
 *  - Breadcrumb, title, summary and CTA are all stacked above the image.
 *
 * Props:
 *   - material: the full material object
 */
export default function DetailsHeroSection({ material }) {
  const {
    categories,
    thumbnail,
    previewFiles,
    title,
    summary,
    slug: materialSlug,
    digitalContent,
    createdBy,
    rating,
    materialType,
    finalPrice,
    numReviews,
    updatedAt,
    _id,
  } = material;

  // Pick the first category (if any)
  const category = Array.isArray(categories) ? categories[0] : null;

  // Determine which image to use as the hero
  const heroSrc =
    (thumbnail?.startsWith("/") ? getImageUrl(thumbnail) : null) ||
    previewFiles?.[0]?.fileUrl ||
    null;

  const { price: hookFinalPrice } = useEffectivePrice({
    materialId: _id,
    materialType,
  });

  const averageRating = rating?.average ?? 4.7;
  const totalRatings = rating?.count ?? 222709;
  const totalStudents = material?.studentsEnrolled ?? 983836;

  // Determine which tag to display
  const highlightTag = getMaterialHighlightTag(material);

  // Formatting for price & download rights
  const { formatted: priceFormatted, currencySymbol } = finalPrice || {};
  const canDownload = digitalContent?.usageRights?.canBeDownloaded;

  return (
    <section className="relative overflow-hidden">
      {/* 1) Absolute background image */}
      {/* {heroSrc && (
        <Image
          src={heroSrc}
          alt={`${title} thumbnail`}
          fill
          priority
          className="absolute inset-0 object-cover w-full h-full"
        />
      )} */}

      {/* Overlay for contrast */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" /> */}

      {/* 3) Content container (padded) */}
      <div className="relative max-w-7xl mx-auto pb-16 px-4 sm:px-8 space-y-6 bg-gradient-to-br from-white via-indigo-100 to-blue-200 text-gray-800 border-b border-gray-200 shadow-sm lg:shadow-md">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Materials", href: "/materials" },
            category && {
              label: category.name,
              href: `/materials/category/${encodeURIComponent(
                category.name.toLowerCase()
              )}`,
            },
            { label: title, href: null },
          ].filter(Boolean)}
          className="pt-4"
        />

        <div className="max-w-3xl">
          {/* Title + Summary */}
          <div className="space-y-1.5 mb-4 pr-10">
            <h1 className="text-xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {title}
            </h1>

            {summary && (
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                {summary}
              </p>
            )}
          </div>

          {/* Summary */}

          {/* Price & CTA */}
          {/* <div className="flex flex-wrap items-center gap-4">
          <span className="text-3xl font-bold">
            {priceFormatted}
          </span>
          <Button
            size="lg"
            variant="primary"
            disabled={!canDownload}
            onClick={() =>
              (window.location.href = `/api/download/${materialSlug}`)
            }
          >
            {priceFormatted !== "₦0.00" ? "Buy & Download" : "Download"}
          </Button>
        </div> */}

          {/* Rating & Stats */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm text-gray-700 mb-2">
            {/* Rating & Average */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-orange-500 text-lg">
                {averageRating.toFixed(1)}
              </span>

              <StarRatingDisplay
                rating={averageRating}
                count={numReviews || 200}
                size={18}
                color="#facc15"
                inactiveColor="#d1d5db"
              />
            </div>

            {/* Total Ratings */}
            <div className="flex items-center gap-2 text-blue-500">
              <a
                href="#reviews"
                className="underline hover:text-blue-400 font-medium"
              >
                ({totalRatings.toLocaleString()} ratings)
              </a>
            </div>

            {/* Students Enrolled */}
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium">
                {totalStudents.toLocaleString()}
              </span>
              <span className="text-sm">students enrolled</span>
            </div>

            {/* Highlight Tag (Bestseller, Featured, Top Rated) */}
            {highlightTag && (
              <Badge
                variant="success"
                size="md"
                className={`bg-${highlightTag.color}-50 rounded-full border border-${highlightTag.color}-200 text-${highlightTag.color}-700`}
              >
                {highlightTag.label}
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-base text-gray-800/90">
            {/* Author and Category */}
            <div className="flex flex-row items-center justify-center">
              <ImageWithFallback
                src={getImageUrl(createdBy.profilePicture?.url)}
                alt={createdBy.name}
                fallbackText={createdBy.name}
                size={30}
                className="w-8 h-8 rounded-full overflow-hidden mr-3"
              />
              <p className="flex flex-wrap items-center gap-1">
                Created by{" "}
                <span className="font-extrabold">
                  {createdBy?.name || "Unknown Author"}
                </span>
                {category && (
                  <>
                    <span>&nbsp;in&nbsp;</span>
                    <Link
                      href={`/materials/category/${encodeURIComponent(
                        category.name.toLowerCase()
                      )}`}
                      className="underline text-blue-600 hover:text-orange transition-colors"
                    >
                      {category.name}
                    </Link>
                  </>
                )}
              </p>
            </div>

            {/* Vertical Divider (only shows on large screens) */}
            <div className="hidden sm:block w-px h-5 bg-orange-600/50" />

            {/* Last Updated */}
            <LastUpdated updatedDate={updatedAt} />
          </div>
        </div>
      </div>
    </section>
  );
}

function LastUpdated({ updatedDate }) {
  const formattedDate = formatDate(updatedDate);

  return (
    <div className="flex items-center gap-2 text-gray-700">
      <ClockIcon className="w-5 h-5 text-blue-600" />
      <p className="text-sm">
        <span className="font-semibold">Last Updated:</span> {formattedDate}
      </p>
    </div>
  );
}
