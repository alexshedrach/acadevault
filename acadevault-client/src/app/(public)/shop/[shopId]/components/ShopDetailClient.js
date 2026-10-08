"use client";

import React, { useMemo } from "react";
import { useShop } from "@/hooks/useShop";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import Container from "@/components/layout/Container";
import ShopHeader from "./ShopHeader";
import ShopSidebar from "./ShopSidebar";
import ShopTabs from "./ShopTabs";
import ShopMaterialsSection from "./ShopMaterialsSection";
import { useAuth } from "@/hooks/useAuth";

export default function ShopDetailClient({ initialData, shopId }) {
  const { user, isAuthenticated } = useAuth();

  const {
    shopData = initialData, // Hydrate with server data immediately
    isDetailsLoading,
    isDetailsFetching,
    detailsError,
    refetchDetails,
    follow,
    unfollow,
    isFollowLoading,
    reviewsData,
    isReviewsFetching,
    isReviewsLoading,
    reviewsError,
  } = useShop({ shopId });

  const shop = shopData?.shop;
  const owner = shopData?.owner;

  // Determine role
  const role = useMemo(() => {
    if (!isAuthenticated) return "Public";
    if (user.role === "Admin") return "Admin";
    if (user.id === owner?.id) return "Seller";
    return "User";
  }, [isAuthenticated, user, owner]);

  // Build public‐safe stats
  const publicStats = useMemo(
    () => ({
      totalMaterials: shop.totalMaterials ?? 0,
      realTimeFollowerCount: shop.realTimeFollowerCount ?? 0,
      averageRating: shop.metadata?.averageRating ?? 0,
      ratingCount: shop.metadata?.ratingCount ?? 0,
    }),
    [shop]
  );

  return (
    <AsyncStateHandler
      loading={isDetailsLoading && !shop}
      error={detailsError}
      onRetry={refetchDetails}
      loaderText="Loading shop details..."
      centered
    >
      {/* Header */}
      <ShopHeader
        shop={shop}
        owner={owner}
        isFollowing={shop?.isFollowed}
        onFollow={follow}
        onUnfollow={unfollow}
        isFollowLoading={isFollowLoading}
        stats={publicStats}
        role={role}
      />

      <Container
        as="section"
        background="white"
        padded
        className="flex flex-col lg:flex-row gap-6"
      >
        <div className="flex-1 space-y-12 px-4">
          <ShopTabs shop={shop} owner={owner} />

          <ShopMaterialsSection shopId={shop.id} initialPage={1} />
        </div>

        <ShopSidebar
          shop={shop}
          owner={owner}
          role={role}
          reviewsData={reviewsData}
          isReviewsFetching={isReviewsFetching}
          reviewsError={reviewsError}
          isReviewsLoading={isReviewsLoading}
        />
      </Container>
    </AsyncStateHandler>
  );
}
