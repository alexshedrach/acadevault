"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { fadeInLeft } from "@/utils/AnimationUtils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function HeroBanner() {
  return (
    <div className="w-full h-72 md:h-[27rem] overflow-hidden rounded-2xl shadow-md bg-gray-50">
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        initial={{ scale: 1.05, x: 0 }}
        animate={{ scale: 1.1, x: -20 }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/acadevault-hero-img.png"
          alt="Academic marketplace dashboard illustration"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          // className="object-[90%_right] brightness-75"
          loading="eager"
          priority
        />
      </motion.div>

      {/* Left-side Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-100/90 via-blue-50/60 to-transparent z-0" /> */}

      {/* Foreground Content */}
      <motion.div
        {...fadeInLeft}
        className="relative h-full flex flex-col justify-center px-4 sm:px-10 max-w-2xl z-10"
      >
        <Badge
          variant="outline"
          className="text-sm text-gray-100 border-blue-600 mb-2 max-w-50 absolute top-2 left-5"
        >
          100K+ Academic Resources
        </Badge>

        {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
          Discover. Buy. Sell. Share.  <br className="hidden md:block" />
          High-Quality Academic Resources.
        </h1> */}
        {/* <h1 className="ext-gray-800 drop-shadow-md text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug tracking-tight">
          <span className="bg-gradient-to-r from-orange-500 via-gray-800 to-orange-700 bg-clip-text text-transparent block">
            Welcome to AcadeVault
          </span>
          <span className="block mt-1 text-gray-800 text-4xl">
            Your Hub for High-Quality Academic Resources.
          </span>
        </h1> */}

        {/* <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
          Welcome to AcadeVault <br className="hidden md:block" />
          The #1 Marketplace for Premium Academic Content.
        </h1> */}

        <div className="absolute -right-15 bottom-5 mt-4 flex gap-3 flex-wrap">
          <Button
            as="a"
            href="/materials"
            target="_blank"
            variant="gradient"
            size="md"
            className="mt-4"
          >
            Explore Materials <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* <span className="text-xs text-gray-500 mt-3">
          Trusted by universities, researchers & students worldwide.
        </span> */}
      </motion.div>
    </div>
  );
}
