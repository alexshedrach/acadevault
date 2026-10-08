"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import AsyncStateHandler from "../states/AsyncStateHandler";

// Mock API — swap with RTK Query later
const fetchTestimonials = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    {
      id: 1,
      feedback:
        "Delivers exceptional academic work with precision and attention to detail.",
      rating: 5,
      author: "Ada O.",
      position: "Graduate Student, Unilag",
    },
    {
      id: 2,
      feedback:
        "Consistently exceeds expectations with thorough research and clear writing.",
      rating: 4,
      author: "James T.",
      position: "PhD Candidate, UI",
    },
    {
      id: 3,
      feedback:
        "Outstanding professionalism and timely delivery on complex projects.",
      rating: 5,
      author: "Esther K.",
      position: "Undergrad, Covenant University",
    },
  ];
};

const TestimonialSlideshow = ({ name }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials on mount
  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      onRetry={() => window.location.reload()}
      loaderText="Loading feedback…"
      showEmptyState
      isEmpty={!loading && testimonials.length === 0}
      emptyTitle="No feedback yet"
      emptyMessage="No client testimonials available at the moment."
      centered
    >
      <div className="mt-6 max-w-lg mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-lg relative shadow-lg transition-transform transform hover:scale-[1.02] border border-white/10">
                <FaQuoteLeft className="absolute top-4 left-4 text-gray-400 text-2xl opacity-50" />
                <h5 className="text-xl font-semibold text-indigo-300 mb-3 pl-8">
                  Client Feedback
                </h5>
                <p className="italic text-gray-100 text-base pl-8 pr-4 leading-relaxed">
                  “
                  {name
                    ? `${name} ${testimonial.feedback}`
                    : testimonial.feedback}
                  ”
                </p>
                {/* <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, star) => (
                    <FaStar
                      key={star}
                      className={`inline-block ${
                        star < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div> */}
                <p className="mt-4 text-sm text-gray-300 text-right font-medium">
                  — {testimonial.author}
                </p>
                <p className="text-sm text-gray-400 text-right">
                  {testimonial.position}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </AsyncStateHandler>
  );
};

export default TestimonialSlideshow;
