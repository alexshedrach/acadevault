import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  EyeIcon,
  ShoppingCartIcon,
  HeartIcon,
  BarChartIcon,
  ShoppingCart,
  Heart,
  BarChart2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import OverlayButton from "@/components/overlay/OverlayButton";
import { StatusTag } from "@/components/common/StatusTag";

/**
 * FlipCard
 *
 * - Expects `thumbnailNode` and `contentNode` (front face).
 * - Uses inline style for `transform` and `backfaceVisibility` since Tailwind doesn't provide those.
 * - Flips on hover (via local `isFlipped` state).
 */
export default function FlipCard({
  cardVariant,
  cardTheme,
  className,
  onClick,
  thumbnailNode,
  contentNode,
  footerNode,
  summary,
  description,
  typeLabel,
  degreeLabel,
  levelLabel,
  pageCount,
  deliveryLabel,
  deptName,
  publisher,
  slug,
  onQuickView,
  onAddToCart,
  onWishlist,
  onCompare,
  _id: materialId,
  materialType,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // ─── Stopping propagation and then calling parent's single‐arg callback
  const handleQuickViewClick = useCallback(
    (e) => {
      e.stopPropagation();
      onQuickView(materialId);
    },
    [materialId, onQuickView]
  );

  return (
    <Card
      as="div"
      variant={cardVariant}
      theme={cardTheme}
      className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md cursor-pointer ${className}`}
      onClick={onClick}
      tabIndex={0}
      style={{ perspective: 1000 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ─── Front Face ───────────────────────────────────────────────────────── */}
        <div
          className="front-face backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Thumbnail + Content (in normal flow) */}
          <StatusTag label={materialType.toUpperCase()} position="top-left" />

          {thumbnailNode}
          {contentNode}
          {footerNode}
        </div>

        {/* ─── Back Face ──────────────────────────────────────────── */}
        <div
          className="absolute inset-0 bg-white p-5 flex flex-col"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <>
            <div className="text-sm text-gray-700 space-y-1 overflow-auto">
              <p className="text-sm text-gray-600 leading-relaxed border-b border-gray-200">
                {summary || description}
              </p>
              <p>
                <span className="font-medium">Type:</span> {typeLabel}
              </p>
              <p>
                <span className="font-medium">Degree:</span> {degreeLabel}
              </p>
              <p>
                <span className="font-medium">Level:</span> {levelLabel}
              </p>
              <p>
                <span className="font-medium">Pages:</span> {pageCount}
              </p>
              <p>
                <span className="font-medium">Delivery:</span> {deliveryLabel}
              </p>
              <p>
                <span className="font-medium">Department:</span> {deptName}
              </p>
            </div>
          </>

          <div className="border-t border-gray-200 mt-5 pt-4 space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href={`/materials/${slug}`}
                passHref
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md transition-all shadow-sm"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
              >
                View Details
              </Link>
              {onQuickView && (
                <button
                  onClick={handleQuickViewClick}
                  className="flex items-center gap-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm px-4 py-2 rounded-md transition-all"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>Quick View</span>
                </button>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <OverlayButton
                icon={ShoppingCart}
                label="Add to Cart"
                onClick={() => {}}
                bgClass="bg-blue-600"
                hoverBgClass="hover:bg-blue-700"
                textClass="text-white"
                ringClass="ring-1 ring-gray-300 hover:ring-2"
              />
              <OverlayButton
                icon={Heart}
                label="Wishlist"
                onClick={() => {}}
                bgClass="bg-red-500"
                hoverBgClass="hover:bg-red-600"
                textClass="text-white"
                ringClass="ring-1 ring-gray-300 hover:ring-2"
              />
              <OverlayButton
                icon={BarChart2}
                label="Compare"
                onClick={() => {}}
                bgClass="bg-green-500"
                hoverBgClass="hover:bg-green-600"
                textClass="text-white"
                ringClass="ring-1 ring-gray-300 hover:ring-2"
              />
            </div>
          </div>

          <div className="text-xs mt-2 text-gray-500 border-t border-gray-200">
            Published by:{" "}
            <span className="italic">{publisher || "Unknown"}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

FlipCard.propTypes = {
  cardVariant: PropTypes.string,
  cardTheme: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  thumbnailNode: PropTypes.node.isRequired,
  contentNode: PropTypes.node.isRequired,
  summary: PropTypes.string,
  description: PropTypes.string,
  typeLabel: PropTypes.string,
  degreeLabel: PropTypes.string,
  levelLabel: PropTypes.string,
  pageCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deliveryLabel: PropTypes.string,
  deptName: PropTypes.string,
  publisher: PropTypes.string,
  slug: PropTypes.string.isRequired,
  onQuickView: PropTypes.func,
  onAddToCart: PropTypes.func,
  onWishlist: PropTypes.func,
  onCompare: PropTypes.func,
  _id: PropTypes.string.isRequired,
};

FlipCard.displayName = "FlipCard";

// "use client";

// import React from "react";
// import PropTypes from "prop-types";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Card } from "@/components/ui/Card";
// import Thumbnail from "./Thumbnail";
// import PriceDisplay from "@/components/common/PriceDisplay";
// import { StarRatingDisplay } from "@/components/rating/StarRating";
// import QuickViewOverlay from "@/components/ui/QuickViewOverlay";
// import {
//   EyeIcon,
//   ShoppingCartIcon,
//   HeartIcon,
//   BarChartIcon,
// } from "lucide-react";

// // FlipCard handles the “3D flip” variant. It expects:
// //  • material (object)
// //  • effective (price object computed by parent)
// //  • promoTag
// //  • priceLoading, avgRating, numReviews (to render on the front side)
// //  • all callbacks: onClick, onQuickView, onWishlist, onCompare, onAddToCart
// //  • cardVariant, cardTheme, clickable
// const FlipCard = ({
//   material,
//   effective,
//   promoTag,
//   priceLoading,
//   avgRating,
//   numReviews,
//   onClick,
//   onQuickView,
//   onWishlist,
//   onCompare,
//   onAddToCart,
//   cardVariant,
//   cardTheme,
//   clickable,
// }) => {
//   const {
//     _id,
//     slug,
//     title,
//     department,
//     academicLevel,
//     academicDegree,
//     materialType,
//     deliveryFormat,
//     digitalContent,
//     summary,
//     description,
//     publisher,
//   } = material;

//   // Front face meta
//   const deptName = department?.name || "Unknown Department";
//   const levelLabel = academicLevel || "N/A";
//   const degreeLabel = academicDegree || "N/A";
//   const typeLabel = materialType || "Material";
//   const deliveryLabel =
//     deliveryFormat === "digital" ? "Digital Download" : "Physical Copy";
//   const pageCount = digitalContent?.pageCount ?? "N/A";

//   return (
//     <motion.div
//       className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md cursor-pointer"
//       style={{ perspective: 1000 }}
//       onClick={onClick}
//       whileHover={{
//         scale: 1.015,
//         boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
//       }}
//     >
//       <motion.div
//         className="relative w-full h-[28rem] transition-transform duration-500"
//         style={{ transformStyle: "preserve-3d" }}
//         whileHover={{ transform: "rotateY(180deg)" }}
//       >
//         {/* ── Front Face ───────────────────────────────────────────────────────── */}
//         <div className="absolute inset-0 backface-hidden">
//           <Card
//             variant={cardVariant}
//             theme={cardTheme}
//             className="h-full w-full overflow-hidden p-0"
//           >
//             {/* Thumbnail + Tag */}
//             <Thumbnail material={material} promoTag={promoTag} />

//             <div className="flex flex-col flex-1 p-4">
//               {/* Meta line: dept • degree (level) */}
//               <div className="text-xs text-gray-500 mb-1">
//                 {deptName} • {degreeLabel} ({levelLabel})
//               </div>

//               {/* Title */}
//               <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
//                 {title}
//               </h3>

//               {/* Price & Rating row at bottom */}
//               <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div className="flex items-center gap-2">
//                   <PriceDisplay
//                     finalPrice={effective}
//                     isFree={effective.amount === 0}
//                     loading={priceLoading}
//                   />
//                   {effective.originalAmount > effective.amount && (
//                     <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase">
//                       Save {effective.discountApplied}%
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <StarRatingDisplay
//                     average={avgRating}
//                     count={numReviews}
//                     size={18}
//                   />
//                   <span className="text-xs text-gray-600">({numReviews})</span>
//                 </div>
//               </div>
//             </div>

//             {/* Quick View Button (front) */}
//             <div className="absolute bottom-4 right-4">
//               <QuickViewOverlay material={material} onQuickView={onQuickView} />
//             </div>
//           </Card>
//         </div>

//         {/* ── Back Face ────────────────────────────────────────────────────────── */}
//         <div className="absolute inset-0 rotate-y-180 backface-hidden">
//           <Card
//             variant="outlined"
//             theme="light"
//             className="h-full w-full p-5 flex flex-col justify-between border border-gray-200 rounded-xl"
//           >
//             <div className="space-y-5 overflow-auto">
//               <p className="text-sm text-gray-600 leading-relaxed -mb-4">
//                 {summary || description}
//               </p>

//               <hr className="border-t border-gray-200" />

//               <div className="text-sm text-gray-700 -mt-2 pt-1 space-y-1">
//                 <div>
//                   <span className="font-medium">Type:</span> {typeLabel}
//                 </div>
//                 <div>
//                   <span className="font-medium">Degree:</span> {degreeLabel}
//                 </div>
//                 <div>
//                   <span className="font-medium">Level:</span> {levelLabel}
//                 </div>
//                 <div>
//                   <span className="font-medium">Pages:</span> {pageCount}
//                 </div>
//                 <div>
//                   <span className="font-medium">Delivery:</span> {deliveryLabel}
//                 </div>
//                 <div>
//                   <span className="font-medium">Department:</span> {deptName}
//                 </div>
//               </div>

//               <div className="text-xs text-gray-500 -mt-3 -mb-3">
//                 Published by:{" "}
//                 <span className="italic">{publisher || "Unknown"}</span>
//               </div>
//             </div>

//             {/* Back face action buttons */}
//             <div className="border-t border-gray-200 mt-5 pt-4 space-y-4">
//               <div className="flex flex-wrap justify-center gap-2">
//                 <Link href={`/materials/${slug}`} passHref onClick={(e) => e.stopPropagation()}
//                     className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition-all shadow-sm"
//                     target="_blank">

//                     View Details

//                 </Link>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onQuickView?.(material);
//                   }}
//                   className="flex items-center gap-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm px-4 py-2 rounded-md transition-all"
//                 >
//                   <EyeIcon className="w-4 h-4" />
//                   <span>Quick View</span>
//                 </button>
//               </div>

//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={() => onAddToCart?.(_id)}
//                   className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-md transition-all"
//                 >
//                   <ShoppingCartIcon className="w-4 h-4" />
//                   <span>Add to Cart</span>
//                 </button>
//                 <button
//                   onClick={() => onWishlist?.(_id)}
//                   className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md transition-all"
//                 >
//                   <HeartIcon className="w-4 h-4" />
//                   <span>Wishlist</span>
//                 </button>
//                 <button
//                   onClick={() => onCompare?.(_id)}
//                   className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-md transition-all"
//                 >
//                   <BarChartIcon className="w-4 h-4" />
//                   <span>Compare</span>
//                 </button>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// FlipCard.propTypes = {
//   material: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     slug: PropTypes.string,
//     title: PropTypes.string,
//     department: PropTypes.shape({ name: PropTypes.string }),
//     academicLevel: PropTypes.string,
//     academicDegree: PropTypes.string,
//     materialType: PropTypes.string,
//     deliveryFormat: PropTypes.string,
//     digitalContent: PropTypes.shape({
//       pageCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     }),
//     summary: PropTypes.string,
//     description: PropTypes.string,
//     publisher: PropTypes.string,
//   }).isRequired,

//   effective: PropTypes.shape({
//     amount: PropTypes.number,
//     formatted: PropTypes.string,
//     currencySymbol: PropTypes.string,
//     originalAmount: PropTypes.number,
//     discountApplied: PropTypes.number,
//   }).isRequired,
//   promoTag: PropTypes.shape({
//     label: PropTypes.string,
//     type: PropTypes.string,
//   }),
//   priceLoading: PropTypes.bool.isRequired,
//   avgRating: PropTypes.number,
//   numReviews: PropTypes.number,
//   onClick: PropTypes.func,
//   onQuickView: PropTypes.func,
//   onWishlist: PropTypes.func,
//   onCompare: PropTypes.func,
//   onAddToCart: PropTypes.func,
//   cardVariant: PropTypes.oneOf(["default", "outlined", "shadowed", "gradient"]),
//   cardTheme: PropTypes.oneOf(["light", "dark", "glass", "neon"]),
//   clickable: PropTypes.bool,
// };

// FlipCard.defaultProps = {
//   promoTag: null,
//   avgRating: 0,
//   numReviews: 0,
//   onClick: null,
//   onQuickView: null,
//   onWishlist: null,
//   onCompare: null,
//   onAddToCart: null,
//   cardVariant: "shadowed",
//   cardTheme: "light",
//   clickable: false,
// };

// export default FlipCard;
