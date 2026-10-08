"use client";

import PriceDisplay from "@/components/common/PriceDisplay";
import useEffectivePrice from "@/hooks/useEffectivePrice";
import { cn } from "@/utils/cn";
import { Badge } from "../ui/Badge";

const MaterialPrice = ({
  materialId,
  materialType,
  basePrice = 0,
  className = "",
}) => {
  const { price: finalPrice, loading } = useEffectivePrice({
    materialId,
    materialType,
  });

  let computedPrice = { ...finalPrice };

  // 💡 Fallback to basePrice if no hook price yet
  if (!computedPrice?.amount && basePrice) {
    computedPrice = { amount: basePrice };
  }

  const isFree = computedPrice.amount === 0;

  let hasDiscount =
    typeof computedPrice?.originalAmount === "number" &&
    computedPrice.amount < computedPrice.originalAmount;

  // 💻 Simulate discount in development environment
  if (process.env.NODE_ENV === "development" && !hasDiscount && !isFree) {
    computedPrice.originalAmount = computedPrice.amount * 1.2; // Simulate 20% off
    hasDiscount = true;
  }

  const discountPercent = hasDiscount
    ? Math.round(
        ((computedPrice.originalAmount - computedPrice.amount) /
          computedPrice.originalAmount) *
          100
      )
    : 0;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <PriceDisplay
        finalPrice={computedPrice}
        isFree={isFree}
        loading={loading}
        className="items-start"
      />

      {hasDiscount && (
        <Badge
          variant="danger"
          size="sm"
          className="uppercase font-semibold"
          icon="🔥"
          iconPosition="left"
        >
          Save {discountPercent}%
        </Badge>
      )}
    </div>
  );
};

export default MaterialPrice;

// "use client";

// import PriceDisplay from "@/components/common/PriceDisplay";
// import useEffectivePrice from "@/hooks/useEffectivePrice";
// import { cn } from "@/utils/cn";

// const MaterialPrice = ({
//   materialId,
//   materialType,
//   basePrice = 0,
//   className = "",
// }) => {
//   const { price: finalPrice, loading } = useEffectivePrice({
//     materialId,
//     materialType,
//   });

//   const isFree = finalPrice?.amount === 0;
//   const hasDiscount =
//     typeof finalPrice?.originalAmount === "number" &&
//     finalPrice.amount < finalPrice.originalAmount;

//   const discountPercent = hasDiscount
//     ? Math.round(
//         ((finalPrice.originalAmount - finalPrice.amount) /
//           finalPrice.originalAmount) *
//           100
//       )
//     : 0;

//   return (
//     <div className={cn("flex items-center gap-2", className)}>
//       <PriceDisplay
//         finalPrice={finalPrice}
//         isFree={isFree}
//         loading={loading}
//         className="items-start"
//       />

//       {hasDiscount && (
//         <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase font-semibold">
//           Save {discountPercent}%
//         </span>
//       )}
//     </div>
//   );
// };

// export default MaterialPrice;
