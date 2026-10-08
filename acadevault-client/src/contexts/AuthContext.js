"use client";
import { createContext } from "react";
import { useAuth } from "@/hooks/useAuth"; 

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuth(); // ONLY provides state. No redirects.

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
