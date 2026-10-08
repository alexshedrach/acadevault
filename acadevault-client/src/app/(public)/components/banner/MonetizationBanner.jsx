"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { fadeInLeft } from "@/utils/AnimationUtils";

function MonetizationBanner() {
  return (
    <section
      aria-label="Monetize your academic content"
      className="relative w-full h-72 md:h-[27rem] overflow-hidden rounded-2xl shadow-md bg-gradient-to-b from-green-300 to-white"
    >
      {/* === Background with Ken Burns Effect === */}
      <motion.div
        initial={{ scale: 1.05, y: 0 }}
        animate={{ scale: 1.1, y: -15 }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/monitize-bg.png"
          alt="Dashboard showcasing academic monetization"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="brightness-[0.7]"
          priority
        />
        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent z-10" />
      </motion.div>

      {/* === Foreground Content === */}
      <motion.div
        {...fadeInLeft}
        className="relative z-20 h-full flex flex-col px-4 sm:px-8 max-w-2xl"
      >
        <Badge
          variant="outline"
          className="text-sm text-blue-900 border-blue-600 my-4 w-max bg-white/70 backdrop-blur-sm shadow-sm"
        >
          For Sellers & Educators
        </Badge>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug tracking-tight">
          Monetize Your Academic
          <br className="hidden md:block" />
          <span className="text-blue-600">Work and Earn from</span>{" "}
          <br className="hidden md:block" />
          <span className="text-orange-600"> Notes & Study Guides</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-md">
          Upload your work. Help others. Get paid. Trusted by universities,
          researchers & students worldwide.
        </p>

        <div className="mt-6">
          <Button
            as="a"
            href="/vendors/register"
            target="_blank"
            variant="success"
            size="md"
            className="inline-flex items-center gap-2 px-6 py-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            Monetize Your Materials
            <ArrowRight className="w-4 h-4" />
          </Button>

          <br />

          <Button
            as="a"
            href="/vendors"
            target="_blank"
            variant="danger"
            size="sm"
            className="inline-flex items-center gap-2 px-4 py-3 shadow-lg hover:shadow-xl transition-shadow mt-7"
          >
            Explore Seller Benefits
            <ArrowRightCircle className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export default MonetizationBanner;
