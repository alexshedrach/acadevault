"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRightFromLine } from "lucide-react";

export default function ReferralRewardsBanner() {
  return (
    <section className="relative w-full h-72 md:h-[27rem] overflow-hidden rounded-2xl shadow-lg bg-gradient-to-t from-purple-400 to-pink-300">
      {/* Ken Burns Background Image */}
      <motion.div
        initial={{ scale: 1.05, x: 0 }}
        animate={{ scale: 1.12, x: -30 }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/referrer-img.png"
          alt="Academic marketplace dashboard illustration"
          fill
          // className="brightness-[0.7]"
          loading="eager"
          priority
        />
      </motion.div>

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/70 to-transparent z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 h-full flex flex-col px-6 sm:px-10 md:px-14 max-w-3xl">
        <Badge
          variant="outline"
          className="text-sm text-blue-900 border-blue-600 my-4 w-max"
        >
          Affiliate Rewards Program
        </Badge>

        <div className="text-right">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight pt-18">
            Refer Friends and
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-gray-800 bg-clip-text text-transparent">
              Earn Rewards
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 font-medium">
            Get Paid for Every Successful Referral.
          </p>
        </div>

        <div className="mt-6">
          <Button
            as="a"
            href="/refer-and-earn"
            target="_blank"
            variant="gradient"
            size="md"
            className="px-6 py-3"
          >
            Get Referral Bonus
            <ArrowRightFromLine className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <span className="text-xs text-blue-700 mt-4 max-w-2xl">
          Trusted by students, educators, and universities worldwide.
        </span>
      </div>
    </section>
  );
}
