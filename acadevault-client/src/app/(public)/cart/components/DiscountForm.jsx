"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useApplyDiscountCodeMutation } from "@/features/cart/cartApi";
import Loader from "@/components/ui/Loader";

// Restricts input to alphanumeric, dash, underscore only
function isValidDiscountCode(code) {
  return /^[A-Za-z0-9-_]+$/.test(code);
}

export default function DiscountForm({
  discountCode,
  setDiscountCode,
  user,
  onDiscountApplied,
}) {
  const [hasApplied, setHasApplied] = useState(false);
  const [applyDiscountCode, { isLoading: isApplying }] =
    useApplyDiscountCodeMutation();

  const guestEmail =
    typeof window !== "undefined" ? localStorage.getItem("guestEmail") : null;

  const handleApplyDiscount = async () => {
    const code = discountCode.trim();

    if (!code) return toast.error("Please enter a discount code");

    if (!isValidDiscountCode(code)) {
      return toast.error("Invalid characters in discount code");
    }

    try {
      await applyDiscountCode({
        userId: user?.id,
        guestEmail,
        discountCode: code,
      }).unwrap();

      toast.success("Discount applied 🎉");
      setHasApplied(true);
      setDiscountCode("");

      window.dataLayer?.push({
        event: "apply_discount",
        discountCode: code,
      });

      if (typeof onDiscountApplied === "function") onDiscountApplied();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to apply discount");
    }
  };

  const handleClear = () => {
    setDiscountCode("");
    setHasApplied(false);
  };

  return (
    <div className="mt-8">
      <label
        htmlFor="discountCode"
        className="block mb-2 text-sm font-semibold text-gray-700"
      >
        Got a discount code?
      </label>

      <div className="flex rounded-md shadow-sm overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          id="discountCode"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          disabled={isApplying}
          placeholder="E.g. SAVE20"
          aria-label="Discount code"
          className="flex-1 px-4 py-2 text-sm border-none focus:outline-none"
        />

        <button
          onClick={handleApplyDiscount}
          disabled={isApplying}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition disabled:opacity-50"
        >
          {isApplying ? <Loader type="spinner" className="w-4 h-4" /> : "Apply"}
        </button>

        {discountCode && (
          <button
            onClick={handleClear}
            type="button"
            className="bg-gray-100 hover:bg-gray-200 px-3 py-2 text-gray-600 text-xs font-medium transition"
            aria-label="Clear discount"
          >
            ✕
          </button>
        )}
      </div>

      {hasApplied && (
        <p className="mt-2 text-green-600 text-sm font-medium">
          ✅ Discount applied successfully!
        </p>
      )}
    </div>
  );
}

// "use client";

// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useApplyDiscountCodeMutation } from "@/features/cart/cartApi";
// import Loader from "@/components/ui/Loader";

// // Utility to block emoji and symbols
// function isValidDiscountCode(code) {
//   return /^[A-Za-z0-9-_]+$/.test(code); // Allow only alphanumerics, dashes and underscores
// }

// /**
//  * DiscountForm
//  * Handles applying discount codes for both guests and authenticated users.
//  */
// export default function DiscountForm({
//   discountCode,
//   setDiscountCode,
//   user,
//   onDiscountApplied, // optional callback to trigger cart refresh or summary update
// }) {
//   const [hasApplied, setHasApplied] = useState(false);
//   const [applyDiscountCode, { isLoading: isApplying }] =
//     useApplyDiscountCodeMutation();

//   // Submit discount code
//   const handleApplyDiscount = async () => {
//     const code = discountCode.trim();

//     if (!code) {
//       toast.error("Please enter a discount code");
//       return;
//     }

//     if (!isValidDiscountCode(code)) {
//       toast.error("Discount code contains invalid characters");
//       return;
//     }

//     try {
//       const guestEmail =
//         typeof window !== "undefined"
//           ? localStorage.getItem("guestEmail")
//           : null;

//       await applyDiscountCode({
//         userId: user?.id,
//         guestEmail,
//         discountCode: code,
//       }).unwrap();

//       toast.success("Discount applied successfully!");
//       setHasApplied(true);
//       setDiscountCode("");

//       // Analytics tracking
//       window.dataLayer?.push({
//         event: "apply_discount",
//         discountCode: code,
//       });

//       // Optional cart refetch or UI update
//       if (typeof onDiscountApplied === "function") {
//         onDiscountApplied();
//       }
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to apply discount");
//     }
//   };

//   const handleClear = () => {
//     setDiscountCode("");
//     setHasApplied(false);
//   };

//   return (
//     <div className="mt-6">
//       <label htmlFor="discountCode" className="block text-sm font-medium mb-2">
//         Discount Code
//       </label>

//       <div className="flex">
//         <input
//           type="text"
//           id="discountCode"
//           value={discountCode}
//           onChange={(e) => setDiscountCode(e.target.value)}
//           placeholder="Enter discount code"
//           disabled={isApplying}
//           aria-label="Discount code input"
//           className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
//         />
//         <button
//           type="button"
//           onClick={handleApplyDiscount}
//           disabled={isApplying}
//           aria-label="Apply discount code"
//           className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isApplying ? <Loader type="spinner" /> : "Apply"}
//         </button>
//         {discountCode && (
//           <button
//             onClick={handleClear}
//             type="button"
//             className="ml-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
//             aria-label="Clear discount code"
//           >
//             Clear
//           </button>
//         )}
//       </div>

//       {hasApplied && (
//         <p className="text-green-600 text-sm mt-2 font-medium">
//           Discount code applied successfully!
//         </p>
//       )}
//     </div>
//   );
// }
