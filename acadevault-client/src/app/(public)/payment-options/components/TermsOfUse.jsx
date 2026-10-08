"use client";

import React from "react";
import Link from "next/link";

export default function TermsOfUse() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-10">
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-12 bg-white rounded-lg shadow-md border border-gray-200">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms of Use
        </h2>

        {/* Intro / Overview */}
        <div className="mb-8">
          <p className="text-gray-600 leading-relaxed">
            Welcome to <strong>AcadeMate</strong> (the “Platform”). These Terms
            of Use (“Terms”) govern your access to and use of all content,
            products, and services provided through our Platform. By accessing
            or using our Platform, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* 1. Acceptance of Terms */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              1. Acceptance of Terms
            </h3>
            <p>
              By creating an account, making a purchase, or otherwise using our
              Platform, you acknowledge that you have read, understood, and
              agree to comply with these Terms. If you do not agree, you may not
              access or use our Platform.
            </p>
          </div>

          {/* 2. User Responsibilities */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              2. User Responsibilities
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                You must provide accurate and up‑to‑date information during
                registration and purchasing.
              </li>
              <li>
                You are solely responsible for the confidentiality of your
                account credentials.
              </li>
              <li>
                You agree not to misuse our Platform for illegal or unauthorized
                purposes.
              </li>
            </ul>
          </div>

          {/* 3. Payment & Refund Policy */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              3. Payment & Refund Policy
            </h3>
            <p>
              All transactions are processed through our secure payment
              gateways. Payments are non‑refundable once materials have been
              accessed or downloaded, except as required by law or explicitly
              stated in our{" "}
              <Link
                href="/refund-policy"
                className="text-blue-600 hover:underline"
              >
                Refund Policy
              </Link>
              .
            </p>
          </div>

          {/* 4. Intellectual Property */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              4. Intellectual Property
            </h3>
            <p>
              All materials, content, and trademarks on this Platform are owned
              by or licensed to <strong>AcadeMate</strong>. You may not
              reproduce, distribute, or create derivative works without our
              prior written consent.
            </p>
          </div>

          {/* 5. Disclaimer & Limitation of Liability */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              5. Disclaimer & Limitation of Liability
            </h3>
            <p>
              The materials and services provided on our Platform are offered
              “as is” and “as available,” without warranties of any kind. In no
              event shall <strong>AcadeMate</strong> be liable for any direct,
              indirect, incidental, or consequential damages arising out of or
              related to your use of the Platform.
            </p>
          </div>

          {/* 6. Changes to Terms */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              6. Changes to These Terms
            </h3>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              Your continued use of the Platform following any such changes
              constitutes your acceptance of the revised Terms.
            </p>
          </div>

          {/* 7. Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              7. Contact Information
            </h3>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@academate.com"
                className="text-blue-600 hover:underline"
              >
                support@academate.com
              </a>
              .
            </p>
          </div>
        </div>

        {/* CTA or Additional Links */}
        <div className="mt-8 text-center">
          <Link
            href="/privacy"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-full font-medium hover:bg-blue-700 transition"
          >
            View Our Privacy Policy
          </Link>
        </div>
      </section>
    </div>
  );
}
