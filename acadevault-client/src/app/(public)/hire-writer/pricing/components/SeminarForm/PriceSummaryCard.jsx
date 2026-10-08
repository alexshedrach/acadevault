"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi2";

import {
  academicLevelRates,
  AVAILABLE_ADDONS,
  MATERIAL_TIERS,
  writerTiers,
} from "@/config/priceConfiguration";
import {
  calculateUrgencyMultiplier,
  formatPriceWithSymbol,
} from "@/utils/priceUtils";
import { currencySymbols, MINIMUM_TOTALS } from "@/constants/enums";
import { getEstimatedDelivery } from "@/helpers/getEstimatedDelivery";
import { MemoizedHelperText } from "@/helpers/FormErrors";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import CurrencySelector from "@/components/common/CurrencySelector";
import PriceUrgencySlider from "@/components/common/PriceUrgencySlider";
import PriceBreakdownModal from "@/components/modals/PriceBreakdownModal";

export default function PriceSummaryCard({
  estimatedPrice = 0,
  rawBase = 0,
  addonsTotal = 0,
  discountAmount = 0,
  pagesUsed = 0,
  promoError,
  handlePromoCodeApply,
  formData,
  setValue,
  control,
  currency,
  unitType,
  hasUserOverriddenUrgency,
  setHasUserOverriddenUrgency,
}) {
  const [isBreakdownOpen, setBreakdownOpen] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Sync urgencyMultiplier with form state
  const urgencyMultiplier = formData.urgencyMultiplier || 1.0;

  //  Delay estimatedPrice display unless unitCount is valid
  const shouldCalculatePrice =
    typeof formData.unitCount === "number" && formData.unitCount > 0;
  const isBelowMinimum = estimatedPrice < (MINIMUM_TOTALS[currency] || 0);

  // Update deadline and urgency multiplier in form state
  const handleUrgencyChange = (value) => {
    setHasUserOverriddenUrgency(true);
    setValue("urgencyMultiplier", value, { shouldValidate: true });
    const now = new Date();
    const tier = MATERIAL_TIERS["Seminar"];
    const hours = calculateUrgencyMultiplier(
      value,
      formData.unitCount || 1,
      tier,
      true
    );
    const newDeadline = new Date(now.getTime() + hours * 60 * 60 * 1000);
    setValue("deadline", newDeadline.toISOString().slice(0, 16), {
      shouldValidate: true,
    });
  };

  const breakdown = useMemo(() => {
    if (!shouldCalculatePrice) return null;

    if (!pagesUsed) return null;
    const symbol = currencySymbols[currency] || currency;
    const materialTier = MATERIAL_TIERS["Seminar"] || "Tier1";
    const addons = (formData.selectedAddons || []).map((addonId) => {
      const addon = AVAILABLE_ADDONS[materialTier]?.find(
        (a) => a.id === addonId
      );
      return {
        id: addonId,
        label: addon?.label || "Unknown Add-on",
        price: formatPriceWithSymbol(addon?.price?.[currency] || 0, currency),
      };
    });

    return {
      basePrice: formatPriceWithSymbol(rawBase, currency),
      addons,
      addonsTotal: formatPriceWithSymbol(addonsTotal, currency),
      discount: formatPriceWithSymbol(discountAmount, currency),
      pages: pagesUsed,
      contentLength: `${pagesUsed} ${unitType}`,
      academicLevel: formData.academicLevel.toUpperCase(),
      writerExpertise:
        formData.writerExpertise.charAt(0).toUpperCase() +
        formData.writerExpertise.slice(1),
      urgencyMultiplier: urgencyMultiplier.toFixed(1),

      // 👇 Add these to fix `undefined`
      academicMultiplier:
        academicLevelRates[formData.academicLevel?.toLowerCase()] || 1,
      writerMultiplier:
        writerTiers[formData.writerExpertise?.toLowerCase()] || 1,
    };
  }, [
    rawBase,
    addonsTotal,
    discountAmount,
    pagesUsed,
    currency,
    unitType,
    formData,
    urgencyMultiplier,
  ]);

  const handleApplyPromoWithLoading = async () => {
    setIsApplyingPromo(true);
    try {
      await handlePromoCodeApply();
    } finally {
      setIsApplyingPromo(false);
    }
  };

  return (
    <aside
      className="sticky top-24 w-full lg:w-96 bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 p-8 space-y-6 shadow-lg transition-shadow hover:shadow-xl mt-2"
      role="complementary"
      aria-labelledby="price-summary-title"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        <span className="text-orange-500" aria-hidden="true">
          💰
        </span>{" "}
        Estimated Price ({currencySymbols[currency] || currency})
      </h2>

      <div>
        <motion.div
          key={`${estimatedPrice}-${currency}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex justify-between items-center"
          aria-live="polite"
        >
          <p className="items-baseline gap-1 mt-2" aria-live="polite">
            <span className="text-xl text-orange-500">
              {currencySymbols[currency]}
            </span>
            <span className="text-3xl font-bold text-orange-600">
              {!shouldCalculatePrice
                ? "--"
                : isBelowMinimum
                ? `Min ${currencySymbols[currency] || currency}${
                    MINIMUM_TOTALS[currency]
                  }`
                : estimatedPrice.toLocaleString()}
            </span>
          </p>

          <CurrencySelector
            asDropdown={false}
            buttonClassName="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 text-sm bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(value) => setValue("currency", value)}
            value={currency}
          />
        </motion.div>
        <p className="text-sm text-gray-500 mt-1">
          Based on content length, academic level, writer expertise, urgency,
          and add-ons.
        </p>
        {discountAmount > 0 && (
          <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
            ✅ Discount applied:{" "}
            {formatPriceWithSymbol(discountAmount, currency)}
          </p>
        )}
        {urgencyMultiplier === 1 && (
          <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
            ✅ Best value
          </p>
        )}
        {urgencyMultiplier > 1.5 && (
          <p className="text-sm text-yellow-600 font-medium mt-2 flex items-center gap-1">
            ⚠️ Rush fee applied
          </p>
        )}
      </div>

      <div>
        <PriceUrgencySlider
          id="urgency-slider"
          value={urgencyMultiplier}
          onChange={handleUrgencyChange}
          min={1.0}
          max={2.0}
          step={0.1}
          suffix="x"
          ariaDescribedBy="urgency-helper"
          tooltipContent="Higher urgency leads to quicker turnaround but increases the cost. Recommended for last-minute deadlines."
          disabled={false}
          hasUserOverriddenUrgency={hasUserOverriddenUrgency}
          setHasUserOverriddenUrgency={setHasUserOverriddenUrgency}
        />
        <MemoizedHelperText
          id="urgency-helper"
          message="Faster delivery increases the urgency multiplier and cost."
          className="text-xs text-gray-500 mt-2"
        />
      </div>

      <div className="relative w-full max-w-md mx-auto">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="promoCode"
            className="text-sm font-medium text-gray-700"
          >
            Promo Code
          </label>
          <Controller
            name="promoCode"
            control={control}
            render={({ field }) => (
              <input
                id="promoCode"
                type="text"
                {...field}
                placeholder="Enter promo code"
                className={`w-full py-2 px-3 rounded-md border shadow-sm text-sm transition focus:outline-none focus:ring-2 bg-gray-50 ${
                  promoError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
            )}
          />
        </div>
        <Button
          type="button"
          onClick={handleApplyPromoWithLoading}
          disabled={isApplyingPromo || !formData.promoCode}
          aria-label="Apply promo code"
          variant="outline"
          size="sm"
          className="absolute bg-indigo-600 text-white rounded p-0 -right-2 top-6"
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
            Promo code applied! Saved{" "}
            {formatPriceWithSymbol(discountAmount, currency)}
          </motion.p>
        )}
      </AnimatePresence>

      <div>
        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          📅 Estimated Delivery
        </h4>
        <motion.p
          key={formData.deadline || "tbd"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-sm text-gray-800 mt-1"
        >
          {getEstimatedDelivery(formData.deadline, urgencyMultiplier)}
        </motion.p>
      </div>

      {breakdown ? (
        <>
          <Tooltip
            content="View how the total price was calculated, including base rate, add-ons, urgency, and discounts."
            position="top"
            size="sm"
            color="bg-gray-900"
            arrowSize="w-2 h-2"
          >
            <button
              type="button"
              onClick={() => setBreakdownOpen(true)}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline mt-2"
            >
              <HiInformationCircle className="w-4 h-4" />
              View Price Breakdown
            </button>
          </Tooltip>
          <PriceBreakdownModal
            isOpen={isBreakdownOpen}
            onClose={() => setBreakdownOpen(false)}
            breakdown={breakdown}
            estimatedPrice={estimatedPrice}
            currency={currency}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Provide content length to calculate breakdown.
        </p>
      )}

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
              key={label}
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
    </aside>
  );
}
// "use client";

