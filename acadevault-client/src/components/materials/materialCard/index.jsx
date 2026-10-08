"use client";

import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Card } from "@/components/ui/Card";
import useEffectivePrice from "@/hooks/useEffectivePrice";
import { cn } from "@/utils/cn";
import { getPromotionTag } from "@/utils/getPromotionTag";
import FlipCard from "./FlipCard";
import { Thumbnail } from "../MaterialThumbnailActions";
import { Content } from "./Content";
import { Footer } from "./Footer";
import QuickViewOverlay from "@/components/overlay/QuickViewOverlay";

const MaterialCard = memo(function MaterialCard({
  material,
  onClick,
  onQuickView,
  onWishlist,
  onCompare,
  onAddToCart,
  onRate,

  variant,
  layout,
  showSummary,
  showDescription,
  showMeta,
  showPrice,
  showRating,
  showActions,
  showOverlay,
  showShopInfo,

  renderThumbnail,
  renderContent,
  renderFooter,

  cardVariant,
  cardTheme,
  className,
  clickable,
}) {
  // ───────────────────────────────────────────────────────────────────────────
  // Destructure material fields (with defaults for safety)
  const {
    _id,
    slug,
    title,
    thumbnail,
    department,
    academicLevel,
    academicDegree,
    materialType,
    deliveryFormat,
    digitalContent,
    summary: matSummary,
    description: matDescription,
    price: basePrice = 0,
    rating: avgRating = 0,
    numReviews = 0,
    shop = null,
    publisher = "",
    analytics: { upvotes: numLikes = 0, purchases: numComments = 0 } = {},
  } = material || {};

  // Fallback labels
  const deptName = department?.name || "Unknown Department";
  const levelLabel = academicLevel || "N/A";
  const degreeLabel = academicDegree || "N/A";
  const typeLabel = materialType || "Material";
  const deliveryLabel =
    deliveryFormat === "digital" ? "Digital Download" : "Physical Copy";
  const pageCount = digitalContent?.pageCount ?? "N/A";

  // ───────────────────────────────────────────────────────────────────────────
  // Compute effective price via hook (returns { amount, formatted, originalAmount, ... })
  const { price: dynamicPrice, loading: priceLoading } = useEffectivePrice({
    materialId: _id,
    materialType,
  });

  // Memoize fallback price structure if dynamicPrice is null
  const effective = useMemo(() => {
    if (dynamicPrice != null) return dynamicPrice;
    return {
      amount: basePrice,
      formatted: `₦${(basePrice || 0).toLocaleString()}`,
      currencySymbol: "₦",
      originalAmount: basePrice,
      discountApplied: 0,
    };
  }, [dynamicPrice, basePrice]);

  // Determine if free / discounted
  const isFree = effective.amount === 0;
  const hasDiscount = effective.originalAmount > effective.amount;
  const discountPercent = hasDiscount
    ? Math.round(
        ((effective.originalAmount - effective.amount) /
          effective.originalAmount) *
          100
      )
    : 0;

  // ───────────────────────────────────────────────────────────────────────────
  // Determine promotional tag (e.g., "Sale", "Free")
  const promoTag = useMemo(
    () =>
      getPromotionTag({
        finalPrice: effective,
        price: {
          amount: basePrice,
          formatted: `₦${(basePrice || 0).toLocaleString()}`,
          currencySymbol: "₦",
        },
      }),
    [effective, basePrice]
  );

  // ───────────────────────────────────────────────────────────────────────────
  // Build the three main subtrees: Thumbnail, Content, Footer
  // Use render props if provided, otherwise default subcomponents
  const thumbnailNode = useMemo(
    () =>
      renderThumbnail ? (
        renderThumbnail(material)
      ) : (
        <Thumbnail
          slug={slug}
          title={title}
          thumbnail={thumbnail}
          promoTag={promoTag}
          showActions={showActions}
          onWishlist={() => onWishlist && onWishlist(_id)}
          onCompare={() => onCompare && onCompare(_id)}
          onAddToCart={() => onAddToCart && onAddToCart(_id)}
          onQuickView={() => onQuickView && onQuickView(material)}
          material
        />
      ),
    [
      renderThumbnail,
      material,
      slug,
      title,
      thumbnail,
      promoTag,
      showActions,
      onWishlist,
      onCompare,
      onAddToCart,
      _id,
    ]
  );

  const contentNode = useMemo(
    () =>
      renderContent ? (
        renderContent(material)
      ) : (
        <Content
          title={title}
          deptName={deptName}
          degreeLabel={degreeLabel}
          levelLabel={levelLabel}
          typeLabel={typeLabel}
          deliveryLabel={deliveryLabel}
          pageCount={pageCount}
          summary={matSummary}
          description={matDescription}
          showMeta={showMeta}
          showSummary={showSummary}
          showDescription={showDescription}
        />
      ),
    [
      renderContent,
      material,
      title,
      deptName,
      degreeLabel,
      levelLabel,
      typeLabel,
      deliveryLabel,
      pageCount,
      matSummary,
      matDescription,
      showMeta,
      showSummary,
      showDescription,
    ]
  );

  const footerNode = useMemo(
    () =>
      renderFooter ? (
        renderFooter(material)
      ) : (
        <Footer
          effective={effective}
          isFree={isFree}
          priceLoading={priceLoading}
          hasDiscount={hasDiscount}
          discountPercent={discountPercent}
          avgRating={avgRating}
          numReviews={numReviews}
          numLikes={numLikes}
          numComments={numComments}
          showPrice={showPrice}
          showRating={showRating}
          showShopInfo={showShopInfo}
          shop={shop}
          onRate={(rating) => onRate && onRate(_id, rating)}
          material={material}
        />
      ),
    [
      renderFooter,
      material,
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
      _id,
    ]
  );

  // ───────────────────────────────────────────────────────────────────────────
  // FLIP / BACKFACE Layout
  if (variant === "flip" && layout === "backface") {
    return (
      <FlipCard
        cardVariant={cardVariant}
        cardTheme={cardTheme}
        className={className}
        onClick={() => clickable && onClick && onClick(_id)}
        thumbnailNode={thumbnailNode}
        contentNode={contentNode}
        footerNode={footerNode}
        summary={matSummary}
        description={matDescription}
        typeLabel={typeLabel}
        degreeLabel={degreeLabel}
        levelLabel={levelLabel}
        pageCount={pageCount}
        deliveryLabel={deliveryLabel}
        deptName={deptName}
        publisher={publisher}
        slug={slug}
        onQuickView={() => onQuickView && onQuickView(material)}
        onAddToCart={() => onAddToCart && onAddToCart(_id)}
        onWishlist={() => onWishlist && onWishlist(_id)}
        onCompare={() => onCompare && onCompare(_id)}
        materialType={materialType}
      />
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // NON-FLIP Layouts: vertical, horizontal, grid
  return (
    <Card
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      variant={cardVariant}
      theme={cardTheme}
      clickable={clickable}
      onClick={() => clickable && onClick && onClick(_id)}
      className={cn("group relative overflow-hidden", className)}
      aria-label={title}
    >
      {/**
       * ─── QuickViewOverlay ─────────────────────────────────────────────────
       * Placing the overlay _first_ ensures it sits on top of Thumbnail, Content,
       * and Footer. The `group-hover:opacity-100` class will trigger when the
       * user hovers anywhere over this Card (because `Card` has `className="group"`).
       */}
      {showOverlay && (
        <QuickViewOverlay
          material={material}
          effective={effective}
          isFree={isFree}
          priceLoading={priceLoading}
          hasDiscount={hasDiscount}
          discountPercent={discountPercent}
          onQuickView={() => onQuickView && onQuickView(material)}
          onAddToCart={() => onAddToCart && onAddToCart(_id)}
          onWishlist={() => onWishlist && onWishlist(_id)}
          onCompare={() => onCompare && onCompare(_id)}
          className="" /* You can pass extra classes here if needed */
        />
      )}

      {variant === "grid" ? (
        <div className="flex flex-col h-full">
          {thumbnailNode}
          <div className="flex flex-col flex-1 gap-2">
            {contentNode}
            <div className="mt-auto">{footerNode}</div>
          </div>
        </div>
      ) : variant === "horizontal" ? (
        <div className="flex flex-row h-full">
          <div className="w-1/3">{thumbnailNode}</div>
          <div className="w-2/3 flex flex-col">
            {contentNode}
            {footerNode}
          </div>
        </div>
      ) : (
        // Default “vertical”
        <div className="flex flex-col h-full">
          {thumbnailNode}
          {contentNode}
          {footerNode}
        </div>
      )}
    </Card>
  );
});

MaterialCard.displayName = "MaterialCard";
MaterialCard.propTypes = {
  material: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    department: PropTypes.shape({ name: PropTypes.string }),
    academicLevel: PropTypes.string,
    academicDegree: PropTypes.string,
    materialType: PropTypes.string,
    deliveryFormat: PropTypes.string,
    digitalContent: PropTypes.shape({ pageCount: PropTypes.number }),
    summary: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    numReviews: PropTypes.number,
    shop: PropTypes.shape({
      id: PropTypes.string,
      businessName: PropTypes.string,
      logo: PropTypes.string,
    }),
    publisher: PropTypes.string,
    analytics: PropTypes.shape({
      upvotes: PropTypes.number,
      purchases: PropTypes.number,
    }),
  }).isRequired,
  onClick: PropTypes.func,
  onQuickView: PropTypes.func,
  onWishlist: PropTypes.func,
  onCompare: PropTypes.func,
  onAddToCart: PropTypes.func,
  onRate: PropTypes.func,

  variant: PropTypes.oneOf(["default", "horizontal", "grid", "flip"]),
  layout: PropTypes.oneOf(["vertical", "horizontal", "backface"]),
  showSummary: PropTypes.bool,
  showDescription: PropTypes.bool,
  showMeta: PropTypes.bool,
  showPrice: PropTypes.bool,
  showRating: PropTypes.bool,
  showActions: PropTypes.bool,
  showOverlay: PropTypes.bool,
  showShopInfo: PropTypes.bool,

  renderThumbnail: PropTypes.func,
  renderContent: PropTypes.func,
  renderFooter: PropTypes.func,

  cardVariant: PropTypes.oneOf(["default", "outlined", "shadowed", "gradient"]),
  cardTheme: PropTypes.oneOf(["light", "dark", "glass", "neon"]),
  className: PropTypes.string,
  clickable: PropTypes.bool,
};

