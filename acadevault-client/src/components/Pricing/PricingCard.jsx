"use client";
import useEffectivePrice from "@/hooks/useEffectivePrice";
import { getImageUrl } from "@/utils/getImageUrl";
import { BookOpen, LockIcon, ShieldCheck } from "lucide-react";
import { useState } from "react";
import CurrencySelector from "../common/CurrencySelector";
import PurchaseActions from "./PurchaseActions";
import GuaranteeCTA from "./GuaranteeCTA";
import PaymentIcons from "./PaymentIcons";


export default function PricingCard({ material }) {
  const {
    _id: materialId,
    title,
    thumbnail,
    materialType,
    digitalContent = {},
  } = material;

  const { usageRights = {}, isAvailableForPurchase = true } = digitalContent;

  const { price: hookFinalPrice } = useEffectivePrice({
    materialId,
    materialType,
  });

  const basePrice = hookFinalPrice?.amount
    ? hookFinalPrice
    : material.finalPrice;
  const finalPrice = { ...basePrice };
  const isFree = finalPrice.amount === 0;

  let hasDiscount =
    finalPrice.originalAmount && finalPrice.amount < finalPrice.originalAmount;

  if (process.env.NODE_ENV === "development" && !hasDiscount && !isFree) {
    finalPrice.originalAmount = finalPrice.amount * 1.2;
    hasDiscount = true;
  }

  const discountPercent = hasDiscount
    ? Math.round(
        ((finalPrice.originalAmount - finalPrice.amount) /
          finalPrice.originalAmount) *
          100
      )
    : 0;

  const formattedPrice = isFree
    ? "Free"
    : `${
        finalPrice.currencySymbol || "₦"
      }${finalPrice.amount?.toLocaleString()}`;

  const [couponApplied, setCouponApplied] = useState(null);
  const [inputCoupon, setInputCoupon] = useState("");

  const handleApplyCoupon = () => {
    if (inputCoupon.trim()) setCouponApplied(inputCoupon.trim());
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-2 space-y-6 relative z-10">
      {/* Discount Label */}
      {hasDiscount && !isFree && (
        <div className="absolute top-3 right-3 text-xs font-semibold bg-red-100 text-red-700 border border-red-300 px-3 py-1 rounded-full shadow z-10">
          -{discountPercent}% OFF
        </div>
      )}
      {/* Thumbnail */}
      <div className="relative w-full h-52 overflow-hidden rounded-xl border group bg-gray-100">
        <img
          src={getImageUrl(thumbnail)}
          alt={title}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
          onError={(e) => (e.target.src = "/fallback-thumbnail.png")}
          loading="lazy"
        />

        {/* View Only Label */}
        {!usageRights?.canBeDownloaded && (
          <div
            className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 shadow-md"
            title="This material cannot be downloaded"
          >
            <LockIcon size={12} />
            View Only
          </div>
        )}

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
          <button
            className="bg-white/90 text-sm px-3 py-1 rounded hover:bg-white shadow text-gray-800 transition"
            title="Preview Material"
          >
            Preview
          </button>
          <button
            className="bg-white/90 text-sm px-3 py-1 rounded hover:bg-white shadow text-gray-800 transition"
            title="Fullscreen"
          >
            Fullscreen
          </button>
        </div>

        {/* Bottom Label */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-sm text-center py-1 px-2">
          {materialType} Preview
        </div>
      </div>
      {/* Title & Pricing */}
      <div className="space-y-1 px-6">
        {/* <h2 className="text-lg font-semibold text-gray-900">{title}</h2> */}
        <div className="text-2xl font-bold text-gray-900 flex gap-1 items-center justify-between">
          {formattedPrice}
          {hasDiscount && (
            <span className="ml-2 text-sm font-normal line-through text-gray-400">
              {finalPrice.currencySymbol}
              {finalPrice.originalAmount?.toLocaleString()}
            </span>
          )}

          {/* 🔥 Currency Selector */}
          <CurrencySelector />
        </div>
        <p className="text-sm text-gray-500">
          Academic Material • {materialType}
        </p>
      </div>
      {/* {hasDiscount && (
        <div className="text-sm text-red-600 font-medium mt-2">
          Limited-time offer ends in <span className="font-bold">03h 12m</span>
        </div>
      )} */}
      {/* Action Buttons */}
      <div className="space-y-3 px-6">
        {isAvailableForPurchase ? (
          <>
            <PurchaseActions />
          </>
        ) : (
          <p className="text-sm text-red-600 font-semibold text-center">
            This material is currently unavailable for purchase.
          </p>
        )}
      </div>
      <GuaranteeCTA />

      {/* Accepted Payments Section */}
      <div className="text-center">
        <p className="text-sm  text-orange-500 mb-2 font-semibold">We accept</p>
        <PaymentIcons
          icons={[
            { src: "/icons/visa.svg", alt: "Visa", title: "Visa" },
            {
              src: "/icons/mastercard.svg",
              alt: "Mastercard",
              title: "Mastercard",
            },
            { src: "/icons/paypal.svg", alt: "PayPal", title: "PayPal" },
          ]}
        />
      </div>

      {/* <MaterialOutline material={material} /> */}

      {/* Assurance Footer */}
      <div className="border-t pt-4 text-center text-xs text-gray-500 space-y-1">
        <div className="flex items-center justify-center gap-1">
          <ShieldCheck size={14} />
          <span>Secure Purchase Guaranteed</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <BookOpen size={14} />
          <span>Full Lifetime Access</span>
        </div>
      </div>
    </div>
  );
}
