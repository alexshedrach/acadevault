import { useState, useEffect, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "react-toastify";
import {
  academicTypeRates,
  complexityMultipliers,
  writerExpertiseMultipliers,
  WORDS_PER_PAGE,
} from "@/config/pricingConfig";
import { calculateUrgencyMultiplier } from "@/utils/pricingUtils";
import { formatPriceWithSymbol } from "@/utils/formatPrice";

export const usePriceCalculator = (formData, unitType, setValue) => {
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [displayedPrice, setDisplayedPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const calculatePrice = useDebouncedCallback(() => {
    if (formData.mode === "plan") {
      // Plan mode uses fixed plan price
      const raw = formData.estimatedCost?.replace(/[^0-9.-]+/g, "") || "0";
      const price = parseFloat(raw) || 0;
      setEstimatedPrice(price);
      setDisplayedPrice(price - discountAmount);
    } else {
      // Writer mode: calculate dynamically
      const count =
        unitType === "pages"
          ? parseInt(formData.wordCount || 0, 10) * WORDS_PER_PAGE
          : parseInt(formData.wordCount || 0, 10);
      const baseRate = academicTypeRates[formData.academicType] || 0.045;
      const complexity = complexityMultipliers[formData.complexity] || 1;
      const urgency = calculateUrgencyMultiplier(formData.deadline);
      const expertise =
        writerExpertiseMultipliers[formData.writerExpertise] || 1.0;

      const price = Math.max(
        5,
        Math.round(baseRate * count * complexity * urgency * expertise * 100) /
          100
      );

      setEstimatedPrice(price);
      setDisplayedPrice(price - discountAmount);
      setValue(
        "writerCostPreview",
        formatPriceWithSymbol(price, formData.currency).formatted
      );
    }
  }, 300);

  const priceInputs = useMemo(
    () => ({
      wordCount: formData.wordCount,
      deadline: formData.deadline,
      academicType: formData.academicType,
      complexity: formData.complexity,
      writerExpertise: formData.writerExpertise,
      unitType,
      estimatedCost: formData.estimatedCost,
      mode: formData.mode,
    }),
    [
      formData.wordCount,
      formData.deadline,
      formData.academicType,
      formData.complexity,
      formData.writerExpertise,
      unitType,
      formData.estimatedCost,
      formData.mode,
    ]
  );

  useEffect(() => {
    calculatePrice();
  }, [priceInputs, discountAmount, calculatePrice]);

  const handlePromoCodeApply = async () => {
    try {
      const code = formData.promoCode.toUpperCase();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-codes`);
      const promoCodes = await res.json();
      const discount = promoCodes[code];
      if (discount) {
        const amount =
          Math.round(((estimatedPrice * discount) / 100) * 100) / 100;
        setDiscountAmount(amount);
        setPromoError("");
        toast.success("Promo code applied!");
      } else {
        throw new Error("Invalid promo code.");
      }
    } catch (err) {
      setDiscountAmount(0);
      setPromoError(err.message);
      toast.error(err.message);
    }
  };

  return {
    estimatedPrice,
    displayedPrice,
    discountAmount,
    promoError,
    handlePromoCodeApply,
  };
};

// import { useState, useEffect, useMemo } from "react";
// import { useDebouncedCallback } from "use-debounce";
// import { toast } from "react-toastify";
// import {
//   academicTypeRates,
//   complexityMultipliers,
//   writerExpertiseMultipliers,
//   WORDS_PER_PAGE,
// } from "@/config/pricingConfig";
// import { calculateUrgencyMultiplier } from "@/utils/pricingUtils";

// export const usePriceCalculator = (formData, unitType, setValue) => {
//   const [estimatedPrice, setEstimatedPrice] = useState(0);
//   const [displayedPrice, setDisplayedPrice] = useState(0);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [promoError, setPromoError] = useState("");

//   const calculatePrice = useDebouncedCallback(() => {
//     const count =
//       unitType === "pages"
//         ? parseInt(formData.wordCount || 0, 10) * WORDS_PER_PAGE
//         : parseInt(formData.wordCount || 0, 10);
//     const baseRate = academicTypeRates[formData.academicType] || 0.045;
//     const complexity = complexityMultipliers[formData.complexity] || 1;
//     const urgency = calculateUrgencyMultiplier(formData.deadline);
//     const expertiseMultiplier =
//       writerExpertiseMultipliers[formData.writerExpertise] || 1.0;

//     const price = Math.max(
//       5,
//       Math.round(
//         baseRate * count * complexity * urgency * expertiseMultiplier * 100
//       ) / 100
//     );
//     setEstimatedPrice(price);
//     setDisplayedPrice(price - discountAmount);
//   }, 300);

//   const priceInputs = useMemo(
//     () => ({
//       wordCount: formData.wordCount,
//       deadline: formData.deadline,
//       academicType: formData.academicType,
//       complexity: formData.complexity,
//       writerExpertise: formData.writerExpertise,
//       unitType,
//     }),
//     [
//       formData.wordCount,
//       formData.deadline,
//       formData.academicType,
//       formData.complexity,
//       formData.writerExpertise,
//       unitType,
//     ]
//   );

//   useEffect(() => {
//     calculatePrice();
//   }, [priceInputs, discountAmount, calculatePrice]);

//   const handlePromoCodeApply = async () => {
//     try {
//       const code = formData.promoCode.toUpperCase();
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-codes`);
//       const promoCodes = await res.json();
//       const discount = promoCodes[code];
//       if (discount) {
//         const amount =
//           Math.round(((estimatedPrice * discount) / 100) * 100) / 100;
//         setDiscountAmount(amount);
//         setPromoError("");
//         toast.success("Promo code applied!");
//       } else {
//         throw new Error("Invalid promo code.");
//       }
//     } catch (err) {
//       setDiscountAmount(0);
//       setPromoError(err.message);
//       toast.error(err.message);
//     }
//   };

//   return {
//     estimatedPrice,
//     displayedPrice,
//     discountAmount,
//     promoError,
//     handlePromoCodeApply,
//   };
// };

// // // hooks/usePriceCalculator.js
// // import { useState, useEffect } from "react";
// // import { useDebouncedCallback } from "use-debounce";
// // import { toast } from "react-toastify";
// // import {
// //   academicTypeRates,
// //   complexityMultipliers,
// //   validPromoCodes,
// //   WORDS_PER_PAGE,
// //   writerExpertiseMultipliers,
// // } from "@/config/pricingConfig";
// // import { calculateUrgencyMultiplier } from "@/utils/pricingUtils";

// // export const usePriceCalculator = (formData, unitType, setValue) => {
// //   const [estimatedPrice, setEstimatedPrice] = useState(0);
// //   const [displayedPrice, setDisplayedPrice] = useState(0);
// //   const [discountAmount, setDiscountAmount] = useState(0);
// //   const [promoError, setPromoError] = useState("");

// //   const calculatePrice = useDebouncedCallback(() => {
// //     const count =
// //       unitType === "pages"
// //         ? parseInt(formData.wordCount || 0, 10) * WORDS_PER_PAGE
// //         : parseInt(formData.wordCount || 0, 10);
// //     const baseRate = academicTypeRates[formData.academicType] || 0.045;
// //     const complexity = complexityMultipliers[formData.complexity] || 1;
// //     const urgency = calculateUrgencyMultiplier(formData.deadline);
// //     const expertiseMultiplier =
// //       writerExpertiseMultipliers[formData.writerExpertise] || 1.0;

// //     const price = baseRate * count * complexity * urgency * expertiseMultiplier;
// //     setEstimatedPrice(price);
// //     setDisplayedPrice(price - discountAmount);
// //   }, 300);

// //   useEffect(() => {
// //     calculatePrice();
// //   }, [
// //     formData.wordCount,
// //     formData.deadline,
// //     formData.academicType,
// //     formData.complexity,
// //     formData.writerExpertise,
// //     unitType,
// //     discountAmount,
// //     calculatePrice
// //   ]);

// //   const handlePromoCodeApply = () => {
// //     const code = formData.promoCode.toUpperCase();
// //     const discount = validPromoCodes[code];

// //     if (discount) {
// //       const amount = (estimatedPrice * discount) / 100;
// //       setDiscountAmount(amount);
// //       setPromoError("");
// //       toast.success("Promo code applied!");
// //     } else {
// //       setDiscountAmount(0);
// //       setPromoError("Invalid promo code.");
// //       toast.error("Invalid promo code.");
// //     }
// //   };

// //   return {
// //     estimatedPrice,
// //     displayedPrice,
// //     discountAmount,
// //     promoError,
// //     handlePromoCodeApply,
// //   };
// // };
