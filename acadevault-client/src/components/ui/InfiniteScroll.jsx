"use client";
import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/utils/cn";
import { FaSpinner } from "react-icons/fa";

const DEFAULT_OFFSET = 300;

/**
 * InfiniteScroll Component
 *
 * @param {ReactNode} children - Rendered list items.
 * @param {boolean} hasMore - Whether more pages are available.
 * @param {boolean} isFetchingNextPage - Is currently fetching the next page.
 * @param {() => void} onLoadMore - Function to load next page.
 * @param {number} offset - Pixels from bottom to trigger loading (default: 300).
 * @param {boolean} showLoader - Whether to show loading spinner.
 * @param {boolean} manualTrigger - If true, shows "Load More" button instead of auto scroll.
 */
export default function InfiniteScroll({
  children,
  hasMore,
  isFetchingNextPage,
  onLoadMore,
  offset = DEFAULT_OFFSET,
  showLoader = true,
  manualTrigger = false,
}) {
  const sentinelRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isFetchingNextPage) {
        onLoadMore?.();
      }
    },
    [hasMore, isFetchingNextPage, onLoadMore]
  );

  useEffect(() => {
    if (manualTrigger || !sentinelRef.current) return;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: `0px 0px ${offset}px 0px`,
      threshold: 1.0,
    });
    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver, offset, manualTrigger]);

  return (
    <>
      {children}

      {!manualTrigger && <div ref={sentinelRef} className="h-1" />}

      {manualTrigger && hasMore && (
        <div className="flex justify-center my-4">
          <button
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            className={cn(
              "px-4 py-2 rounded-md bg-blue-600 text-white font-medium transition",
              "hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isFetchingNextPage ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin" /> Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      {isFetchingNextPage && showLoader && !manualTrigger && (
        <div className="flex justify-center py-6 text-blue-600">
          <FaSpinner className="animate-spin" size={24} />
        </div>
      )}
    </>
  );
}

// Material Listing that uses Infinite Scroll

// "use client";

// import { useMaterialFilters } from "@/hooks/useMaterialFilters";
// import { useMaterials } from "@/hooks/useMaterials";
// import MaterialCard from "@/components/MaterialCard";
// import Pagination from "@/components/Pagination";
// import InfiniteScroll from "@/components/InfiniteScroll"; // 👈 Import your component

// export default function MaterialListingPage() {
//   const { filters, rawFilters, updateFilters } = useMaterialFilters();

//   const {
//     materials,
//     pagination,
//     materialsLoading,
//     isMaterialsFetching,
//     hasMore,
//     fetchNextPage,
//     isFetchingNextPage,
//   } = useMaterials(filters, true); // 👈 infiniteScroll = true

//   return (
//     <section className="container py-10">
//       <h1 className="text-2xl font-bold mb-6">Explore Academic Materials</h1>

//       {/* Filter Summary */}
//       <div className="text-sm mb-4 text-gray-600">
//         Showing results for{" "}
//         <strong>{Object.keys(rawFilters).length ? JSON.stringify(rawFilters) : "All Materials"}</strong>
//       </div>

//       <InfiniteScroll
//         hasMore={hasMore}
//         isFetchingNextPage={isFetchingNextPage}
//         onLoadMore={fetchNextPage}
//         offset={300} // optional
//         showLoader={true} // optional
//         manualTrigger={false} // set to true to switch to "Load More" button
//       >
//         {/* Material Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {materials.map((material) => (
//             <MaterialCard key={material._id} material={material} />
//           ))}
//         </div>
//       </InfiniteScroll>

//       {/* Optional Pagination Fallback */}
//       {!isFetchingNextPage && !materialsLoading && pagination?.totalPages > 1 && (
//         <Pagination
//           currentPage={pagination.currentPage}
//           totalPages={pagination.totalPages}
//           onPageChange={(page) => updateFilters({ page })}
//           isLoading={materialsLoading}
//         />
//       )}
//     </section>
//   );
// }

