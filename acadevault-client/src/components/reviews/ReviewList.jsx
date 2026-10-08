"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";
import ReviewCard from "../cards/ReviewCard";
import ReviewsModal from "../modals/ReviewsModal";
import { StarRatingDisplay } from "../rating/StarRating";
import { AlertBox } from "../ui/AlertBox";
import { Button } from "../ui/Button";
import Loader from "../ui/Loader";

export default function ReviewList({
  reviews = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  isFetching = false,
  fetchError = null,
  useFallback,
  isFallback = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // if (fetchError) {
  //   return (
  //     <AlertBox variant="error" title="Failed to load reviews.">
  //       Please try refreshing the page or check your connection.
  //     </AlertBox>
  //   );
  // }

  if (isFetching && reviews.length === 0) {
    return (
      <Loader
        type="skeleton"
        text="Loading reviews..."
        withSkeletonGrid
        skeletonCount={6}
        skeletonHeight="h-40"
        skeletonShape="rounded-lg"
      />
    );
  }

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1
      )
    : "0.0";

  const ratingLabel =
    averageRating >= 4.5
      ? "Top Rated"
      : averageRating >= 4.0
      ? "Highly Rated"
      : averageRating >= 3.0
      ? "Rated"
      : "Mixed Reviews";

  return (
    <section className="mb-16 space-y-8">
      {/* Header */}
      {!useFallback && (
        <div className="mb-8 border-b pb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Customer Reviews
          </h3>
          <div className="flex items-center gap-4 text-base text-gray-700">
            <StarRatingDisplay
              average={parseFloat(averageRating)}
              count={reviews.length}
            />
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
              {ratingLabel}
            </span>
          </div>
        </div>
      )}

      {/* Fallback Label */}
      {useFallback && (
        <h4 className="text-lg font-semibold text-gray-700 mb-4 -mt-10">
          Sample Reviews
        </h4>
      )}

      {/* Reviews Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, 6).map((review) => (
          <ReviewCard key={review._id || review.id} review={review} />
        ))}
      </div>

      {/* Fallback Notice */}
      {useFallback && (
        <p className="mt-6 text-center text-sm text-gray-400 italic">
          Displaying sample reviews. Be the first to share your thoughts!
        </p>
      )}

      {/* Show All Reviews Button */}
      {reviews.length > 6 && (
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full"
          >
            <MessageSquare size={16} />
            Show all reviews
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center space-x-2 mt-8">
          <Button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || isFetching}
            isLoading={isFetching}
            loadingText="Loading..."
          >
            Previous
          </Button>
          <Button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || isFetching}
            isLoading={isFetching}
            loadingText="Loading..."
          >
            Next
          </Button>
        </nav>
      )}

      {/* Modal */}
      <ReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviews={reviews}
        averageRating={averageRating}
      />
    </section>
  );
}
