"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, CreditCard, CreditCardIcon, Paypal } from "lucide-react";

import {
  useGetCartQuery,
  useInitiateCheckoutMutation,
  useApplyDiscountCodeMutation,
} from "@/features/cart/cartApi";
import { selectLocalCart } from "@/features/cart/cartSlice";
import { useAuth } from "@/hooks/useAuth";
import GuestCheckoutForm from "./components/GuestCheckoutForm";
import EmptyCart from "../components/EmptyCart";
import Loader from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import CartItems from "../components/CartItems";
import { BsPaypal } from "react-icons/bs";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, hasInitialized } = useAuth();
  const localCart = useSelector(selectLocalCart);
  const [shippingAddressId, setShippingAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [discountCode, setDiscountCode] = useState("");
  const [showGuestForm, setShowGuestForm] = useState(false);

  const guestEmail =
    typeof window !== "undefined" ? localStorage.getItem("guestEmail") : null;

  const {
    data: cart,
    error: cartError,
    isLoading: isCartLoading,
  } = useGetCartQuery(user ? { userId: user.id } : { guestEmail }, {
    skip: !hasInitialized || (!user && !guestEmail),
  });

  const [initiateCheckout, { isLoading: isCheckingOut }] =
    useInitiateCheckoutMutation();
  const [applyDiscountCode, { isLoading: isApplyingDiscount }] =
    useApplyDiscountCodeMutation();

  const items = useMemo(() => cart?.items || localCart, [cart, localCart]);
  const currency = cart?.currency || localCart[0]?.currency || "USD";

  const calculateSubtotal = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const subtotal = calculateSubtotal();
  const shippingFee = cart?.shippingFee || 0;
  const taxes = cart?.taxes || 0;
  const discount = cart?.discountAmount || 0;
  const total =
    cart?.totalWithShipping || subtotal + shippingFee + taxes - discount;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a valid discount code", {
        toastId: "discount-error",
      });
      return;
    }

    try {
      await applyDiscountCode({
        userId: user?.id,
        guestEmail,
        discountCode,
      }).unwrap();
      toast.success("Discount applied successfully!", {
        toastId: "discount-success",
      });
      window.dataLayer?.push({ event: "apply_discount", discountCode });
      setDiscountCode("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to apply discount", {
        toastId: "discount-error-fail",
      });
    }
  };

  const handleGuestSubmit = async ({
    guestEmail,
    guestFullName,
    guestPhoneNumber,
  }) => {
    localStorage.setItem("guestEmail", guestEmail);
    localStorage.setItem("guestFullName", guestFullName);
    localStorage.setItem("guestPhoneNumber", guestPhoneNumber);
    setShowGuestForm(false);
    toast.success("Guest information saved. Proceeding to checkout...", {
      toastId: "guest-success",
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!user && !guestEmail && localCart.length > 0) {
      setShowGuestForm(true);
      return;
    }

    if (user && !shippingAddressId) {
      toast.error("Please select a shipping address.", {
        toastId: "address-error",
      });
      return;
    }

    try {
      const response = await initiateCheckout({
        userId: user?.id,
        guestEmail,
        shippingAddressId:
          shippingAddressId || localStorage.getItem("guestAddressId"),
        paymentCurrency: currency,
        gateway: paymentMethod,
        discountCode: discountCode || undefined,
      }).unwrap();

      window.dataLayer?.push({
        event: "initiate_checkout",
        cartId: cart?._id,
        total: cart?.totalWithShipping,
      });

      window.location.href = response.paymentUrl;
    } catch (err) {
      toast.error(err?.data?.message || "Checkout failed. Please try again.", {
        toastId: "checkout-error",
      });
    }
  };

  if (isCartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader type="spinner" size="large" />
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
        <p className="text-lg font-medium">
          Error loading cart: {cartError.message}
        </p>
      </div>
    );
  }

  if (!items.length) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <AnimatePresence>
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
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Details
              </h2>
              <CartItems cart={cart} localCart={localCart} />
            </section>

            {user && (
              <section className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Shipping Address
                </h2>
                <select
                  value={shippingAddressId}
                  onChange={(e) => setShippingAddressId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  aria-label="Select shipping address"
                >
                  <option value="">Select a shipping address</option>
                  {[{ _id: "1", address: "123 Main St, City, Country" }].map(
                    (addr) => (
                      <option key={addr._id} value={addr._id}>
                        {addr.address}
                      </option>
                    )
                  )}
                </select>
              </section>
            )}

            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    value: "stripe",
                    label: "Credit Card",
                    icon: <CreditCardIcon size={24} />,
                  },
                  {
                    value: "paypal",
                    label: "PayPal",
                    icon: <BsPaypal size={24} />,
                  },
                  {
                    value: "applepay",
                    label: "Apple Pay",
                    icon: <Apple size={24} />,
                  },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    className={`flex items-center p-4 border rounded-lg transition-all ${
                      paymentMethod === method.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-label={`Select ${method.label} as payment method`}
                  >
                    <span className="mr-3">{method.icon}</span>
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <SummaryLine
                  label="Subtotal"
                  value={subtotal}
                  currency={currency}
                />
                <SummaryLine
                  label="Shipping"
                  value={shippingFee}
                  currency={currency}
                />
                <SummaryLine label="Taxes" value={taxes} currency={currency} />
                {discount > 0 && (
                  <SummaryLine
                    label="Discount"
                    value={discount}
                    currency={currency}
                    isDiscount
                  />
                )}
                <hr className="my-4 border-gray-200" />
                <SummaryLine
                  label="Total"
                  value={total}
                  currency={currency}
                  bold
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="discountCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Discount Code
                </label>
                <div className="flex">
                  <input
                    id="discountCode"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleApplyDiscount()
                    }
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter discount code"
                    disabled={isApplyingDiscount}
                    aria-label="Enter discount code"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    disabled={isApplyingDiscount}
                    className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
                  >
                    {isApplyingDiscount ? (
                      <Loader type="spinner" size="small" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition font-medium"
                aria-label="Place order"
              >
                {isCheckingOut ? (
                  <Loader type="spinner" size="small" />
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  currency,
  isDiscount = false,
  bold = false,
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className={bold ? "font-semibold text-gray-900" : "text-gray-600"}>
        {label}
      </span>
      <span
        className={`${bold ? "font-semibold text-gray-900" : "text-gray-600"} ${
          isDiscount ? "text-green-600" : ""
        }`}
      >
        {isDiscount ? "-" : ""}
        {currency} {parseFloat(value).toFixed(2)}
      </span>
    </div>
  );
}