MaterialCard.defaultProps = {
  onClick: null,
  onQuickView: null,
  onWishlist: null,
  onCompare: null,
  onAddToCart: null,
  onRate: null,

  variant: "default",
  layout: "vertical",
  showSummary: true,
  showDescription: false,
  showMeta: true,
  showPrice: true,
  showRating: true,
  showActions: true,
  showOverlay: false,
  showShopInfo: false,

  renderThumbnail: null,
  renderContent: null,
  renderFooter: null,

  cardVariant: "shadowed",
  cardTheme: "light",
  className: "",
  clickable: false,
};

export default MaterialCard;

// "use client";

// import { Card } from "@/components/ui/Card";
// import useEffectivePrice from "@/hooks/useEffectivePrice";
// import { cn } from "@/utils/cn";
// import { getPromotionTag } from "@/utils/getPromotionTag";
// import PropTypes from "prop-types";
// import { memo, useMemo } from "react";
// import FlipCard from "./FlipCard";
// import { Thumbnail } from "../MaterialThumbnailActions";
// import { Content } from "./Content";
// import { Footer } from "./Footer";

// const MaterialCard = memo(function MaterialCard({
//   material,
//   onClick,
//   onQuickView,
//   onWishlist,
//   onCompare,
//   onAddToCart,
//   onRate,

