import { baseQueryWithReauth } from "@/services/baseQueryWithReauth";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const SEARCH_API_URL = "/api/v2/search";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Search", "AutoComplete"],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAutoCompleteSuggestions: builder.query({
      query: (searchTerm) =>
        `${SEARCH_API_URL}/auto-complete?search=${encodeURIComponent(
          searchTerm
        )}`,
      transformResponse: (response) => response.data,
      providesTags: (result) =>
        result
          ? [...result.map((_, idx) => ({ type: "AutoComplete", id: idx }))]
          : [{ type: "AutoComplete", id: "LIST" }],
    }),

    getGlobalSearchResults: builder.query({
      query: (queryParams) => {
        const queryString = new URLSearchParams(queryParams).toString();
        return `${SEARCH_API_URL}?${queryString}`;
      },
      transformResponse: (response) => ({
        results: response.data,
        pagination: response.metadata,
      }),
      providesTags: (result) =>
        result?.results
          ? [
              ...result.results.map((_, idx) => ({ type: "Search", id: idx })),
              { type: "Search", id: "LIST" },
            ]
          : [{ type: "Search", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAutoCompleteSuggestionsQuery,
  useLazyGetAutoCompleteSuggestionsQuery,
  useGetGlobalSearchResultsQuery,
  useLazyGetGlobalSearchResultsQuery,
  util: { getRunningOperationPromises },
} = searchApi;
