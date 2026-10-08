"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useInView } from "react-intersection-observer";
import useAnalytics from "@/hooks/useAnalytics";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TrustedBySection() {
  const { trackEvent } = useAnalytics();
  const [logos, setLogos] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // Initialize Swiper modules
//   SwiperCore.use([Autoplay, Navigation, Pagination, A11y]);

  // Simulate fetching logos from CMS/API
  useEffect(() => {
    setTimeout(() => {
      setLogos([
        {
          id: "uni-a",
          alt: "University A Logo",
          src: "/logos/uni-a.png",
          width: 120,
          height: 40,
          href: "https://university-a.edu",
        },
        {
          id: "pub-b",
          alt: "Publisher B Logo",
          src: "/logos/ui.png",
          width: 120,
          height: 40,
        },
        {
          id: "lib-c",
          alt: "Library C Logo",
          src: "/logos/lib-c.png",
          width: 120,
          height: 40,
          href: "https://library-c.org",
        },
        {
          id: "res-d",
          alt: "Research D Logo",
          src: "/logos/unical.png",
          width: 120,
          height: 40,
        },
        // ...more logos
      ]);
    }, 500);
  }, []);

  // Track section in-view
  useEffect(() => {
    if (inView) {
      trackEvent("TrustedBy:section_view");
    }
  }, [inView, trackEvent]);

  if (!logos) {
    return (
      <section
        ref={ref}
        aria-labelledby="trustedby-heading"
        className="py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 text-center">
          <h2
            id="trustedby-heading"
            className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100"
          >
            Trusted By
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Loading our partners…
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-labelledby="trustedby-heading"
      className="py-16 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <h2
          id="trustedby-heading"
          className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        >
          Trusted By
        </h2>

        <Swiper
          slidesPerView={2}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          pagination={{ clickable: true }}
          a11y={{
            prevSlideMessage: "Previous logos",
            nextSlideMessage: "Next logos",
          }}
          onSlideChange={(swiper) =>
            trackEvent("TrustedBy:slide_change", { index: swiper.realIndex })
          }
        >
          {logos.map((logo) => {
            const content = (
              <div className="flex items-center justify-center p-4">
                <div className="relative w-[120px] h-[40px]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL="/images/blur-placeholder-sm.png"
                    loading="lazy"
                  />
                </div>
              </div>
            );
            return (
              <SwiperSlide key={logo.id}>
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("TrustedBy:logo_click", { id: logo.id })
                    }
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                  >
                    {content}
                  </a>
                ) : (
                  <div>{content}</div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
