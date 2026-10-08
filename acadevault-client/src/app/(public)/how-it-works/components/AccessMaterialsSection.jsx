"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  ClipboardCheckIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from "next/link";

const steps = [
  {
    title: "Discover Academic Materials",
    description:
      "Browse our curated categories, filter by subject, academic level, or discipline, and find the exact materials you need.",
    icon: <EyeIcon className="w-8 h-8 text-blue-600" />,
    tooltip: "Use filters and search to narrow your selection.",
  },
  {
    title: "Preview & Add to Cart",
    description:
      "Check previews, ratings, and seller info before adding your chosen materials to your cart.",
    icon: <ShoppingCartIcon className="w-8 h-8 text-green-600" />,
    tooltip: "All previews are DRM protected and optimized for clarity.",
  },
  {
    title: "Secure Checkout",
    description:
      "Pay securely using debit/credit cards, PayPal, or cryptocurrency. All transactions are protected by encryption.",
    icon: <CreditCardIcon className="w-8 h-8 text-purple-600" />,
    tooltip: "We support multiple currencies and offer buyer protection.",
  },
  {
    title: "Instant Access or Delivery",
    description:
      "Immediately download digital files or track the delivery of physical materials through your dashboard.",
    icon: <DownloadIcon className="w-8 h-8 text-yellow-500" />,
    tooltip: "Downloads are watermarked, and links may expire after time.",
  },
  {
    title: "Manage Purchases",
    description:
      "Access purchased materials, redownload files, stream content, and track order history in your account dashboard.",
    icon: <ClipboardCheckIcon className="w-8 h-8 text-indigo-600" />,
    tooltip: "Your purchases are always available under your account.",
  },
];

export default function AccessMaterialsSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="flex gap-4 text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          <BookOpenCheck className="w-8 h-8 text-blue-600" />
          Access Academic Materials
        </h2>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          Unlock the power of{" "}
          <span className="text-blue-600 font-semibold">AcadeVault</span> in 5
          simple steps. Each step is designed to give you a seamless academic
          shopping experience.
        </p>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group bg-white rounded-xl border-t-4 border-blue-500 hover:border-blue-700 shadow-lg p-6 transition-all duration-300"
            >
              {/* Progress Indicator */}
              <div className="text-sm text-orange-600 font-semibold mb-2">
                Step {index + 1} of {steps.length}
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{step.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 mt-1 text-md">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Tooltip Icon */}
              <div className="absolute top-4 right-4 group cursor-pointer">
                <HiInformationCircle className="w-6 h-6 text-gray-400 hover:text-blue-600 transition" />
                <div className="absolute z-20 w-64 text-sm text-white bg-gray-800 px-4 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -top-2 right-8 transform -translate-y-full">
                  {step.tooltip}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}

        {/* <div className="mt-16 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/materials"
              className="inline-block bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white text-lg font-semibold py-4 px-10 rounded-lg shadow-xl transition"
            >
              Start Shopping Now
            </Link>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
}
