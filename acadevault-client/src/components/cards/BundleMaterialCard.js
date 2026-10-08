"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/utils/cn";
import { getImageUrl } from "@/utils/getImageUrl";
import MaterialRating from "../materials/MaterialRating";
import MaterialShopInfo from "../materials/MaterialShopInfo";
import MaterialPrice from "../materials/MaterialPrice";

export default function BundleMaterialCard({ material }) {
  const {
    _id,
    title,
    slug,
    thumbnail,
    finalPrice,
    basePrice,
    isFree,
    isBestseller,
    rating = 0,
    numReviews = 0,
    shop,
    materialType,
  } = material;

  const hasDiscount =
    typeof finalPrice?.amount === "number" && finalPrice.amount < basePrice;

  const discountPercent = hasDiscount
    ? Math.round(((basePrice - finalPrice.amount) / basePrice) * 100)
    : 0;

  const promoTag = isBestseller
    ? { label: "Bestseller", type: "success" }
    : hasDiscount
    ? { label: `Save ${discountPercent}%`, type: "warning" }
    : null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Thumbnail */}
      <div className="relative h-[160px] w-full">
        <Link href={`/materials/${slug}`} className="block h-full w-full">
          <Image
            src={getImageUrl(thumbnail)}
            alt={title}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 640px) 100vw, 180px"
            priority={false}
          />
        </Link>

        {promoTag && (
          <span
            className={cn(
              "absolute bottom-2 left-2 text-xs font-semibold px-2 py-0.5 rounded",
              promoTag.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            )}
          >
            {promoTag.label}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between h-[180px]">
        <div>
          <Link href={`/materials/${slug}`}>
            <h3 className="text-sm font-medium line-clamp-2 hover:text-blue-600 transition-colors">
              {title}
            </h3>
          </Link>
          <div className="mt-1">
            <MaterialShopInfo shop={shop} />
          </div>
        </div>

        {/* Rating + Price */}
        <div className="mt-2 flex items-center justify-between">
          <MaterialRating
            rating={rating}
            numReviews={numReviews}
            likes={0}
            comments={0}
            onRate={null}
            materialId={_id}
            className="pr-1"
          />
          <MaterialPrice
            materialId={_id}
            materialType={materialType}
            basePrice={basePrice}
            className="text-sm font-semibold"
          />
        </div>
      </div>
    </div>
  );
}
