"use client";

import Avatar from "@/components/common/Avatar";
import { Modal } from "@/components/ui/Modal";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import TestimonialSlideshow from "../common/TestimonialSlideshow";

// Animation variants for container (parent) to stagger child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1, // Slight delay for smoother stagger
    },
  },
};

// Animation variants for individual child elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const WriterProfileModal = ({ writer, isOpen, onClose }) => {
  // Guard clause for missing writer data
  if (!writer) return null;

  // Round rating for star display
  const roundedRating = Math.round(writer.rating);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size=""
      theme="glass"
      closeButton
      className="backdrop-blur-md max-w-5xl mx-auto"
    >
      {/* Body Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-5 grid gap-6 lg:grid-cols-4"
      >
        {/* Stats Sidebar */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 h-fit bg-white/5 p-6 rounded-xl backdrop-blur-sm shadow-lg border border-white/10"
        >
          {/* Image & Personal Data Section */}
          <div className="border-b border-gray-700 pb-6 text-center">
            <Avatar
              src={writer.imageUrl}
              alt={writer.name}
              name={writer.name}
              size="xl"
              className="border-4 border-blue-500"
              fallback=""
            />
            <h3 className="text-xl font-semibold">{writer.name}</h3>
            <p className="text-sm text-blue-300">{writer.specialty}</p>
          </div>

          {/* Rating Section */}
          <div className="space-y-4 text-center pt-4">
            <div>
              <h4 className="text-xl font-semibold text-gray-100 mb-2">
                Rating
              </h4>
              <div className="flex justify-center items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < roundedRating ? "text-yellow-400" : "text-gray-600"
                    }
                    size={20}
                  />
                ))}
                <span className="ml-2 text-gray-200 font-medium">
                  {writer.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Projects Section */}
            <div className="border-t border-gray-700 pt-6">
              <h4 className="text-xl font-semibold text-gray-100 mb-2">
                Projects
              </h4>
              <p className="text-gray-300 text-lg">
                {writer.completedProjects}+ Completed
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 space-y-1 text-gray-100"
        >
          {/* Expertise Cards */}
          <div className="grid gap-2 md:grid-cols-3 mr-4">
            {[
              {
                icon: "🧠",
                title: "Expertise",
                value: writer.expertise.join(", "),
              },
              {
                icon: "📚",
                title: "Experience",
                value: `${writer.experienceYears} Years`,
              },
              {
                icon: "🔍",
                title: "Preferred Formats",
                value: writer.formatPreferences.join(", "),
              },
              {
                icon: "💰",
                title: "Rate",
                value: `NGN ${writer.ratePerWord}/word`,
              },
              { icon: "⏰", title: "Availability", value: writer.availability },
            ].map(({ icon, title, value }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="bg-white/10 p-4 rounded-lg backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300 border border-white/10"
              >
                <h5 className="flex items-center gap-2 text-lg font-bold text-indigo-300 mb-2">
                  <span className="text-xl">{icon}</span> {title}
                </h5>
                <p className="text-gray-200 text-sm leading-relaxed">{value}</p>
              </motion.div>
            ))}
          </div>

          {/* Bio Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 p-4 rounded-lg backdrop-blur-sm shadow-md border border-white/10"
          >
            <h5 className="flex items-center gap-2 text-lg font-bold text-indigo-300 mb-2">
              <span className="text-xl">📖</span> Bio
            </h5>
            <p className="text-gray-200 text-sm leading-relaxed">
              {writer.bio}
            </p>
          </motion.div>

          {/* Testimonial Slideshow */}
          <motion.div variants={itemVariants}>
            <TestimonialSlideshow name={writer.name} />
          </motion.div>

          {/* Hire Button */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <Link
              href={{
                pathname: "/hire-writer/order",
                query: { writerId: writer.id },
              }}
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              onClick={() => {
                if (typeof window.gtag !== "undefined") {
                  window.gtag("event", "select_writer", {
                    event_category: "engagement",
                    event_label: writer.name,
                    writer_id: writer.id,
                  });
                }
              }}
            >
              <FaCheckCircle size={20} /> Hire {writer.name}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </Modal>
  );
};

export default WriterProfileModal;
