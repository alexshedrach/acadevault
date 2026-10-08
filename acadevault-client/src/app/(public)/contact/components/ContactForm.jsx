"use client";

import Link from "next/link";
import { useState } from "react";

function ContactForm({ initialSearchParams }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const error = await response.json();
        setStatus({
          type: "error",
          message: error.message || "Failed to send message.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-600 mb-6 text-center">
          Have questions or feedback? Fill out the form below or connect with us
          on social media.
        </p>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your name"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your email"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your message"
                required
                aria-required="true"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              aria-label="Submit contact form"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {status && (
              <p
                className={`text-center ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
                role="alert"
              >
                {status.message}
              </p>
            )}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <Link
              href="https://x.com/acadevault"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
              aria-label="Follow Acadavault on X"
            >
              X
            </Link>
            <Link
              href="https://linkedin.com/company/acadevault"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
              aria-label="Connect with Acadavault on LinkedIn"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/acadevault"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
              aria-label="View Acadavault on GitHub"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
