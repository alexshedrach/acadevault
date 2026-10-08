import CurrencySelector from "@/components/common/CurrencySelector";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import CountUp from "react-countup";
import { Tooltip } from "react-tooltip";

export default function PriceSummaryHeader({
  estimatedPrice,
  displayedPrice,
  discountAmount,
  currency,
  currencySymbols,
}) {
  return (
    <header className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Title and Info Icon */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Estimated Price
          </h2>
          <Info
            size={20}
            data-tooltip-id="tooltip-formula"
            data-tooltip-content="Base × Words × Complexity × Urgency - Discount"
            className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-200"
            aria-label="Price calculation formula"
          />
          <Tooltip
            id="tooltip-formula"
            className="z-50 max-w-xs text-xs bg-gray-800 text-white rounded-md p-2 shadow-lg"
            role="tooltip"
          />
        </div>

        {/* Currency Selector */}
        <CurrencySelector
          //   asDropdown
          buttonClassName="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 font-medium transition-colors duration-200 rounded-md px-4 py-2 text-sm sm:text-base"
          aria-label="Select currency"
        />
      </div>

      {/* Price Display */}
      <motion.div
        className="text-2xl sm:text-3xl font-extrabold text-blue-700 mt-4 tracking-tight"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-live="polite"
      >
        <CountUp
          end={parseFloat(displayedPrice)}
          prefix={currencySymbols[currency] || ""}
          suffix={` ${currency}`}
          decimals={2}
          duration={0.8}
        />
      </motion.div>

      {/* Discount Information */}
      {discountAmount > 0 && (
        <motion.p
          className="text-sm sm:text-base text-gray-600 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className="line-through text-gray-500">
            {currencySymbols[currency] || ""}
            {estimatedPrice.toFixed(2)}
          </span>
          <span className="text-green-600 font-medium ml-2">
            → {currencySymbols[currency] || ""}
            {displayedPrice.toFixed(2)} (Saved {currencySymbols[currency] || ""}
            {discountAmount.toFixed(2)})
          </span>
        </motion.p>
      )}
    </header>
  );
}
