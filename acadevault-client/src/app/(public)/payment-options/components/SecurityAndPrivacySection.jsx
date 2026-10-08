import Link from 'next/link'
import React from 'react'

export default function SecurityAndPrivacySection() {
  return (
    <section className="relative bg-white py-16">
            {/* Subtle Background Overlay */}
            <div className="absolute inset-0 bg-blue-50 opacity-20"></div>
            <div className="relative container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                Security & Privacy
              </h2>
              <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Your privacy and security are our top priorities. Our platform
                  uses state‑of‑the‑art encryption technologies and follows strict
                  security protocols to ensure your personal and financial
                  information is fully protected.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>
                    <strong>Data Encryption:</strong> All sensitive data is
                    encrypted using industry‑standard protocols.
                  </li>
                  <li>
                    <strong>Secure Servers:</strong> Transactions are processed on
                    secure, PCI‑compliant servers.
                  </li>
                  <li>
                    <strong>Regular Audits:</strong> Our systems undergo continuous
                    security audits and monitoring.
                  </li>
                  <li>
                    <strong>Privacy Compliance:</strong> We adhere to global privacy
                    laws and best practices.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  To learn more about our privacy practices and how we protect your
                  data, please review our{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
  )
}
