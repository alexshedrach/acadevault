import { useMemo } from "react";
import { formatPriceWithSymbol } from "@/utils/formatPrice";
import {
  complexityMultipliers,
  writerExpertiseMultipliers,
  WORDS_PER_PAGE,
} from "@/config/pricingConfig";
import { calculateUrgencyMultiplier } from "@/utils/pricingUtils";

/**
 * Calculates all pricing components for the summary card.
 * - In plan mode: base = fixed plan price, all multipliers = 1.
 * - In writer mode: base = ratePerWord * words, multiplier = urgency * complexity * expertise.
 */
export function usePricingAnalysis({
  plan = null,
  writer = null,
  mode = "plan",
  currency = "NGN",
  wordCount = 0,
  unitType = "words",
  selectedUrgencyDays = 7,
  selectedAddons = [],
  discounts = [],
}) {
  // Convert page-based count into words if needed
  const actualWords = useMemo(() => {
    if (mode === "writer" && unitType === "pages") {
      return wordCount * WORDS_PER_PAGE;
    }
    return wordCount;
  }, [mode, unitType, wordCount]);

  // Base rate: fixed plan price or writer rate per word
  const baseRate = useMemo(() => {
    if (mode === "plan" && plan) {
      // Always take the price directly from the plan metadata
      return plan.price?.[currency] || 0;
    }
    if (mode === "writer" && writer) {
      return writer.ratePerWord || 0;
    }
    return 0;
  }, [mode, plan, writer, currency]);

  // Multipliers only apply in writer mode
  const complexityFactor =
    mode === "writer" ? complexityMultipliers[writer?.complexity] || 1 : 1;
  const expertiseFactor =
    mode === "writer" ? writerExpertiseMultipliers[writer?.expertise] || 1 : 1;
  const urgencyFactor =
    mode === "writer" ? calculateUrgencyMultiplier(selectedUrgencyDays) : 1;

  // Sum of add-ons (works for both modes)
  const addonsTotal = useMemo(
    () => selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0),
    [selectedAddons]
  );

  // Raw base cost:
  // -- plan: the fixed plan price,
  // -- writer: per-word rate × words
  const rawBase = useMemo(() => {
    return mode === "plan" ? baseRate : baseRate * actualWords;
  }, [mode, baseRate, actualWords]);

  // Raw total before discounts:
  // -- plan: rawBase + addons
  // -- writer: rawBase × multipliers + addons
  const rawTotal = useMemo(() => {
    const multiplied =
      rawBase * complexityFactor * expertiseFactor * urgencyFactor;
    return multiplied + addonsTotal;
  }, [rawBase, complexityFactor, expertiseFactor, urgencyFactor, addonsTotal]);

  // Apply any discounts
  const totalAfterDiscount = useMemo(() => {
    return discounts.reduce((total, d) => {
      if (d.type === "flat") {
        return total - d.value;
      }
      if (d.type === "percent") {
        return total - total * (d.value / 100);
      }
      return total;
    }, rawTotal);
  }, [rawTotal, discounts]);

  // Format the final total for display
  const formatted = useMemo(() => {
    return formatPriceWithSymbol(Math.max(totalAfterDiscount, 0), currency);
  }, [totalAfterDiscount, currency]);

  return {
    rawBase,
    rawTotal,
    totalAfterDiscount,
    formatted,
    multiplier: urgencyFactor, // x1.00 in plan mode
    addonsTotal,
    complexityFactor, // =1 in plan mode
    expertiseFactor, // =1 in plan mode
    urgencyDays: selectedUrgencyDays, // for the slider
  };
}

// /**
//  * usePricingAnalysis hook: Calculates pricing for the order summary.
//  * In plan mode, uses the fixed plan price plus add-ons, ignoring other multipliers.
//  * In writer mode, calculates price dynamically based on word count, urgency, complexity, and expertise.
//  */
// "use client";

// import { useMemo } from "react";
// import { formatPriceWithSymbol } from "@/utils/formatPrice";
// import {
//   complexityMultipliers,
//   writerExpertiseMultipliers,
//   WORDS_PER_PAGE,
// } from "@/config/pricingConfig";
// import { calculateUrgencyMultiplier } from "@/utils/pricingUtils";

// export function usePricingAnalysis({
//   plan = null,
//   writer = null,
//   mode = "plan",
//   currency = "NGN",
//   wordCount = 0,
//   unitType = "words",
//   selectedUrgencyDays = 7,
//   selectedAddons = [],
//   discounts = [],
// }) {
//   // Calculate actual word count based on unit type
//   const actualWords = useMemo(() => {
//     if (mode === "writer" && unitType === "pages") {
//       return wordCount * WORDS_PER_PAGE;
//     }
//     return wordCount;
//   }, [wordCount, unitType, mode]);

//   // Determine base rate: plan price in plan mode, writer rate in writer mode
//   const baseRate = useMemo(() => {
//     if (mode === "plan" && plan) {
//       return plan.price?.[currency] || 0;
//     }
//     if (mode === "writer" && writer) {
//       return writer.ratePerWord || 0;
//     }
//     return 0;
//   }, [mode, plan, writer, currency]);

//   // Complexity multiplier: Only applied in writer mode
//   const complexityFactor = useMemo(() => {
//     return mode === "writer"
//       ? complexityMultipliers[writer?.complexity] || 1
//       : 1;
//   }, [mode, writer]);

//   // Expertise multiplier: Only applied in writer mode
//   const expertiseFactor = useMemo(() => {
//     return mode === "writer"
//       ? writerExpertiseMultipliers[writer?.expertise] || 1
//       : 1;
//   }, [mode, writer]);

//   // Urgency multiplier: Only applied in writer mode
//   const urgencyFactor = useMemo(() => {
//     return mode === "writer"
//       ? calculateUrgencyMultiplier(selectedUrgencyDays)
//       : 1;
//   }, [mode, selectedUrgencyDays]);

//   // Sum of add-on prices
//   const addonsTotal = useMemo(() => {
//     return selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
//   }, [selectedAddons]);

//   // Raw base cost: Fixed plan price in plan mode, word-based in writer mode
//   const rawBase = useMemo(() => {
//     return mode === "writer" ? baseRate * actualWords : baseRate;
//   }, [mode, baseRate, actualWords]);

//   // Raw total: Apply multipliers (only in writer mode) and add-ons
//   const rawTotal = useMemo(() => {
//     return (
//       rawBase * complexityFactor * expertiseFactor * urgencyFactor + addonsTotal
//     );
//   }, [rawBase, complexityFactor, expertiseFactor, urgencyFactor, addonsTotal]);

//   // Apply discounts
//   const totalAfterDiscount = useMemo(() => {
//     return discounts.reduce((total, d) => {
//       if (d.type === "flat") {
//         return total - d.value;
//       } else if (d.type === "percent") {
//         return total - total * (d.value / 100);
//       }
//       return total;
//     }, rawTotal);
//   }, [rawTotal, discounts]);

//   // Format final total
//   const formatted = useMemo(() => {
//     return formatPriceWithSymbol(Math.max(totalAfterDiscount, 0), currency);
//   }, [totalAfterDiscount, currency]);

//   return {
//     rawBase,
//     rawTotal,
//     totalAfterDiscount,
//     formatted,
//     multiplier: urgencyFactor,
//     addonsTotal,
//     urgencyDays: selectedUrgencyDays,
//     complexityFactor,
//     expertiseFactor,
//   };
// }
