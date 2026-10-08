import { useGetCategoryByIdQuery } from "@/features/category/categoryApi";

export function useCategoryDetails(categoryIdOrSlug, params = {}) {
  const {
    data: category,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCategoryByIdQuery(
    { categoryId: categoryIdOrSlug, params },
    { skip: !categoryIdOrSlug }
  );

  return {
    category,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,

    // Extracted normalized fields
    materials: category?.materials || [],
    subcategories: category?.subcategories || [],
    totalViews: category?.totalViews ?? 0,
    totalDownloads: category?.totalDownloads ?? 0,
    averageRating: category?.averageRating ?? 0,
    newMaterialsCount: category?.newMaterialsCount ?? 0,

    // Utility
    hasContent:
      (category?.materials?.length ?? 0) > 0 ||
      (category?.subcategories?.length ?? 0) > 0,
  };
}
