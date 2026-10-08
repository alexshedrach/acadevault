"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useAuth } from "@/hooks/useAuth";
import {
  selectLocalCart,
  removeFromLocalCart,
} from "@/features/cart/cartSlice";
import {
  useGetCartQuery,
  useRemoveItemFromCartMutation,
} from "@/features/cart/cartApi";
import Loader from "@/components/ui/Loader";
import { Trash2 } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";

export default function CartMenu() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const localCart = useSelector(selectLocalCart);

  // 1️⃣ Track guestEmail in state for stable skipping
  const [guestEmail, setGuestEmail] = useState(null);
  useEffect(() => {
    const e =
      typeof window !== "undefined" && localStorage.getItem("guestEmail");
    setGuestEmail(e && e.includes("@") ? e : null);
  }, []);

  // 2️⃣ Fetch cart for auth or guest
  const {
    data: serverCart,
    isLoading: isServerLoading,
    error: serverError,
    refetch,
  } = useGetCartQuery(user ? { userId: user.id } : { guestEmail }, {
    skip: !user && !guestEmail,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // 3️⃣ Removal mutation
  const [removeItemFromCart, { isLoading: isRemovingServer }] =
    useRemoveItemFromCartMutation();

  // 4️⃣ Dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef();

  // Hover & focus handlers
  const openMenu = () => {
    window.clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const closeMenu = () => {
    timeoutRef.current = window.setTimeout(() => setIsOpen(false), 150);
  };

  // Click‑outside to close
  useEffect(() => {
    function onClick(e) {
      if (!containerRef.current?.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
      if (
        e.key === "Enter" &&
        document.activeElement === containerRef.current
      ) {
        setIsOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // 5️⃣ Unified data & total
  const items = user || guestEmail ? serverCart?.items || [] : localCart;
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const currency = serverCart?.currency || items[0]?.currency || "USD";
  const totalAmount =
    serverCart?.totalWithShipping ??
    items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // 6️⃣ Removal handler (server or local)
  const handleRemove = async (materialId) => {
    if (user || guestEmail) {
      try {
        await removeItemFromCart({
          userId: user?.id,
          guestEmail,
          materialId,
        }).unwrap();
        toast.success("Removed from cart");
        refetch(); // immediate refetch
      } catch {
        toast.error("Failed to remove item");
      }
    } else {
      dispatch(removeFromLocalCart(materialId));
      toast.success("Removed from cart");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      tabIndex={0}
      aria-label={`Cart with ${totalItems} items`}
    >
      <Link
        href="/cart"
        className="flex items-center text-gray-700 hover:text-orange-500 focus:outline-none"
      >
        <div className="relative">
          <FaShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        <span className="ml-2 font-semibold">Cart</span>
      </Link>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
          role="menu"
          aria-labelledby="cart-menu"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Your Cart</h3>

            {isServerLoading ? (
              <div className="py-6 flex justify-center">
                <Loader />
              </div>
            ) : serverError ? (
              <p className="text-red-500 text-center">Error loading cart</p>
            ) : items.length === 0 ? (
              <div className="text-center py-8">
                <FaShoppingCart className="text-gray-300 text-4xl mb-2" />
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Link
                  href="/materials"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Browse Materials
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-h-64 overflow-y-auto overflow-x-hidden w-full">
                {items.map((item) => (
                  <div
                    key={item.materialId || item.material?._id}
                    className="flex items-center gap-3"
                    role="menuitem"
                  >
                    <Image
                      // src={item.image || "/placeholder.jpg"}
                      src={getImageUrl(item.thumbnail)}
                      alt={item.title || item.title}
                      width={48}
                      height={48}
                      className="rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium text-gray-800 
                        line-clamp-2 
                        break-words"
                      >
                        <Link href={`/materials/${item.slug}`} target="_blank">
                          {item.title}
                        </Link>
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × {currency}{" "}
                        {(
                          (item.price || item.unitPrice) * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleRemove(item.materialId || item.material?._id)
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <div className="pt-3 border-t flex justify-between items-center">
                  <span className="font-semibold">
                    Total: {currency} {totalAmount.toFixed(2)}
                  </span>
                  <Link
                    href="/cart"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