// import React, { useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import PriceUrgencySlider from "./PriceUrgencySlider";
// import { MemoizedHelperText } from "@/helpers/FormErrors";
// import { currencySymbols } from "@/constants/enums";
// import CurrencySelector from "@/components/common/CurrencySelector";
// import {
//   complexityMultipliers,
//   WORDS_PER_PAGE,
//   writerExpertiseMultipliers,
// } from "@/config/pricingConfig";
// import PriceBreakdownModal from "./PriceBreakdownModal";
// import Tooltip from "@/components/ui/Tooltip";
// import { HiInformationCircle } from "react-icons/hi2";

// // Calculate delivery based on urgency
// const getEstimatedDelivery = (deadline, urgencyMultiplier) => {
//   if (!deadline) return "TBD";
//   const date = new Date(deadline);
//   const hoursToReduce = (urgencyMultiplier - 1) * 24;
//   date.setHours(date.getHours() - hoursToReduce);
//   return date.toLocaleDateString(undefined, {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// export default function PriceSummaryCard({
//   estimatedPrice = 0,
//   urgencyMultiplier = 1,
//   setUrgencyMultiplier,
//   setHasUserOverriddenUrgency,
//   deadline,
//   baseRate = 5,
//   unitCount,
//   unitType,
//   currency,
//   complexityLevel = "Simple",
//   writerExpertiseLevel = "Standard",
// }) {
//   const [isBreakdownOpen, setBreakdownOpen] = useState(false);

