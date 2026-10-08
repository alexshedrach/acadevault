import { useState, useCallback } from "react";
import {
  useGetMaterialReviewsQuery,
  useAddReviewMutation,
} from "@/features/reviews/reviewsApi";

export function useMaterialReviews(materialId, limit = 5) {
  const [page, setPage] = useState(1);

  const {
    data,
    error: fetchError,
    isLoading: isFetchingReviews,
    isFetching,
    refetch,
  } = useGetMaterialReviewsQuery(
    { materialId, page, limit },
    { refetchOnMountOrArgChange: true }
  );

  const [addReview, { isLoading: isSubmitting, error: submitError }] =
    useAddReviewMutation();

  const submitReview = useCallback(
    async (reviewData) => {
      try {
        await addReview({ materialId, ...reviewData }).unwrap();
        setPage(1); // Show new review on the first page
        refetch(); // Refresh reviews
      } catch (err) {
        console.error("Review submission failed", err);
        throw err; // Optional: propagate for local handling
      }
    },
    [addReview, materialId, refetch]
  );

  const reviews = data?.reviews || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    reviews,
    currentPage: page,
    totalPages,
    isFetchingReviews,
    isFetching,
    fetchError,
    submitReview,
    isSubmitting,
    submitError,
    setPage,
  };
}
