"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";

const currentValue = 40;
const minValue = 0;
const maxValue = 80;

/**
 * Container for the hero section: splits into left (image) and right (text + CTA).
 */
export default function ReferralHero() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
      {/* Left: animated image */}
      <motion.div
        className="md:w-1/2 w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg relative"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Image
          src="/images/referrer-img.png"
          alt="Referral Program Illustration"
          fill
          style={{ objectFit: "cover" }}
          priority={true}
          className="object-cover"
        />
      </motion.div>

      {/* Right: animated text, progress bar, and CTA buttons */}
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Main description text */}
        <p className="text-lg leading-relaxed mb-6">
          <strong>Turn your network into cash!</strong> Refer sellers & buyers,
          and earn a <strong>30% bonus</strong> for every successful
          transaction.
        </p>

        {/* Progress bar showing progress toward next reward tier */}
        <div className="bg-gray-700 rounded-lg p-4 shadow-md">
          <p className="text-sm font-semibold">
            Next Bonus Unlock:{" "}
            <span className="text-green-300">20 more referrals</span>
          </p>
          {/* 3) Custom label formatting: "40 / 80 (50%)" */}
          <ProgressBar
            value={currentValue}
            min={minValue}
            max={maxValue}
            showLabel={true}
            labelPosition="inside"
            labelFormatter={(val, pct) => `${val} / ${maxValue} (${pct}%)`}
            height="h-4"
            barClassName="bg-blue-500"
            trackClassName="bg-gray-700"
          />
        </div>

        {/* Buttons: “Start Referring” and “View Top Earners” */}
        <div className="flex gap-4 mt-6">
          <Button as="a" href="/refer-and-earn" target="_blank" size="md">
            Start Referring
          </Button>
          <Button
            as="a"
            href="/leaderboards"
            target="_blank"
            variant="danger"
            size="lg"
          >
            View Top Earners
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
