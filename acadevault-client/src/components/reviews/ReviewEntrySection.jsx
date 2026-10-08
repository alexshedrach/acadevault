"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PencilLine } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import ReviewForm from "./ReviewForm";

/**
 * ReviewEntrySection
 *
 * Wraps the ReviewForm with authentication gating,
 * toggle button and smooth animations.
 */
export default function ReviewEntrySection({ materialId, onSubmitReview }) {
  const { isAuthenticated } = useAuth();

  // toggle states
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // form and status state
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    comment: "",
    pros: "",
    cons: "",
    anonymous: false,
  });
  const [status, setStatus] = useState({ type: "idle" });

  // scroll ref
  const containerRef = useRef(null);
  const scrollIntoView = () =>
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  // toggle form or prompt login
  const toggleForm = () => {
    if (!isAuthenticated) return setShowModal(true);
    setShowForm((prev) => {
      const next = !prev;
      if (next) scrollIntoView();
      return next;
    });
  };

  // generic field update
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // reset alert
  const dismissAlert = () => setStatus({ type: "idle" });

  // submit wrapper
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (formData.rating === 0)
      return setStatus({ type: "error", message: "Please select a rating." });
    if (!formData.comment.trim())
      return setStatus({ type: "error", message: "Comment cannot be empty." });

    setStatus({ type: "loading", message: "Submitting..." });
    try {
      await onSubmitReview({ ...formData, materialId });
      setStatus({ type: "success", message: "Review submitted!" });
      setFormData({
        rating: 0,
        title: "",
        comment: "",
        pros: "",
        cons: "",
        anonymous: false,
      });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Submission failed." });
    }
  };

  return (
    <section
      ref={containerRef}
      aria-labelledby="feedback-legend"
      className="relative border border-gray-200 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto bg-gradient-to-br from-blue-50 via-white to-white shadow-md"
    >
      {/* legend */}
      <legend
        id="feedback-legend"
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full shadow uppercase tracking-wide"
      >
        We Value Your Feedback
      </legend>

      {/* CTA */}
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-gray-800">
          Want to share your thoughts?
        </p>
        <p className="text-sm text-gray-500">
          Help us and others by sharing your experience.
        </p>
        <Button
          onClick={toggleForm}
          variant={
            isAuthenticated ? (showForm ? "success" : "gradient") : "outline"
          }
          size="md"
          className={
            !isAuthenticated
              ? "bg-orange-300 hover:bg-orange-400 text-white focus:ring-orange-500"
              : undefined
          }
          aria-expanded={showForm}
        >
          <PencilLine className="mr-2" size={18} />
          {showForm ? "Close Review Form" : "Write a Review"}
        </Button>
      </div>

      {/* animated form */}
      <AnimatePresence initial={false}>
        {showForm && isAuthenticated && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 border-t pt-6"
          >
            <ReviewForm
              formData={formData}
              status={status}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onDismissAlert={dismissAlert}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* login modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Sign In Required"
        size="sm"
        theme='neon'
      >
        <p className="text-center text-sm text-gray-200 mb-4">
          You need to be signed in to submit a review.
        </p>
        <div className="text-center">
          <Link href="/login" target="_blank">
            <Button variant="gradient" size="md">
              Go to Sign In
            </Button>
          </Link>
        </div>
      </Modal>
    </section>
  );
}
