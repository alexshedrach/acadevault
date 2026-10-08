"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  HelpCircle,
} from "lucide-react";

const supportMethods = [
  {
    icon: Headphones,
    title: "Live Chat",
    description: "Instant 24/7 assistance from our support specialists.",
    gradient: "from-blue-500 to-indigo-600",
    contact: "/chat",
  },
  {
    icon: MessageSquare,
    title: "Request a Call",
    description: "Schedule a convenient callback at your preferred time.",
    gradient: "from-green-500 to-emerald-600",
    contact: "/request-call",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our team: +1 (800) 123-4567.",
    gradient: "from-indigo-500 to-blue-600",
    contact: "tel:+18001234567",
  },
  // {
  //   icon: Mail,
  //   title: "Email Support",
  //   description: "Write to us at support@acadevault.com.",
  //   gradient: "from-purple-500 to-pink-600",
  //   contact: "mailto:support@acadevault.com",
  // },
  // {
  //   icon: Calendar,
  //   title: "Office Hours",
  //   description: "Mon–Fri, 8 AM–8 PM (GMT).",
  //   gradient: "from-orange-500 to-amber-600",
  //   contact: "/office-hours",
  // },
  // {
  //   icon: HelpCircle,
  //   title: "Knowledge Base",
  //   description: "Browse guides & FAQs for self-help resources.",
  //   gradient: "from-teal-500 to-cyan-600",
  //   contact: "/knowledge-base",
  // },
];

export default function SupportSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply opacity-20 animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000" />

      {/* <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Support for Your Project
        </motion.h2>
        <motion.p
          className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Whether you need quick answers or in-depth guidance, our team is
          always ready to help you succeed.
        </motion.p>
      </div> */}

      <div className="relative z-10 mt-12 max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {supportMethods.map((method, idx) => {
          const Icon = method.icon;
          return (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center p-8 bg-white/30 backdrop-blur-md rounded-3xl hover:bg-white/60 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04 }}
            >
              <div
                className={`mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${method.gradient} text-white text-2xl shadow-lg`}
              >
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {method.description}
              </p>
              <a
                href={method.contact}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
              >
                Get Support →
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
