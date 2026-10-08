"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import OverlayPattern from "@/components/common/OverlayPattern";
import SocialLinks from "@/components/common/SocialLinks";
import BackgroundGraphic from "@/components/common/BackgroundGraphic";

export default function ContactHeroSection() {
  return (
    <section
      aria-labelledby="contact-hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 py-10"
    >
      {/* Background Pattern */}
      {/* Top wave */}
      <BackgroundGraphic
        position="bottom"
        height="h-full"
        paths={[
          {
            d: "M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,122.7C672,117,768,160,864,160C960,160,1056,117,1152,106.7C1248,96,1344,117,1392,128L1440,138.7L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            fill: "#ffffff",
            opacity: 0.1,
          },
        ]}
        svgClasses="dark:fill-current"
        wrapperClasses="pointer-events-none"
      />

      {/* Overlay Pattern */}
      <OverlayPattern
        patternColor="white"
        dotRadius={2}
        patternSize={40}
        opacity={0.15}
        zIndex="z-10"
      />

      <div className="container relative mx-auto flex flex-col-reverse items-center px-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-12 w-full text-center text-white lg:mt-0 lg:w-1/2 lg:text-left"
        >
          <h1
            id="contact-hero-title"
            className="mb-4 max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            Let’s Connect & Collaborate
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-blue-100 sm:text-xl">
            Have a question, feedback, or business proposal? Our dedicated team
            is standing by let’s spark innovation together.
          </p>

          <div className="mx-auto flex max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-start">
            <Button as="a" href="#contact-form" size="lg" variant="gradient">
              Send a Message
            </Button>

            <Button
              as="a"
              href="/support/faq"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-600 hover:text-gray-600"
            >
              View FAQs
            </Button>
          </div>
        </motion.div>

        {/* Right: Hero Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex w-full justify-center lg:w-1/2"
        >
          <Image
            src="/images/referrer-img.png"
            alt="People collaborating around ideas"
            width={500}
            height={400}
            priority
            className="max-w-full rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
      {/* Social Media Links */}
      <SocialLinks />
    </section>
  );
}
