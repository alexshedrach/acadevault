"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { currencySymbols } from "@/constants/enums";
import { WORDS_PER_PAGE } from "@/config/pricingConfig";

export function PriceBreakdown({
  show,
  academicType,
  unitCount,
  unitType,
  baseRate,
  academicMultiplier,
  writerMultiplier,
  urgencyMultiplier,
  addonsTotal,
  discount,
  total,
  currency,
}) {
  const countDisplay =
    unitType === "pages"
      ? `${unitCount} pages (≈${(
          unitCount * WORDS_PER_PAGE
        ).toLocaleString()} words)`
      : `${unitCount} words`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="price-breakdown"
          role="region"
          aria-label="Detailed price breakdown"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-5 bg-white rounded-lg border border-gray-200 shadow-inner"
        >
          <dl className="grid grid-cols-1 gap-3 text-sm text-gray-700">
            <Item
              label={`Base Rate (${academicType})`}
              value={baseRate}
              currency={currency}
              tooltip="Base price per unit for selected material type"
            />
            <Item
              label="Quantity"
              value={countDisplay}
              tooltip="Project length input"
              isCurrency={false}
            />
            <Item
              label="Academic Level"
              value={`x${academicMultiplier.toFixed(2)}`}
              tooltip="Multiplier based on academic level"
              isCurrency={false}
            />
            <Item
              label="Writer Expertise"
              value={`x${writerMultiplier.toFixed(2)}`}
              tooltip="Multiplier based on writer tier"
              isCurrency={false}
            />
            <Item
              label="Urgency"
              value={`x${urgencyMultiplier.toFixed(2)}`}
              tooltip="Urgency multiplier"
              isCurrency={false}
            />
            <Item
              label="Add‑ons"
              value={addonsTotal}
              currency={currency}
              tooltip="Additional services selected"
            />

            <Item
              label="Discount"
              value={-discount}
              currency={currency}
              tooltip="Promo or special discount applied"
            />
            <Total label="Total" value={total} currency={currency} />
          </dl>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Item({ label, value, tooltip, isCurrency = true, currency }) {
  return (
    <div className="flex justify-between items-center">
      <dt
        className="font-medium text-gray-800"
        data-tooltip-id={`${label}-tooltip`}
        data-tooltip-content={tooltip}
      >
        {label}
      </dt>
      <dd className="font-semibold text-gray-900">
        {typeof value === "string"
          ? value
          : `${
              isCurrency ? currencySymbols[currency] || "" : ""
            }${value.toFixed(2)}`}
      </dd>
      {tooltip && (
        <Tooltip
          id={`${label}-tooltip`}
          className="z-50 max-w-xs text-xs bg-gray-800 text-white rounded-md p-2"
        />
      )}
    </div>
  );
}

function Total({ label, value, currency }) {
  return (
    <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-300 font-semibold text-gray-900">
      <dt className="text-base">{label}</dt>
      <dd className="text-base">
        {currencySymbols[currency] || ""}
        {value.toFixed(2)}{" "}
        <span className="text-sm text-gray-600">{currency}</span>
      </dd>
    </div>
  );
}
