"use client";

import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaLock,
  FaMoneyBillWave,
  FaClock,
  FaRedo,
  FaMoneyCheckAlt,
  FaUndoAlt,
  FaEnvelopeOpenText,
  FaShieldAlt,
} from "react-icons/fa";

export default function UsageAndPolicy() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) =>
    setOpenSection((prev) => (prev === section ? null : section));

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white text-gray-800">
      <header className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
        <h2 className="text-xl font-bold text-blue-800">Usage & Policy</h2>
      </header>

      {/* Section 1: Terms & Conditions */}
      <PolicySection
        title="Terms & Conditions"
        isOpen={openSection === "terms"}
        onToggle={() => toggleSection("terms")}
        items={[
          {
            title: "License & Usage",
            icon: <FaLock className="text-blue-600" />,
            content:
              "This academic material is licensed for personal and educational use only. Redistribution, commercial resale, or unauthorized duplication is strictly prohibited.",
          },
          {
            title: "Payment & Access",
            icon: <FaMoneyBillWave className="text-green-600" />,
            content:
              "Access is granted immediately after successful payment. Ensure your account email is valid to avoid delivery delays. All transactions are securely processed.",
          },
          {
            title: "Access Duration",
            icon: <FaClock className="text-yellow-500" />,
            content:
              "You will have lifetime access to the digital version of this material unless otherwise specified. Updates and revisions will be provided when applicable.",
          },
          {
            title: "Refunds & Cancellations",
            icon: <FaRedo className="text-red-500" />,
            content:
              "Due to the nature of digital products, all sales are final. However, if you encounter any issues accessing the material, please contact support for resolution.",
          },
          {
            title: "Academic Honesty",
            icon: null,
            content:
              "This material is intended to support your academic journey, not to be submitted as your own work. Submitting it as original violates academic integrity policies and may lead to disciplinary action.",
          },
        ]}
      />

      {/* Section 2: Purchase & Return Policy */}
      <PolicySection
        title="Purchase & Return Policy"
        isOpen={openSection === "policy"}
        onToggle={() => toggleSection("policy")}
        items={[
          {
            title: "Payment & Order Processing",
            icon: <FaMoneyCheckAlt className="text-green-600" />,
            content:
              'Payments are securely processed via our trusted payment gateways. Once payment is confirmed, the material will be accessible in your account under the "My Materials" section.',
          },
          {
            title: "Refunds & Returns",
            icon: <FaUndoAlt className="text-red-500" />,
            content:
              "All purchases of digital academic materials are non-refundable. However, if you encounter an issue such as inaccessible files, duplicated content, or payment errors, please 'mailto:support@acadevault.com' contact support within 3 days of purchase for resolution or exchange.",
          },
          {
            title: "Delivery Timeline",
            icon: <FaEnvelopeOpenText className="text-blue-600" />,
            content:
              "Materials are delivered instantly via your account dashboard and email. If your access is delayed beyond 30 minutes, please check spam/junk folders or contact our team.",
          },
          {
            title: "Buyer Protection",
            icon: <FaShieldAlt className="text-yellow-500" />,
            content:
              "We ensure that every listed academic material undergoes a quality and plagiarism check. If any content is found to violate our academic standards, users are eligible for store credit or replacement.",
          },
        ]}
      />

      <footer className="px-6 py-4 text-sm text-gray-500 border-t border-gray-200">
        By accessing or purchasing this material, you agree to these terms. For
        any clarifications, contact. Need help? Email <a
          href="mailto:support@acadevault.com"
          className="text-blue-600 underline hover:text-blue-800"
        >
          support@acadevault.com
        </a>
        .
      </footer>
    </div>
  );
}

function PolicySection({ title, isOpen, onToggle, items }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center text-left bg-gray-50 hover:bg-gray-100 transition-colors font-semibold text-lg text-gray-800"
      >
        <span>{title}</span>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 space-y-6 bg-white">
          {items.map((item, idx) => (
            <div key={idx} className="space-y-2">
              {item.title && (
                <h3 className="flex items-center gap-2 text-base font-semibold text-gray-700">
                  {item.icon && item.icon}
                  {item.title}
                </h3>
              )}
              <p className="text-sm text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
