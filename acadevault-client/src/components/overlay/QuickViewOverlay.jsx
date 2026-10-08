"use client";

import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ShoppingCart, Heart, BarChart2 } from "lucide-react";
import { cn } from "@/utils/cn";
import PriceDisplay from "@/components/common/PriceDisplay";
import OverlayButton from "./OverlayButton";
import InfoLine from "./InfoLine";
import { formatPrice } from "@/utils/formatPrice";

/**
 * ────────────────────────────────────────────────────────────────────────────
 * QuickViewOverlay
 *
 * A production-grade overlay component that appears on hover. It provides:
 *   - Material title and dynamic pricing at the top.
 *   - Action buttons: Add to Cart, Wishlist, Quick View, Compare.
 *   - Metadata lines: description excerpt, publisher, format, and type.
 *   - A CTA button linking to the full details page.
 *
 * Accessibility & Performance:
 * 1. Uses React.memo to prevent unnecessary re-renders when props are unchanged.
 * 2. Ensures all buttons have descriptive labels for screen readers.
 * 3. Prevents click events from bubbling up (so overlay clicks don’t trigger parent).
 * 4. Uses `motion.div` with opacity transition for smooth reveal on hover.
 * 5. Properly types props with PropTypes and provides defaultProps.
 * 6. Splits responsibilities into smaller parts: Header, Actions, Info, CTA.
 * ────────────────────────────────────────────────────────────────────────────
 */
const QuickViewOverlay = memo(function QuickViewOverlay({
  material,
  effective,
  isFree,
  priceLoading,
  hasDiscount,
  discountPercent,
  onQuickView,
  onAddToCart,
  onWishlist,
  onCompare,
  className = "",
}) {
  // Destructure the material for easier access
  const {
    _id: materialId,
    title,
    description,
    publisher,
    deliveryFormat,
    purchaseType,
    slug,
    finalPrice,
  } = material;

  // Format price using shared utility if available, else fallback to effective.formatted
  const displayPrice =
    finalPrice != null ? formatPrice(finalPrice) : effective.formatted;

  // Capitalize helper for metadata values
  const capitalize = useCallback((str) => {
    if (!str) return "N/A";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }, []);

  // Prevent parent from handling clicks when interacting inside overlay
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      className={cn(
        "absolute inset-0 z-20 flex flex-col justify-between rounded-2xl",
        // Key classes: starts at opacity-0, becomes fully visible on `group-hover`
        "bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        className
      )}
      onClick={stopPropagation}
      aria-label={`Quick view overlay for ${title}`}
    >
      {/* ─── Overlay Header: Title + Price ──────────────────────────────────── */}
      <div className="px-4 pt-4">
        <h2
          className="text-white text-sm font-semibold line-clamp-2"
          aria-label={`Material title: ${title}`}
        >
          {title}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <PriceDisplay
            finalPrice={effective}
            isFree={isFree}
            loading={priceLoading}
            priceClass="text-white"
          />
          {hasDiscount && (
            <span
              className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase"
              aria-label={`Save ${discountPercent} percent`}
            >
              Save {discountPercent}%
            </span>
          )}
        </div>
      </div>

      {/* ─── Overlay Actions: Buttons ──────────────────────────────────────── */}
      <div className="flex justify-end gap-3 px-4 mt-4">
        <OverlayButton
          icon={ShoppingCart}
          label="Add to Cart"
          onClick={() => onAddToCart && onAddToCart(materialId)}
          bgClass="bg-blue-600"
          hoverBgClass="hover:bg-blue-700"
          textClass="text-white"
          ringClass="ring-2 ring-blue-200/40"
        />
        <OverlayButton
          icon={Heart}
          label="Add to Wishlist"
          onClick={() => onWishlist && onWishlist(materialId)}
          bgClass="bg-pink-500"
          hoverBgClass="hover:bg-pink-600"
          textClass="text-white"
          ringClass="ring-2 ring-pink-200/40"
        />
        <OverlayButton
          icon={Eye}
          label="Quick View"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView && onQuickView(material);
          }}
          bgClass="bg-gray-700"
          hoverBgClass="hover:bg-gray-800"
          textClass="text-white"
          ringClass="ring-2 ring-gray-300/30"
        />
        <OverlayButton
          icon={BarChart2}
          label="Compare"
          onClick={() => onCompare && onCompare(materialId)}
          bgClass="bg-emerald-500"
          hoverBgClass="hover:bg-emerald-600"
          textClass="text-white"
          ringClass="ring-2 ring-emerald-200/40"
        />
      </div>

      {/* ─── Overlay Info: Description + Metadata ─────────────────────────── */}
      <div className="px-4 pt-4 pb-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl text-sm text-gray-200">
        <p className="line-clamp-2" aria-label="Material description excerpt">
          {description
            ? `${description.substring(0, 90)}...`
            : "No description"}
        </p>
        <div className="mt-3 space-y-2">
          <InfoLine label="Publisher" value={publisher || "N/A"} />
          <InfoLine label="Format" value={capitalize(deliveryFormat)} />
          <InfoLine label="Type" value={capitalize(purchaseType)} />
        </div>
      </div>

      {/* ─── Overlay CTA: Full Details Button ─────────────────────────────── */}
      <div className="px-4 pb-4 mt-auto">
        <Link
          href={`/materials/${slug}`}
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-xl shadow transition-all duration-300"
          onClick={stopPropagation}
          aria-label={`View full details for ${title}`}
        >
          View Full Details
        </Link>
      </div>
    </motion.div>
  );
});

