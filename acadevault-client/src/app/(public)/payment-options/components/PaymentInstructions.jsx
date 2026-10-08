"use client";

import React from "react";
import Link from "next/link";
// import BorderBottom from "../common/BorderBottom";
// import Heading from "../common/Heading";
// import ButtonLink from "../common/ButtonLink";

export default function PaymentInstructions() {
  return (
    <div className="bg-gray-50 py-6">
    <section className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Instructions After Payment
      </h2>

      {/* Info Card */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-900">
          After payment, send your payment details via:
        </p>
        <ul className="list-disc list-inside text-blue-900 mt-2">
          <li>
            Call or SMS:{" "}
            <strong className="font-semibold">0816&nbsp;547&nbsp;2076</strong>{" "}
            or{" "}
            <strong className="font-semibold">0814&nbsp;048&nbsp;4135</strong>
          </li>
          <li>
            Email:{" "}
            <strong className="font-semibold">wrproject@gmail.com</strong>
          </li>
        </ul>
        <p className="mt-3 text-blue-900">
          Once your payment is confirmed, your project will be delivered to you
          within <strong>30 minutes</strong>.
        </p>
      </div>

      {/* Detailed Steps */}
      <div className="space-y-4 text-gray-700">
        <p className="font-semibold">
          <span className="text-blue-600">Payment Details</span> you need to
          send to us:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Bank Depositor’s Name:</strong> (the name you used in making
            the payment).
          </li>
          <li>
            <strong>Amount Paid:</strong> (ensure the exact amount matches your
            order).
          </li>
          <li>
            <strong>Project Topic:</strong> (must be listed on this site or a
            related topic).
          </li>
          <li>
            <strong>Your Phone Number:</strong> (a download code will be sent to
            this number).
          </li>
          <li>
            <strong>Your Active Email Address:</strong> (we will also email the
            download link to this address).
          </li>
        </ol>

        <p className="text-gray-600 mt-4">
          <em>
            Note: Projects are sent in <strong>MS Word</strong> format within
            <strong>30 minutes</strong> of payment confirmation.
          </em>
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <Link
          href="/download-material"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition"
        >
          Click to Get the Material (If You’ve Already Paid)
        </Link>
      </div>
    </section></div>
    // <div className="bg-white border border-gray-200 rounded-lg p-8 mt-[-5rem] relative z-10 shadow-md">
    //   <BorderBottom>
    //     <Heading as="h3" variation="secondary">
    //       INSTRUCTIONS AFTER PAYMENT
    //     </Heading>
    //   </BorderBottom>
    //   <p className="mt-4 text-gray-700">
    //     After payment, send the following details to{" "}
    //     <strong>08165472076</strong> or <strong>08140484135</strong> or email
    //     your payment details to <strong>wrproject@gmail.com</strong>. Once your
    //     payment is confirmed, your project will be delivered within minutes.
    //   </p>
    //   <Heading as="h3" variation="secondary" className="mt-6">
    //     Payment Details to Send:
    //   </Heading>
    //   <ul className="list-disc pl-6 text-gray-700 mt-2">
    //     <li>Bank Depositor's Name</li>
    //     <li>Amount Paid</li>
    //     <li>Project Topic (as listed on our site)</li>
    //     <li>Your Phone Number (to receive a download code)</li>
    //     <li>Your Active Email Address</li>
    //   </ul>
    //   <p className="mt-4 text-gray-700">
    //     <strong>Note:</strong> Projects will be delivered in MS Word format
    //     within 30 minutes of payment confirmation.
    //   </p>
    //   <ButtonLink variation="secondary" to="/" className="mt-6">
    //     Click Here if You Have Already Paid
    //   </ButtonLink>
    // </div>
  );
}
