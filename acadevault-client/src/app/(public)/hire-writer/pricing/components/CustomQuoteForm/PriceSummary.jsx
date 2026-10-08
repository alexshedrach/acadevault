"use client";

import { useState, useContext } from "react";
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
import { WORDS_PER_PAGE } from "@/config/pricingConfig";
import PriceSummaryHeader from "./PriceSummaryHeader";

export function PriceSummary({
  estimatedPrice,
  promoCode,
  onPromoChange,
  applyPromo,
  promoError,
  discountAmount,
  deadline,
  complexity,
  urgencyMultiplier,
  unitType,
  wordCount,
  displayedPrice,
  academicTypeRates,
  complexityMultipliers,
  calculateUrgencyMultiplier,
  formData,
}) {
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const { currency } = useContext(CurrencyContext);

  const baseRate = academicTypeRates[formData.academicType] || 0;
  const complexityFactor = complexityMultipliers[complexity] || 1;
  const urgencyFactor = calculateUrgencyMultiplier(deadline);

  const handleApplyPromo = async () => {
    setIsApplyingPromo(true);
    try {
      await applyPromo();
      trackEvent("apply_promo_code", { promo_code: promoCode });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg max-w-5xl mx-auto">
      {/* Custom Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Price Header, Word/Page Note, Estimated Delivery */}
        <div className="space-y-6 col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm">
          {/* Price Header */}
          <PriceSummaryHeader
            discountAmount={discountAmount}
            currencySymbols={currencySymbols}
            displayedPrice={displayedPrice}
            estimatedPrice={estimatedPrice}
            currency={currency}
          />

          {/* Word/Page Note */}
          <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full text-center">
            {unitType === "pages"
              ? `${wordCount} page(s) ≈ ${(
                  wordCount * WORDS_PER_PAGE
                ).toLocaleString()} words`
              : `${wordCount} word(s) ≈ ${(wordCount / WORDS_PER_PAGE).toFixed(
                  1
                )} pages`}
          </div>

          {/* Estimated Delivery */}
          <EstimatedDelivery
            deadline={deadline}
            urgencyMultiplier={urgencyMultiplier}
          />
        </div>

        {/* Center Column: Price Breakdown and Toggle */}
        <div className="space-y-6 col-span-2 bg-gradient-to-r from-blue-50/20 to-indigo-50/60 rounded-lg p-6 shadow-sm">
          {/* Breakdown Toggle */}
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

          {/* Price Breakdown */}
          <PriceBreakdown
            show={showBreakdown}
            academicType={formData.academicType}
            wordCount={formData.wordCount}
            unitType={unitType}
            complexity={formData.complexity}
            deadline={formData.deadline}
            baseRate={baseRate}
            complexityMultiplier={complexityFactor}
            urgencyMultiplier={urgencyFactor}
            discount={discountAmount}
            total={displayedPrice}
          />
        </div>

        {/* Right Column: Promo Code and Trust Badges */}
        <div className="space-y-6 col-span-2 max-w-xl">
          {/* Promo Code Input and Feedback */}
          <div className="relative mt-4 w-80 mx-auto">
            {/* <InputField
              name="promoCode"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={onPromoChange}
              error={promoError}
              aria-label="Enter promo code"
            /> */}
            <InputField
              name="promoCode"
              label="Promo Code"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={onPromoChange}
              error={promoError}
              aria-label="Enter promo code"
            />

            <Button
              type="button"
              onClick={handleApplyPromo}
              disabled={isApplyingPromo}
              aria-label="Apply promo code"
              variant="outline"
              size="sm"
              className="absolute bg-indigo-600 text-white rounded p-0 top-0 -right-2"
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

          {/* Promo Feedback */}
          <AnimatePresence>
            {discountAmount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-green-600 flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-4 h-4" />
                Promo code applied! Saved {currencySymbols[currency] || ""}
                {discountAmount.toFixed(2)}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Trust Badges */}
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
                  key={index}
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

        {/* Total Due (Enhanced Design) */}
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
                end={parseFloat(displayedPrice)}
                duration={1.2}
                prefix={currencySymbols[currency] || ""}
                // suffix={` ${currency}`}
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
