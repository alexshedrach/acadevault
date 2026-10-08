import {
  useFollowShopMutation,
  useGetShopDetailsQuery,
  useGetShopReviewsQuery,
  useGetShopsQuery,
  useLazyGetShopReviewsQuery,
  useSubmitContactFormMutation,
  useSubmitShopReviewMutation,
  useUnfollowShopMutation,
} from "@/features/shop/shopApi";
import { useCallback } from "react";

/**
 * useShop
 * Aggregates all shop-related RTK Query endpoints into one production-grade hook.
 *
 * @param {object} params
 * @param {string} params.shopId           - The shop’s unique identifier.
 * @param {object} [params.queryParams]    - Optional query params (pagination, filters).
 */
export function useShop({ shopId, queryParams = {} }) {
  // === Shop Details ===
  const {
    data: shopData,
    isLoading: isDetailsLoading,
    isFetching: isDetailsFetching,
    error: detailsError,
    refetch: refetchDetails,
  } = useGetShopDetailsQuery(
    { shopId, queryParams },
    {
      skip: !shopId,
      refetchOnMountOrArgChange: true,
    }
  );

  // === Shops List (e.g., for recommendations) ===
  const {
    data: shopsList,
    isLoading: isListLoading,
    error: listError,
    refetch: refetchList,
  } = useGetShopsQuery(queryParams, {
    skip: !Object.keys(queryParams).length && !!shopId,
  });

  // === Follow / Unfollow ===
  const [followShop, { isLoading: isFollowLoading, error: followError }] =
    useFollowShopMutation();
  const [unfollowShop, { isLoading: isUnfollowLoading, error: unfollowError }] =
    useUnfollowShopMutation();

  // === Reviews ===
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isFetching: isReviewsFetching,
    error: reviewsError,
    refetch: refetchReviews,
  } = useGetShopReviewsQuery({ shopId, queryParams }, { skip: !shopId });

  const [
    lazyGetReviews,
    {
      data: lazyReviewsData,
      isFetching: isLazyReviewsFetching,
      error: lazyReviewsError,
    },
  ] = useLazyGetShopReviewsQuery();

  // === Submit Mutations ===
  const [
    submitReview,
    { isLoading: isSubmitReviewLoading, error: submitReviewError },
  ] = useSubmitShopReviewMutation();
  const [
    submitContactForm,
    { isLoading: isContactLoading, error: contactError },
  ] = useSubmitContactFormMutation();

  // === Callbacks ===
  const follow = useCallback(() => followShop(shopId), [followShop, shopId]);
  const unfollow = useCallback(
    () => unfollowShop(shopId),
    [unfollowShop, shopId]
  );
  const loadReviews = useCallback(
    (params) => lazyGetReviews({ shopId, queryParams: params }),
    [lazyGetReviews, shopId]
  );
  const submitReviewToShop = useCallback(
    (reviewData) => submitReview({ shopId, reviewData }),
    [submitReview, shopId]
  );
  const contactShop = useCallback(
    (formData) => submitContactForm({ shopId, formData }),
    [submitContactForm, shopId]
  );

  return {
    // Shop details
    shopData,
    isDetailsLoading,
    isDetailsFetching,
    detailsError,
    refetchDetails,

    // Shops list
    shopsList,
    isListLoading,
    listError,
    refetchList,

    // Follow actions
    follow,
    unfollow,
    isFollowLoading,
    isUnfollowLoading,
    followError,
    unfollowError,

    // Reviews data & actions
    reviewsData,
    lazyReviewsData,
    isReviewsLoading,
    isReviewsFetching,
    reviewsError,
    isLazyReviewsFetching,
    lazyReviewsError,
    refetchReviews,
    loadReviews,

    // Submit review & contact
    submitReviewToShop,
    isSubmitReviewLoading,
    submitReviewError,
    contactShop,
    isContactLoading,
    contactError,
  };
}
