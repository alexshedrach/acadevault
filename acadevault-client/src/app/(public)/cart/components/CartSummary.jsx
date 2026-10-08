"use client";

import React from "react";
import Link from "next/link";
import { useCartTotals } from "@/hooks/useCartTotals";

export default function CartSummary({ cart, localCart }) {
  const {
    items,
    currency,
    subtotal,
    shippingFee,
    taxes,
    discountAmount,
    total,
  } = useCartTotals(cart, localCart);
  // Resolve usable cart items
  // const items =
  //   Array.isArray(cart?.items) && cart.items.length > 0
  //     ? cart.items
  //     : localCart || [];

  // // Extract currency (fallback to NGN or USD)
  // const currency = cart?.currency || items?.[0]?.currency || "USD";

  // // Compute subtotal
  // const subtotal = items.reduce((acc, item) => {
  //   const unitPrice = Number(item.unitPrice ?? item.price ?? 0);
  //   const quantity = Number(item.quantity ?? 0);
  //   return acc + unitPrice * quantity;
  // }, 0);

  // // Extract and sanitize fees
  // const shippingFee = parseFloat(cart?.shippingFee) || 0;
  // const taxes = parseFloat(cart?.taxes) || 0;
  // const discountAmount = parseFloat(cart?.discountAmount) || 0;

  // // Total calculation
  // const total = cart?.totalWithShipping
  //   ? parseFloat(cart.totalWithShipping)
  //   : subtotal + shippingFee + taxes - discountAmount;

  return (
    <div className="bg-white/70 backdrop-blur border border-gray-200 p-6 rounded-xl shadow-lg transition hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🧾 Order Summary
      </h2>

      <div className="space-y-3 text-sm text-gray-700">
        <SummaryRow label="Subtotal" value={subtotal} currency={currency} />
        <SummaryRow
          label="Shipping Fee"
          value={shippingFee}
          currency={currency}
        />
        <SummaryRow label="Taxes" value={taxes} currency={currency} />
        <SummaryRow
          label="Discount"
          value={discountAmount}
          currency={currency}
          isDiscount
        />
        <hr className="border-t border-gray-300 my-3" />
        <SummaryRow label="Total" value={total} currency={currency} bold />
      </div>

      <Link
        href="/cart/checkout"
        className="mt-6 block w-full text-center py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all"
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  currency,
  isDiscount = false,
  bold = false,
}) {
  const formatted = `${isDiscount ? "-" : ""}${currency} ${Number(
    value
  ).toFixed(2)}`;
  return (
    <div
      className={`flex justify-between ${
        bold ? "font-semibold text-base" : ""
      }`}
    >
      <span className="text-gray-600">{label}:</span>
      <span className={isDiscount ? "text-green-600" : "text-gray-800"}>
        {formatted}
      </span>
    </div>
  );
}
