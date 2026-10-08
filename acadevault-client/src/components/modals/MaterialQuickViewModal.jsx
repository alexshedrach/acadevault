"use client";

import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { getPromotionTag } from "@/utils/getPromotionTag";
import { Modal } from "../ui/Modal";
import { Card } from "../ui/Card";
import { StatusTag } from "../common/StatusTag";
import MaterialPrice from "../materials/MaterialPrice";
import MaterialRating from "../materials/MaterialRating";
import { Button } from "../ui/Button";
import { truncateText } from "@/helpers/truncateText";

/**
 * MaterialQuickViewModal
 *
 * A modal that displays a larger preview of a material, side-by-side with its metadata.
 * Ensures the image container always has a fixed height, so <Image fill /> can render.
 */
function MaterialQuickViewModal({ material, onClose, onRate }) {
  if (!material) return null;

  // Compute the image URL (make sure this domain is allowed in next.config.js, or use unoptimized)
  const imageUrl = getImageUrl(material.thumbnail);

  /* Material details with safe fallbacks */
  const department = material.department?.name || "Unknown Department";
  const level = material.academicLevel || "Unknown Level";
  const degree = material.academicDegree || "N/A";
  const materialType = material.materialType || "Material";
  const delivery =
    material.deliveryFormat === "digital"
      ? "Digital Download"
      : "Physical Copy";
  const pageCount = material.digitalContent?.pageCount || "N/A";

  // Determine promo tag (e.g. “Free” or “Sale”)
  const baseAmount = material.price?.amount || 0;
  const finalPriceForTag = {
    amount: material.price?.amount || 0,
    originalAmount: material.price?.amount || 0,
  };
  const tag = getPromotionTag({
    finalPrice: finalPriceForTag,
    price: { amount: baseAmount },
  });

  // Rating data
  const rating = material.rating || 0;
  const numReviews = material.numReviews || 0;
  const likes = material.analytics?.upvotes || 0;
  const comments = material.analytics?.purchases || 0;

  return (
    <Modal
      isOpen={!!material}
      onClose={onClose}
        closeButton
      size="xl"
      className="w-full max-w-5xl"
      theme="light"
    >
      <Card
        variant="shadowed"
        theme="light"
        className="flex flex-col md:flex-row gap-6"
      >
        {/* ─── Image Section ───────────────────────────────────────────────────────── */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={material.title || "Academic Material"}
            fill
            className="object-cover"
            priority
            // If you haven’t whitelisted the image domain in next.config.js,
            // you can add `unoptimized` here to bypass domain checks:
            // unoptimized
          />
          {tag && (
            <div className="absolute bottom-2 right-2">
              <StatusTag
                label={tag.label}
                type={tag.type}
                position="bottom-right"
                animation
              />
            </div>
          )}
        </div>

        {/* ─── Content Section ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-between w-full md:w-1/2 p-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {material.title}
            </h2>

            <div className="text-sm text-gray-600 mb-2">
              {department} • {degree} ({level})
            </div>

            {/* <p className="text-gray-700 mb-3">
              {truncateText(material.description, 60)}
            </p> */}
            <p className="text-gray-600 text-sm italic mb-4">
              {material.summary}
            </p>

            <div className="text-sm text-gray-700 mb-2 space-y-1">
              <p>
                <span className="font-medium">Type:</span> {materialType}
              </p>
              <p>
                <span className="font-medium">Format:</span> {delivery}
              </p>
              <p>
                <span className="font-medium">Pages:</span> {pageCount}
              </p>
              <p>
                <span className="font-medium">Publisher:</span>{" "}
                {material.publisher || "N/A"}
              </p>
            </div>

            {/* Rating + Price */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <MaterialPrice
                materialId={material._id}
                materialType={material.materialType}
                basePrice={material.price?.amount}
              />
              <MaterialRating
                rating={rating}
                numReviews={numReviews}
                likes={likes}
                comments={comments}
                onRate={onRate}
                materialId={material._id}
              />
            </div>
          </div>

          {/* Tags */}
          {material.tags?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {material.tags.map((tagLabel, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded"
                  >
                    {tagLabel}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button
              variant="gradient"
              size="md"
              onClick={() => alert("Add to cart functionality here")}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => alert("Wishlist functionality here")}
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
      </Card>
    </Modal>
  );
}

export default MaterialQuickViewModal;
