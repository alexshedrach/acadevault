"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function AdminAuthLayout({ children }) {
  const { isRedirecting, hasInitialized } = useRequireAuth({
    allowedRoles: ["Admin"],
    redirectTo: "/unauthorized", // Optional fallback
  });

  if (!hasInitialized) return null;
  if (isRedirecting) return null;

  return <>{children}</>;
}
