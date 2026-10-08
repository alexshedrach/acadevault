"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Percent, X } from "lucide-react";
import { fadeIn } from "@/lib/animations";
import useAnalytics from "@/hooks/useAnalytics";
import { useRouter } from "next/navigation";

const CartAbandonmentReminder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [discountCode] = useState("ACADE10"); // Mock discount code
  const { trackEvent } = useAnalytics();
  const router = useRouter();

  // Mock cart items
  const cartItems = [
    { id: "1", name: "Calculus Master Course", price: 99.99 },
    { id: "2", name: "Data Science E-Book", price: 49.99 },
  ];

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (cartItems.length > 0 && !isOpen) {
        setIsOpen(true);
        trackEvent("cart_abandonment_triggered", {
          cartItemCount: cartItems.length,
        });
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Detect navigation away from cart
    const handleRouteChangeStart = () => {
      if (cartItems.length > 0 && !isOpen) {
        setIsOpen(true);
        trackEvent("cart_abandonment_triggered", {
          cartItemCount: cartItems.length,
        });
      }
    };

    router.events?.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events?.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [isOpen, cartItems.length, trackEvent, router.events]);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      trackEvent("discount_code_copied", { code: discountCode });
      alert("Discount code copied!");
    } catch {
      trackEvent("discount_code_copy_failed", { code: discountCode });
      alert("Failed to copy code. Code: " + discountCode);
    }
  };

  const handleContinueShopping = () => {
    setIsOpen(false);
    trackEvent("cart_abandonment_dismissed", { action: "continue_shopping" });
  };

  const handleCheckout = () => {
    setIsOpen(false);
    // Mock checkout redirect
    router.push("/checkout");
    trackEvent("cart_abandonment_checkout", { code: discountCode });
  };

  if (!isOpen || cartItems.length === 0) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        role="dialog"
        aria-labelledby="abandonment-heading"
      >
        <motion.div
          variants={fadeIn}
          className="p-6 rounded-lg bg-white max-w-md mx-4 relative"
        >
          <button
            onClick={handleContinueShopping}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            aria-label="Close reminder"
          >
            <X className="w-6 h-6" />
          </button>
          <h3
            id="abandonment-heading"
            className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"
          >
            <Clock className="w-6 h-6 text-blue-600" />
            Don’t Miss Out!
          </h3>
          <p className="text-gray-600 mb-4">
            You have {cartItems.length} item(s) in your cart. Complete your
            purchase now and save 10% with this exclusive discount!
          </p>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-4 py-2 bg-gray-100 rounded-lg font-mono">
              {discountCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              aria-label="Copy discount code"
            >
              <Percent className="w-5 h-5" />
            </button>
          </div>
          <p className="text-red-600 font-semibold mb-4">
            Offer expires in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleContinueShopping}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              aria-label="Continue shopping"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              aria-label="Proceed to checkout"
            >
              Checkout Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartAbandonmentReminder;

// Example Usage

// import CartAbandonmentReminder from '@/components/CartAbandonmentReminder';
// import { Suspense } from 'react';

// export default function CartPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
//       {/* Cart items */}
//       <Suspense fallback={null}>
//         <CartAbandonmentReminder />
//       </Suspense>
//     </div>
//   );
// }
