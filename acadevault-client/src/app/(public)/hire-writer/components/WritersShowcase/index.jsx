"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import SectionHeader from "@/components/common/SectionHeader";
import Container from "@/components/layout/Container";
import WriterProfileModal from "@/components/modals/WriterProfileModal";
import AsyncStateHandler from "@/components/states/AsyncStateHandler";
import { WriterCard } from "./WriterCard";
import { fetchWriters } from "@/lib/writers/fetchWriters";

export default function WritersShowcase() {
  // Refs for DOM node and pause flag
  const containerRef = useRef(null);
  const isPausedRef = useRef(false);

  // State for data, loading, and error
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * loadWriters: fetches writers, handles loading / error states,
   * and triplicates the array to enable seamless infinite scrolling.
   */
  const loadWriters = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWriters();
      // Clear cache if needed (e.g., after a manual refresh)
      // clearCache();
      // Duplicate 3x for loop reset without gap
      setWriters([...data, ...data, ...data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // On mount: load the writers
  useEffect(() => {
    loadWriters();
  }, []);

  /**
   * Pause/resume scroll on hover or focus:
   * Listens for mouseenter/leave and focusin/out on the container.
   */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleEnter = () => (isPausedRef.current = true);
    const handleLeave = () => (isPausedRef.current = false);

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("focusin", handleEnter);
    el.addEventListener("focusout", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("focusin", handleEnter);
      el.removeEventListener("focusout", handleLeave);
    };
  }, [writers]);

  /**
   * Infinite scroll animation:
   * - Starts scroll position at the second chunk (blockWidth).
   * - Each frame, advances by `speed` unless paused.
   * - When scrollLeft reaches 2×blockWidth, reset to blockWidth.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container || writers.length === 0) return;

    let frameId;
    const speed = 0.5; // px per frame
    const blockWidth = container.scrollWidth / 3;

    // Jump to the first duplicate block
    container.scrollLeft = blockWidth;

    const step = () => {
      if (!isPausedRef.current) {
        container.scrollLeft += speed;
        // Loop back seamlessly
        if (container.scrollLeft >= blockWidth * 2) {
          container.scrollLeft = blockWidth;
        }
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [writers]);

  // Retry callback for AsyncStateHandler
  const handleRetry = () => {
    loadWriters();
  };

  // When a writer card is clicked, open the modal
  const handleWriterClick = (writer) => {
    setSelectedWriter(writer);
    setIsModalOpen(true);
  };

  return (
    <Container
      as="section"
      aria-labelledby="writer-showcase-title"
      className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-100 overflow-hidden"
    >
      {/* Section heading */}
      <SectionHeader
        title="Meet AcaDeVault’s Elite Academic Writers"
        description="Our carefully vetted writers are ready to elevate your academic success with unparalleled expertise."
        icon={FaStar}
        size="xl"
        align="center"
        animate
        className="mb-12"
      />

      {/* AsyncStateHandler covers loading, error, empty states */}
      <AsyncStateHandler
        loading={loading}
        error={error}
        onRetry={handleRetry}
        loaderText="Loading writers…"
        useAlertBoxForError={false}
        showEmptyState
        isEmpty={!loading && writers.length === 0}
        emptyTitle="No writers found"
        emptyMessage="We couldn’t find any writers at the moment. Please try again later."
        centered
      >
        {/* Carousel container */}
        <div className="relative mt-10">
          {/* Gradient fades at edges */}
          {/* Left fade overlay */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-blue-200 to-transparent z-20 pointer-events-none" />
          {/* Right fade overlay */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-200 to-transparent z-20 pointer-events-none" />
          {/* Scrollable row of writer cards */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto gap-6 no-scrollbar"
            style={{ scrollBehavior: "auto", whiteSpace: "nowrap" }}
          >
            <AnimatePresence initial={false}>
              {writers.map((writer, idx) => (
                <WriterCard
                  key={`${writer.id}-${idx}`}
                  writer={writer}
                  onClick={() => handleWriterClick(writer)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </AsyncStateHandler>

      {/* Modal for selected writer */}
      <WriterProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        writer={selectedWriter}
      />
    </Container>
  );
}
