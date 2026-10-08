"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LinkIcon,
  UserCheckIcon,
  Share2Icon,
  DollarSignIcon,
  Share2,
} from "lucide-react";
import { HiCurrencyDollar, HiInformationCircle } from "react-icons/hi";

const steps = [
  {
    title: "Sign Up as an Affiliate",
    description:
      "Create your affiliate account by signing up on AcadeVault's platform. Ensure your account is active before proceeding.",
    icon: <UserCheckIcon className="w-10 h-10 text-teal-600 drop-shadow-md" />,
    tooltip: "Affiliate account approval required before promotion.",
  },
  {
    title: "Get Your Unique Affiliate Link",
    description:
      "Once your account is approved, you'll be provided with a unique affiliate link to share with potential buyers.",
    icon: <LinkIcon className="w-10 h-10 text-indigo-600 drop-shadow-md" />,
    tooltip: "This link tracks your referred customers and commissions.",
  },
  {
    title: "Share Your Affiliate Link",
    description:
      "Promote your link through social media, blogs, or email to attract users to AcadeVault.",
    icon: <Share2Icon className="w-10 h-10 text-orange-600 drop-shadow-md" />,
    tooltip: "The more you share, the higher your earning potential.",
  },
  {
    title: "Earn Commissions on Sales",
    description:
      "You earn commissions from each sale made through your affiliate link. Track your earnings in real-time.",
    icon: (
      <DollarSignIcon className="w-10 h-10 text-yellow-500 drop-shadow-md" />
    ),
    tooltip: "Commissions are tracked automatically through your unique link.",
  },
  {
    title: "Monitor Performance and Optimize",
    description:
      "Use your affiliate dashboard to monitor performance, track clicks, and optimize your strategies for better conversions.",
    icon: (
      <HiCurrencyDollar className="w-10 h-10 text-blue-600 drop-shadow-md" />
    ),
    tooltip: "Monitor stats and optimize based on performance analytics.",
  },
];

export default function ReferAndEarnSection() {
  return (
    <section className="bg-gradient-to-bl from-teal-50 via-white to-indigo-50 py-24 relative z-0">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/images/affiliate-pattern.svg')] bg-no-repeat bg-cover mix-blend-soft-light z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 text-center flex items-center justify-center gap-2">
          <Share2 className="w-8 h-8 text-blue-600" />
          Refer & Earn Rewards
        </h2>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Join the{" "}
          <span className="text-teal-700 font-semibold">AcadeVault</span>{" "}
          affiliate and Referral program and start earning commissions for every
          sale.
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group bg-white/60 dark:bg-white/10 backdrop-blur-md border border-teal-200/50 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 px-6 py-8"
            >
              {/* Left Gradient Line */}
              <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-teal-400 to-teal-700 rounded-l-md" />

              {/* Step Indicator */}
              <div className="text-xs text-teal-700 font-semibold mb-4 uppercase tracking-widest">
                Step {index + 1} of {steps.length}
              </div>

              {/* Content Row */}
              <div className="flex items-start gap-5">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white p-3 rounded-full shadow-md border border-teal-100"
                >
                  {step.icon}
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Tooltip */}
              <div className="absolute top-4 right-5 group cursor-pointer z-20">
                <HiInformationCircle className="w-5 h-5 text-gray-400 hover:text-teal-600 transition" />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-72 bg-gray-900 text-white text-sm rounded-md shadow-xl px-4 py-2 right-6 -top-3 pointer-events-none opacity-0 group-hover:opacity-100 z-30"
                >
                  <div className="absolute right-2 -bottom-2 w-4 h-4 bg-gray-900 rotate-45 transform origin-top-left" />
                  {step.tooltip}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {/* <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="mt-20"
        >
          <a
            href="/affiliate/dashboard"
            className="inline-block bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white text-lg font-semibold px-10 py-4 rounded-xl shadow-2xl transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
