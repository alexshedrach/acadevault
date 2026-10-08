"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { StarRatingDisplay } from "../rating/StarRating";

const BlogCard = ({ post }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 0.5 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <Card
        theme="glass"
        variant="shadowed"
        clickable
        className="overflow-hidden"
        onClick={() => (window.location.href = `/blog/${post.slug}`)}
      >
        {/* Image Section */}
        {post.image && (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title || "Blog Post Image"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300" />
          </div>
        )}

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Star Rating with count */}
          {typeof post.rating === "number" && (
            <StarRatingDisplay
              average={post.rating}
              count={post.ratingCount || 0}
              size={20}
              color="#facc15"
              inactiveColor="#e5e7eb"
              maxStars={5}
            />
          )}

          {/* Read more */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium"
          >
            Read More &rarr;
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
