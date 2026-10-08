"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  useGetCartQuery,
  useSyncGuestCartMutation,
} from "@/features/cart/cartApi";
import { selectLocalCart } from "@/features/cart/cartSlice";

import { useAuth } from "@/hooks/useAuth";
import { useSyncGuestCart } from "@/hooks/useSyncGuestCart";

import CartHero from "./CartHero";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import DiscountForm from "./DiscountForm";
import GuestCheckoutForm from "../checkout/components/GuestCheckoutForm";
import Loader from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import Container from "@/components/layout/Container";

export default function CartClientPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const localCart = useSelector(selectLocalCart);

  const [showGuestForm, setShowGuestForm] = useState(false);
  const [syncGuestCartTrigger] = useSyncGuestCartMutation();

  const { guestCartId, isSyncing, hasSynced } = useSyncGuestCart({
    onSuccess: () => router.refresh(),
  });

  const { data: serverCart, isLoading: isCartLoading } = useGetCartQuery(
    isAuthenticated ? { userId: user?.id } : { guestCartId },
    { skip: !isAuthenticated && !guestCartId }
  );

  const handleGuestSubmit = async ({
    guestEmail,
    guestFullName,
    guestPhoneNumber,
    shippingAddress,
  }) => {
    const items = localCart.map(({ materialId, quantity }) => ({
      materialId,
      quantity,
    }));

    try {
      await syncGuestCartTrigger({
        guestCartId,
        guestEmail,
        fullName: guestFullName,
        guestPhoneNumber,
        shippingAddress,
        items,
      }).unwrap();

      // Store for potential reuse (e.g., in checkout)
      localStorage.setItem("guestEmail", guestEmail);
      localStorage.setItem("guestFullName", guestFullName);
      localStorage.setItem("guestPhoneNumber", guestPhoneNumber);
      if (shippingAddress) {
        localStorage.setItem("shippingAddress", shippingAddress);
      }

      toast.success("Guest cart updated successfully");
      setShowGuestForm(false);
      router.refresh();
    } catch (err) {
      toast.error(
        `Failed to update guest cart: ${err?.data?.message || err.message}`
      );
    }
  };

  const displayCart =
    isAuthenticated && hasSynced
      ? serverCart
      : serverCart || { items: localCart, subtotal: 0 };

  const isEmpty = !displayCart?.items?.length && !localCart.length;

  if (isCartLoading || isSyncing) {
    return (
      <div className="container mx-auto py-16 text-center">
        <Loader type="spinner" text="Loading your cart..." />
      </div>
    );
  }

  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <>
      <CartHero />
      <Container as="section" background="white" className="py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CartItems
              cart={displayCart}
              localCart={localCart}
              user={user}
              handleGuestSubmit={() => setShowGuestForm(true)}
            />
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <CartSummary cart={displayCart} localCart={localCart} />
            <DiscountForm
              discountCode={displayCart?.discountCode || ""}
              setDiscountCode={(code) => {
                // If needed, store in local/global state
                displayCart.discountCode = code;
              }}
              user={user}
            />
          </aside>
        </div>

        {showGuestForm && (
          <Modal
            isOpen
            onClose={() => setShowGuestForm(false)}
            title="Guest Checkout"
            theme="light"
            size="md"
          >
            <GuestCheckoutForm
              onSubmit={handleGuestSubmit}
              onCancel={() => setShowGuestForm(false)}
            />
          </Modal>
        )}
      </Container>
    </>
  );
}
