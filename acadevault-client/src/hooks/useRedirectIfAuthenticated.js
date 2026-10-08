"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const { isAuthenticated, hasInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hasInitialized && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [hasInitialized, isAuthenticated, redirectTo, router]);

  // Return loading state for caller to use
  return { isLoading: !hasInitialized || isAuthenticated };
}
