"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPenNib } from "react-icons/fa";

export default function HireWriterCTA() {
  return (
    <section className="pt-6 px-4 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 dark:from-gray-900 dark:to-gray-800 bg-fixed text-white">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Left: Overlapping images */}
        <div className="relative w-full lg:w-1/2 h-[480px]">
          {/* Background image */}
          <motion.div
            className="absolute top-0 left-0 w-[70%] h-[90%] rounded-xl shadow-xl overflow-hidden"
            initial={{ rotate: -10, x: -16, y: 16 }}
            animate={{ rotate: -5, x: -8, y: 8 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/images/acadevault-signup-illustration.png"
              alt="Order form snapshot"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>

          {/* Foreground image */}
          <motion.div
            className="absolute top-0 right-0 w-[70%] h-[90%] rounded-xl shadow-xl overflow-hidden"
            initial={{ rotate: 10, x: 16, y: -16 }}
            animate={{ rotate: 4, x: 8, y: -8 }}
            transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/images/acadevault-login-illustration.png"
              alt="Writer selection snapshot"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </div>

        {/* Right: Text Content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center lg:justify-start gap-3 text-indigo-200">
            <FaPenNib className="w-7 h-7" />
            <span className="uppercase tracking-wide font-semibold text-sm">
              How It Works
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight">
            Get Matched with a Top Academic Writer Today
          </h2>

          <p className="text-base sm:text-lg text-indigo-100 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Whether it’s a thesis, research paper, or coursework, our vetted
            experts are ready to help. Share your brief, choose your package,
            and get a high-quality paper—delivered on time and tailored to your
            exact needs.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-700 hover:bg-indigo-100 rounded-lg text-lg font-semibold shadow-md transition"
            >
              Hire a Writer Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