//   variant = "default", // "default" | "grid" | "horizontal" | "flip"
//   layout = "vertical", // "vertical" | "horizontal" | "backface"
//   showSummary = true,
//   showDescription = false,
//   showMeta = true,
//   showPrice = true,
//   showRating = true,
//   showActions = true,
//   showOverLay = false,
//   showShopInfo = false,

//   renderThumbnail,
//   renderContent,
//   renderFooter,

//   cardVariant = "shadowed", // passed to <Card>
//   cardTheme = "light", // passed to <Card>
//   className,
//   clickable = false,
// }) {
//   // ─────────────────────────────────────────────────────────────────────────
//   // Destructure material fields (with fallbacks)
//   const {
//     _id,
//     slug,
//     title,
//     thumbnail,
//     department,
//     academicLevel,
//     academicDegree,
//     materialType,
//     deliveryFormat,
//     digitalContent,
//     summary,
//     description,
//     price: basePrice,
//     rating: avgRating = 0,
//     numReviews = 0,
//     shop,
//     publisher,
//     analytics: { upvotes: numLikes = 0, purchases: numComments = 0 } = {},
//   } = material;

//   const deptName = department?.name ?? "Unknown Department";
//   const levelLabel = academicLevel ?? "N/A";
//   const degreeLabel = academicDegree ?? "N/A";
//   const typeLabel = materialType ?? "Material";
//   const deliveryLabel =
//     deliveryFormat === "digital" ? "Digital Download" : "Physical Copy";
//   const pageCount = digitalContent?.pageCount ?? "N/A";

