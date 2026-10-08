"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const institutions = [
  { name: "University of Lagos", logo: "/logos/unilag.png" },
  { name: "University of Nigeria Nsukka", logo: "/logos/unn.jpeg" },
  { name: "University of Ibadan", logo: "/logos/ui.jpeg" },
  { name: "Obafemi Awolowo University", logo: "/logos/oau.jpeg" },
  { name: "Ahmadu Bello University", logo: "/logos/abu.png" },
  { name: "Stanford University", logo: "/logos/stanford.png" },
  { name: "Harvard University", logo: "/logos/harvard.jpeg" },
  { name: "University of Oxford", logo: "/logos/oxford.png" },
];

export default function TrustedByInstitutions() {
  return (
    <section className="relative bg-white px-6 sm:px-10 py-12 shadow-sm -mt-4 rounded-xl border border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Trusted by Students from Top Institutions
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-base">
          Thousands of students from both local and global universities rely on
          our academic materials to excel in their academic pursuits.
          <a
            href="/about/trusted"
            className="ml-1 text-blue-600 hover:underline font-medium"
          >
            Learn more
          </a>
        </p>
        <p className="mt-4 text-sm text-gray-500 italic">
          Over <span className="font-semibold text-gray-700">10,000</span>{" "}
          students from{" "}
          <span className="font-semibold text-gray-700">50+ institutions</span>{" "}
          have accessed these resources.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 place-items-center"
      >
        {institutions.map((uni) => (
          <div
            key={uni.name}
            className="flex items-center justify-center h-14 grayscale hover:grayscale-0 transition duration-200"
            title={uni.name}
          >
            <Image
              src={uni.logo}
              alt={`${uni.name} logo`}
              width={120}
              height={48}
              className="object-contain max-h-full max-w-full"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
