"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  useAddItemToCartMutation,
  useGetCartQuery,
} from "@/features/cart/cartApi";
import { selectLocalCart, addToLocalCart } from "@/features/cart/cartSlice";
import { useAuth } from "@/hooks/useAuth";
import { useSyncGuestCart } from "@/hooks/useSyncGuestCart";
import { getEffectivePrice } from "@/helpers/getEffectivePrice";
import { getGuestInfoFromStorage } from "@/utils/guestCart"; 

export function useSmartCartHandler() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { guestCartId } = useSyncGuestCart();
  const localCart = useSelector(selectLocalCart);

  const { data: serverCart } = useGetCartQuery(
    isAuthenticated ? { userId: user?.id } : { guestCartId },
    { skip: !isAuthenticated && !guestCartId }
  );

  const [addItemToCart, { isLoading }] = useAddItemToCartMutation();

  const addToCart = async ({
    material,
    quantity = 1,
    region,
    overrideCurrency,
  }) => {
    const materialId = material._id;

    const existsInServer = serverCart?.items?.some(
      (i) => i.material.toString() === materialId
    );
    const existsInLocal = localCart.some((i) => i.materialId === materialId);

    if (isAuthenticated ? existsInServer : existsInLocal) {
      toast.info(`"${material.title}" is already in your cart.`);
      return router.push("/cart");
    }

    try {
      const currency = overrideCurrency || "NGN";
      const priceInfo = await getEffectivePrice({
        materialId,
        materialType: material.materialType,
        currency,
        region,
      });

      if (!priceInfo?.amount) throw new Error("Price unavailable");

      const price = priceInfo.amount;
      const payload = {
        materialId,
        quantity,
        ...(isAuthenticated
          ? { userId: user.id }
          : { guestCartId, ...getGuestInfoFromStorage() }),
      };

      await addItemToCart(payload).unwrap();

      if (!isAuthenticated) {
        dispatch(
          addToLocalCart({
            materialId,
            title: material.title,
            slug: material.slug,
            thumbnail: material.thumbnail,
            price,
            currency,
            quantity,
          })
        );
      }

      toast.success(`"${material.title}" added to your cart`);

      window.dataLayer?.push({
        event: isAuthenticated ? "add_to_cart_user" : "add_to_cart_guest",
        materialId,
        quantity,
        materialTitle: material.title,
        price,
        currency,
        ...(isAuthenticated ? {} : { ...getGuestInfoFromStorage() }),
      });

      router.push("/cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error(
        `Failed to add item to cart: ${err.data?.message || err.message}`
      );
    }
  };

  return { addToCart, isAdding: isLoading };
}

// "use client";

// import { useRouter } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   useGetCartQuery,
//   useAddItemToCartMutation,
// } from "@/features/cart/cartApi";
// import { selectLocalCart, addToLocalCart } from "@/features/cart/cartSlice";
// import { useAuth } from "@/hooks/useAuth";
// import { useSyncGuestCart } from "@/hooks/useSyncGuestCart";
// import { toast } from "react-toastify";
// import { getEffectivePrice } from "@/helpers/getEffectivePrice";

// export function useSmartCartHandler() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useAuth();
//   const { guestCartId } = useSyncGuestCart();
//   const localCart = useSelector(selectLocalCart);

//   const { data: serverCart } = useGetCartQuery(
//     isAuthenticated ? { userId: user?.id } : { guestCartId },
//     { skip: !isAuthenticated && !guestCartId }
//   );

//   const [addItemToCart, { isLoading }] = useAddItemToCartMutation();

//   const addToCart = async ({
//     material,
//     quantity = 1,
//     region,
//     overrideCurrency,
//   }) => {
//     const materialId = material._id;

//     // Check if already in cart
//     const existsInServer = serverCart?.items?.some(
//       (i) => i.material.toString() === materialId
//     );
//     const existsInLocal = localCart.some((i) => i.materialId === materialId);

//     if (isAuthenticated ? existsInServer : existsInLocal) {
//       toast.info(`"${material.title}" is already in your cart.`);
//       return router.push("/cart");
//     }

//     try {
//       const currency = overrideCurrency || "NGN";
//       const priceInfo = await getEffectivePrice({
//         materialId,
//         materialType: material.materialType,
//         currency,
//         region,
//       });
//       if (!priceInfo?.amount) throw new Error("Price unavailable");

//       const price = priceInfo.amount;

//       if (isAuthenticated) {
//         await addItemToCart({ userId: user.id, materialId, quantity }).unwrap();
//         toast.success(`"${material.title}" added to your cart`);
//       } else {
//         await addItemToCart({ guestCartId, materialId, quantity }).unwrap();
//         dispatch(
//           addToLocalCart({
//             materialId,
//             title: material.title,
//             slug: material.slug,
//             thumbnail: material.thumbnail,
//             price,
//             currency,
//             quantity,
//           })
//         );
//         toast.success(`"${material.title}" added to your cart`);
//       }

//       window.dataLayer?.push({
//         event: isAuthenticated ? "add_to_cart_user" : "add_to_cart_guest",
//         materialId,
//         quantity,
//         materialTitle: material.title,
//         price,
//         currency,
//       });
//     } catch (err) {
//       console.error("Add to cart failed:", err);
//       toast.error(
//         `Failed to add item to cart: ${err.data?.message || err.message}`
//       );
//     }
//   };

//   return { addToCart, isAdding: isLoading };
// }
