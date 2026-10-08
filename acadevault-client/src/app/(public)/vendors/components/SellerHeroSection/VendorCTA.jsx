"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { BUTTON_VARIANTS } from "@/config/vendorConfig";


// Render call-to-action buttons
export default function VendorCTA({
  ctaButtons = [],
  buttonAlignment,
  buttonLayout,
}) {
  const alignmentMap = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const buttonLayoutMap = {
    inline: "flex-row flex-wrap",
    stacked: "flex-col space-y-4",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  };

  return (
    <nav
      className={cn(
        "mt-8 flex gap-4",
        alignmentMap[buttonAlignment],
        buttonLayoutMap[buttonLayout]
      )}
      aria-label="Vendor call-to-action"
    >
      {ctaButtons.map(({ label, href, variant, target }, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className={cn(
              "py-3 px-8 rounded-full text-base font-semibold transition duration-300",
              BUTTON_VARIANTS[variant]
            )}
            aria-label={label}
          >
            {label}{" "}
            {variant === "gradient" && (
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            )}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}
