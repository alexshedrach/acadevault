"use client";

import { motion } from "framer-motion";
import React from "react";
import { FaYoutube } from "react-icons/fa";
motion;

export const VendorTestimonialSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-16">
          What Our Sellers Say
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video Embed */}
          {/* Video Card */}
          <motion.div
            className="mt-4 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-lg border border-gray-200 relative aspect-video group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="AcadeVault Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>

            {/* Animated YouTube Badge */}
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-4 py-1.5 rounded-full shadow-md font-semibold flex items-center gap-2 hover:scale-105 transition"
            >
              <FaYoutube className="text-white" />
              Watch on YouTube
            </a>
          </motion.div>
          {/* Testimonial Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-gray-800 italic leading-relaxed">
              “AcadeVault gave me a platform to monetize my thesis and earn
              while helping others. I never thought my final year project could
              become this valuable.”
            </p>
            <p className="text-lg font-semibold text-blue-700">
              — Sarah K., Graduate Student
            </p>
            <div className="w-24 h-1 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-gray-500">
              Your knowledge matters. Start earning from your academic work
              today.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
