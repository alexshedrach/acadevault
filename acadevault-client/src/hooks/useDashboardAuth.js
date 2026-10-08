import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function useDashboardAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useDashboardAuth must be used within AuthProvider");
  return context;
}
