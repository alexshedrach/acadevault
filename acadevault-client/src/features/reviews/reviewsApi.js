import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const MATERIALS_PREFIX = '/api/v2/academic-materials';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    /**
     * Fetch paginated reviews for a given material.
     * GET /api/v2/academic-materials/:materialId/reviews?page=&limit=
     */
    getMaterialReviews: builder.query({
      query: ({ materialId, page = 1, limit = 5 }) =>
        `${MATERIALS_PREFIX}/${encodeURIComponent(materialId)}/reviews?page=${page}&limit=${limit}`,
      transformResponse: (response) =>
        response.data,
      providesTags: (result, error, { materialId }) =>
        // Invalidate this tag whenever reviews for this material change
        [{ type: 'Review', id: materialId }],
    }),

    /**
     * Submit a new review for a material.
     * POST /api/v2/academic-materials/:materialId/reviews
     */
    addReview: builder.mutation({
      query: ({ materialId, ...body }) => ({
        url: `${MATERIALS_PREFIX}/${encodeURIComponent(materialId)}/reviews`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) =>
        response.data,
      invalidatesTags: (result, error, { materialId }) => [
        { type: 'Review', id: materialId },
      ],
    }),
  }),
});

export const {
  useGetMaterialReviewsQuery,
  useAddReviewMutation,
} = reviewsApi;
