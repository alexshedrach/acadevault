import React, { useState } from "react";
import PropTypes from "prop-types";
import EmptyState from "@/components/states/EmptyState";
import MaterialListingSidebar from "./MaterialListingSidebar";
import MaterialListingHeader from "./MaterialListingHeader";
import MaterialPaginationFooter from "./MaterialPaginationFooter";
import MaterialListingCardSection from "./MaterialListingCardSection";
import { DEFAULT_SORT_OPTIONS } from "@/constants/sortOptions";
import { FileQuestion } from "lucide-react";

export default function MaterialListing({
  materials = [],
  pagination = {},
  filters = {},
  sortOptions = DEFAULT_SORT_OPTIONS,
  contextTitle = "",
  onFilterChange,
  onSortChange,
  onPageChange,
  resetFilters,
  isFetchingNextPage,
  fetchNextPage,
  hasMore,
  className = "",
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isEmpty = Array.isArray(materials) && materials.length === 0;

  return (
    <div className={`space-y-8 ${className}`}>
      {contextTitle && (
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            {contextTitle}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded"></div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4">
        <MaterialListingSidebar
          filters={filters}
          onFilterChange={onFilterChange}
          resetFilters={resetFilters}
          isCollapsed={isSidebarCollapsed}
          onCollapse={() => setIsSidebarCollapsed(true)}
        />

        <div className="flex-1 space-y-6">
          {isEmpty ? (
            <EmptyState
              title="No Academic Materials Found"
              message="Try adjusting your filters or explore other categories."
              icon={<FileQuestion size={48} className="text-yellow-500" />}
              centered
            />
          ) : (
            <>
              <MaterialListingHeader
                pagination={pagination}
                filters={filters}
                sortOptions={sortOptions}
                isSidebarCollapsed={isSidebarCollapsed}
                onSortChange={onSortChange}
                onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
              />

              <MaterialListingCardSection
                materials={materials}
                isSidebarCollapsed={isSidebarCollapsed}
              />

              {/* <div className="sticky bottom-0 bg-white py-4 border-t"> */}
              <MaterialPaginationFooter
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={onPageChange}
                loading={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
                hasMore={hasMore}
              />
              {/* </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

MaterialListing.propTypes = {
  materials: PropTypes.array,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  filters: PropTypes.object,
  sortOptions: PropTypes.array,
  contextTitle: PropTypes.string,
  onFilterChange: PropTypes.func,
  onSortChange: PropTypes.func,
  onPageChange: PropTypes.func,
  resetFilters: PropTypes.func,
  isFetchingNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  hasMore: PropTypes.bool,
  className: PropTypes.string,
};
