'use client'

import { fadeIn, cardVariants, timelineVariants } from "@/lib/animations";
import { motion, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";



export const TestimonialsCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isInView, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const testimonial = testimonials[currentIndex];

  return (
    <motion.div
      ref={ref}
      className="relative p-6 rounded-lg backdrop-blur-sm bg-white/30 border border-gray-200 shadow-lg mt-16"
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="text-center">
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What Our Affiliates Say
          </h3>
        </Tilt>
        <div className="flex justify-center mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
        <p className="text-gray-800 font-semibold">{testimonial.name}</p>
        <p className="text-gray-500 text-sm">{testimonial.role}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
};