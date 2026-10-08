"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const WriterStepCard = memo(({ step, index }) => {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      aria-labelledby={`step-title-${index}`}
    >
      <div className="relative w-full h-36 overflow-hidden">
        <Image
          src={step.image}
          alt={step.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        <div
          className={`absolute bottom-3 right-3 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg border-2 border-white`}
        >
          <step.icon className="text-white text-lg" aria-hidden="true" />
        </div>
      </div>

      <div className="p-4 space-y-2 text-center lg:text-left">
        <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium uppercase">
          Step {stepNumber}
        </span>
        <h3
          id={`step-title-${index}`}
          className="text-xl font-semibold text-gray-900"
        >
          {step.title}
        </h3>
        <p className="text-gray-600 text-base leading-snug">
          {step.description}
        </p>
        {step.cta && (
          <Link
            href={step.cta.href}
            className="inline-block mt-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {step.cta.label} →
          </Link>
        )}
      </div>
    </motion.article>
  );
});

WriterStepCard.displayName = "WriterStepCard";
export default WriterStepCard;
