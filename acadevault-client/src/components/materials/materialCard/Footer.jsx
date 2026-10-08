"use client";

import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import PriceDisplay from "@/components/common/PriceDisplay";
import MaterialRating from "../MaterialRating";
import MaterialShopInfo from "../MaterialShopInfo";

/**
 * ────────────────────────────────────────────────────────────────────────────
 * Footer
 *
 * Renders the bottom section of a MaterialCard, showing:
 *   - Optional shop information (logo + name).
 *   - Dynamic price with discount badge.
 *   - Star rating, review count, likes, and comments.
 *
 * Accessibility & Best Practices:
 * 1. Wrapped in React.memo for performance.
 * 2. Uses useCallback to memoize click handlers.
 * 3. PropTypes + defaultProps for clear prop expectations.
 * 4. Splits responsibilities: ShopInfo, Price, Rating.
 * 5. Ensures each element has appropriate aria-label or accessible text.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const Footer = memo(function Footer({
  effective,
  isFree,
  priceLoading,
  hasDiscount,
  discountPercent,
  avgRating,
  numReviews,
  numLikes,
  numComments,
  showPrice,
  showRating,
  showShopInfo,
  shop,
  onRate,
  material,
}) {
  const materialId = material._id;

  // Memoize click handler for rating
  const handleRateLocal = useCallback(
    (rating) => {
      onRate && onRate(materialId, rating);
    },
    [onRate, materialId]
  );

  return (
    <div className="flex flex-col gap-2 border-t border-gray-100 py-2 px-4">
      {/* ─── Shop Info ─────────────────────────────────────────────────────── */}
      {showShopInfo && shop && <MaterialShopInfo shop={shop} />}

      {/* ─── Price + Discount ───────────────────────────────────────────────── */}
      {showPrice && (
        <div className="flex items-center gap-2">
          <PriceDisplay
            finalPrice={effective}
            isFree={isFree}
            loading={priceLoading}
            priceClass="text-gray-900"
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
      )}

      {/* ─── Rating, Reviews, Likes, Comments ───────────────────────────────── */}
      {showRating && (
        <MaterialRating
          rating={avgRating}
          numReviews={numReviews}
          likes={numLikes}
          comments={numComments}
          onRate={handleRateLocal}
          materialId={materialId}
        />
      )}
    </div>
  );
});

Footer.displayName = "Footer";
Footer.propTypes = {
  effective: PropTypes.shape({
    amount: PropTypes.number,
    formatted: PropTypes.string,
    originalAmount: PropTypes.number,
  }).isRequired,
  isFree: PropTypes.bool,
  priceLoading: PropTypes.bool,
  hasDiscount: PropTypes.bool,
  discountPercent: PropTypes.number,
  avgRating: PropTypes.number,
  numReviews: PropTypes.number,
  numLikes: PropTypes.number,
  numComments: PropTypes.number,
  showPrice: PropTypes.bool,
  showRating: PropTypes.bool,
  showShopInfo: PropTypes.bool,
  shop: PropTypes.shape({
    id: PropTypes.string,
    businessName: PropTypes.string,
    logo: PropTypes.string,
  }),
  onRate: PropTypes.func,
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
};

Footer.defaultProps = {
  isFree: false,
  priceLoading: false,
  hasDiscount: false,
  discountPercent: 0,
  avgRating: 0,
  numReviews: 0,
  numLikes: 0,
  numComments: 0,
  showPrice: true,
  showRating: true,
  showShopInfo: false,
  shop: null,
  onRate: null,
};

// "use client";

// import PriceDisplay from "@/components/common/PriceDisplay";
// import QuickViewOverlay from "@/components/overlay/QuickViewOverlay";
// import PropTypes from "prop-types";
// import { memo } from "react";
// import MaterialRating from "../MaterialRating";
// import MaterialShopInfo from "../MaterialShopInfo";

// /** Footer
//  * Renders price, discount, rating, shop info, and quick-view overlay.
//  */
// export const Footer = memo(function Footer({
//   effective,
//   isFree,
//   priceLoading,
//   hasDiscount,
//   discountPercent,
//   avgRating,
//   numReviews,
//   numLikes,
//   numComments,
//   showPrice,
//   showRating,
//   showShopInfo,
//   shop,
//   showOverLay,
//   onQuickView,
//   onWishlist,
//   onCompare,
//   onAddToCart,
//   onRate,
//   material,
// }) {
//   const materialId = material._id;

//   return (
//     <div className="flex flex-col gap-0 border-t border-gray-100 py-2 px-4">
//       {/* Shop Info */}
//       {showShopInfo && shop && <MaterialShopInfo shop={shop} />}
//       {showPrice && (
//         <div className="flex items-center gap-2">
//           <PriceDisplay
//             finalPrice={effective}
//             isFree={isFree}
//             loading={priceLoading}
//           />
//           {hasDiscount && (
//             <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase">
//               Save {discountPercent}%
//             </span>
//           )}
//         </div>
//       )}

//       {showRating && (
//         <MaterialRating
//           rating={avgRating || 4.5}
//           numReviews={numReviews || 203}
//           likes={numLikes || 50}
//           comments={numComments || 100}
//           onRate={onRate}
//           materialId={materialId}
//         />
//       )}

//       {showOverLay && (
//         <div className="flex items-center justify-between gap-2 pt-3">
//           <QuickViewOverlay
//             effective={effective}
//             isFree={isFree}
//             priceLoading={priceLoading}
//             hasDiscount={hasDiscount}
//             discountPercent={discountPercent}
//             material={material}
//             onQuickView={onQuickView}
//             onWishlist={onWishlist}
//             onCompare={onCompare}
//             onAddToCart={onAddToCart}
//           />
//         </div>
//       )}
//     </div>
//   );
// });
// Footer.displayName = "Footer";
// Footer.propTypes = {
//   effective: PropTypes.shape({
//     amount: PropTypes.number,
//     formatted: PropTypes.string,
//     originalAmount: PropTypes.number,
//   }).isRequired,
//   isFree: PropTypes.bool,
//   priceLoading: PropTypes.bool,
//   hasDiscount: PropTypes.bool,
//   discountPercent: PropTypes.number,
//   avgRating: PropTypes.number,
//   numReviews: PropTypes.number,
//   showPrice: PropTypes.bool,
//   showRating: PropTypes.bool,
//   showShopInfo: PropTypes.bool,
//   shop: PropTypes.shape({
//     id: PropTypes.string,
//     businessName: PropTypes.string,
//     logo: PropTypes.string,
//   }),
//   showActions: PropTypes.bool,
//   onQuickView: PropTypes.func,
//   materialId: PropTypes.string.isRequired,
// };