//   // ─────────────────────────────────────────────────────────────────────────
//   // Compute effective price via hook (fallback to basePrice)
//   const { price: dynamicPrice, loading: priceLoading } = useEffectivePrice({
//     materialId: _id,
//     materialType,
//   });

//   const effective = useMemo(() => {
//     if (dynamicPrice != null) return dynamicPrice;
//     return {
//       amount: basePrice,
//       formatted: `₦${(basePrice || 0).toLocaleString()}`,
//       currencySymbol: "₦",
//       originalAmount: basePrice,
//       discountApplied: 0,
//     };
//   }, [dynamicPrice, basePrice]);

//   const isFree = effective.amount === 0;
//   const hasDiscount = effective.originalAmount > effective.amount;
//   const discountPercent = hasDiscount
//     ? Math.round(
//         ((effective.originalAmount - effective.amount) /
//           effective.originalAmount) *
//           100
//       )
//     : 0;

//   // ─────────────────────────────────────────────────────
//   // Determine if a promo tag should display (e.g. “Free” or “Sale”)
//   const promoTag = getPromotionTag({
//     finalPrice: effective,
//     price: {
//       amount: basePrice,
//       formatted: `₦${(basePrice || 0).toLocaleString()}`,
//       currencySymbol: "₦",
//     },
//   });

//   // ──────────────────────────────────────────────────────
//   // Build the three main “subtrees”—Thumbnail, Content, Footer.
//   // If the user passed renderThumbnail/renderContent/renderFooter, use those;
//   // otherwise use the default subcomponents.
//   const thumbnailNode = renderThumbnail ? (
//     renderThumbnail(material)
//   ) : (
//     <Thumbnail
//       slug={slug}
//       title={title}
//       thumbnail={thumbnail}
//       promoTag={promoTag}
//       showActions={showActions}
//       onWishlist={onWishlist}
//       onCompare={onCompare}
//       onAddToCart={onAddToCart}
//       materialId={_id}
//     />
//   );

//   const contentNode = renderContent ? (
//     renderContent(material)
//   ) : (
//     <Content
//       title={title}
//       deptName={deptName}
//       degreeLabel={degreeLabel}
//       levelLabel={levelLabel}
//       typeLabel={typeLabel}
//       deliveryLabel={deliveryLabel}
//       pageCount={pageCount}
//       summary={summary}
//       description={description}
//       showMeta={showMeta}
//       showSummary={showSummary}
//     />
//   );

//   const footerNode = renderFooter ? (
//     renderFooter(material)
//   ) : (
//     <Footer
//       effective={effective}
//       isFree={isFree}
//       priceLoading={priceLoading}
//       hasDiscount={hasDiscount}
//       discountPercent={discountPercent}
//       avgRating={avgRating}
//       numReviews={numReviews}
//       numLikes={numLikes}
//       numComments={numComments}
//       showPrice={showPrice}
//       showRating={showRating}
//       showShopInfo={showShopInfo}
//       shop={shop}
//       showActions={showActions}
//       showOverLay={showOverLay}
//       onQuickView={onQuickView}
//       onWishlist={onWishlist}
//       onCompare={onCompare}
//       onAddToCart={onAddToCart}
//       onRate={onRate}
//       material={material}
//     />
//   );

