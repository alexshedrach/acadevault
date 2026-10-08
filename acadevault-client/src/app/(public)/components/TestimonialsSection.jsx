"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonialsData";
import { useTestimonialsCarousel } from "@/hooks/useTestimonialsCarousel";
import BackgroundGraphic from "@/components/common/BackgroundGraphic";
import NavigationButton from "@/components/carousel/NavigationButton";
import Carousel from "@/components/carousel/Carousel";
import PaginationDots from "@/components/carousel/PaginationDots";
import TestimonialCard from "@/components/cards/TestimonialCard";

/**
 * Framer Motion variants for slide animations (same as before).
 */
const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };
  
  export default function TestimonialsSection() {
    // Pull in page index, direction, current testimonial, and handlers from the hook
    const {
      page,
      direction,
      currentTestimonial,
      paginate,
      handleDragEnd,
    } = useTestimonialsCarousel(7000);
  
    return (
      <section className="py-16 relative bg-gradient-to-br from-blue-100 via-white to-blue-50 w-full">
        {/* 1) Decorative SVG background */}
        <BackgroundGraphic
          /**
           * We want the SVG to fill its parent completely (absolute inset-0),
           * so we override the default “position” by explicitly providing
           * wrapperClasses="absolute inset-0 ...".
           * The “position” prop still adds its own absolute + transform classes,
           * but “inset-0” ensures it truly covers the entire area.
           */
          position="bottom"
          height="h-full"
          viewBox="0 0 1440 320"
          paths={[
            {
              d: "M0,192L80,186.7C160,181,320,171,480,186.7C640,203,800,245,960,234.7C1120,224,1280,160,1360,122.7L1440,85L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
              fill: "currentColor",
              className: "text-blue-100 dark:text-gray-700",
            },
          ]}
          wrapperClasses="absolute inset-0 opacity-20 pointer-events-none"
          svgClasses=""
          style={{}}
        />
        <div className="relative container mx-auto px-4">
          {/* 2) Section Title + Description */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-800">
              What Our Users Say
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our thriving community of learners, educators, and
              researchers who are excelling with AcadeVault.
            </p>
          </div>

          {/* 3) Carousel Container with Left/Right Arrows */}
          <div className="relative flex justify-center items-center">
            {/* ← Left Arrow */}
            <NavigationButton
              onClick={() => paginate(-1)}
              label="Previous testimonial"
              position="left"
              size="md"
            >
              <ChevronLeft size={32} />
            </NavigationButton>

            {/* 
              3a) The Carousel in “slider” mode.
              We pass:
                • items={testimonialsData}
                • currentIndex={page}            → Carousel shows testimonialsData[page]
                • externalDirection={direction}  → Carousel uses this for its enter/exit
                • onDragEnd={handleDragEnd}      → passed into TestimonialCard
                • showControls={false}           → we’re using our own arrows
                • variants={variants}            → used by Carousel’s motion wrapper
                • renderItem={(item) => <TestimonialCard … />} 
            */}
            <div className="w-full h-full max-w-2xl px-4">
              <Carousel
                items={testimonialsData}
                renderItem={(item) => (
                  <TestimonialCard
                    testimonial={item}
                    variants={variants}
                    direction={direction}
                    onDragEnd={handleDragEnd}
                  />
                )}
                mode="slider"
                loop={true}
                showControls={false} // disable internal arrows
                currentIndex={page} // controlled by the hook
                externalDirection={direction} // controlled by the hook
                onDragEnd={handleDragEnd} // passed down into TestimonialCard
                variants={variants}
                transitionClass="" // no extra CSS on wrapper
                size="md"
                className=""
              />
            </div>

            {/* → Right Arrow */}
            <NavigationButton
              onClick={() => paginate(1)}
              label="Next testimonial"
              position="right"
              size="md"
            >
              <ChevronRight size={32} />
            </NavigationButton>
          </div>

          {/* 4) Pagination Dots */}
          <div className="mt-6 flex justify-center">
            <PaginationDots
              count={testimonialsData.length}
              currentIndex={page}
              onDotClick={(dotIndex) => paginate(dotIndex - page)}
            />
          </div>
        </div>
      </section>
    );
  }