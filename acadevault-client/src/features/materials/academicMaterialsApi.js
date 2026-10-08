import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import {
  buildMaterialUrl,
  transformMaterialResponse,
  provideMaterialTags,
  TAG_TYPES,
} from "./materialQueryHelpers";

const MATERIAL_API_URL = "/api/v2/academic-materials";

export const materialApi = createApi({
  reducerPath: "materialApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(TAG_TYPES),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    // ──────────────────── GET ACADEMIC MATERIALS ─────────────────────
    getMaterials: builder.query({
      query: (params) => buildMaterialUrl(params),
      transformResponse: (response, meta, arg) =>
        transformMaterialResponse(response, arg),
      providesTags: (result, error, arg) => provideMaterialTags(result, arg),
    }),

    getPopularTags: builder.query({
      query: () => `${MATERIAL_API_URL}/popular-tags`,
      providesTags: (result) =>
        result?.data?.tags
          ? [
              ...result.data.tags.map((tag) => ({
                type: "PopularTags",
                id: tag,
              })),
              { type: "PopularTags", id: "LIST" },
            ]
          : [{ type: "PopularTags", id: "LIST" }],
      keepUnusedDataFor: 300, // cache for 5 minutes
      refetchOnFocus: true,
      refetchOnReconnect: true,
      pollingInterval: 600_000, // optional: auto-refresh every 10 minutes
    }),

    // ───────────────── GET ACADEMIC MATERIALS DETAILS ───────────────────
    getMaterialDetails: builder.query({
      query: (slug) => `${MATERIAL_API_URL}/${encodeURIComponent(slug)}`,
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, slug) => [
        { type: TAG_TYPES.MATERIAL, id: slug },
      ],
    }),

    // ───────────────── GET RELATED MATERIALS ─────────────────
    getRelatedMaterials: builder.query({
      /**
       * Builds the query string to match your controller’s req.query handling.
       * We URL-encode the materialId, then append any pagination/sort/fields params.
       */
      query: ({ materialId, page, limit, sort, fields }) => {
        const params = new URLSearchParams();
        if (page != null) params.append("page", String(page));
        if (limit != null) params.append("limit", String(limit));
        if (sort) params.append("sort", sort);
        if (fields?.length) params.append("fields", fields.join(","));

        return {
          url: `${MATERIAL_API_URL}/${encodeURIComponent(
            materialId
          )}/related?${params.toString()}`,
          method: "GET",
        };
      },
      /**
       * Our backend responds with:
       *   { status: 'success', results: N, data: { relatedMaterials: [ … ] } }
       * We unwrap to get the plain array.
       */
      transformResponse: (response) => response.data.relatedMaterials,
      /**
       * Provide cache invalidation tags for each material returned, plus
       * a “LIST” tag so we can invalidate the whole related-materials list if needed.
       */
      providesTags: (relatedMaterials, _error, { materialId }) =>
        relatedMaterials
          ? [
              // tag each returned material
              ...relatedMaterials.map((mat) => ({
                type: "Material",
                id: mat._id,
              })),
              // and a tag specific to this material’s related-list
              { type: "Material", id: `RELATED_LIST_${materialId}` },
            ]
          : [{ type: "Material", id: `RELATED_LIST_${materialId}` }],
    }),

    getMaterialsByShop: builder.query({
      query: ({ shopId, queryParams = {} }) => {
        const searchParams = new URLSearchParams({
          page: 1,
          limit: 12,
          sort: "-createdAt",
          ...queryParams,
        });
        return `${MATERIAL_API_URL}/shop/${shopId}/materials?${searchParams.toString()}`;
      },
      transformResponse: (response) => ({
        materials: response.data,
        pagination: response.metadata,
      }),
      providesTags: (result) =>
        result?.materials
          ? [
              ...result.materials.map(({ id }) => ({ type: "Material", id })),
              { type: "MaterialList", id: "LIST" },
            ]
          : [{ type: "MaterialList", id: "LIST" }],
    }),

    createMaterial: builder.mutation({
      query: (data) => ({
        url: `${MATERIAL_API_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: TAG_TYPES.MATERIAL_LIST, id: "LIST" }],
    }),

    updateMaterial: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MATERIAL_API_URL}${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: TAG_TYPES.MATERIAL, id },
        { type: TAG_TYPES.MATERIAL_LIST, id: "LIST" },
      ],
    }),

    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `${MATERIAL_API_URL}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: TAG_TYPES.MATERIAL, id },
        { type: TAG_TYPES.MATERIAL_LIST, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetPopularTagsQuery,
  useGetMaterialDetailsQuery,
  useGetRelatedMaterialsQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
  util: { getRunningOperationPromises },
} = materialApi;

// import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
// import { createApi } from "@reduxjs/toolkit/query/react";
// import { HYDRATE } from "next-redux-wrapper";

// const MATERIAL_API_URL = "/api/v2/academic-materials";

// export const materialsApi = createApi({
//   reducerPath: "materialsApi",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: [
//     "Material",
//     "MaterialList",
//     "FeaturedMaterials",
//     "RelatedMaterials",
//   ],
//   extractRehydrationInfo(action, { reducerPath }) {
//     if (action.type === HYDRATE) {
//       return action.payload[reducerPath];
//     }
//   },
//   endpoints: (builder) => ({
//     getMaterials: builder.query({
//       query: (params = {}) => {
//         const searchParams = new URLSearchParams(params);
//         return `${MATERIAL_API_URL}?${searchParams.toString()}`;
//       },
//       transformResponse: (response) => ({
//         materials: response.data,
//         pagination: response.pagination,
//       }),
//       providesTags: (result) =>
//         result?.materials
//           ? [
//               ...result.materials.map(({ id }) => ({ type: "Material", id })),
//               { type: "MaterialList", id: "LIST" },
//             ]
//           : [{ type: "MaterialList", id: "LIST" }],
//     }),

//     getMaterialBySlug: builder.query({
//       query: (slug) => `${MATERIAL_API_URL}/${slug}`,
//       transformResponse: (response) => response.data,
//       providesTags: (result, error, slug) => [{ type: "Material", id: slug }],
//     }),

//     getFeaturedMaterials: builder.query({
//       query: (params = {}) => {
//         const searchParams = new URLSearchParams(params);
//         return `${MATERIAL_API_URL}?${searchParams.toString()}`;
//       },
//       transformResponse: (response) => response.data,
//       providesTags: [{ type: "FeaturedMaterials", id: "LIST" }],
//     }),

//     getMaterialsByCategory: builder.query({
//       query: ({ categorySlug, queryParams = {} }) => {
//         const queryString = new URLSearchParams(queryParams).toString();
//         return `${MATERIAL_API_URL}/category/${categorySlug}/materials?${queryString}`;
//       },
//       transformResponse: (response) => ({
//         materials: response.data,
//         pagination: response.pagination,
//       }),
//       providesTags: (result) =>
//         result?.materials
//           ? [
//               ...result.materials.map(({ id }) => ({ type: "Material", id })),
//               { type: "MaterialList", id: "LIST" },
//             ]
//           : [{ type: "MaterialList", id: "LIST" }],
//     }),

//     getMaterialsByShop: builder.query({
//       query: ({ shopId, queryParams = {} }) => {
//         const searchParams = new URLSearchParams({
//           page: 1,
//           limit: 12,
//           sort: "-createdAt",
//           ...queryParams,
//         });
//         return `${MATERIAL_API_URL}/shop/${shopId}/materials?${searchParams.toString()}`;
//       },
//       transformResponse: (response) => ({
//         materials: response.data,
//         pagination: response.metadata,
//       }),
//       providesTags: (result) =>
//         result?.materials
//           ? [
//               ...result.materials.map(({ id }) => ({ type: "Material", id })),
//               { type: "MaterialList", id: "LIST" },
//             ]
//           : [{ type: "MaterialList", id: "LIST" }],
//     }),

//     getMaterialsByLevelAndDegree: builder.query({
//       query: (params = {}) => {
//         const searchParams = new URLSearchParams(params);
//         return `${MATERIAL_API_URL}?${searchParams.toString()}`;
//       },
//       transformResponse: (response) => ({
//         materials: response.data.materials,
//         pagination: {
//           totalPages: 1, // Optional fallback until backend supports full pagination
//           currentPage: 1,
//           totalResults: response.data.materials.length,
//         },
//       }),
//       providesTags: [{ type: "MaterialList", id: "LIST" }],
//     }),

//     getRelatedMaterials: builder.query({
//       query: ({ materialId, queryParams = {} }) => {
//         const searchParams = new URLSearchParams(queryParams).toString();
//         return `${MATERIAL_API_URL}/${materialId}/related?${searchParams}`;
//       },
//       transformResponse: (response) => ({
//         relatedMaterials: response.data.relatedMaterials,
//         metadata: {
//           results: response.data.results,
//           status: response.data.status,
//         },
//       }),
//       providesTags: (result, error, { materialId }) => [
//         { type: "RelatedMaterials", id: materialId },
//       ],
//     }),
//   }),
// });

// export const {
//   useGetMaterialsQuery,
//   useGetMaterialBySlugQuery,
//   useGetFeaturedMaterialsQuery,
//   useGetMaterialsByCategoryQuery,
//   useGetMaterialsByShopQuery,
//   useGetMaterialsByLevelAndDegreeQuery,
//   useGetRelatedMaterialsQuery,
//   util: { getRunningOperationPromises },
// } = materialsApi;