//   // ─────────────────────────────────────────────────────────────────────────
//   // FLIP / BACKFACE Layout
//   // If the consumer passed variant="flip" or layout="backface", we *must* return
//   // the FlipCard component here (instead of falling through). Notice the explicit return.
//   if (variant === "flip" && layout === "backface") {
//     return (
//       <FlipCard
//         cardVariant={cardVariant}
//         cardTheme={cardTheme}
//         className={className}
//         onClick={onClick}
//         // Pass down the three “subtrees” plus any extra props FlipCard needs:
//         thumbnailNode={thumbnailNode}
//         contentNode={contentNode}
//         footerNode={footerNode}
//         summary={summary}
//         description={description}
//         typeLabel={typeLabel}
//         degreeLabel={degreeLabel}
//         levelLabel={levelLabel}
//         pageCount={pageCount}
//         deliveryLabel={deliveryLabel}
//         deptName={deptName}
//         publisher={publisher}
//         slug={slug}
//         onQuickView={onQuickView}
//         onAddToCart={onAddToCart}
//         onWishlist={onWishlist}
//         onCompare={onCompare}
//         _id={_id}
//         materialType={materialType}
//       />
//     );
//   }

//   // ─────────────────────────────────────────────────────────────────────────
//   // NON-FLIP LAYOUTS (vertical, horizontal, grid)
//   return (
//     <Card
//       role={clickable ? "button" : undefined}
//       tabIndex={clickable ? 0 : undefined}
//       variant={cardVariant}
//       theme={cardTheme}
//       clickable={clickable}
//       onClick={clickable ? onClick : undefined}
//       className={cn("group relative overflow-hidden", className)}
//     >
//       {variant === "grid" ? (
//         <div className="flex flex-col h-full">
//           {thumbnailNode}
//           <div className="flex flex-col flex-1 gap-2">
//             {contentNode}
//             <div className="mt-auto">{footerNode}</div>
//           </div>
//         </div>
//       ) : variant === "horizontal" ? (
//         <div className="flex flex-row h-full">
//           <div className="w-1/3">{thumbnailNode}</div>
//           <div className="w-2/3 flex flex-col">
//             {contentNode}
//             {footerNode}
//           </div>
//         </div>
//       ) : (
//         // Default “vertical”
//         <div className="flex flex-col h-full">
//           {thumbnailNode}
//           {contentNode}
//           {footerNode}
//         </div>
//       )}
//     </Card>
//   );
// });

// MaterialCard.displayName = "MaterialCard";
// MaterialCard.propTypes = {
//   material: PropTypes.object.isRequired,
//   onClick: PropTypes.func,
//   onQuickView: PropTypes.func,
//   onWishlist: PropTypes.func,
//   onCompare: PropTypes.func,
//   onAddToCart: PropTypes.func,
//   onRate: PropTypes.func,

//   variant: PropTypes.oneOf(["default", "horizontal", "grid", "flip"]),
//   layout: PropTypes.oneOf(["vertical", "horizontal", "backface"]),
//   showSummary: PropTypes.bool,
//   showDescription: PropTypes.bool,
//   showMeta: PropTypes.bool,
//   showPrice: PropTypes.bool,
//   showRating: PropTypes.bool,
//   showActions: PropTypes.bool,
//   showShopInfo: PropTypes.bool,

//   renderThumbnail: PropTypes.func,
//   renderContent: PropTypes.func,
//   renderFooter: PropTypes.func,

//   cardVariant: PropTypes.oneOf(["default", "outlined", "shadowed", "gradient"]),
//   cardTheme: PropTypes.oneOf(["light", "dark", "glass", "neon"]),
//   className: PropTypes.string,
//   clickable: PropTypes.bool,
// };

// export default MaterialCard;
