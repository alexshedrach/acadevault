"use client";

import { useState, useContext, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CountUp from "react-countup";
import { PriceBreakdown } from "./PriceBreakdown";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/forms/FormFields";
import { EstimatedDelivery } from "./EstimatedDelivery";
import { trackEvent } from "@/utils/analytics";
import { currencySymbols } from "@/constants/enums";
import { CurrencyContext } from "@/contexts/CurrencyContext";
import { PricingService } from "@/services/PricingService";
import {
  academicLevelRates,
  WORDS_PER_PAGE,
  writerTiers,
} from "@/config/priceConfiguration";

export function PricingStep({
  formData,
  rawBase,
  rawTotal,
  displayedPrice,
  discountAmount,
  promoCode,
  onPromoChange,
  applyPromo,
  promoError,
  unitType,
  pagesUsed,
  register
}) {
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  // Use the form’s currency; fall back to context if needed
  const { currency: ctxCurrency } = useContext(CurrencyContext);
  const currency = formData.currency || ctxCurrency;

  const billedQuantity = unitType === "words" ? pagesUsed : formData.unitCount;

  const calculateLocalPricing = async () => {
    const pricingInput = {
      mode: "custom",
      materialType: formData.academicType || "Journal",
      academicLevel: formData.academicLevel || "ond",
      quantity: formData.unitCount || 0,
      unitType,
      writerTier: formData.writerExpertise || "standard",
      deadline: formData.deadline,
      customUrgency: formData.urgencyMultiplier || 1,
      currency,
      selectedAddons: formData.selectedAddons || [],
      promoCode: promoCode || "",
    };
    return await PricingService.calculate(pricingInput);
  };

  useEffect(() => {
    let isMounted = true;
    if (!rawBase || !rawTotal) {
      calculateLocalPricing()
        .then((result) => {
          if (isMounted && result) {
            // Update parent state if needed (requires callback prop)
            console.log("Recalculated pricing:", result);
          }
        })
        .catch((err) => console.error("Local pricing error:", err));
    }
    return () => {
      isMounted = false;
    }; // Cleanup to prevent memory leaks
  }, [formData, currency, promoCode, unitType, rawBase, rawTotal]);

  const handleApplyPromo = async () => {
    setIsApplyingPromo(true);
    try {
      await applyPromo();
      trackEvent("apply_promo_code", { promo_code: promoCode });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const materialType = formData.academicType || "Journal";
  const addonsTotal = rawTotal - (rawBase || 0);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-6 col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-orange-800 mb-3 tracking-wide uppercase">
              Estimated Price
            </h2>
            <div
              className="text-4xl sm:text-5xl font-extrabold text-blue-700 bg-white/50 rounded-lg py-3 px-6 inline-block shadow-inner"
              aria-live="polite"
            >
              <CountUp
                end={parseFloat(displayedPrice) || 0}
                duration={1.2}
                prefix={currencySymbols[currency] || ""}
                decimals={2}
                className="inline-block"
              />
            </div>
            {discountAmount > 0 && (
              <p className="text-sm text-gray-500 mt-3">
                Original Price: {currencySymbols[currency]}
                {rawTotal.toFixed(2)}
              </p>
            )}
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full text-center">
            {unitType === "pages"
              ? `${formData.unitCount} page(s) ≈ ${(
                  formData.unitCount * WORDS_PER_PAGE
                ).toLocaleString()} words`
              : `${formData.unitCount} word(s) ≈ ${(
                  formData.unitCount / WORDS_PER_PAGE
                ).toFixed(1)} pages`}
          </div>

          <EstimatedDelivery deadline={formData.deadline} />
        </div>

        <div className="space-y-6 col-span-2 bg-gradient-to-r from-blue-50/20 to-indigo-50/60 rounded-lg p-6 shadow-sm">
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="border-gray-300 hover:bg-gray-100"
            >
              {showBreakdown ? "Hide" : "View"} Price Breakdown
            </Button>
          </div>

          <PriceBreakdown
            show={showBreakdown}
            academicType={materialType}
            // unitCount={formData.unitCount}
            // unitType={unitType}
            // baseRate={rawBase / (formData.unitCount || 1) || 0}
            unitCount={billedQuantity}
            unitType={unitType === "words" ? "pages" : "pages"}
            baseRate={rawBase / (pagesUsed || 1)}
            academicMultiplier={academicLevelRates[formData.academicLevel] || 1}
            writerMultiplier={writerTiers[formData.writerExpertise] || 1}
            urgencyMultiplier={formData.urgencyMultiplier || 1}
            addonsTotal={addonsTotal}
            discount={discountAmount}
            total={displayedPrice}
            currency={currency}
          />
        </div>

        <div className="space-y-6 col-span-2 max-w-xl">
          <div className="relative mt-4 w-80 mx-auto">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="promoCode"
                className="text-sm font-medium text-gray-700"
              >
                Promo Code
              </label>
              <input
                id="promoCode"
                type="text"
                {...register("promoCode", { onChange: onPromoChange })}
                placeholder="Enter promo code"
                className={`w-full py-2 px-3 rounded-md border shadow-sm text-sm transition focus:outline-none focus:ring-2 ${
                  promoError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {promoError && (
                <p className="text-sm text-red-600 mt-1">{promoError}</p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleApplyPromo}
              disabled={isApplyingPromo || !promoCode}
              aria-label="Apply promo code"
              variant="outline"
              size="sm"
              className="absolute bg-indigo-600 text-white rounded p-0  -right-2 top-6"
            >
              {isApplyingPromo ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Applying...
                </>
              ) : (
                "Apply"
              )}
            </Button>
          </div>

          <AnimatePresence>
            {promoError && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-red-600 flex items-center justify-center gap-1"
              >
                {promoError}
              </motion.p>
            )}
            {discountAmount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-green-600 flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-4 h-4" />
                Promo code applied! Saved {currencySymbols[currency]}
                {discountAmount.toFixed(2)}
              </motion.p>
            )}
          </AnimatePresence>

          <section className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">
              Why Clients Trust Us
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "100% Confidential",
                "Plagiarism-Free",
                "Secure Payment",
                "On-Time Delivery",
              ].map((label, index) => (
                <Badge
                  key={label} // ✅ use label instead of index
                  icon={<CheckCircle className="w-4 h-4 shrink-0" />}
                  iconPosition="left"
                  variant="success"
                  size="sm"
                  className="bg-green-50 text-green-700 border border-green-200 shadow-sm px-3 py-1.5 transition hover:bg-green-100 hover:shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200 shadow-md text-center mt-6"
          >
            <p className="text-xl font-bold text-orange-800 mb-3 tracking-wide uppercase">
              Total Due
            </p>
            <div
              className="text-4xl sm:text-5xl font-extrabold text-blue-700 bg-white/50 rounded-lg py-3 px-6 inline-block shadow-inner"
              aria-live="polite"
            >
              <CountUp
                end={parseFloat(displayedPrice) || 0}
                duration={1.2}
                prefix={currencySymbols[currency] || ""}
                decimals={2}
                className="inline-block"
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Final price inclusive of all discounts and fees
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
