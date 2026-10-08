"use client";

import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Grid } from "@/components/layout/Grid";
import { GridItem } from "@/components/layout/GridItem";
import NewReleaseMaterialFilters from "./NewReleaseMaterialFilters";
import MaterialCard from "@/components/materials/materialCard";
import LoadingState from "@/components/states/LoadingState";
import EmptyState from "@/components/states/EmptyState";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * NewReleaseMaterials
 *
 * A production-grade, reusable component that displays a titled section of
 * academic materials, with:
 *   1. A section header (title + description).
 *   2. A horizontal filter bar (degree-level filters).
 *   3. State handling for:
 *      - Loading (shows a spinner/message),
 *      - Empty (shows an empty illustration/message),
 *      - Display (renders a responsive grid of MaterialCard items).
 *
 * Props:
 *  - title            : string           (Section heading, e.g. "Undergraduate Projects")
 *  - description      : string           (Short subtitle under the heading)
 *  - materials        : array of objects (List of material data to render)
 *  - subcategories    : array of { _id, name } (Filter options, e.g. degrees)
 *  - selectedFilter   : string           (Currently selected degree key)
 *  - onSelectFilter   : func             (Callback when filter changes)
 *  - isLoading        : boolean          (Whether data is still loading)
 *  - router           : object           (Next.js router for navigation)
 *  - onQuickView      : func             (Open quick-view modal for a given material)
 *  - handleAddToCart  : func             (Add a material to cart)
 *  - handleWishlist   : func             (Add a material to wishlist)
 *  - handleCompare    : func             (Add a material to compare list)
 *
 * Enhancements for production:
 * 1. Wrapped in React.memo for performance (only re-renders when props change).
 * 2. PropTypes + defaultProps for runtime validation and fallback values.
 * 3. Responsive Grid: 1 column on mobile, 2 on small screens, 4 on large screens.
 * 4. Uses useCallback/useMemo to avoid recreating functions/arrays on every render.
 * 5. Accessibility: section landmark, proper heading markup, and button labels.
 * 6. No inline arrow functions inside JSX where avoidable—using useCallback instead.
 * 7. Clear separation of "header", "filter bar", and "content states".
 * ─────────────────────────────────────────────────────────────────────────────
 */
const NewReleaseMaterials = memo(function NewReleaseMaterials({
  title,
  description,
  materials,
  subcategories,
  selectedFilter,
  onSelectFilter,
  isLoading,
  router,
  onQuickView,
  handleAddToCart,
  handleWishlist,
  handleCompare,
}) {
  // Determine if there are any materials to display (after filtering in parent).
  const hasMaterials = Array.isArray(materials) && materials.length > 0;

  // Memoize rendering of the material cards to avoid unnecessary recalculations.
  const renderedMaterials = useMemo(() => {
    if (!hasMaterials) return null;

    return materials.map((mat) => {
      // Pre-bind callbacks for this material to avoid new functions each render.
      const navigateToDetail = () => router.push(`/materials/${mat._id}`);
      const addToCart = () => handleAddToCart(mat._id);
      const addToWishlist = () => handleWishlist(mat._id);
      const addToCompare = () => handleCompare(mat._id);
      const quickView = () => onQuickView(mat);

      return (
        <GridItem as="div" key={mat._id}>
          <MaterialCard
            material={mat}
            variant="grid"
            showMeta={true}
            showSummary={false}
            showPrice
            showRating={true}
            showShopInfo={true}
            showActions={false}
            showOverlay
            onClick={navigateToDetail}
            onAddToCart={addToCart}
            onWishlist={addToWishlist}
            onCompare={addToCompare}
            onQuickView={quickView}
            cardVariant="default"
            cardTheme="grass"
            className="max-w-sm"
          />
        </GridItem>
      );
    });
  }, [
    materials,
    hasMaterials,
    router,
    handleAddToCart,
    handleWishlist,
    handleCompare,
    onQuickView,
  ]);

  // Handler for "View More" button—opens `/materials` in a new tab.
  const viewMoreHref = "/materials";
  const viewMoreProps = { as: "a", href: viewMoreHref, target: "_blank" };

  return (
    <section
      role="region"
      aria-labelledby={`new-release-${title.replace(/\s+/g, "-")}-heading`}
      className="mb-12"
    >
      {/* ─── Section Header + Filters ───────────────────────────── */}
      <div className="w-full mb-8">
        {/* Heading + Description */}
        <div className="mb-2">
          <h3
            id={`new-release-${title.replace(/\s+/g, "-")}-heading`}
            className="flex items-center text-2xl font-bold text-gray-800"
          >
            {/* Blue accent bar at left */}
            <span className="border-l-4 border-blue-600 pl-2">{title}</span>
          </h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1 ml-2">{description}</p>
          )}
        </div>

        {/* Filter bar (degree tabs) */}
        <NewReleaseMaterialFilters
          subcategories={subcategories}
          selectedFilter={selectedFilter}
          onSelectFilter={onSelectFilter}
        />
      </div>

      {/* ─── States: Loading / Empty / Grid ────────────────────── */}
      {isLoading ? (
        // Loading: show spinner + message
        <LoadingState
          size="md"
          message="Loading new releases..."
          className="py-12"
        />
      ) : hasMaterials ? (
        // Display grid of MaterialCard items
        <Grid
          as="div"
          role="list"
          cols={1}
          colsSm={2}
          colsLg={4}
          gap="gap-4"
          className="mt-4"
        >
          {renderedMaterials}
        </Grid>
      ) : (
        // Empty: no materials to show
        <EmptyState
          title="No materials found"
          message="Try selecting a different filter or check back later for the latest academic releases."
          icon={<BookOpen size={48} className="text-blue-500" />}
          size="md"
          className="mt-12"
        />
      )}

      {/* ─── "View More Materials" Button ────────────────────────── */}
      {/* <div className="mt-12 text-center">
        <Button {...viewMoreProps} variant="gradient" size="md">
          View More Materials
        </Button>
      </div> */}
    </section>
  );
});

