"use client";

import PromoBanner from "@/components/common/PromoBanner";
import QuickLinks from "@/components/common/QuickLinks";
import TrustBadge from "@/components/common/TrustBadge";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import SellerTrustIndicators from "./SellerTrustIndicators";

export default function ShopSidebar({ shop, role }) {
  const router = useRouter();

  const handleViewDashboard = () => {
    router.push("/dashboard"); // Navigate to the dashboard page
  };
  return (
    <aside className="hidden lg:block w-80 p-4 mr-4 rounded-lg shadow-lg bg-white sticky top-24 h-fit space-y-6">
      {/* Seller/Admin: show button to load full analytics */}
      {/* {(role === "Seller" || role === "Admin") && (
        <div className="-mt-8 text-center">
          <button
            onClick={handleViewDashboard}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            View <span>{role}</span> Dashboard
          </button>
        </div>
      )} */}
      {(role === "Seller" || role === "Admin") && (
        <div className="-mt-8 text-center">
          <Button
            as="a"
            href="/dashboard"
            variant="gradient" // Maps to bg-blue-600, similar to bg-indigo-600
            size="md" // Matches px-6 py-3
            className="hover:bg-indigo-700" // Override hover to match original
            disabled={false}
          >
            View <span>{role}</span> Dashboard
          </Button>
        </div>
      )}
      <SellerTrustIndicators shop={shop} />
      <PromoBanner />
      <QuickLinks
        groups={["discover", "engage"]}
        layout="list"
        groupClassName="bg-white rounded-lg shadow-sm p-4 space-y-4 border"
        groupHeadingClassName=" border-b inline-block"
      />
      <TrustBadge />
    </aside>
  );
}
