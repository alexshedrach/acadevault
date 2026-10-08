import {
  useLazyGetAutoCompleteSuggestionsQuery,
  useLazyGetGlobalSearchResultsQuery,
} from "@/features/search/searchApi";

export const useSearch = () => {
  const [
    triggerAutoComplete,
    {
      data: autoCompleteSuggestions = [],
      isLoading: isAutoCompleteLoading,
      error: autoCompleteError,
    },
  ] = useLazyGetAutoCompleteSuggestionsQuery();

  const [
    triggerGlobalSearch,
    {
      data: globalSearchData,
      isLoading: isGlobalSearchLoading,
      error: globalSearchError,
    },
  ] = useLazyGetGlobalSearchResultsQuery();

  const fetchAutoComplete = (searchTerm) => {
    if (searchTerm.trim()) {
      triggerAutoComplete(searchTerm);
    }
  };

  const performGlobalSearch = (params = {}) => {
    triggerGlobalSearch(params);
  };

  return {
    autoCompleteSuggestions,
    searchResults: globalSearchData?.results || [],
    pagination: globalSearchData?.metadata || {
      totalPages: 0,
      currentPage: 1,
      totalResults: 0,
    },
    loading: isAutoCompleteLoading || isGlobalSearchLoading,
    error: autoCompleteError || globalSearchError,
    fetchAutoComplete,
    performGlobalSearch,
  };
};
