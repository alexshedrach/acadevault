"use client";

import { useEffect } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useRouter } from "next/navigation";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";

export default function DashboardPage() {
  const { user, hasInitialized } = useRequireAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hasInitialized) return;

    const roleToPath = {
      Admin: "/dashboard/admin",
      Seller: "/dashboard/seller",
      User: "/dashboard/user",
      Affiliate: "/dashboard/affiliate",
      Agent: "/dashboard/agent",
    };

    const destination = roleToPath[user?.role] || "/unauthorized";
    router.replace(destination);
  }, [user?.role, hasInitialized, router]);

  return <DashboardSkeleton />;
}
