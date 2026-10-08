"use client";

import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Trash2, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";

import {
  useRemoveItemFromCartMutation,
  useUpdateItemQuantityMutation,
} from "@/features/cart/cartApi";
import {
  removeFromLocalCart,
  updateLocalCartQuantity,
  selectLocalCart,
} from "@/features/cart/cartSlice";

import { useAuth } from "@/hooks/useAuth";
import { useGetCartQuery } from "@/features/cart/cartApi";
import Loader from "@/components/ui/Loader";
import { getImageUrl } from "@/utils/getImageUrl";

export default function CartItems({ cart, user, handleGuestSubmit }) {
  const dispatch = useDispatch();
  const localCart = useSelector(selectLocalCart);
  const { isAuthenticated } = useAuth();

  const [removeItemFromServer, { isLoading: isRemoving }] =
    useRemoveItemFromCartMutation();
  const [updateQuantityOnServer, { isLoading: isUpdating }] =
    useUpdateItemQuantityMutation();

  const isGuest =
    !isAuthenticated &&
    typeof window !== "undefined" &&
    !!localStorage.getItem("guestEmail");

  const items = cart?.items?.length ? cart.items : localCart;

  const handleQuantityChange = debounce(async (materialId, newQty) => {
    if (newQty < 1) {
      toast.error("Quantity must be at least 1", { toastId: "qty-min" });
      return;
    }

    try {
      if (isAuthenticated || isGuest) {
        await updateQuantityOnServer({
          userId: user?.id,
          guestEmail: isGuest ? localStorage.getItem("guestEmail") : undefined,
          materialId,
          quantity: newQty,
        }).unwrap();

        toast.success("Quantity updated", {
          toastId: "qty-updated",
        });
      } else {
        dispatch(updateLocalCartQuantity({ materialId, quantity: newQty }));
        toast.success("Quantity updated locally", {
          toastId: "qty-local-updated",
        });
      }
    } catch (err) {
      toast.error("Failed to update quantity", {
        toastId: "qty-fail",
      });
    }
  }, 400);

  const handleRemove = async (materialId) => {
    try {
      if (isAuthenticated || isGuest) {
        await removeItemFromServer({
          userId: user?.id,
          guestEmail: isGuest ? localStorage.getItem("guestEmail") : undefined,
          materialId,
        }).unwrap();

        toast.success("Item removed", { toastId: "remove-success" });
      } else {
        dispatch(removeFromLocalCart(materialId));
        toast.success("Item removed locally", {
          toastId: "remove-local-success",
        });
      }
    } catch {
      toast.error("Failed to remove item", {
        toastId: "remove-fail",
      });
    }
  };

  if (!items.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 px-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-gray-600"
      >
        <span className="text-2xl">🛒</span>
        <p className="mt-2 font-medium">Your cart is empty</p>
        <p className="text-sm text-gray-500">
          Start adding materials to continue
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.materialId}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-center bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-300"
          >
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={getImageUrl(item.thumbnail)}
                alt={item.title}
                fill
                className="rounded-lg object-cover"
                sizes="80px"
              />
            </div>

            <div className="flex-1 ml-0 md:ml-4 mt-4 md:mt-0 w-full">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 break-words">
                {item.title}
              </h3>
              <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-600">
                <p>
                  Unit: {item.currency} {item.price?.toFixed(2)}
                </p>
                <p className="font-medium">
                  Subtotal: {item.currency}{" "}
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.materialId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1 || isUpdating}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.materialId,
                        parseInt(e.target.value)
                      )
                    }
                    min={1}
                    className="w-16 text-center border-x border-gray-200 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-none"
                    disabled={isUpdating}
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.materialId, item.quantity + 1)
                    }
                    disabled={isUpdating}
                    className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.materialId)}
                  disabled={isRemoving}
                  className="p-2 text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Remove item"
                >
                  {isRemoving ? <Loader size="small" /> : <Trash2 size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
