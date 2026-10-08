"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * Enforces authentication and role-based access.
 * @param {Object} [options]
 * @param {string[]} [options.allowedRoles] - Roles allowed to access this page.
 * @param {string} [options.redirectTo="/login"] - Path to redirect if not allowed.
 */
export function useRequireAuth({ allowedRoles, redirectTo = "/login" } = {}) {
  const { user, isAuthenticated, hasInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hasInitialized) return;

    const roleAllowed = !allowedRoles || allowedRoles.includes(user?.role);
    const shouldRedirect = !isAuthenticated || !roleAllowed;

    if (shouldRedirect) {
      router.replace(redirectTo);
    }
  }, [
    hasInitialized,
    isAuthenticated,
    user?.role,
    allowedRoles,
    redirectTo,
    router,
  ]);

  const isRedirecting =
    hasInitialized &&
    (!isAuthenticated || (allowedRoles && !allowedRoles.includes(user?.role)));

  return { user, hasInitialized, isAuthenticated, isRedirecting };
}

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "./useAuth";

// /**
//  * Role-aware auth hook to protect pages/layouts.
//  * @param {Object} options
//  * @param {string} options.redirectTo - Where to go if auth fails
//  * @param {string[]} [options.allowedRoles] - Optional list of roles allowed to access
//  */
// export function useRequireAuth({ redirectTo = "/login", allowedRoles } = {}) {
//   const { isAuthenticated, user, hasInitialized } = useAuth();
//   const router = useRouter();

//   const userRole = user?.role;

//   useEffect(() => {
//     if (!hasInitialized) return;

//     const isRoleAllowed =
//       !allowedRoles || (userRole && allowedRoles.includes(userRole));

//     if (!isAuthenticated || !isRoleAllowed) {
//       console.warn("🔐 Access denied. Redirecting...");
//       router.replace(redirectTo);
//     }
//   }, [
//     hasInitialized,
//     isAuthenticated,
//     userRole,
//     allowedRoles,
//     redirectTo,
//     router,
//   ]);

//   const isRedirecting =
//     hasInitialized &&
//     (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userRole)));

//   return { isAuthenticated, hasInitialized, isRedirecting, user };
// }
