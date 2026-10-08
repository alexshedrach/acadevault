"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import VendorCTA from "./VendorCTA";
import VendorStats from "./VendorStats";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

// Main content: heading, typewriter, CTA, stats, tagline
export default function VendorContent({
  textAlignment,
  buttonAlignment,
  buttonLayout,
  maxWidth,
  padding,
  headingSize,
  ctaButtons,
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative z-30 container mx-auto flex flex-col justify-center h-full",
        padding,
        maxWidth,
        {
          "items-center text-center": textAlignment === "center",
        }
      )}
      id="banner-content"
      role="banner"
    >
      {/* <Badge
        variant="outline"
        className="text-sm text-white border-blue-100 mb-6 animate-pulse"
      >
        Join Thousands of Educators
      </Badge> */}

      <h1
        className={cn(
          "font-extrabold text-gray-100 leading-tight drop-shadow-xl",
          headingSize
        )}
      >
        Monetize Your Knowledge.
        <br className="hidden md:block" />
        Sell on Acadevault
      </h1>

      <p className="text-lg sm:text-xl text-gray-200 mt-4 max-w-3xl">
        <Typewriter
          words={[
            "Share your academic resources globally.",
            "Reach students, educators, and researchers.",
            "Earn passive income effortlessly.",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </p>

      <VendorCTA
        ctaButtons={ctaButtons}
        buttonAlignment={buttonAlignment}
        buttonLayout={buttonLayout}
      />

      <VendorStats />

      {/* <span className="text-sm text-gray-50 mt-8 block">
        Empowering educators to share knowledge and earn rewards.
      </span> */}
    </motion.header>
  );
}
