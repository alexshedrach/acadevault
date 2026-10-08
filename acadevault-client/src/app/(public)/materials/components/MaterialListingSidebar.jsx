import { ChevronLeft } from "lucide-react";
import MaterialFilters from "@/app/(public)/materials/components/filters/MaterialFilters";
import { cn } from "@/utils/cn";

export default function MaterialListingSidebar({
  filters,
  onFilterChange,
  resetFilters,
  isCollapsed,
  onCollapse,
}) {
  return (
    <>
      {/* Optional Mobile Overlay */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onCollapse}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={cn(
          "fixed lg:static top-0 left-0 h-full lg:h-auto bg-white transition-transform duration-300 ease-in-out z-40",
          isCollapsed
            ? "-translate-x-full lg:translate-x-0 w-0 overflow-hidden"
            : "translate-x-0 w-[70%] sm:w-[40%] md:w-[30%]" // fluid custom widths
        )}
        aria-hidden={isCollapsed}
      >
        {/* Collapse Button */}
        <button
          onClick={onCollapse}
          className="absolute -top-4 right-4 z-50 p-2 rounded-full bg-white/90 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200 ease-in-out backdrop-blur-sm"
          aria-label="Collapse Filters"
        >
          <ChevronLeft className="text-orange-500" size={25} />
        </button>

        <fieldset className="relative border border-gray-200 rounded-lg shadow-sm p-4 pt-10 pb-6 flex flex-col h-full lg:h-auto">
          <legend className="absolute -top-3 left-6 px-2 text-2xl font-bold text-gray-900">
            Filters
          </legend>

          <div className="mt-4 overflow-y-auto flex-1">
            <MaterialFilters
              filters={filters}
              onFilterChange={onFilterChange}
              onResetFilters={resetFilters}
            />
          </div>
        </fieldset>
      </aside>
    </>
  );
}
