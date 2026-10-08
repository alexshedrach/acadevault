import { useState, useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { PricingService } from "@/services/PricingService";
import { WORDS_PER_PAGE } from "@/config/priceConfiguration";
import { currencySymbols, MINIMUM_TOTALS } from "@/constants/enums";
import { useDebouncedCallback } from "use-debounce";

const pricingCache = new Map();

export function usePricing({ formData, unitType, mode, plan, writer }) {
  const [pricing, setPricing] = useState({
    rawBase: 0,
    addonsTotal: 0,
    rawTotal: 0,
    discountAmount: 0,
    totalAfterDiscount: 0,
    formatted: { formatted: "0", symbol: "" },
    pagesUsed: 0,
    isMinimumApplied: false,
    minimumAppliedMessage: "",
  });
  const [promoError, setPromoError] = useState("");
  const prevKey = useRef(null);

  const pagesUsed = useMemo(() => {
    const count = formData.unitCount || 0;
    return unitType === "words" ? Math.ceil(count / WORDS_PER_PAGE) : count;
  }, [formData.unitCount, unitType]);

  const stableKey = useMemo(() => {
    const keyData = {
      mode,
      planId: mode === "plan" ? plan?.id : null,
      writerId: mode === "writer" ? writer?.id : null,
      materialType: formData.academicType,
      academicLevel: formData.academicLevel,
      writerExpertise: formData.writerExpertise,
      deadline: formData.deadline,
      urgencyMultiplier: formData.urgencyMultiplier,
      currency: formData.currency,
      selectedAddons: formData.selectedAddons || [],
      promoCode: formData.promoCode ? formData.promoCode.toUpperCase() : "",
      quantity: pagesUsed,
    };
    return JSON.stringify(keyData);
  }, [
    mode,
    plan,
    writer,
    formData.academicType,
    formData.academicLevel,
    formData.writerExpertise,
    formData.deadline,
    formData.urgencyMultiplier,
    formData.currency,
    formData.selectedAddons,
    formData.promoCode,
    pagesUsed,
  ]);

  useEffect(() => {
    pricingCache.clear();
    prevKey.current = null;
  }, [formData.currency]);

  const calculate = useDebouncedCallback(async () => {
    if (prevKey.current === stableKey && pricingCache.has(stableKey)) {
      const cached = pricingCache.get(stableKey);
      console.log("[usePricing] Using cached pricing:", cached);
      setPricing(cached);
      return;
    }
    prevKey.current = stableKey;

    try {
      const result = await PricingService.calculate({
        mode,
        plan: mode === "plan" ? plan : null,
        writer: mode === "writer" ? writer : null,
        materialType: formData.academicType || "Essay",
        academicLevel: formData.academicLevel || "ond",
        quantity: pagesUsed,
        unitType: "pages",
        writerTier: formData.writerExpertise || "standard",
        deadline: formData.deadline,
        customUrgency: formData.urgencyMultiplier,
        currency: formData.currency || "NGN",
        selectedAddons: formData.selectedAddons || [],
        promoCode: formData.promoCode,
      });

      console.log("[usePricing] Calculated pricing:", {
        ...result,
        selectedAddons: formData.selectedAddons,
        addonsTotal: result.addonsTotal,
      });

      pricingCache.set(stableKey, result);
      setPricing(result);
    } catch (err) {
      console.error("[usePricing] Pricing calculation failed:", err);
      const minTotal = MINIMUM_TOTALS[formData.currency] || 0;
      const fallback = {
        rawBase: 0,
        addonsTotal: 0,
        rawTotal: 0,
        discountAmount: 0,
        totalAfterDiscount: minTotal,
        formatted: {
          formatted: formatPriceWithSymbol(
            minTotal,
            formData.currency || "NGN"
          ),
          symbol: currencySymbols[formData.currency] || "₦",
        },
        pagesUsed: 0,
        isMinimumApplied: true,
        minimumAppliedMessage: `Total adjusted to meet minimum ${formatPriceWithSymbol(
          MINIMUM_TOTALS[formData.currency],
          formData.currency
        )} requirement.`,
      };
      pricingCache.set(stableKey, fallback);
      setPricing(fallback);
      toast.error("Failed to calculate price. Please check your input.");
    }
  }, 300);

  useEffect(() => {
    calculate();
  }, [stableKey, calculate]);

  const handlePromoCodeApply = async () => {
    try {
      const { discount, message } = await PricingService.validatePromoCode(
        formData.promoCode,
        formData.currency
      );
      if (discount > 0) {
        setPromoError("");
        toast.success("Promo code applied!");
        calculate();
      } else {
        setPromoError(message);
        toast.info(message);
      }
    } catch (err) {
      console.error("[usePricing] Promo validation error:", err);
      setPromoError("Failed to validate promo code.");
      toast.error("Failed to apply promo code.");
    }
  };

  return {
    ...pricing,
    pagesUsed,
    promoError,
    handlePromoCodeApply,
    isMinimumApplied: pricing.isMinimumApplied,
    minimumAppliedMessage: pricing.minimumAppliedMessage,
  };
}

// import { useState, useEffect, useMemo, useRef } from "react";
// import { toast } from "react-toastify";
// import { PricingService } from "@/services/PricingService";
// import { WORDS_PER_PAGE } from "@/config/priceConfiguration";
// import { currencySymbols, MINIMUM_TOTALS } from "@/constants/enums";
// import { useDebouncedCallback } from "use-debounce";

// // Simple in-memory cache
// const pricingCache = new Map();

// export function usePricing({ formData, unitType, mode, plan, writer }) {
//   const [pricing, setPricing] = useState({
//     rawBase: 0,
//     addonsTotal: 0,
//     rawTotal: 0,
//     discountAmount: 0,
//     totalAfterDiscount: 0,
//     formatted: { formatted: "0", symbol: "" },
//     pagesUsed: 0,
//   });
//   const [promoError, setPromoError] = useState("");
//   const prevKey = useRef(null);

//   // 1️⃣ Derive pagesUsed (always in pages for billing)
//   const pagesUsed = useMemo(() => {
//     const count = formData.unitCount || 0;
//     return unitType === "words" ? Math.ceil(count / WORDS_PER_PAGE) : count;
//   }, [formData.unitCount, unitType]);

//   // 2️⃣ Build a stable cache key (using pagesUsed, dropping unitType)
//   const stableKey = useMemo(() => {
//     const keyData = {
//       mode,
//       planId: mode === "plan" ? plan && plan.id : null,
//       writerId: mode === "writer" ? writer && writer.id : null,
//       materialType: formData.academicType,
//       academicLevel: formData.academicLevel,
//       writerExpertise: formData.writerExpertise,
//       deadline: formData.deadline,
//       urgencyMultiplier: formData.urgencyMultiplier,
//       currency: formData.currency,
//       selectedAddons: formData.selectedAddons || [],
//       promoCode: formData.promoCode ? formData.promoCode.toUpperCase() : "",
//       quantity: pagesUsed,
//     };
//     return JSON.stringify(keyData);
//   }, [
//     mode,
//     plan,
//     writer,
//     formData.academicType,
//     formData.academicLevel,
//     formData.writerExpertise,
//     formData.deadline,
//     formData.urgencyMultiplier,
//     formData.currency,
//     formData.selectedAddons,
//     formData.promoCode,
//     pagesUsed,
//   ]);

//   // 3️⃣ Clear cache if currency ever changes
//   useEffect(() => {
//     pricingCache.clear();
//     prevKey.current = null;
//   }, [formData.currency]);

//   // 4️⃣ Debounced pricing calculation
//   const calculate = useDebouncedCallback(async () => {
//     // Use cache if same key
//     if (prevKey.current === stableKey && pricingCache.has(stableKey)) {
//       setPricing(pricingCache.get(stableKey));
//       return;
//     }
//     prevKey.current = stableKey;

//     try {
//       const result = await PricingService.calculate({
//         mode,
//         plan: mode === "plan" ? plan : null,
//         writer: mode === "writer" ? writer : null,
//         materialType: formData.academicType,
//         academicLevel: formData.academicLevel,
//         // always bill in pages
//         quantity: pagesUsed,
//         unitType: "pages",
//         writerTier: formData.writerExpertise,
//         deadline: formData.deadline,
//         customUrgency: formData.urgencyMultiplier,
//         currency: formData.currency,
//         selectedAddons: formData.selectedAddons || [],
//         promoCode: formData.promoCode,
//       });

//       pricingCache.set(stableKey, result);
//       setPricing(result);
//     } catch (err) {
//       console.error("Pricing calculation failed:", err);
//       const minTotal = MINIMUM_TOTALS[formData.currency] || 0;
//       const fallback = {
//         rawBase: 0,
//         addonsTotal: 0,
//         rawTotal: 0,
//         discountAmount: 0,
//         totalAfterDiscount: minTotal,
//         formatted: {
//           formatted: minTotal.toString(),
//           symbol: currencySymbols[formData.currency] || "",
//         },
//         pagesUsed: 0,
//       };
//       pricingCache.set(stableKey, fallback);
//       setPricing(fallback);
//       toast.error("Failed to calculate price. Please check your input.");
//     }
//   }, 300);

//   // 5️⃣ Trigger calculate whenever our key changes
//   useEffect(() => {
//     calculate();
//   }, [stableKey, calculate]);

//   // Promo‑code application
//   const handlePromoCodeApply = async () => {
//     try {
//       const { discount, message } = await PricingService.validatePromoCode(
//         formData.promoCode,
//         formData.currency
//       );
//       if (discount > 0) {
//         setPromoError("");
//         toast.success("Promo code applied!");
//         calculate();
//       } else {
//         setPromoError(message);
//         toast.info(message);
//       }
//     } catch (err) {
//       console.error("Promo validation error:", err);
//       setPromoError("Failed to validate promo code.");
//       toast.error("Failed to apply promo code.");
//     }
//   };

//   return {
//     ...pricing,
//     pagesUsed,
//     promoError,
//     handlePromoCodeApply,
//   };
// }
