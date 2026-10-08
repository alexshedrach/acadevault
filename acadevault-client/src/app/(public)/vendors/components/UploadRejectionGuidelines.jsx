"use client";

import { motion } from "framer-motion";
import {
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { cn } from "@/utils/cn";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { rejectionReasons } from "@/data/sellerRejectionReasons";

const iconSize = 30;

export default function UploadRejectionGuidelines({ className }) {
  return (
    <section className={cn("pb-16 bg-gray-100", className)}>
      {/* Section Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-8 rounded-md shadow-lg relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold tracking-wide"
        >
          🚫 AcadeVault Upload Rejection Guidelines
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg font-medium mt-2 max-w-2xl mx-auto"
        >
          Avoid these common mistakes to ensure your projects get approved.
        </motion.p>
        <div className="absolute inset-0 bg-glow animate-pulse opacity-20" />
      </div>

      {/* Reasons List */}
      <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rejectionReasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex items-start gap-4 bg-white p-6 rounded-lg shadow hover:shadow-md transition-transform hover:scale-[1.02] cursor-default"
            >
              {idx % 2 === 0 ? (
                <AiOutlineCloseCircle
                  size={iconSize}
                  className="text-red-600 mt-1"
                />
              ) : (
                <AiOutlineExclamationCircle
                  size={iconSize}
                  className="text-yellow-600 mt-1"
                />
              )}
              <p className="text-gray-700 leading-relaxed">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing Remark */}
      <div className="text-center mt-12 px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 text-sm max-w-xl mx-auto"
        >
          By following these guidelines, you improve your chances of a
          successful submission and contribute to maintaining the high standards
          of AcadeVault’s academic repository.
        </motion.p>
      </div>
      {/* Call-to-Action */}
      {/* <div className="text-center mt-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href="/vendor-guide"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-blue-700 transition duration-300"
            aria-label="Learn more about vendor guidelines"
          >
            <BookOpen className="mr-2 w-5 h-5" />
            Read the Full Vendor Guide
          </Link>
        </motion.div>
      </div> */}
    </section>
  );
}
