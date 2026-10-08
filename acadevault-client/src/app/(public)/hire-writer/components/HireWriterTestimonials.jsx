"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaStar } from "react-icons/fa";
import Container from "@/components/layout/Container";

// Testimonial Data
const testimonials = [
  {
    name: "Ada O.",
    position: "Graduate Student, Unilag",
    feedback:
      "Absolutely the best academic help I've ever received. Timely, professional, and deeply insightful, this service transformed my approach to complex assignments with remarkable efficiency and care.",
    rating: 5,
    image: "/avatars/james.png",
  },
  {
    name: "James T.",
    position: "PhD Candidate, UI",
    feedback:
      "The writer was amazing — delivered high-quality research and even helped with referencing. Their dedication to detail and timely delivery exceeded my expectations, making my dissertation process smoother than ever.",
    rating: 4,
    image: "/avatars/tony.png",
  },
  {
    name: "Esther K.",
    position: "Undergrad, Covenant University",
    feedback:
      "Their writing service saved my final year project. I’d recommend it to anyone serious about grades. The support was exceptional, offering personalized guidance that boosted my confidence and academic success.",
    rating: 5,
    image: "/avatars/jenny.png",
  },
];

export default function HireWriterTestimonials() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current < testimonials.length - 1) setCurrent(current + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const testimonial = testimonials[current];

  return (
    <Container as="section" background="white" className="relative py-16">
      <div className="max-w-7xl px-40 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-100">
        {/* Image */}
        <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-md flex items-center justify-center bg-gray-50">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={350}
            height={350}
            className="object-contain max-h-[90%] -mb-10"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4 py-24">
          <p className="text-base sm:text-xl text-gray-800 leading-relaxed transition-opacity duration-300 ease-in-out">
            “{testimonial.feedback}”
          </p>
          <div>
            <p className="font-semibold text-2xl text-gray-900">
              {testimonial.name}
            </p>
            <p className="text-gray-600 text-base">{testimonial.position}</p>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, idx) => (
              <FaStar
                key={idx}
                className={`h-5 w-5 transition-opacity ${
                  idx < testimonial.rating
                    ? "text-yellow-400 opacity-100"
                    : "text-gray-300 opacity-40"
                }`}
              />
            ))}
          </div>

          {/* Dots Navigation */}
          {/* <div className="flex space-x-2 pt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? "bg-indigo-600" : "bg-gray-300"
                } transition duration-200`}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>

      {/* Navigation Buttons */}
      {current > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow transition"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {current < testimonials.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow transition"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      )}
    </Container>
  );
}
