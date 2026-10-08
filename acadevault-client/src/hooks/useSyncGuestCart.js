"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { useAuth } from "@/hooks/useAuth";
import { useSyncGuestCartMutation } from "@/features/cart/cartApi";
import { selectLocalCart, clearLocalCart } from "@/features/cart/cartSlice";

/**
 * Hook to sync guest cart with authenticated user cart upon login.
 * @param onSuccess optional success callback
 * @param onError optional error callback
 * @param skipAutoSync if true, disables auto sync on mount/login
 */
export function useSyncGuestCart({
  onSuccess,
  onError,
  skipAutoSync = false,
} = {}) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const localCart = useSelector(selectLocalCart);
  const [syncGuestCart, { isLoading: isSyncing }] = useSyncGuestCartMutation();

  const hasSyncedRef = useRef(false); // prevent infinite re-runs

  const getGuestCartId = useCallback(() => {
    if (typeof window === "undefined") return null;
    let id = localStorage.getItem("guestCartId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("guestCartId", id);
    }
    return id;
  }, []);

  const getGuestInfo = useCallback(() => {
    if (typeof window === "undefined") return {};
    return {
      guestEmail: localStorage.getItem("guestEmail") || null,
      guestFullName: localStorage.getItem("guestFullName") || null,
      guestPhoneNumber: localStorage.getItem("guestPhoneNumber") || null,
      shippingAddress: localStorage.getItem("shippingAddress") || null,
    };
  }, []);

  const sync = useCallback(
    async (opts = {}) => {
      const userId = opts.userId ?? user?.id;

      if (!userId) {
        console.warn("❌ Cannot sync cart: userId missing");
        onError?.("no-user");
        toast.error("Failed to sync cart: User ID is required");
        return { success: false, error: "no-user" };
      }

      if (!localCart.length) {
        onSuccess?.();
        return { success: true, message: "No items to sync" };
      }

      const guestCartId = getGuestCartId();
      const { guestEmail, guestFullName, guestPhoneNumber, shippingAddress } =
        getGuestInfo();

      const items = localCart.map((i) => ({
        materialId: i.materialId,
        quantity: i.quantity,
      }));

      try {
        const response = await syncGuestCart({
          userId,
          items,
          guestCartId,
          guestEmail: guestEmail || undefined,
          fullName: guestFullName || undefined,
          phoneNumber: guestPhoneNumber || undefined,
          shippingAddress: shippingAddress || undefined,
        }).unwrap();

        dispatch(clearLocalCart());
        localStorage.removeItem("guestCartId");
        localStorage.removeItem("guestEmail");
        localStorage.removeItem("guestFullName");
        localStorage.removeItem("guestPhoneNumber");
        localStorage.removeItem("shippingAddress");

        toast.success("Cart synced successfully!");
        onSuccess?.(response);
        return { success: true, cart: response };
      } catch (err) {
        console.error("❌ Cart sync failed:", err);
        toast.error(`Failed to sync cart: ${err.data?.message || err.message}`);
        onError?.(err);
        return { success: false, error: err };
      }
    },
    [
      user?.id,
      localCart,
      syncGuestCart,
      dispatch,
      getGuestCartId,
      getGuestInfo,
      onSuccess,
      onError,
    ]
  );

  useEffect(() => {
    if (skipAutoSync || hasSyncedRef.current) return;

    if (isAuthenticated && user?.id && localCart.length) {
      hasSyncedRef.current = true;
      sync();
    }
  }, [skipAutoSync, isAuthenticated, user?.id, localCart.length, sync]);

  return {
    sync,
    isSyncing,
    guestCartId: getGuestCartId(),
  };
}

// "use client";

// import { useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { v4 as uuidv4 } from "uuid";

// import { useAuth } from "@/hooks/useAuth";
// import { useSyncGuestCartMutation } from "@/features/cart/cartApi";
// import { selectLocalCart, clearLocalCart } from "@/features/cart/cartSlice";

// export function useSyncGuestCart({ onSuccess, onError } = {}) {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useAuth();
//   const localCart = useSelector(selectLocalCart);
//   const [syncGuestCart, { isLoading: isSyncing }] = useSyncGuestCartMutation();

//   // Retrieve or generate guest cart ID
//   const getGuestCartId = useCallback(() => {
//     if (typeof window === "undefined") return null;
//     let guestCartId = localStorage.getItem("guestCartId");
//     if (!guestCartId) {
//       guestCartId = uuidv4();
//       localStorage.setItem("guestCartId", guestCartId);
//     }
//     return guestCartId;
//   }, []);

//   // Retrieve guest info from localStorage
//   const getGuestInfo = useCallback(() => {
//     if (typeof window === "undefined") return {};
//     return {
//       guestEmail: localStorage.getItem("guestEmail") || null,
//       guestFullName: localStorage.getItem("guestFullName") || null,
//       guestPhoneNumber: localStorage.getItem("guestPhoneNumber") || null,
//       shippingAddress: localStorage.getItem("shippingAddress") || null,
//     };
//   }, []);

//   // Core sync logic
//   const sync = useCallback(
//     async (opts = {}) => {
//       const userId = opts.userId ?? user?.id;
//       if (!userId) {
//         toast.error("Cannot sync cart: no user authenticated");
//         onError?.("no-user");
//         return { success: false, error: "no-user" };
//       }
//       if (!localCart.length) {
//         onSuccess?.();
//         return { success: true, message: "No items to sync" };
//       }

//       const guestCartId = getGuestCartId();
//       const { guestEmail, guestFullName, guestPhoneNumber, shippingAddress } =
//         getGuestInfo();
//       const items = localCart.map((i) => ({
//         materialId: i.materialId,
//         quantity: i.quantity,
//       }));

//       try {
//         const response = await syncGuestCart({
//           userId,
//           items,
//           guestCartId,
//           guestEmail: guestEmail || undefined,
//           fullName: guestFullName || undefined,
//           phoneNumber: guestPhoneNumber || undefined,
//           shippingAddress: shippingAddress || undefined,
//         }).unwrap();

//         // Clear local storage and Redux state
//         dispatch(clearLocalCart());
//         localStorage.removeItem("guestCartId");
//         localStorage.removeItem("guestEmail");
//         localStorage.removeItem("guestFullName");
//         localStorage.removeItem("guestPhoneNumber");
//         localStorage.removeItem("shippingAddress");

//         toast.success("Cart synced successfully!");
//         onSuccess?.(response);
//         return { success: true, cart: response };
//       } catch (err) {
//         console.error("Cart sync failed:", err);
//         toast.error(`Failed to sync cart: ${err.data?.message || err.message}`);
//         onError?.(err);
//         return { success: false, error: err };
//       }
//     },
//     [
//       user,
//       localCart,
//       syncGuestCart,
//       dispatch,
//       getGuestCartId,
//       getGuestInfo,
//       onSuccess,
//       onError,
//     ]
//   );

//   // Auto-sync when user becomes authenticated
//   useEffect(() => {
//     if (isAuthenticated && user?.id && localCart.length) {
//       sync({userId: user.id});
//     }
//   }, [isAuthenticated, user?.id, localCart.length, sync]);

//   return {
//     sync,
//     isSyncing,
//     guestCartId: getGuestCartId(),
//   };
// }
