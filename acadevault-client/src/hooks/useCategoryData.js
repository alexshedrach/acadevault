// hooks/useCategoryData.ts
import { useMemo } from "react";
import {
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
  useLazyGetSubcategoriesQuery,
  useGetDepartmentsQuery,
  useGetAcademicLevelsQuery,
} from "@/features/category/categoryApi";

export const useCategoryData = ({
  queryParams = {},
  parentQueryParams = {},
  autoFetch = true,
} = {}) => {
  const categoriesQuery = useGetCategoriesQuery(queryParams, {
    skip: !autoFetch,
  });
  const parentCategoriesQuery = useGetParentCategoriesQuery(parentQueryParams, {
    skip: !autoFetch,
  });
  const [triggerSubcategories, subcategoriesResult] =
    useLazyGetSubcategoriesQuery();
  const departmentsQuery = useGetDepartmentsQuery(undefined, {
    skip: !autoFetch,
  });
  const academicLevelsQuery = useGetAcademicLevelsQuery(undefined, {
    skip: !autoFetch,
  });

  return useMemo(
    () => ({
      // ─── Data ───
      categories: categoriesQuery.data?.categories || [],
      pagination: categoriesQuery.data?.pagination || {},
      parentCategories: parentCategoriesQuery.data?.parentCategories || [],
      // this will hold the most-recently fetched parentId & subcategories:
      lastFetchedSubcategories: subcategoriesResult.data?.subcategories || [],
      lastFetchedParentId: subcategoriesResult.data?.parentId || null,
      departments: departmentsQuery.data?.departments || [],
      academicLevels: academicLevelsQuery.data || [],

      // ─── Loading ───
      isLoading: categoriesQuery.isLoading,
      isLoadingParents: parentCategoriesQuery.isLoading,
      isLoadingSub: subcategoriesResult.isLoading,
      isLoadingDepts: departmentsQuery.isLoading,
      isLoadingAcademicLevels: academicLevelsQuery.isLoading,

      // ─── Errors ───
      errors: {
        categoriesError: categoriesQuery.error,
        parentError: parentCategoriesQuery.error,
        subError: subcategoriesResult.error,
        deptsError: departmentsQuery.error,
        academicError: academicLevelsQuery.error,
      },

      // ─── Refetchers & Triggers ───
      refetchers: {
        refetchCategories: categoriesQuery.refetch,
        refetchParentCategories: parentCategoriesQuery.refetch,
        fetchSubcategories: triggerSubcategories, // <-- lazy trigger
        refetchDepartments: departmentsQuery.refetch,
        refetchAcademicLevels: academicLevelsQuery.refetch,
      },
    }),
    [
      categoriesQuery,
      parentCategoriesQuery,
      subcategoriesResult,
      triggerSubcategories,
      departmentsQuery,
      academicLevelsQuery,
    ]
  );
};
