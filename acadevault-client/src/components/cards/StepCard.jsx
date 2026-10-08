"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// StepCard Component
const StepCard = ({
  step,
  index = 0,
  totalSteps = 1,
  variant = "simple", // 'simple', 'cta', 'timeline'
  reverse = false,
  editable = false,
  onEditChange = () => {},
  dynamicInput = null, // JSX element (e.g., <input />, <select /> etc.)
}) => {
  const stepNumber = String(step.id || index + 1).padStart(2, "0");

  // === CTA Variant (Detailed w/ image & icon) ===
  if (variant === "cta") {
    return (
      <motion.div
        className={`flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-10 snap-start ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Text Section */}
        <motion.div
          className={`text-center md:text-left ${reverse ? "md:order-2" : ""}`}
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-xl md:max-w-md lg:max-w-lg mx-auto md:mx-0 space-y-5">
            {/* Step Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full shadow-md text-sm font-medium tracking-wide uppercase backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="opacity-80">Step</span>
              <span className="font-bold">{stepNumber}</span>
            </motion.div>

            {/* Editable Title */}
            {editable ? (
              <input
                type="text"
                value={step.title}
                onChange={(e) => onEditChange(index, "title", e.target.value)}
                className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight w-full"
              />
            ) : (
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                {step.title}
              </h3>
            )}

            {/* Editable Description */}
            {editable ? (
              <textarea
                value={step.description}
                onChange={(e) =>
                  onEditChange(index, "description", e.target.value)
                }
                className="text-base md:text-lg text-gray-600 leading-relaxed w-full"
              />
            ) : (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {step.description}
              </p>
            )}

            {/* Optional CTA */}
            {step.cta && !editable && (
              <Link
                href={step.cta.href}
                className="inline-block text-blue-600 hover:underline text-sm font-semibold transition-all"
              >
                {step.cta.label} →
              </Link>
            )}

            {/* Optional Dynamic Input */}
            {dynamicInput && <div className="pt-2">{dynamicInput}</div>}
          </div>
        </motion.div>

        {/* Image & Icon Overlay */}
        <div className="relative max-w-[520px] mx-auto md:mx-0 rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 ease-in-out md:order-1">
          <Image
            src={step.image}
            alt={step.alt || "Step visual"}
            width={500}
            height={340}
            className="rounded-3xl object-cover w-full h-[280px] md:h-[300px] group-hover:scale-105 group-hover:brightness-110 transition-transform duration-700 ease-in-out"
            priority
          />

          {step.icon && (
            <div
              className={`absolute bottom-4 right-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${
                step.color || "from-indigo-500 to-purple-600"
              } shadow-lg shadow-black/20 border-4 border-white transition-all duration-300`}
            >
              <div className="text-white text-2xl drop-shadow-md">
                {step.icon}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // === Horizontal Timeline Variant ===
  if (variant === "timeline") {
    return (
      <motion.div
        className="relative w-full flex flex-col items-center gap-4 sm:flex-row sm:items-start px-4 py-6 sm:py-10 border-b border-gray-200 group"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Timeline Dot */}
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold shadow-lg z-10">
          {stepNumber}
        </div>

        {/* Connecting Line */}
        {index !== totalSteps - 1 && (
          <div className="absolute left-4 sm:left-[18px] top-8 sm:top-[35px] h-[3px] w-[calc(100%-2rem)] bg-gradient-to-r from-blue-400 to-indigo-600 z-0" />
        )}

        {/* Content Block */}
        <div className="flex-1 sm:ml-8 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
          <p className="text-gray-600 text-sm">{step.description}</p>
          {dynamicInput && <div className="pt-2">{dynamicInput}</div>}
        </div>
      </motion.div>
    );
  }

  // === Default SIMPLE VARIANT ===
  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-6 
                rounded-xl shadow-lg border border-gray-200 transform-gpu 
                hover:shadow-xl hover:scale-[1.02] transition-all
                ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      {/* Step Number Badge */}
      <div
        className="absolute -top-6 left-1/2 md:left-auto md:-top-8 flex items-center justify-center 
                   w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 
                   text-white text-lg md:text-xl font-bold rounded-full shadow-lg"
        aria-hidden="true"
      >
        {stepNumber}
      </div>

      {/* Icon Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative">
        <Image
          src={step.icon}
          alt={`${step.title} Icon`}
          width={128}
          height={128}
          className="object-contain drop-shadow-md transition-transform duration-300"
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
        />
      </div>

      {/* Text Content */}
      <div className="flex-1 text-center md:text-left space-y-3 md:space-y-4">
        {editable ? (
          <>
            <input
              type="text"
              value={step.title}
              onChange={(e) => onEditChange(index, "title", e.target.value)}
              className="text-lg md:text-xl font-bold text-gray-900 w-full"
            />
            <textarea
              value={step.description}
              onChange={(e) =>
                onEditChange(index, "description", e.target.value)
              }
              className="text-sm text-gray-600 leading-relaxed w-full"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-sm leading-relaxed">
              {step.description}
            </p>
          </>
        )}
        {dynamicInput && <div>{dynamicInput}</div>}
      </div>

      {/* Progress Line */}
      {index !== totalSteps - 1 && (
        <motion.div
          className="hidden md:block absolute left-1/2 top-full h-10 md:h-12 w-[3px] 
                     bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
};

export default StepCard;
