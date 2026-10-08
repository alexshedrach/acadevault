"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function AcademicAssistanceBanner() {
  return (
    <section className="relative w-full h-80 md:h-[28rem] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-tr from-blue-400 to-indigo-600">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1.1, x: 0 }}
        animate={{ scale: 1.2, x: -40 }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/academic-assistance-bg.jpg"
          alt="Students collaborating over academic materials"
          fill
          className="object-cover brightness-75"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-transparent to-indigo-600 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center h-full px-6 sm:px-12 lg:px-20 text-gray-100">
        <Badge
          variant="solid"
          className="bg-yellow-300 text-gray-800 w-max mb-4"
        >
          Academic Assistance
        </Badge>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl">
          Elevate Your Research & Writing
        </h2>
        <p className="mt-3 text-gray-200 max-w-xl text-base sm:text-lg">
          Explore our suite of tools designed to support every step of your
          academic journey.
        </p>

        {/* Services List */}
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-100 text-base bg-blue-300/20">
          <li className="flex items-center">
            <span className="mr-2">📌</span> Plagiarism Checking
          </li>
          <li className="flex items-center">
            <span className="mr-2">📌</span> Editing & Proofreading
          </li>
          <li className="flex items-center">
            <span className="mr-2">📌</span> Citation & Referencing
          </li>
          <li className="flex items-center">
            <span className="mr-2">📌</span> Research Assistance
          </li>
          <li className="flex items-center">
            <span className="mr-2">📌</span> Discussion Forums
          </li>
          <li className="flex items-center">
            <span className="mr-2">📌</span> Live Q&A Sessions
          </li>
        </ul>

        {/* Call to Action */}
        <div className="mt-4">
          <Button
            as="a"
            href="/academic-assistance"
            variant="gradient"
            size="lg"
            className="inline-flex items-center px-6 py-3"
            aria-label="Explore Academic Assistance Tools"
          >
            Explore Tools
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
