"use client";

import { vendorsBenefits } from "@/data/vendorBenefitsData";
import { motion } from "framer-motion";

function BenefitItem({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl border-t-4 border-blue-600 shadow-md hover:shadow-xl group transition duration-300 relative overflow-hidden"
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Glow pulse effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-0 group-hover:opacity-10 transition duration-300 z-0 rounded-xl" />
      <div className="relative z-10 flex items-start space-x-4">
        <div className="bg-blue-100 text-blue-600 p-2 rounded-full transition transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-24 overflow-hidden z-10">
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 opacity-30 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[-80px] right-0 w-[400px] h-[400px] bg-indigo-100 opacity-20 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Empower Your Knowledge. Maximize Your Earnings.
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sell your academic work on a global platform that respects your
            rights, rewards your efforts, and empowers your journey as a
            creator.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendorsBenefits.map((benefit, idx) => (
            <BenefitItem key={idx} {...benefit} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
