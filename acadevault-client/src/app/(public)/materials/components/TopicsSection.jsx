"use client";

import React from "react";
import PropTypes from "prop-types";
import { FiTrendingUp } from "react-icons/fi";
import Container from "@/components/layout/Container";
import ErrorState from "@/components/states/ErrorState";
import Loader from "@/components/ui/Loader";
import TopicItem from "./TopicItem";

/**
 * TopicsSection
 *
 * Displays a list of popular tags/topics. Shows a loader skeleton while loading,
 * and an error state if fetching fails.
 *
 * @param {string[]} topics           – Array of topic strings
 * @param {(topic: string) => void} onSelectTopic – Click handler when a topic is selected
 * @param {string | React.ReactNode} title    – Section title
 * @param {boolean} loading           – Whether data is still loading
 * @param {any} error                 – Error object (if any)
 * @param {string} className          – Additional Tailwind classes for Container
 */
const TopicsSection = ({
  topics = [],
  onSelectTopic,
  title = "Popular Topics",
  loading = false,
  error = null,
  className = "",
}) => {
  // Number of skeleton cards (match to expected grid columns).
  const skeletonCount = 8;

  return (
    <Container
      section
      fullHeight
      centerContent
      className={`py-16 px-0 sm:px-8 ${className}`}
      aria-labelledby="popular-topics-heading"
    >
      {/* Section Header */}
      <div className="flex items-center justify-center gap-2 mb-16">
        <FiTrendingUp className="text-white text-2xl" />
        <h2
          id="popular-topics-heading"
          className="text-2xl md:text-3xl font-bold text-blue-100 border-b-4 border-amber-500 pb-3"
        >
          {typeof title === "string" ? title : title}
        </h2>
      </div>

      {/* Error State */}
      {error && (
        <ErrorState
          title="Failed to Load Topics"
          message="Something went wrong while fetching popular topics."
          variant="server"
        />
      )}

      {/* Loading Skeletons */}
      {loading && !error && (
        <Loader
          type="skeleton"
          withSkeletonGrid
          skeletonCount={skeletonCount}
          skeletonHeight="h-20"
          skeletonShape="rounded-lg"
          text="Loading topics…"
          fullScreen={false}
        />
      )}

      {/* Topics Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {topics.map((tag, index) => (
            <TopicItem
              key={tag}
              label={tag}
              colorIndex={index}
              onClick={() => onSelectTopic?.(tag)}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

TopicsSection.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string),
  onSelectTopic: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  loading: PropTypes.bool,
  error: PropTypes.any,
  className: PropTypes.string,
};

export default TopicsSection;