//   const complexityValue = complexityMultipliers[complexityLevel] ?? 1;
//   const writerExpertiseValue =
//     writerExpertiseMultipliers[writerExpertiseLevel] ?? 1;

//   // 🧮 Price breakdown memoized to avoid recomputing
//   const breakdown = useMemo(() => {
//     if (!unitCount) return null;
//     const wordCount =
//       unitType === "pages" ? unitCount * WORDS_PER_PAGE : unitCount;
//     const units = wordCount / 100;

//     const symbol = currencySymbols[currency] || "";

//     return {
//       baseRate: `${symbol}${baseRate} per 100 words`, // explicitly show symbol
//       contentLength: `${unitCount} ${unitType}`,
//       units: Math.ceil(units),
//       wordCount,
//       urgencyMultiplier: urgencyMultiplier.toFixed(1),
//       complexity: complexityLevel,
//       writerExpertise: writerExpertiseLevel,
//       totalMultiplier: (
//         urgencyMultiplier *
//         complexityValue *
//         writerExpertiseValue
//       ).toFixed(2),
//     };
//   }, [
//     unitCount,
//     unitType,
//     baseRate,
//     urgencyMultiplier,
//     currency,
//     complexityLevel,
//     writerExpertiseLevel,
//   ]);

//   return (
//     <aside
//       className="sticky top-24 w-full lg:w-96 bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 p-8 space-y-6 shadow-lg transition-shadow hover:shadow-xl mt-2"
//       role="complementary"
//       aria-labelledby="price-summary-title"
//     >
//       {/* Title */}
//       <h2 className="text-xl font-semibold text-gray-800">
//         <span className="text-orange-500" aria-hidden="true">
//           💰
//         </span>{" "}
//         Estimated Price ({currencySymbols[currency] || currency})
//       </h2>

