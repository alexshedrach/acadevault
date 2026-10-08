import Container from "@/components/layout/Container";
import Link from "next/link";
import React from "react";

export default function EmptyCart() {
  return (
    <Container
      as="section"
      background="gray-100"
      className="flex flex-col items-center justify-center space-y-6 py-6"
      aria-labelledby="empty-cart-heading"
    >
      {/* Animated SVG Illustration for Empty Cart */}
      <div className="w-48 h-48 md:w-64 md:h-64">
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
          <g>
            {/* Cart Body */}
            <path
              d="M50 60h100a10 10 0 0 1 10 10v40a10 10 0 0 1-10 10H50a10 10 0 0 1-10-10V70a10 10 0 0 1 10-10z"
              fill="none"
              stroke="#4B5563"
              strokeWidth="8"
              className="animate-pulse"
            />
            {/* Wheels */}
            <circle
              cx="70"
              cy="140"
              r="10"
              fill="#4B5563"
              className="animate-bounce"
            />
            <circle
              cx="130"
              cy="140"
              r="10"
              fill="#4B5563"
              className="animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            {/* Empty State Indicator (Cross) */}
            <path
              d="M90 80l20 20m0-20l-20 20"
              stroke="#EF4444"
              strokeWidth="8"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </g>
        </svg>
      </div>

      {/* Heading */}
      <h2
        id="empty-cart-heading"
        className="text-2xl md:text-3xl font-semibold text-gray-800 -mt-15"
      >
        Your Cart is Empty
      </h2>

      {/* Description */}
      <p className="text-base text-gray-600 max-w-md mx-auto text-center">
        Start exploring our collection of academic materials to find what you
        need.
      </p>

      {/* Call to Action */}
      <Link
        href="/materials"
        className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
        aria-label="Browse academic materials"
      >
        Browse Materials
      </Link>
    </Container>
  );
}