NewReleaseMaterials.displayName = "NewReleaseMaterials";

NewReleaseMaterials.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string,
      title: PropTypes.string,
      // Further shape validations can be added here as needed
    })
  ),
  subcategories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onSelectFilter: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onQuickView: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleWishlist: PropTypes.func.isRequired,
  handleCompare: PropTypes.func.isRequired,
};

NewReleaseMaterials.defaultProps = {
  description: "",
  materials: [],
  isLoading: false,
};

export default NewReleaseMaterials;

// "use client";

// import { BookOpen } from "lucide-react";

// import { Grid } from "@/components/layout/Grid";
// import NewReleaseMaterialFilters from "./NewReleaseMaterialFilters";
// import { GridItem } from "@/components/layout/GridItem";
// import MaterialCard from "@/components/materials/materialCard";
// import LoadingState from "@/components/states/LoadingState";
// import EmptyState from "@/components/states/EmptyState";

// export default function NewReleaseMaterials({
//   title,
//   description,
//   materials,
//   subcategories,
//   selectedFilter,
//   onSelectFilter,
//   isLoading,
//   router,
//   onQuickView,
//   handleAddToCart,
//   handleWishlist,
//   handleCompare,
// }) {
//   const hasMaterials = Array.isArray(materials) && materials.length > 0;

//   return (
//     <div className="mb-12">
//       {/* ─── Section Header + Filters ───────────────────────────── */}
//       <div className="w-full mb-8">
//         <div className="mb-2">
//           <h3 className="flex items-center text-2xl font-bold text-gray-800">
//             <span className="border-l-4 border-blue-600 pl-2">{title}</span>
//           </h3>
//           <p className="text-sm text-gray-500 mt-1 ml-2">{description}</p>
//         </div>

//         <NewReleaseMaterialFilters
//           subcategories={subcategories}
//           selectedFilter={selectedFilter}
//           onSelectFilter={onSelectFilter}
//         />
//       </div>

//       {/* ─── States: Loading / Empty / Grid ────────────────────── */}
//       {isLoading ? (
//         <LoadingState
//           size="md"
//           message="Loading new releases..."
//           className="py-12"
//         />
//       ) : hasMaterials ? (
//         <Grid
//           as="div"
//           role="list"
//           cols={1}
//           colsSm={2}
//           colsLg={4}
//           gap="gap-4"
//           className="mt-4"
//         >
//           {materials.map((mat) => (
//             <GridItem as="div" key={mat._id}>
//               <MaterialCard
//                 material={mat}
//                 variant="grid"
//                 showMeta={true}
//                 showSummary={false}
//                 showRating={true}
//                 showShopInfo={true}
//                 showOverLay={true}
//                 showActions={false}
//                 onClick={() => router.push(`/materials/${mat._id}`)}
//                 onAddToCart={() => handleAddToCart(mat._id)}
//                 onWishlist={() => handleWishlist(mat._id)}
//                 onCompare={() => handleCompare(mat._id)}
//                 onQuickView={(e) => onQuickView(mat, e)}
//                 cardVariant="default"
//                 cardTheme="grass"
//                 className="max-w-sm"
//               />
//             </GridItem>
//           ))}
//         </Grid>
//       ) : (
//         <EmptyState
//           title="No materials found"
//           message="Try selecting a different filter or check back later for the latest academic releases."
//           icon={<BookOpen size={48} className="text-blue-500" />}
//           size="md"
//           className="mt-12"
//         />
//       )}
//     </div>
//   );
// }
