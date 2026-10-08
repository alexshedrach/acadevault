"use client";

import { useState } from "react";
import { Button } from "../ui/Button";

export default function CouponInput({
  onApply, // optional external handler
  onRemove, // optional external handler
  initialCoupon, // optional initial applied coupon
  label = "Enter coupon code",
  successLabel = "applied successfully.",
}) {
  const [inputCoupon, setInputCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(initialCoupon || "");

  const applyCoupon = () => {
    if (!inputCoupon.trim()) return;

    const formatted = inputCoupon.trim().toUpperCase();
    setAppliedCoupon(formatted);
    onApply?.(formatted);
    setInputCoupon("");
  };

  const removeCoupon = () => {
    setAppliedCoupon("");
    onRemove?.();
  };

  return (
    <div className="w-full max-w-md space-y-3">
      {/* Applied Coupon Notice */}
      {appliedCoupon && (
        <div className="border border-dashed border-green-300 bg-green-50 p-3 rounded-md text-sm text-green-800 flex justify-between items-start">
          <div>
            <span className="font-semibold tracking-wide">{appliedCoupon}</span>{" "}
            <span className="text-gray-600">{successLabel}</span>
            <div className="text-xs text-gray-500">Discount applied</div>
          </div>
          <button
            onClick={removeCoupon}
            className="text-green-700 text-xs hover:underline ml-2"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input Field */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={label}
          value={inputCoupon}
          onChange={(e) => setInputCoupon(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white shadow-sm"
        />
        <Button
          size="sm"
          className="text-sm"
          onClick={applyCoupon}
          disabled={!inputCoupon.trim()}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
