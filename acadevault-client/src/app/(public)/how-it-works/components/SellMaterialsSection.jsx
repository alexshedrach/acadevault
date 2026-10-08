"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpIcon,
  Briefcase,
  ChartBarIcon,
  ClipboardCheckIcon,
  UserPlusIcon,
} from "lucide-react";
import { HiCurrencyDollar, HiInformationCircle } from "react-icons/hi";

const steps = [
  {
    title: "Create Your Seller Account",
    description:
      "Sign up or convert your account to a seller profile. Verify your email and phone number for activation.",
    icon: <UserPlusIcon className="w-10 h-10 text-blue-600 drop-shadow-md" />,
    tooltip: "Verification is required before uploading your materials.",
  },
  {
    title: "Complete Profile & Submit Documents",
    description:
      "Add your professional bio, credentials, and upload clear verification documents.",
    icon: (
      <ClipboardCheckIcon className="w-10 h-10 text-green-600 drop-shadow-md" />
    ),
    tooltip: "Only legible and valid documents will be approved.",
  },
  {
    title: "Upload Academic Materials",
    description:
      "Use the dashboard to submit content with metadata and thumbnails. Ensure originality and relevance.",
    icon: <ArrowUpIcon className="w-10 h-10 text-purple-600 drop-shadow-md" />,
    tooltip: "Your content undergoes review for quality assurance.",
  },
  {
    title: "Earn & Get Paid",
    description:
      "After approval, earn from every sale. View real-time reports and weekly payouts.",
    icon: (
      <HiCurrencyDollar className="w-10 h-10 text-yellow-500 drop-shadow-md" />
    ),
    tooltip: "Set up payout methods for faster disbursement.",
  },
  {
    title: "Track Insights & Optimize",
    description:
      "Monitor performance, user engagement, ratings, and optimize content using your dashboard analytics.",
    icon: <ChartBarIcon className="w-10 h-10 text-indigo-600 drop-shadow-md" />,
    tooltip: "Use insights to increase visibility and conversions.",
  },
];

export default function SellMaterialsSection() {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 relative z-0">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/bg-pattern.svg')] bg-no-repeat bg-cover mix-blend-soft-light z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="flex gap-4 text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          <Briefcase className="w-8 h-8 text-blue-600" />
          Sell Your Materials
        </h2>
        <p className="text-lg text-gray-700 mb-16 max-w-3xl mx-auto">
          Join <span className="text-purple-700 font-bold">AcadeVault</span> as
          a verified content contributor and start earning from your expertise.
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group bg-white/80 backdrop-blur-md rounded-2xl 
    border-l-8 ${
      index % 3 === 0
        ? "border-purple-500"
        : index % 3 === 1
        ? "border-blue-500"
        : "border-green-500"
    } 
    hover:${
      index % 3 === 0
        ? "border-purple-700"
        : index % 3 === 1
        ? "border-blue-700"
        : "border-green-700"
    } 
    shadow-2xl hover:shadow-${
      index % 3 === 0 ? "purple" : index % 3 === 1 ? "blue" : "green"
    }-300 
    p-8 transition-all duration-500 transform hover:scale-[1.03]`}
            >
              {/* Progress Indicator */}
              <div className="text-xs text-purple-700 font-bold mb-4 uppercase tracking-wider">
                Step {index + 1} of {steps.length}
              </div>

              <div className="flex items-start gap-6">
                {/* Icon Container with subtle glow */}
                <div className="relative p-4 rounded-full bg-purple-100 shadow-inner ring-2 ring-white hover:ring-purple-300 transition-all duration-300">
                  <div className="absolute -inset-1 rounded-full blur-xl opacity-30 bg-gradient-to-br from-purple-300 to-purple-100 animate-pulse"></div>
                  <div className="relative z-10">{step.icon}</div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <div className="w-10 h-1 bg-purple-200 rounded-full mb-3"></div>
                  <p className="text-gray-700 text-md leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Tooltip */}
              <div className="absolute top-5 right-5 group cursor-pointer">
                <HiInformationCircle className="w-6 h-6 text-gray-400 hover:text-purple-600 transition-all duration-300" />
                <div className="absolute z-50 w-72 text-sm text-white bg-gray-900 bg-opacity-90 backdrop-blur-md px-4 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -top-2 right-8 transform -translate-y-full">
                  {step.tooltip}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {/* <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-20"
        >
          <a
            href="/seller/dashboard"
            className="inline-block bg-purple-700 text-white text-lg font-semibold px-10 py-4 rounded-xl shadow-xl hover:bg-purple-800 transition-all duration-300"
          >
            Find Out More
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
