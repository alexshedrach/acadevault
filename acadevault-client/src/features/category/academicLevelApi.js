import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";

const CATEGORY_BASE_URL = "/api/v2/categories";

export const academicLevelApi = createApi({
  reducerPath: "academicLevelApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["AcademicLevel"],
  endpoints: (builder) => ({
    // ────────────── Query: Fetch Academic Levels with Degrees ──────────────
    getAcademicLevels: builder.query({
      query: () => `${CATEGORY_BASE_URL}/academic/levels`,
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

    // 🔁 Ready for future: Create/Update/Delete Academic Levels if needed
    // Example:
    // createAcademicLevel: builder.mutation({
    //   query: (newLevel) => ({
    //     url: `/levels`,
    //     method: "POST",
    //     body: newLevel,
    //   }),
    //   invalidatesTags: [{ type: "AcademicLevel", id: "LIST" }],
    // }),
  }),
});

export const { useGetAcademicLevelsQuery } = academicLevelApi;
