"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const HireExpertsBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-100 to-indigo-100 w-full h-72 md:h-[27rem] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
        {/* === Text Column === */}
        <div className="space-y-6 px-10">
          <Badge
            variant="outline"
            className="text-blue-900 border-blue-600 bg-white/70 backdrop-blur-sm px-3 py-1 mt-2 text-sm w-max"
          >
            100K+ Academic Resources
          </Badge>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Need Top-Tier Academic <br />
              <span className="block mt-1 bg-gradient-to-r from-orange-500 via-orange-600 to-gray-800 bg-clip-text text-transparent text-lg md:text-3xl">
                Research Support?
              </span>
            </h1>
            <p className="mt-3 text-base md:text-lg text-gray-700 font-medium max-w-md">
              Connect with top-tier writers for theses, dissertations, and
              academic projects.
            </p>
          </motion.div>

          <Button
            as="a"
            href="/hire-writer"
            target="_blank"
            size="md"
            className="inline-flex items-center gap-2 px-6 py-3 shadow-md hover:shadow-lg transition-shadow"
          >
            Hire Expert Writer Now
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="text-xs border-t-2 text-center border-gray-100 text-gray-500">
            Trusted by universities, researchers & students worldwide.
          </p>
        </div>

        {/* === Image Column === */}
        <div className="relative w-full aspect-[4/5] md:aspect-[5/6]">
          <Image
            src="/images/writer-img.png"
            alt="Professional academic writer"
            fill
            className="object-[90%_right]"
            priority
          />
          {/* <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" /> */}
        </div>
      </div>
    </section>
  );
};

export default HireExpertsBanner;