//       {/* Total Price Display */}
//       <div>
//         <motion.div
//           key={`${estimatedPrice}-${currency}`}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="flex justify-between"
//           aria-live="polite"
//         >
//           <p className="items-baseline gap-1 mt-2 ">
//             <span className="text-xl text-orange-500">
//               {currencySymbols[currency]}
//             </span>
//             <span className="text-3xl font-bold text-orange-600">
//               {estimatedPrice.toLocaleString()}
//             </span>
//           </p>

//           <CurrencySelector
//             // label="Currency"
//             asDropdown={false}
//             buttonClassName="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-2 text-sm bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </motion.div>

//         <p className="text-sm text-gray-500 mt-1">
//           Based on urgency, content length, and pricing model.
//         </p>

//         {urgencyMultiplier === 1 && (
//           <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
//             ✅ Best value
//           </p>
//         )}
//         {urgencyMultiplier > 1.5 && (
//           <p className="text-sm text-yellow-600 font-medium mt-2 flex items-center gap-1">
//             ⚠️ Rush fee applied
//           </p>
//         )}
//       </div>

//       {/* Urgency Control */}
//       <div>
//         <PriceUrgencySlider
//           id="urgency-slider"
//           value={urgencyMultiplier}
//           onChange={(val) => {
//             setUrgencyMultiplier(val);
//             if (val !== urgencyMultiplier) {
//               setHasUserOverriddenUrgency(true);
//             }
//           }}
//           min={1}
//           max={2}
//           step={0.1}
//           suffix="x"
//           // className="mt-3"
//           ariaDescribedBy="urgency-helper"
//           tooltipContent="Higher urgency leads to quicker turnaround but increases the cost. Recommended for last-minute deadlines."
//         />
//         <div
//           className="relative w-full h-3 mt-3 bg-gray-200 rounded-full overflow-hidden"
//           role="meter"
//           aria-valuenow={urgencyMultiplier}
//           aria-valuemin={1}
//           aria-valuemax={2}
//           aria-label="Urgency level indicator"
//         >
//           <motion.div
//             className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
//             initial={{ width: 0 }}
//             animate={{
//               width: `${((urgencyMultiplier - 1) / (2 - 1)) * 100}%`,
//             }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           />
//         </div>
//         <MemoizedHelperText
//           id="urgency-helper"
//           message="Faster delivery increases the urgency multiplier and cost."
//           className="text-xs text-gray-500 mt-2"
//         />
//       </div>

//       {/* Delivery Date Preview */}
//       <div>
//         <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
//           📅 Estimated Delivery
//         </h4>
//         <motion.p
//           key={deadline || "tbd"}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="text-sm text-gray-800 mt-1"
//         >
//           {getEstimatedDelivery(deadline, urgencyMultiplier)}
//         </motion.p>
//       </div>

//       {/* Optional Price Breakdown */}
//       {breakdown ? (
//         <>
//           <Tooltip
//             content={
//               <div>
//                 View how the total price was calculated — including base rate,
//                 urgency, complexity, and expertise multipliers.
//               </div>
//             }
//             position="top"
//             size="sm"
//             color="bg-gray-900"
//             arrowSize="w-2 h-2"
//           >
//             <button
//               type="button"
//               onClick={() => setBreakdownOpen(true)}
//               className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline mt-2"
//             >
//               <HiInformationCircle className="w-4 h-4" />
//               View Price Breakdown
//             </button>
//           </Tooltip>

//           <PriceBreakdownModal
//             isOpen={isBreakdownOpen}
//             onClose={() => setBreakdownOpen(false)}
//             breakdown={breakdown}
//             estimatedPrice={estimatedPrice}
//             currency={currency}
//           />
//         </>
//       ) : (
//         <p className="text-sm text-gray-500 italic">
//           Provide content length to calculate breakdown.
//         </p>
//       )}
//     </aside>
//   );
// }
