"use client";

import { Modal } from "@/components/ui/Modal";
import { CurrencyContext } from "@/contexts/CurrencyContext";
import { formatPriceWithSymbol } from "@/utils/formatPrice";
import { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function PlanCheckoutModal({ plan, isOpen, onClose }) {
  const { currency } = useContext(CurrencyContext);
  const formatted = formatPriceWithSymbol(plan.price[currency], currency);

  const handleSave = () => {
    onClose();
    window.open(
      `/hire-writer/order?plan=${plan.slug.toLowerCase()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${plan.title} Plan`}
      description={plan.applicability}
      size="full"
      theme="light"
      draggable
      footer
      onSave={handleSave}
      saveLabel="Proceed to Order"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-2 bg-white p-2 rounded-lg border border-gray-300 shadow-sm">
          <div className="text-2xl font-bold text-primary">
            {formatted.formatted}
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-semibold text-gray-800">
              What You Get
            </h4>
            <ul className="space-y-1">
              {plan.contentNature.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-700 flex items-center gap-2"
                >
                  <FaCheckCircle className="text-green-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              {plan.features
                .slice(0, Math.ceil(plan.features.length / 2))
                .map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2 bg-white p-2 rounded-lg border border-gray-300 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-gray-800">
              More Features
            </h4>
            <ul className="space-y-1">
              {plan.features
                .slice(Math.ceil(plan.features.length / 2))
                .map((feature) => (
                  <li
                    key={feature}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
            <div>
              <strong className="text-gray-800">Delivery Time:</strong>{" "}
              {plan.deliveryTime}
            </div>
            <div>
              <strong className="text-gray-800">Word Count:</strong>{" "}
              {plan.pageLength}
            </div>
            <div>
              <strong className="text-gray-800">Subjects:</strong>{" "}
              {plan.subjectSpecialization.join(", ")}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
            <div>
              <strong className="text-gray-800">Format:</strong>{" "}
              {plan.documentFormat}
            </div>
            <div>
              <strong className="text-gray-800">Plagiarism:</strong>{" "}
              {plan.plagiarismLevel}
            </div>
            <div>
              <strong className="text-gray-800">References:</strong>{" "}
              {plan.references}
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        {plan.disclaimers && (
          <div className="col-span-full p-2 border border-gray-300 rounded-lg bg-gray-50">
            <h5 className="font-semibold text-gray-800 mb-1 text-sm">
              Disclaimers
            </h5>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              {plan.disclaimers.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
}
