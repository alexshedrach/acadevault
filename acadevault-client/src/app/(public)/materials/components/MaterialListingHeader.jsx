import SortDropdown from "@/components/common/SortDropdown";
import { ChevronRight } from "lucide-react";

export default function MaterialListingHeader({
  pagination,
  filters,
  sortOptions,
  isSidebarCollapsed,
  onSortChange,
  onToggleSidebar,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        {isSidebarCollapsed && (
          <button
            onClick={onToggleSidebar}
            className="group inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-all"
            aria-label="Show Filters"
          >
            <ChevronRight
              size={24}
              className="mr-2 text-orange-500 group-hover:translate-x-1 transition-transform"
            />
            Show Filters
          </button>
        )}

        {sortOptions?.length > 0 && (
          <div className="w-full sm:w-64">
            <SortDropdown
              labelName="Sort By:"
              options={sortOptions}
              selected={filters?.sort || ""}
              onChange={onSortChange}
            />
          </div>
        )}
      </div>

      <div
        className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm"
        role="status"
        aria-live="polite"
      >
        <span className="text-lg font-semibold text-indigo-600 leading-none">
          {pagination.totalResults?.toLocaleString() || 0}
        </span>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          materials found
        </span>
      </div>
    </div>
  );
}
