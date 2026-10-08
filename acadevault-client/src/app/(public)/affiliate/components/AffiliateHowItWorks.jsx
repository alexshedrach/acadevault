"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Link as LinkIcon,
  Share2,
  DollarSign,
  Calculator,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { debounce } from "lodash";
import { Tooltip } from "react-tooltip";
import { Modal } from "@/components/ui/Modal";
import { fetchAffiliateData } from "@/data/fetchAffiliaeData";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CommissionCalculator = () => {
  const [traffic, setTraffic] = useState(1000);
  const [conversionRate, setConversionRate] = useState(5);
  const [averageSale, setAverageSale] = useState(50);
  const commissionRate = 0.2;

  const estimated = (
    traffic *
    (conversionRate / 100) *
    averageSale *
    commissionRate
  ).toFixed(2);

  const debouncedTrack = debounce(() => {
    console.log("Estimated earnings recalculated");
  }, 300);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="p-6 bg-gradient-to-br from-white/70 to-blue-50/30 backdrop-blur-xs rounded-2xl border border-gray-200 shadow-md"
    >
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-600" />
        Commission Estimator
      </h3>
      <div className="space-y-4">
        {[
          { label: "Monthly Traffic", value: traffic, setter: setTraffic },
          {
            label: "Conversion Rate (%)",
            value: conversionRate,
            setter: setConversionRate,
            max: 100,
          },
          {
            label: "Average Sale ($)",
            value: averageSale,
            setter: setAverageSale,
          },
        ].map(({ label, value, setter, max }, i) => (
          <div key={i}>
            <label className="text-sm text-gray-700">{label}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => {
                setter(Number(e.target.value));
                debouncedTrack();
              }}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              max={max}
            />
          </div>
        ))}
        <p className="text-blue-600 font-semibold" aria-live="polite">
          Estimated Earnings: ${estimated}
        </p>
      </div>
    </motion.div>
  );
};

const StepCard = ({ step, index, totalSteps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <motion.div
        ref={ref}
        variants={stepVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative bg-white/90 backdrop-blur-xs p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-300"
        data-tooltip-id={`tooltip-${step.id}`}
        aria-label={step.tooltip}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
            {index + 1}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {step.icon}
              <h4 className="text-lg font-semibold">{step.title}</h4>
            </div>
            <p className="text-sm text-gray-600">{step.description}</p>
            <button
              onClick={() => setIsOpen(true)}
              className="text-blue-600 hover:underline mt-2 text-sm"
            >
              Learn More
            </button>
          </div>
        </div>
        {index < totalSteps - 1 && (
          <span className="absolute left-5 top-full h-8 w-0.5 bg-blue-200" />
        )}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={step.title}
          >
            <p className="text-gray-600">{step.description}</p>
            <ul className="list-disc pl-5 space-y-1 mt-3 text-gray-600 text-sm">
              {step.subSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <Link
              href={step.cta.href}
              className="inline-flex mt-4 items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {step.cta.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

const ToolPreview = ({ tool }) => (
  <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className="relative">
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="relative overflow-hidden rounded-xl border border-gray-100 shadow-md bg-white hover:shadow-blue-100 transition-all group"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="h-32 rounded-lg overflow-hidden mb-3">
        <Image
          src={tool.preview}
          alt={tool.title}
          width={400}
          height={180}
          className="object-cover w-full h-full"
        />
      </div>
      <h5 className="text-base font-semibold z-10 relative">{tool.title}</h5>
      <p className="text-sm text-gray-600 z-10 relative">{tool.description}</p>
    </motion.div>
  </Tilt>
);

export default function AffiliateHowItWorks() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await fetchAffiliateData();
      setData(res);
    } catch {
      setError("Unable to fetch affiliate data.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-100 via-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <h2 className="text-4xl font-bold text-center mb-3">How It Works</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Start earning by joining our affiliate program in just three simple
            steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-10">
            {data.steps.map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                index={idx}
                totalSteps={data.steps.length}
              />
            ))}
          </div>
          <div className="sticky top-24">
            <CommissionCalculator />
          </div>
        </div>

        {/* <div className="mt-24">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Promotional Tools at Your Fingertips
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.tools.map((tool) => (
              <ToolPreview key={tool.id} tool={tool} />
            ))}
          </div>
        </div> */}

        {/* <div className="mt-20">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="rounded-xl bg-blue-600 text-white text-center py-10 px-6 shadow-md"
          >
            <h4 className="text-2xl font-semibold mb-3">
              Ready to get started?
            </h4>
            <p className="mb-6">
              Join thousands of affiliates already earning with AcadeVault.
            </p>
            <Link
              href="/affiliate-signup"
              className="bg-white text-blue-600 font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              Join the Affiliate Program
            </Link>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
}
