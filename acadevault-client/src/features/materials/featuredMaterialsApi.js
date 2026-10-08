import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";

const MATERIAL_API_URL = "/api/v2/academic-materials";

export const featuredMaterialsApi = createApi({
  reducerPath: "featuredMaterialsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["FeaturedMaterial"],
  endpoints: (builder) => ({
    // ─────────────── Query: Get Featured Materials ───────────────
    getFeaturedMaterials: builder.query({
      query: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return `${MATERIAL_API_URL}/?${query}`;
      },
      transformResponse: (response) => response?.data || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: "FeaturedMaterial",
                id: item.id,
              })),
              { type: "FeaturedMaterial", id: "LIST" },
            ]
          : [{ type: "FeaturedMaterial", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFeaturedMaterialsQuery,
  useLazyGetFeaturedMaterialsQuery,
} = featuredMaterialsApi;
