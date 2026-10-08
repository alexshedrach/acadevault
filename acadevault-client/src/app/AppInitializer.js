"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AppInitializer() {
  const { triggerRefresh } = useAuth();

  useEffect(() => {
    triggerRefresh(); // silent refresh on app boot
  }, [triggerRefresh]);

  return null;
}
