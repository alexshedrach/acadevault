import { useLazyGetAutoCompleteSuggestionsQuery } from "@/features/search/searchApi";
import { useState, useEffect, useRef } from "react";

export default function useAutoCompleteSearch(
  searchTerm,
  { delay = 300, enabled = true } = {}
) {
  const [trigger, { data: suggestions = [], isLoading, error }] =
    useLazyGetAutoCompleteSuggestionsQuery();

  const previousSearchTerm = useRef("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  // Trigger query if term changed and is enabled
  useEffect(() => {
    if (!enabled || !debouncedTerm) return;

    if (debouncedTerm !== previousSearchTerm.current) {
      previousSearchTerm.current = debouncedTerm;
      trigger(debouncedTerm, true); // `true` forces a refetch even if cached
    }
  }, [debouncedTerm, enabled, trigger]);

  return {
    suggestions,
    isLoading,
    error,
  };
}
