import React from "react";
import Link from "next/link";

export default function CustomerSupport() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Need Assistance?
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Our dedicated customer support team is available 24/7 to assist you
            with any payment or order-related queries. We are committed to
            providing prompt and effective solutions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Contact Support
          </Link>
          <p className="text-gray-500 mt-6 text-sm">
            Or call us at <span className="font-medium">1-800-123-4567</span>
          </p>
        </div>
      </div>
    </section>
  );
}
