"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeLocalCart } from "@/features/cart/cartSlice";
import { toast } from "react-toastify";

export function InitLocalCartSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("localCart");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);

          // Basic validation of cart items
          const isValidCart =
            Array.isArray(parsedCart) &&
            parsedCart.every(
              (item) =>
                item.materialId &&
                item.title &&
                typeof item.price === "number" &&
                item.currency &&
                typeof item.quantity === "number"
            );

          if (isValidCart) {
            dispatch(initializeLocalCart(parsedCart));
          } else {
            throw new Error("Invalid cart format");
          }
        }
      } catch (error) {
        console.error("Failed to restore localCart:", error);
        toast.error("Could not restore your cart. Starting fresh.");
        dispatch(initializeLocalCart([]));
        localStorage.removeItem("localCart");
      }
    }
  }, [dispatch]);

  return null;
}
