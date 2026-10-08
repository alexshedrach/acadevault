import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";

const CART_API_URL = "/api/v2/carts";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart", "CartSummary"],

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (builder) => ({
    // ──────────────────── GET CART ─────────────────────
    getCart: builder.query({
      query: ({ userId, guestCartId }) => ({
        url: CART_API_URL,
        method: "GET",
        params: { userId, guestCartId },
      }),
      transformResponse: (response) => ({
        items: response?.data?.items || [],
        metadata: response?.metadata || {},
        guestCartId: response?.data?.guestCartId || null,
      }),
      providesTags: (result) =>
        result?.items?.length
          ? [
              ...result.items.map(({ materialId }) => ({
                type: "Cart",
                id: materialId,
              })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),

    // ──────────────────── ADD ITEM TO CART ─────────────────────
    addItemToCart: builder.mutation({
      query: ({ userId, guestCartId, materialId, quantity, guestEmail }) => ({
        url: CART_API_URL,
        method: "POST",
        body: {
          userId,
          guestCartId,
          materialId,
          quantity,
          guestEmail, // Optional metadata
        },
      }),
      transformResponse: (response) => ({
        ...response?.data,
        guestCartId: response?.data?.guestCartId || null,
      }),
      invalidatesTags: [
        { type: "Cart", id: "LIST" },
        { type: "CartSummary", id: "LIST" },
      ],
    }),

    // ──────────────────── REMOVE ITEM FROM CART ─────────────────────
    removeItemFromCart: builder.mutation({
      query: ({ userId, guestCartId, materialId }) => ({
        url: `${CART_API_URL}/item/${encodeURIComponent(materialId)}`,
        method: "DELETE",
        body: { userId, guestCartId },
      }),
      transformResponse: (response) => response?.data,
      invalidatesTags: (result, error, { materialId }) => [
        { type: "Cart", id: materialId },
        { type: "Cart", id: "LIST" },
        { type: "CartSummary", id: "LIST" },
      ],
    }),

    // ──────────────────── UPDATE ITEM QUANTITY ─────────────────────
    updateItemQuantity: builder.mutation({
      query: ({ userId, guestCartId, materialId, quantity }) => ({
        url: `${CART_API_URL}/item/${encodeURIComponent(materialId)}`,
        method: "PATCH",
        body: { userId, guestCartId, quantity },
      }),
      transformResponse: (response) => response?.data,
      invalidatesTags: (result, error, { materialId }) => [
        { type: "Cart", id: materialId },
        { type: "Cart", id: "LIST" },
        { type: "CartSummary", id: "LIST" },
      ],
    }),

    // ──────────────────── APPLY DISCOUNT CODE ─────────────────────
    applyDiscountCode: builder.mutation({
      query: ({ userId, guestCartId, discountCode }) => ({
        url: `${CART_API_URL}/apply-discount`,
        method: "POST",
        body: { userId, guestCartId, discountCode },
      }),
      transformResponse: (response) => response?.data,
      invalidatesTags: [
        { type: "Cart", id: "LIST" },
        { type: "CartSummary", id: "LIST" },
      ],
    }),

    // ──────────────────── INITIATE CHECKOUT ─────────────────────
    initiateCheckout: builder.mutation({
      query: ({
        userId,
        guestCartId,
        guestEmail,
        shippingAddressId,
        paymentCurrency,
        gateway,
      }) => ({
        url: `${CART_API_URL}/initiate-checkout`,
        method: "POST",
        body: {
          userId,
          guestCartId,
          guestEmail,
          shippingAddressId,
          paymentCurrency,
          gateway,
        },
      }),
      transformResponse: (response) => response?.data,
      invalidatesTags: [
        { type: "Cart", id: "LIST" },
        { type: "CartSummary", id: "LIST" },
      ],
    }),

    // ──────────────────── GET CART SUMMARY ─────────────────────
    getCartSummary: builder.query({
      query: ({ userId, guestCartId }) => ({
        url: `${CART_API_URL}/summary`,
        method: "GET",
        params: { userId, guestCartId },
      }),
      transformResponse: (response) => ({
        summary: response?.data?.summary || {},
        metadata: response?.metadata || {},
      }),
      providesTags: [{ type: "CartSummary", id: "LIST" }],
      keepUnusedDataFor: 300,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),

    // ──────────────────── SYNC GUEST USER CART ─────────────────────
    syncGuestCart: builder.mutation({
      query: ({ userId, items, guestCartId, guestEmail }) => ({
        url: `${CART_API_URL}/sync-guest`,
        method: "POST",
        body: { userId, items, guestCartId, guestEmail },
      }),
      invalidatesTags: [
        { type: "Cart", id: "LIST" },
        { type: "CartSummary", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
  useUpdateItemQuantityMutation,
  useApplyDiscountCodeMutation,
  useInitiateCheckoutMutation,
  useGetCartSummaryQuery,
  useSyncGuestCartMutation,
} = cartApi;
