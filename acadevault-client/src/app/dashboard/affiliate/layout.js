"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function AffiliateAuthLayout({ children }) {
  const { isRedirecting, hasInitialized } = useRequireAuth({
    allowedRoles: ["Affiliate"],
    redirectTo: "/unauthorized", // Optional fallback
  });

  if (!hasInitialized) return <p>Verifying access...</p>;
  if (isRedirecting) return null;

  return <>{children}</>;
}
