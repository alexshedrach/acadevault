"use client";

import React from "react";
import Container from "@/components/layout/Container";
import ShopBanner from "./ShopBanner";
import ShopStats from "./ShopStats";

export default function ShopHeader({
  shop,
  owner,
  isFollowing,
  onFollow,
  onUnfollow,
  isFollowLoading,
  stats,
  role = "Public", // "Public" | "User" | "Seller" | "Admin"
}) {
  return (
    <Container
      as="section"
      variant="fluid"
      background="white"
      className="space-y-1 pb-10"
    >
      <ShopBanner
        shop={shop}
        owner={owner}
        isFollowing={isFollowing}
        onFollow={onFollow}
        onUnfollow={onUnfollow}
        isFollowLoading={isFollowLoading}
        shopId={shop.id}
        shopPhone={shop.contactInfo?.phone || '08146870361'}
        shopWebsite={shop.contactInfo?.website}
      />

      {/* Only show public‑safe stats for Public/User,
          show full stats for Seller/Admin */}
      <ShopStats stats={stats} role={role} />
    </Container>
  );
}

// "use client";

// import Container from "@/components/layout/Container";
// import ShopBanner from "./ShopBanner";
// import ShopStats from "./ShopStats";

// export default function ShopHeader({
//   shop,
//   owner,
//   isFollowing,
//   onFollow,
//   onUnfollow,
//   isFollowLoading,
//   stats = {
//     totalSales: 189,
//     joinedDate: "2021-06-01",
//     responseTime: "1 hour",
//     averageRating: 4.6,
//     ratingCount: 53,
//     totalMaterials: 34,
//     lastActive: "2025-04-28T14:52:00Z",
//     followersCount: 124,
//     returnRate: "2.1%",
//   },
// }) {
//   return (
//     <Container
//       as="section"
//       variant="fluid"
//       background="white"
//       className="space-y-1 pb-10"
//     >
//       <ShopBanner
//         shop={shop}
//         owner={owner}
//         isFollowing={isFollowing}
//         onFollow={onFollow}
//         onUnfollow={onUnfollow}
//         isFollowLoading={isFollowLoading}
//         shopId={shop?.id}
//         shopPhone={shop?.phone}
//         shopWebsite={shop?.website}
//       />
//       <ShopStats stats={stats} />
//     </Container>
//   );
// }
