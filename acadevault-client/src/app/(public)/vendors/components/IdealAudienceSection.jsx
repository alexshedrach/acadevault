"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { FileText, GraduationCap, Library } from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";

const AUDIENCE_DATA = [
  {
    title: "University Students",
    description:
      "With well-prepared notes, past projects, and unique academic content.",
    icon: GraduationCap,
  },
  {
    title: "Academic Institutions",
    description:
      "Looking to digitize valuable resources and expand their digital footprint.",
    icon: Library,
  },
  {
    title: "Tutors & Lecturers",
    description:
      "Who possess premium teaching materials and exclusive course content.",
    icon: FaChalkboardTeacher,
  },
  {
    title: "Authors & Content Creators",
    description:
      "Of past exam solutions, syllabi, or comprehensive study guides.",
    icon: FileText,
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function IdealAudienceSection({ className }) {
  return (
    <section
      className={cn("p-8 rounded-lg shadow-inner", className)}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-gray-50 mb-8 border-y-4 border-yellow-400 inline-block py-4">
          Perfect for:
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list">
          {AUDIENCE_DATA.map(({ title, description, icon: Icon }, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-start p-4 bg-white rounded-lg shadow hover:shadow-md transition-transform hover:scale-[1.02] cursor-default"
              role="listitem"
              aria-label={title}
            >
              <div className="flex-shrink-0 mr-4">
                <Icon className="w-10 h-10 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
