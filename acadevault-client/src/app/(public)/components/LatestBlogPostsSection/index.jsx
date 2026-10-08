"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import BlogPostsGrid from "../../blogs/components/BlogPostsGrid";
import SeeAllPostsButton from "./SeeAllPostsButton";
import { FloatingBlobs } from "@/components/common/FloatingBlobs";
import SectionHeader from "@/components/common/SectionHeader";
import { BookIcon } from "lucide-react";

// Fallback for demo; replace with API logic in real use
const fallbackPosts = [
  {
    id: "fallback-1",
    title: "The Future of Educational Technology",
    excerpt:
      "Explore how the latest technological advances are shaping the future of education.",
    slug: "future-educational-technology",
    image: "/images/bg-img-1.jpg",
    rating: 4,
  },
  {
    id: "fallback-2",
    title: "Innovative Learning Methods for Modern Students",
    excerpt:
      "Discover innovative strategies and tools to enhance modern learning experiences.",
    slug: "innovative-learning-methods",
    image: "/images/bg4.jpeg",
    rating: 5,
  },
  {
    id: "fallback-3",
    title: "Bridging the Gap Between Academia and Industry",
    excerpt:
      "Learn how academia is evolving to meet the needs of today’s competitive industries.",
    slug: "bridging-academia-industry",
    image: "/images/bg-img-1.jpg",
    rating: 4,
  },
];

const LatestBlogPostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate API fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setPosts(fallbackPosts);
        setLoading(false);
      } catch (err) {
        setError("Failed to load blog posts.");
        setLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <FloatingBlobs
          blobs={[
            {
              color: "bg-fuchsia-500",
              position: "top-5 left-20",
              size: "w-40 h-40",
              opacity: "opacity-20",
            },
            {
              color: "bg-cyan-500",
              position: "bottom-5 right-5",
              size: "w-52 h-52",
              opacity: "opacity-25",
            },
            {
              color: "bg-lime-400",
              position: "top-1/2 left-1/2",
              size: "w-60 h-60",
              opacity: "opacity-15",
              customClass: "transform -translate-x-1/2 -translate-y-1/2",
            },
          ]}
        />

        {/* <SectionHeader
          title="Latest From Our Blog"
          subtitle="Get insights, tips, and the latest news about academia and educational technology."
          error={error}
        /> */}

        <SectionHeader
          title="Latest From Our Blog"
          description="Get insights, tips, and the latest news about academia and educational technology."
          icon={<BookIcon />}
          iconPosition="left"
          align="left"
          size="xl"
          variant="primary"
          // gradient
          // animate
          error={error}
        />

        {loading ? (
          <Loader type="spinner" size="md" color="blue-600" text="Loading..." />
        ) : (
          <BlogPostsGrid posts={posts} />
        )}
        <SeeAllPostsButton />
      </div>
    </section>
  );
};

export default LatestBlogPostsSection;
