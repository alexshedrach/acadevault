"use client";

import { Button } from "@/components/ui/Button";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HireWriterHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-6 sm:px-12"
      aria-labelledby="hero-heading"
    >
      {/* Blurred Gradient Glow Background */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300 via-purple-300 to-transparent rounded-full blur-3xl opacity-30 animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-sky-200 via-pink-200 to-transparent rounded-full blur-2xl opacity-40 z-0" />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 bg-[url('/images/noise.jpg')] opacity-26 mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 z-10">
        {/* Text Content */}
        <motion.div
          className="relative w-full lg:w-1/2 text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          <motion.h1
            id="hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-900 leading-tight tracking-tight"
            variants={fadeInUp}
          >
            Hire{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 animate-gradient-x bg-[length:300%_300%]">
              Expert Academic Writers
            </span>{" "}
            for AcaDeVault
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0"
            variants={fadeInUp}
          >
            Elevate your academic projects with AcaDeVault’s professional
            writers. Receive high-quality, plagiarism-free content tailored to
            your requirements, delivered securely, confidentially, and on time.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            variants={fadeInUp}
          >
            {/* — Primary CTA — */}
            <Button
              as="a"
              href="/hire-writer/pricing"
              target="_blank"
              variant="default" // we'll override the bg via className
              size="md"
              className="relative inline-flex items-center 
               bg-gradient-to-r from-indigo-600 to-purple-600 
               text-white px-8 py-3 rounded-xl shadow-lg 
               hover:shadow-xl focus:outline-none 
               focus:ring-4 focus:ring-indigo-300/50 
               transition-all duration-300 overflow-hidden"
            >
              Hire Exprt Writer Now
              {/* keep your pulse-border */}
              <span className="absolute inset-0 rounded-xl border border-white/20 animate-pulse pointer-events-none" />
            </Button>

            {/* — Secondary CTA — */}
            {/* <Button
              as="a"
              href="/#how-it-works"
              variant="outline"
              size="md"
              // className="inline-flex items-center
              //  px-8 py-3 text-lg font-semibold
              //  text-indigo-700 bg-white/80 rounded-xl
              //  shadow-lg hover:bg-white focus:outline-none
              //  focus:ring-4 focus:ring-indigo-300/50
              //  transition-all duration-300"
            {/* > 
              Learn More 
            {/* </Button> */}
          </motion.div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="w-full lg:w-1/2 relative max-w-lg mx-auto"
          variants={fadeInScale}
          initial="hidden"
          animate={controls}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/images/academic-writer.png"
              alt="Professional academic writer at work"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 mix-blend-overlay" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator
        position="bottom-center"
        color="blue-500"
        size="md"
        showLabel={true}
        label="Scroll down"
      />
    </section>
  );
}
