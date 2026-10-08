"use client";

import { fallbackReviews } from "@/data/fallbackReviews";
import { MessageSquare } from "lucide-react";
import EmptyState from "../states/EmptyState";
import ReviewEntrySection from "./ReviewEntrySection";
import ReviewList from "./ReviewList";

export default function Reviews({
  reviews,
  fetchError = null,
  onSubmit,
  currentPage,
  totalPages,
  onPageChange,
  isSubmitting,
  submitError,
  isFetching,
}) {
  // Decide whether to use real reviews or fallback
  const useFallback =
    fetchError !== null || !Array.isArray(reviews) || reviews.length === 0;

  const displayReviews = useFallback ? fallbackReviews : reviews;

  return (
    <section className="mt-2 max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 space-y-16">
      {/* Fallback Banner */}
      {useFallback && (
        <div className="flex items-center gap-2 bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">
          <MessageSquare className="w-5 h-5" />
          <p className="text-sm">
            {fetchError
              ? "We couldn’t load real reviews—displaying sample reviews instead."
              : "No reviews yet—displaying sample reviews."}
          </p>
        </div>
      )}

      {/* Review List */}
      <ReviewList
        reviews={displayReviews}
        currentPage={useFallback ? 1 : currentPage}
        totalPages={useFallback ? 1 : totalPages}
        onPageChange={useFallback ? () => {} : onPageChange}
        isFetching={isFetching}
        useFallback={useFallback}
      />

      {/* In case there really are no real reviews, show EmptyState under fallback list */}
      {!fetchError && Array.isArray(reviews) && reviews.length === 0 && (
        <EmptyState
          title="No Reviews Yet"
          message="Be the first to leave a review and help others make informed decisions."
          icon={<MessageSquare size={48} className="text-blue-500" />}
        />
      )}

      {/* Review Entry Form */}
      <ReviewEntrySection
        onSubmitReview={onSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </section>
  );
}
