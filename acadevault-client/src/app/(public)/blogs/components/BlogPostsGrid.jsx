"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "@/components/cards/BlogCard";

/**
 * Displays blog cards with animations using Framer Motion.
 */
const BlogPostsGrid = ({ posts }) => (
  <AnimatePresence>
    <motion.div
      className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
);

export default BlogPostsGrid;