QuickViewOverlay.displayName = "QuickViewOverlay";
QuickViewOverlay.propTypes = {
  material: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    publisher: PropTypes.string,
    deliveryFormat: PropTypes.string,
    purchaseType: PropTypes.string,
    slug: PropTypes.string.isRequired,
    finalPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  effective: PropTypes.shape({
    amount: PropTypes.number,
    formatted: PropTypes.string,
    originalAmount: PropTypes.number,
  }).isRequired,
  isFree: PropTypes.bool,
  priceLoading: PropTypes.bool,
  hasDiscount: PropTypes.bool,
  discountPercent: PropTypes.number,
  onQuickView: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func,
  onWishlist: PropTypes.func,
  onCompare: PropTypes.func,
  className: PropTypes.string,
};
QuickViewOverlay.defaultProps = {
  isFree: false,
  priceLoading: false,
  hasDiscount: false,
  discountPercent: 0,
  onAddToCart: null,
  onWishlist: null,
  onCompare: null,
  className: "",
};

export default QuickViewOverlay;

// "use client";

// import React, { memo } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Eye, ShoppingCart, Heart, BarChart2 } from "lucide-react";
// import PropTypes from "prop-types";
// import { cn } from "@/utils/cn";

// import OverlayButton from "./OverlayButton";
// import { formatPrice } from "@/utils/formatPrice";
// import InfoLine from "./InfoLine";
// import PriceDisplay from "../common/PriceDisplay";

// const capitalize = (str) =>
//   str ? str.charAt(0).toUpperCase() + str.slice(1) : "N/A";

// const QuickViewOverlay = memo(function QuickViewOverlay({
//   material,
//   effective,
//   isFree,
//   priceLoading,
//   hasDiscount,
//   discountPercent,
//   onQuickView,
//   onAddToCart,
//   onWishlist,
//   onCompare,
//   className = "",
// }) {
//   const formattedPrice = formatPrice(material.finalPrice);
//   const materialId = material._id;

//   return (
//     <motion.div
//       className={cn(
//         "absolute inset-0 z-20 flex flex-col justify-between rounded-2xl",
//         "bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300",
//         className
//       )}
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Header */}
//       <div className="px-4 pt-4">
//         <h2 className="text-white text-sm font-semibold line-clamp-2">
//           {material.title}
//         </h2>
//         <div className="flex items-center gap-2">
//           <PriceDisplay
//             finalPrice={effective}
//             isFree={isFree}
//             loading={priceLoading}
//             priceClass="text-white"
//           />
//           {hasDiscount && (
//             <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase">
//               Save {discountPercent}%
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Body */}
//       <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pt-6 pb-4 rounded-b-2xl">
//         {/* Actions */}
//         <div className="flex justify-end gap-3 mb-4">
//           <OverlayButton
//             icon={ShoppingCart}
//             label="Add to Cart"
//             onClick={() => onAddToCart(materialId)}
//             bgClass="bg-blue-600"
//             hoverBgClass="hover:bg-blue-700"
//             textClass="text-white"
//             ringClass="ring-2 ring-blue-200/40"
//           />
//           <OverlayButton
//             icon={Heart}
//             label="Wishlist"
//             onClick={() => onWishlist(materialId)}
//             bgClass="bg-pink-500"
//             hoverBgClass="hover:bg-pink-600"
//             textClass="text-white"
//             ringClass="ring-2 ring-pink-200/40"
//           />
//           <OverlayButton
//             icon={Eye}
//             label="Quick View"
//             onClick={(e) => onQuickView(e, material)}
//             bgClass="bg-gray-700"
//             hoverBgClass="hover:bg-gray-800"
//             textClass="text-white"
//             ringClass="ring-2 ring-gray-300/30"
//           />
//           <OverlayButton
//             icon={BarChart2}
//             label="Compare"
//             onClick={() => onCompare(materialId)}
//             bgClass="bg-emerald-500"
//             hoverBgClass="hover:bg-emerald-600"
//             textClass="text-white"
//             ringClass="ring-2 ring-emerald-200/40"
//           />
//         </div>

//         {/* Info */}
//         <div className="border-t border-gray-600 pt-4 space-y-2 text-sm text-gray-200 leading-snug">
//           <p className="line-clamp-2">
//             {material.description?.substring(0, 90) || "No description"}...
//           </p>
//           <InfoLine label="Publisher" value={material.publisher || "N/A"} />
//           <InfoLine
//             label="Format"
//             value={capitalize(material.deliveryFormat)}
//           />
//           <InfoLine label="Type" value={capitalize(material.purchaseType)} />
//         </div>

//         {/* CTA */}
//         <div className="mt-5">
//           <Link
//             href={`/materials/${material.slug}`}
//             className="block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-xl shadow transition-all duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             View Full Details
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// });

// QuickViewOverlay.propTypes = {
//   material: PropTypes.object.isRequired,
//   onQuickView: PropTypes.func.isRequired,
//   onAddToCart: PropTypes.func,
//   onWishlist: PropTypes.func,
//   onCompare: PropTypes.func,
//   className: PropTypes.string,
// };

// export default QuickViewOverlay;
