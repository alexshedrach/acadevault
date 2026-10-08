import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useEffect, useState } from "react";
import ReviewCard from "../cards/ReviewCard";
import { StarRatingDisplay } from "../rating/StarRating";
import { Modal } from "../ui/Modal";

const REVIEWS_BATCH_SIZE = 6;

export default function ReviewsModal({
  isOpen,
  onClose,
  reviews,
  averageRating,
}) {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_BATCH_SIZE);
  const [loading, setLoading] = useState(false);

  const total = reviews.length;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + REVIEWS_BATCH_SIZE, total));
      setLoading(false);
    }, 500);
  };

  const setSentinel = useInfiniteScroll({
    hasMore: visibleCount < total,
    isLoading: loading,
    onLoadMore: loadMore,
    rootMargin: "0px 0px 300px 0px",
  });

  useEffect(() => {
    if (isOpen) setVisibleCount(REVIEWS_BATCH_SIZE);
  }, [isOpen]);

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.floor(r.rating) === stars).length,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Customer Reviews"
      size=""
      className="!max-w-4xl"
      titleClassName="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-size-200 mb-6 border-b-2 border-b-white inline-block"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          <StarRatingDisplay
            average={parseFloat(averageRating)}
            count={total}
          />
          <div className="text-lg font-semibold text-gray-100">
            {averageRating} average rating · {total.toLocaleString()} review
            {total !== 1 && "s"}
          </div>
        </div>
        <div className="text-sm text-blue-100 pr-4">
          Showing most recent reviews
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-200 px-16">
        {ratingDistribution.map(({ stars, count }) => {
          const percent = total ? Math.round((count / total) * 100) : 0;
          return (
            <div key={stars} className="flex items-center gap-2 w-full">
              <span className="w-8 font-bold">{stars}★</span>
              <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                <div
                  className="h-3 bg-yellow-400 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-8 text-right">{percent}%</span>
            </div>
          );
        })}
      </div>

      {/* Reviews List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pr-4">
        {reviews.slice(0, visibleCount).map((review, idx) => {
          const isLast = idx === visibleCount - 1;
          return (
            <div
              key={review._id || review.id}
              ref={isLast ? setSentinel : null}
            >
              <ReviewCard review={review} />
            </div>
          );
        })}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* No More Reviews Notice */}
      {!loading && visibleCount >= total && (
        <div className="text-center text-gray-400 text-sm mt-6">
          No more reviews to load.
        </div>
      )}
    </Modal>
  );
}
