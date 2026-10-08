import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const SHOP_API_URL = "api/v2/shops";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Shop", "ShopReview", "FollowStatus"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    // === Get Shop Details with Optional Query ===
    getShopDetails: builder.query({
      query: ({ shopId, queryParams = {} }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return `/${SHOP_API_URL}/${shopId}${
          queryString ? `?${queryString}` : ""
        }`;
      },
      transformResponse: (res) => res.data,
      providesTags: (result, error, { shopId }) => [
        { type: "Shop", id: shopId },
      ],
    }),

    // === Fetch Shops List ===
    getShops: builder.query({
      query: (queryParams) => {
        const query = new URLSearchParams(queryParams).toString();
        return `/${SHOP_API_URL}${query ? `?${query}` : ""}`;
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Shop", id: _id })),
              { type: "Shop", id: "LIST" },
            ]
          : [{ type: "Shop", id: "LIST" }],
    }),

    // === Get Top Sellers (based on performance) ===
    getTopSellers: builder.query({
      query: () => `/${SHOP_API_URL}/top-sellers`,
      providesTags: [{ type: "Shop", id: "TOP_SELLERS" }],
    }),

    // === Follow / Unfollow Shops (Authenticated Actions) ===
    followShop: builder.mutation({
      query: (shopId) => ({
        url: `/${SHOP_API_URL}/${shopId}/follow`,
        method: "POST",
      }),
      invalidatesTags: (result, error, shopId) => [
        { type: "FollowStatus", id: shopId },
        { type: "Shop", id: shopId },
      ],
    }),

    unfollowShop: builder.mutation({
      query: (shopId) => ({
        url: `/${SHOP_API_URL}/${shopId}/unfollow`,
        method: "POST",
      }),
      invalidatesTags: (result, error, shopId) => [
        { type: "FollowStatus", id: shopId },
        { type: "Shop", id: shopId },
      ],
    }),

    // === Shop Reviews ===
    getShopReviews: builder.query({
      query: ({ shopId, queryParams = {} }) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return `/${SHOP_API_URL}/${shopId}/reviews${
          queryString ? `?${queryString}` : ""
        }`;
      },
      transformResponse: (res) => res.data,
      providesTags: (result, error, { shopId }) => [
        { type: "ShopReview", id: shopId },
      ],
    }),

    submitShopReview: builder.mutation({
      query: ({ shopId, reviewData }) => ({
        url: `/${SHOP_API_URL}/${shopId}/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { shopId }) => [
        { type: "ShopReview", id: shopId },
      ],
    }),

    // === Contact Shop ===
    submitContactForm: builder.mutation({
      query: ({ shopId, formData }) => ({
        url: `/${SHOP_API_URL}/${shopId}/contact`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetShopDetailsQuery,
  useLazyGetShopDetailsQuery,
  useGetShopsQuery,
  useGetTopSellersQuery,
  useFollowShopMutation,
  useUnfollowShopMutation,
  useGetShopReviewsQuery,
  useLazyGetShopReviewsQuery,
  useSubmitShopReviewMutation,
  useSubmitContactFormMutation,
} = shopApi;

// import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
// import { createApi } from "@reduxjs/toolkit/query/react";
// import { HYDRATE } from "next-redux-wrapper";

// const SHOP_API_URL = "api/v2/shops";

// export const shopApi = createApi({
//   reducerPath: "shopApi",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["Shop", "ShopReview", "FollowStatus"],
//   extractRehydrationInfo(action, { reducerPath }) {
//     if (action.type === HYDRATE) {
//       return action.payload[reducerPath];
//     }
//   },
//   endpoints: (builder) => ({
//     // === Fetch all shops ===
//     getShops: builder.query({
//       query: (queryParams) => {
//         const query = new URLSearchParams(queryParams).toString();
//         return `/${SHOP_API_URL}${query ? `?${query}` : ""}`;
//       },
//       providesTags: (result) =>
//         result?.data
//           ? [
//               ...result.data.map(({ _id }) => ({ type: "Shop", id: _id })),
//               { type: "Shop", id: "LIST" },
//             ]
//           : [{ type: "Shop", id: "LIST" }],
//     }),

//     // === Get Top Sellers (based on performance) ===
//     getTopSellers: builder.query({
//       query: () => `/${SHOP_API_URL}/top-sellers`,
//       providesTags: [{ type: 'Shop', id: "TOP_SELLERS" }],
//     }),

//     // GET shop details
//     getShopDetails: builder.query({
//       query: (shopId) => `/${SHOP_API_URL}/${shopId}`,
//       transformResponse: (res) => res.data,
//       providesTags: (result, error, shopId) => [{ type: "Shop", id: shopId }],
//     }),

//     // POST follow shop
//     followShop: builder.mutation({
//       query: (shopId) => ({
//         url: `/${SHOP_API_URL}/${shopId}/follow`,
//         method: "POST",
//       }),
//       invalidatesTags: (result, error, shopId) => [
//         { type: "FollowStatus", id: shopId },
//       ],
//     }),

//     // POST unfollow shop
//     unfollowShop: builder.mutation({
//       query: (shopId) => ({
//         url: `/${SHOP_API_URL}/${shopId}/unfollow`,
//         method: "POST",
//       }),
//       invalidatesTags: (result, error, shopId) => [
//         { type: "FollowStatus", id: shopId },
//       ],
//     }),

//     // GET shop reviews
//     getShopReviews: builder.query({
//       query: ({ shopId, queryParams = {} }) => {
//         const queryString = new URLSearchParams(queryParams).toString();
//         return `/${SHOP_API_URL}/${shopId}/reviews?${queryString}`;
//       },
//       transformResponse: (res) => res.data,
//       providesTags: (result, error, { shopId }) => [
//         { type: "ShopReview", id: shopId },
//       ],
//     }),

//     // POST submit review
//     submitShopReview: builder.mutation({
//       query: ({ shopId, reviewData }) => ({
//         url: `/${SHOP_API_URL}/${shopId}/reviews`,
//         method: "POST",
//         body: reviewData,
//       }),
//       invalidatesTags: (result, error, { shopId }) => [
//         { type: "ShopReview", id: shopId },
//       ],
//     }),

//     // POST contact form
//     submitContactForm: builder.mutation({
//       query: ({ shopId, formData }) => ({
//         url: `/${SHOP_API_URL}/${shopId}/contact`,
//         method: "POST",
//         body: formData,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetShopsQuery,
//   useGetTopSellersQuery,
//   useGetShopDetailsQuery,
//   useLazyGetShopDetailsQuery,
//   useFollowShopMutation,
//   useUnfollowShopMutation,
//   useGetShopReviewsQuery,
//   useLazyGetShopReviewsQuery,
//   useSubmitShopReviewMutation,
//   useSubmitContactFormMutation,
// } = shopApi;
