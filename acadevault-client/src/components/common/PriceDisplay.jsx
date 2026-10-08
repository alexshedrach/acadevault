import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/formatPrice";

/**
 * PriceDisplay — Displays original and discounted price,
 * with support for free, loading, and customizable styles.
 */
const PriceDisplay = ({
  price = 0,
  finalPrice,
  isFree,
  loading = false,
  locale = "en-US",
  className = "",
  priceClass = "",
  originalPriceClass = "",
  freeClass = "",
  loadingClass = "",
}) => {
  if (loading) {
    return (
      <div
        className={cn("flex flex-col animate-pulse", className)}
        aria-busy="true"
        aria-live="polite"
      >
        <span className={cn("text-sm text-gray-400", loadingClass)}>
          Loading price...
        </span>
      </div>
    );
  }

  if (!finalPrice || typeof finalPrice.amount !== "number") {
    return null; // Don't render incomplete or broken price
  }

  const { amount, formatted, originalAmount, currencySymbol, discountApplied } =
    finalPrice;

  const hasDiscount = originalAmount > amount;

  return (
    <div
      className={cn("flex flex-col", className)}
      aria-label="Product pricing"
    >
      {isFree ? (
        <span
          className={cn(
            "text-lg font-semibold text-green-600",
            "aria-label:Free",
            freeClass
          )}
        >
          Free
        </span>
      ) : (
        <>
          {hasDiscount && (
            <del
              className={cn(
                "text-sm text-gray-400 line-through",
                originalPriceClass
              )}
              aria-label="Original price"
            >
              {currencySymbol}
              {formatPrice(originalAmount, locale)}
            </del>
          )}
          <ins
            className={cn(
              "text-lg font-bold text-blue-600 not-italic",
              priceClass
            )}
            aria-label="Current price"
          >
            {/* {currencySymbol} */}
            {formatPrice(formatted, locale)}
          </ins>
        </>
      )}
    </div>
  );
};

PriceDisplay.propTypes = {
  /** Optional static price (not used directly if `finalPrice` is present) */
  price: PropTypes.number,
  /** Final price object after discounts/tax */
  finalPrice: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    formatted: PropTypes.string.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    discountApplied: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
      .isRequired,
    originalAmount: PropTypes.number.isRequired,
  }).isRequired,
  /** Whether the item is free (overrides pricing) */
  isFree: PropTypes.bool.isRequired,
  /** Loading state for async price fetching */
  loading: PropTypes.bool,
  /** Locale for price formatting (e.g. `en-US`) */
  locale: PropTypes.string,
  /** Class for the root wrapper */
  className: PropTypes.string,
  /** Class for the discounted (final) price */
  priceClass: PropTypes.string,
  /** Class for the original (strikethrough) price */
  originalPriceClass: PropTypes.string,
  /** Class for "Free" label */
  freeClass: PropTypes.string,
  /** Class for loading state */
  loadingClass: PropTypes.string,
};

export default PriceDisplay;
