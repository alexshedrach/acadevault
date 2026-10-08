"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiInformationCircle } from "react-icons/hi2";

import { currencySymbols } from "@/constants/enums";
import { Modal } from "../ui/Modal";
import Tooltip from "../ui/Tooltip";

const modalVariants = {
  initial: { opacity: 0, y: -20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.97 },
};

export default function PriceBreakdownModal({
  isOpen,
  onClose,
  breakdown,
  currency,
  estimatedPrice,
}) {
  if (!breakdown) return null;
  const symbol = currencySymbols[currency] || currency;

  const BreakdownItem = ({ label, value, tooltip, isNegative = false }) => (
    <div className="flex justify-between items-center flex-nowrap gap-4">
      <dt className="flex items-center gap-1 font-medium text-gray-800 whitespace-nowrap min-w-0">
        {label}
        {tooltip && (
          <Tooltip content={tooltip} position="top" size="sm">
            <HiInformationCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 shrink-0" />
          </Tooltip>
        )}
      </dt>
      <dd
        className={`font-semibold text-right ${
          isNegative ? "text-green-600" : "text-gray-900"
        }`}
      >
        {value}
      </dd>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen
          onClose={onClose}
          title="Price Breakdown"
          size="md"
          theme="light"
          draggable={false}
          className="overflow-visible"
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="space-y-5 text-sm text-gray-700"
          >
            <dl className="grid grid-cols-1 gap-3">
              <BreakdownItem
                label="Base Rate"
                value={breakdown.basePrice}
                tooltip="Base price per page for this seminar"
              />
              <BreakdownItem
                label="Quantity"
                value={`${breakdown.pages} pages`}
                tooltip="Number of pages requested"
              />
              <BreakdownItem
                label="Academic Level"
                value={`×${breakdown.academicMultiplier}`}
                tooltip="Multiplier based on your academic level"
              />
              <BreakdownItem
                label="Writer Expertise"
                value={`×${breakdown.writerMultiplier}`}
                tooltip="Multiplier based on chosen writer tier"
              />
              <BreakdownItem
                label="Urgency"
                value={`×${breakdown.urgencyMultiplier}`}
                tooltip="Multiplier for requested delivery speed"
              />

              {breakdown.addons.length > 0 && (
                <div className="flex justify-between items-start gap-4">
                  <dt className="flex items-center gap-1 font-medium text-gray-800 whitespace-nowrap">
                    Add‑ons
                    <Tooltip
                      content="Additional services selected"
                      position="top"
                      size="sm"
                    >
                      <HiInformationCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 shrink-0" />
                    </Tooltip>
                  </dt>
                  <dd className="text-right font-medium space-y-1">
                    {breakdown.addons.map((a) => (
                      <div key={a.id}>
                        {a.label}: {a.price}
                      </div>
                    ))}
                  </dd>
                </div>
              )}

              {breakdown.addonsTotal !== `${symbol}0.00` && (
                <BreakdownItem
                  label="Add‑ons Total"
                  value={breakdown.addonsTotal}
                />
              )}

              {breakdown.discount !== `${symbol}0.00` && (
                <BreakdownItem
                  label="Discount"
                  value={`–${breakdown.discount}`}
                  isNegative
                  tooltip="Promo or coupon discount applied"
                />
              )}

              <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-300">
                <dt className="text-base font-semibold text-gray-900">Total</dt>
                <dd className="text-base font-bold text-gray-900">
                  {symbol}
                  {estimatedPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </dd>
              </div>
            </dl>

            <div className="pt-2 mt-4 border-t text-xs text-gray-500">
              <strong>Formula:</strong>
              <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                Final = (Base × Quantity × Academic Level × Writer Expertise ×
                Urgency) + Add‑ons – Discount
              </pre>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
