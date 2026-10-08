"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCategoryDetails } from "@/hooks/useCategoryDetails";
import { cn } from "@/utils/cn";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";

/**
 * CategoryHero
 *
 * Displays a category page section using the provided slug.
 * Fetches and shows category details, subcategories, and sample materials.
 *
 * @param {Object} props
 * @param {string} props.categorySlug - The slug used to identify the category.
 * @param {Object} [props.filters={}] - Optional filters to apply when fetching materials.
 */
export default function CategoryHero({ categorySlug, filters = {} }) {
  const {
    category,
    subcategories,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
    isError: categoryError,
    error,
    materials,
    totalViews,
    totalDownloads,
    averageRating,
    newMaterialsCount,
    refetch: refetchCategory,
  } = useCategoryDetails(categorySlug, filters);

  console.log(category)

  const subcategoriesCount = subcategories.length;

  return (
    <AsyncStateHandler
      loading={categoryLoading}
      error={categoryError}
      onRetry={refetchCategory}
      loaderText="Loading category details…"
      showEmptyState
      isEmpty={!categorySlug && !categoryLoading && !category}
      emptyTitle="Category Not Found"
      emptyMessage="We couldn’t locate that category. Check the URL or try a different one."
    >
      {category && (
        <section
          className="relative bg-gradient-to-b from-gray-100 to-white"
          aria-labelledby="category-title"
        >
          {/* Background Accent */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-1/2 w-[120%] h-72 bg-blue-200 rounded-b-full -translate-x-1/2 -translate-y-32 opacity-30" />
          </motion.div>

          <div className="relative z-10 container mx-auto px-6 py-16">
            {/* Breadcrumb */}
            {category.parent && (
              <nav
                aria-label="Breadcrumb"
                className="text-sm text-gray-600 mb-4 flex flex-wrap gap-1"
              >
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <span className="mx-1">/</span>
                <Link
                  href={`/materials/category/${category.parent.slug}`}
                  className="hover:underline"
                >
                  {category.parent.name}
                </Link>
                <span className="mx-1">/</span>
                <span className="font-medium text-gray-800">
                  {category.name}
                </span>
              </nav>
            )}

            {/* Title */}
            <div className="text-center mb-8">
              <h1
                id="category-title"
                className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
              >
                {category.name}
              </h1>
              {category.description && (
                <p className="max-w-2xl mx-auto text-lg text-gray-600">
                  {category.description}
                </p>
              )}
            </div>

            {/* Summary Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 flex-wrap">
              <StatBadge
                label="Subcategories"
                value={subcategoriesCount}
                color="blue"
              />
              <StatBadge
                label="Materials"
                value={materials}
                color="green"
              />

              {!!totalViews && (
                <StatBadge
                  label="Total Views"
                  value={totalViews}
                  color="purple"
                />
              )}

              {!!totalDownloads && (
                <StatBadge
                  label="Downloads"
                  value={totalDownloads}
                  color="indigo"
                />
              )}

              {category.averageRating != null && (
                <StatBadge
                  label="Avg. Rating"
                  value={averageRating.toFixed(1)}
                  color="yellow"
                />
              )}

              {!!newMaterialsCount && (
                <StatBadge
                  label="New This Month"
                  value={newMaterialsCount}
                  color="teal"
                />
              )}
            </div>

            {/* Subcategories */}
            {subcategoriesCount > 0 && (
              <section aria-labelledby="subcategory-heading" className="mb-12">
                <h2
                  id="subcategory-heading"
                  className="text-2xl font-semibold text-gray-800 mb-4"
                >
                  Explore Subcategories
                </h2>

                <Carousel
                  items={subcategories}
                  mode="scroll"
                  showControls={true}
                  loop={false}
                  scrollAmount="80%"
                  itemWidthClass="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
                  size="md"
                  className="overflow-visible"
                />
              </section>
            )}
          </div>
        </section>
      )}
    </AsyncStateHandler>
  );
}

/**
 * StatBadge
 */
function StatBadge({ label, value, color }) {
  const bgColor = `bg-${color}-100`;
  const textColor = `text-${color}-800`;

  const safeColorClass = cn(`px-3 py-1 rounded-full font-medium`, {
    "bg-blue-100 text-blue-800": color === "blue",
    "bg-green-100 text-green-800": color === "green",
    "bg-purple-100 text-purple-800": color === "purple",
    "bg-indigo-100 text-indigo-800": color === "indigo",
    "bg-yellow-100 text-yellow-800": color === "yellow",
    "bg-teal-100 text-teal-800": color === "teal",
  });

  return (
    <div className="flex items-center gap-2">
      <span className={safeColorClass}>{label}</span>
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
    </div>
  );
}