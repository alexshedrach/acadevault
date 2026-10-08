import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import { transformDepartmentResponse } from "./categoryQueryHelpers";

const CATEGORY_BASE_URL = "/api/v2/categories";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category", "Department", "AcademicLevel"],

  endpoints: (builder) => ({
    // ──────────────────── GET ALL CATEGORIES ─────────────────────
    getCategories: builder.query({
      query: (params) => ({
        url: CATEGORY_BASE_URL,
        method: "GET",
        params,
      }),
      transformResponse: (response) => ({
        categories: response?.data?.categories || [],
        pagination: response?.pagination || {},
      }),

      providesTags: (result) =>
        result?.categories
          ? [
              ...result.categories.map(({ _id }) => ({
                type: "Category",
                id: _id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),

    // ──────────────────── GET PARENT CATEGORIES ─────────────────────
    getParentCategories: builder.query({
      query: (params) => ({
        url: `${CATEGORY_BASE_URL}/parent`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => ({
        parentCategories: response?.data?.categories || [],
        pagination: response?.pagination || {},
      }),
      providesTags: (result) =>
        result?.parentCategories
          ? [
              ...result.parentCategories.map(({ _id }) => ({
                type: "Category",
                id: _id,
              })),
              { type: "Category", id: "PARENT" },
            ]
          : [{ type: "Category", id: "PARENT" }],
    }),

    // ──────────────────── GET SUBCATEGORIES ─────────────────────
    getSubcategories: builder.query({
      query: ({ parentId, params }) => ({
        url: `${CATEGORY_BASE_URL}/${parentId}/subcategories`,
        method: "GET",
        params,
      }),
      transformResponse: (response, meta, arg) => ({
        parentId: arg.parentId,
        subcategories: response?.data?.subcategories || [],
      }),
      providesTags: (result) =>
        result.subcategories.length
          ? [
              ...result.subcategories.map((c) => ({
                type: "Category",
                id: c._id,
              })),
              { type: "Category", id: `SUB_${result.parentId}` },
            ]
          : [{ type: "Category", id: `SUB_${result.parentId}` }],
    }),

    // ──────────────────── GET ACADEMIC LEVELS WITH DEGREES ─────────────────────
    getAcademicLevels: builder.query({
      query: () => ({
        url: `${CATEGORY_BASE_URL}/academic/levels`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.academicLevels || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "AcademicLevel",
                id,
              })),
              { type: "AcademicLevel", id: "LIST" },
            ]
          : [{ type: "AcademicLevel", id: "LIST" }],
    }),

    // ────────────────────── GET DEPARTMENTS ──────────────────────
    getDepartments: builder.query({
      query: (params) => ({
        url: `${CATEGORY_BASE_URL}/departments`,
        method: "GET",
        params,
      }),
      transformResponse: (response, meta, arg) =>
        transformDepartmentResponse(response, arg),
      providesTags: (result) =>
        result?.departments?.length
          ? [
              ...result.departments.map(({ _id }) => ({
                type: "Department",
                id: _id,
              })),
              { type: "Department", id: "LIST" },
            ]
          : [{ type: "Department", id: "LIST" }],
    }),
    // ────────────────────── GET CATEGORY BY ID ──────────────────────
    getCategoryById: builder.query({
      query: ({ categoryId, params }) => ({
        url: `${CATEGORY_BASE_URL}/${categoryId}`,
        method: "GET",
        params,
      }),

      transformResponse: (response) => {
        const category = response?.data;

        return {
          id: category?.id,
          name: category?.name,
          slug: category?.slug,
          description: category?.description,
          categoryType: category?.categoryType,
          sortOrder: category?.sortOrder,
          parent: category?.parent || null,

          // Subcategories
          subcategories: category?.subcategories || [],
          subcategoriesMeta: category?.subcategoriesMeta || {},

          // Materials (optional, depending on backend implementation)
          materials: category?.totalMaterials || [],
          materialsMeta: category?.materialsMeta || {},

          // Stats
          totalViews: category?.totalViews ?? 0,
          totalDownloads: category?.totalDownloads ?? 0,
          averageRating: category?.averageRating ?? 0,
          newMaterialsCount: category?.newMaterialsCount ?? 0,

          // Timestamps
          createdAt: category?.createdAt,
          updatedAt: category?.updatedAt,
        };
      },

      providesTags: (result, error, { categoryId }) => {
        if (!result) return [];
        return [
          { type: "Category", id: result.id },
          { type: "Category", id: categoryId },
          ...(result.subcategories || []).map((sub) => ({
            type: "Category",
            id: sub._id || sub.id,
          })),
        ];
      },

      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }),

    // ──────────────────── CREATE CATEGORY ─────────────────────
    createCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORY_BASE_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    // ──────────────────── UPDATE CATEGORY ─────────────────────
    updateCategory: builder.mutation({
      query: ({ categoryId, updateData }) => ({
        url: `${CATEGORY_BASE_URL}/${categoryId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Category", id: categoryId },
        { type: "Category", id: "LIST" },
      ],
    }),

    // ───────────────────── SOFT DELETE CATEGORY ─────────────────────
    softDeleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_BASE_URL}/${categoryId}/soft-delete`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, categoryId) => [
        { type: "Category", id: categoryId },
        { type: "Category", id: "LIST" },
      ],
    }),

    // ──────────────────── DELETE CATEGORY ─────────────────────
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_BASE_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
  useGetSubcategoriesQuery,
  useLazyGetSubcategoriesQuery,
  useGetDepartmentsQuery,
  useGetAcademicLevelsQuery,
  useGetCategoryByIdQuery,
  useGetCategoryBySlugQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useSoftDeleteCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
