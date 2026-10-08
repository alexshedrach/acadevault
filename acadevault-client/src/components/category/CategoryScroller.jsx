"use client";

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { useGetCategoriesQuery } from "@/features/category/categoryApi";
import { HorizontalScroller } from "../carousel/HorizontalScroller";

/**
 * CategoryButton
 *
 * Renders a single category as a styled button wrapped in a link.
 * Memoized to avoid unnecessary re-renders in the scroller.
 */
const CategoryButton = React.memo(function CategoryButton({
  category,
  linkPrefix,
  variant,
  size,
}) {
  const href = `${linkPrefix}${encodeURIComponent(category)}`;

  return (
    <Link href={href} passHref>
      <Button
        as="a"
        variant={variant}
        size={size}
        className="snap-start whitespace-nowrap rounded-full px-4 py-2 shadow-sm hover:bg-gray-100 transition-colors"
        aria-label={`Browse ${category} materials`}
      >
        {category}
      </Button>
    </Link>
  );
});
CategoryButton.displayName = "CategoryButton";
CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  linkPrefix: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "outline", "ghost", "link"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
};

/**
 * LoadingPlaceholder
 *
 * Shimmer placeholder shown while categories are loading.
 * Matches the size of CategoryButton but without actual text.
 */
const LoadingPlaceholder = () => (
  <div
    className="snap-start rounded-full bg-gray-200 animate-pulse h-8 w-24"
    aria-hidden="true"
  />
);

/**
 * CategoryScroller
 *
 * A horizontal scroller of category buttons for browsing materials by category.
 * - Fetches category list via RTK Query (useGetCategoriesQuery)
 * - Falls back to provided fallbackCategories if query is skipped or fails
 * - Supports auto-scrolling, looping, and responsive scroll arrows
 * - Displays loading placeholders while fetching
 * - Includes an optional “Browse all” link at the end
 *
 * Props:
 *  - fallbackCategories (array of strings): categories to use if query is skipped or fails
 *  - variant (string): Button variant ("default", "outline", etc.)
 *  - size (string): Button size ("xs", "sm", "md", "lg")
 *  - linkPrefix (string): URL prefix for category links (e.g., "/materials?category=")
 *  - showBrowseAllLink (bool): whether to render a “Browse all →” link at the end
 *  - autoScroll (bool): whether the scroller should auto-scroll
 *  - autoScrollInterval (number): interval in ms for auto-scrolling
 *  - loop (bool): whether to duplicate items to create an infinite loop effect
 *  - className (string): extra classes on the nav container
 */
export const CategoryScroller = ({
  fallbackCategories = [],
  variant = "outline",
  size = "sm",
  linkPrefix = "/materials?category=",
  showBrowseAllLink = true,
  autoScroll = true,
  autoScrollInterval = 4000,
  loop = true,
  className = "",
}) => {
  // Fetch categories; skip query if fallbackCategories is not empty
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useGetCategoriesQuery(undefined, {
    skip: fallbackCategories.length > 0,
    refetchOnMountOrArgChange: true,
  });

  // Determine which categories to display: fetched or fallback
  const categories = useMemo(() => {
    if (
      !isLoading &&
      !isError &&
      Array.isArray(categoriesData) &&
      categoriesData.length > 0
    ) {
      return categoriesData.map((cat) =>
        typeof cat === "string" ? cat : cat.name || ""
      );
    }
    return fallbackCategories;
  }, [categoriesData, fallbackCategories, isLoading, isError]);

  // If loop is true, duplicate the list to simulate infinite scrolling
  const visibleCategories = useMemo(() => {
    return loop && categories.length > 0
      ? [...categories, ...categories]
      : categories;
  }, [categories, loop]);

  // While loading (and no fallback), show placeholders
  const showPlaceholders = isLoading && fallbackCategories.length === 0;

  return (
    <nav
      aria-label="Browse by category"
      className={cn("mt-6 max-w-7xl mx-auto px-4", className)}
    >
      <HorizontalScroller
        showArrows
        autoScroll={autoScroll}
        autoScrollInterval={autoScrollInterval}
        loop={loop && categories.length > 0}
        containerClassName="px-1 gap-2 sm:gap-3"
      >
        {showPlaceholders
          ? // Render 5 placeholder items when loading
            Array.from({ length: 5 }).map((_, idx) => (
              <LoadingPlaceholder key={`placeholder-${idx}`} />
            ))
          : // Render actual category buttons
            visibleCategories.map((cat, idx) => (
              <CategoryButton
                key={`${cat}-${idx}`}
                category={cat}
                linkPrefix={linkPrefix}
                variant={variant}
                size={size}
              />
            ))}

        {showBrowseAllLink && !showPlaceholders && (
          <Link
            href="/materials"
            passHref
            className="snap-start shrink-0 text-sm text-blue-600 hover:underline px-2 py-1 self-center whitespace-nowrap"
            aria-label="Browse all categories"
          >
            Browse all →
          </Link>
        )}
      </HorizontalScroller>
    </nav>
  );
};

CategoryScroller.propTypes = {
  fallbackCategories: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(["default", "outline", "ghost", "link"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  linkPrefix: PropTypes.string,
  showBrowseAllLink: PropTypes.bool,
  autoScroll: PropTypes.bool,
  autoScrollInterval: PropTypes.number,
  loop: PropTypes.bool,
  className: PropTypes.string,
};
