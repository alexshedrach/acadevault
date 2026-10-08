"use client";

import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CurrencyContext } from "@/contexts/CurrencyContext";
import { formatPriceWithSymbol } from "@/utils/formatPrice";
import { Button } from "@/components/ui/Button";

export default function PricingCard({ plan, onChoosePlan }) {
  const { currency } = useContext(CurrencyContext);
  const formatted = formatPriceWithSymbol(plan.price[currency], currency);


  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
      relative group p-6 flex flex-col h-full rounded-2xl border-2 shadow-sm
      transition-all duration-300 ease-in-out
      bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-white
      hover:shadow-md
      ${
        plan.popular
          ? "border-orange-500 ring-2 ring-orange-300/50"
          : "border-gray-200"
      }
    `}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <span className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10 shadow-md shadow-orange-300">
          🔥 Popular
        </span>
      )}

      {/* Title and Price */}
      <header className="mb-5 text-center">
        <h3
          id={`plan-${plan.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-2xl sm:text-3xl font-extrabold text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-blue-600 mb-4"
        >
          {plan.title}
        </h3>

        <p className="text-4xl font-extrabold text-blue-700 mt-2">
          {formatted.formatted}
          <span className="text-base font-medium text-gray-500 ml-1">
            /total
          </span>
        </p>

        {plan.applicability && (
          <p className="text-sm text-gray-500 mt-1">{plan.applicability}</p>
        )}
      </header>

      {/* Features */}
      <section className="mb-5 space-y-1">
        {[...(plan.contentNature || []), ...(plan.features || [])].map(
          (item) => (
            <div
              key={item}
              className="flex items-center text-sm text-gray-600 gap-2"
            >
              <FaCheckCircle className="text-green-500 w-4 h-4" />
              {item}
            </div>
          )
        )}
      </section>

      {/* Metadata Section */}
      <section className="mb-5 space-y-1 text-sm text-gray-700">
        <p>
          <strong>Document Format:</strong> {plan.documentFormat}
        </p>
        <p>
          <strong>Plagiarism Level:</strong> {plan.plagiarismLevel}
        </p>
        <p>
          <strong>References:</strong> {plan.references}
        </p>
        <p>
          <strong>Delivery:</strong> {plan.deliveryTime}
        </p>
        <p>
          <strong>Word Count:</strong> {plan.pageLength}
        </p>
        <p>
          <strong>Subjects:</strong>{" "}
          {plan.subjectSpecialization?.join(", ") || "—"}
        </p>
      </section>

      {/* Disclaimers (if any) */}
      {plan.disclaimers?.length > 0 && (
        <section className="mb-4 text-sm text-yellow-700 bg-yellow-50 rounded-md px-4 py-2 border border-yellow-200">
          <strong className="block mb-1">⚠ Disclaimers:</strong>
          <ul className="list-disc pl-5 space-y-1">
            {plan.disclaimers.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <footer className="mt-auto pt-4">
        <Button
          onClick={onChoosePlan}
          variant="gradient"
          size="md"
          className="w-full group"
          aria-label={`Select the ${plan.title} plan`}
        >
          <span className="flex items-center justify-center gap-2">
            Select Plan
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Button>
      </footer>
    </motion.div>
  );
}
