"use client";

import Container from "@/components/layout/Container";
import Image from "next/image";
import Link from "next/link";

export default function PaymentOptions() {
  return (
    <Container as="section" className="pb-6 px-0 sm:px-8">
      {/* Two-column layout for Option 01 (Bank Transfers) and Option 02 (Online Payments) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Option 01: Bank Deposits / Transfers */}
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
          <h3 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-[#ccc]">
            Option 01
          </h3>
          <p className="text-gray-700 mb-6">
            For larger transactions, choose our secure bank transfer option. Our
            support team is always available to guide you through the process.
            Bank deposits, mobile transfers, ATM, Quick Teller, and e‑transfers
            to any of the banks below:
          </p>

          {/* Bank Details: Example with two sets side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bank 1 */}
            <div className="bg-gray-50 rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-2">
                Bank Name: Zenith Bank Plc
              </p>
              <p className="text-gray-700">
                Account Number: <strong>1234567890</strong>
              </p>
              <p className="text-gray-700">
                Account Name: <strong>MyPage Ventures</strong>
              </p>
              <p className="text-gray-700">
                Account Type: <strong>Savings</strong>
              </p>
            </div>

            {/* Bank 2 */}
            <div className="bg-gray-50 rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-2">
                Bank Name: First Bank Plc
              </p>
              <p className="text-gray-700">
                Account Number: <strong>9876543210</strong>
              </p>
              <p className="text-gray-700">
                Account Name: <strong>MyPage Ventures</strong>
              </p>
              <p className="text-gray-700">
                Account Type: <strong>Current</strong>
              </p>
            </div>
            <div className="bg-gray-50 rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-2">
                Bank Name: First Bank Plc
              </p>
              <p className="text-gray-700">
                Account Number: <strong>9876543210</strong>
              </p>
              <p className="text-gray-700">
                Account Name: <strong>MyPage Ventures</strong>
              </p>
              <p className="text-gray-700">
                Account Type: <strong>Current</strong>
              </p>
            </div>
            <div className="bg-gray-50 rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-2">
                Bank Name: First Bank Plc
              </p>
              <p className="text-gray-700">
                Account Number: <strong>9876543210</strong>
              </p>
              <p className="text-gray-700">
                Account Name: <strong>MyPage Ventures</strong>
              </p>
              <p className="text-gray-700">
                Account Type: <strong>Current</strong>
              </p>
            </div>

            {/* Additional banks can be added similarly */}
          </div>
        </div>

        {/* Option 02: Online Payments (Gateways) */}
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
          <h3 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-[#ccc]">
            Option 02
          </h3>
          <p className="text-gray-700 mb-4">
            Process your payments online through our secured gateways.
            Experience fast, reliable transactions with state‑of‑the‑art
            encryption. You can pay via any of these secured payment gateways
            below using Verve, Visa, or MasterCard.
          </p>

          {/* Payment Gateway Logos */}
          <div className="flex flex-wrap">
            {/* Each image takes full width on small screens and 1/2 on medium screens and up */}
            <div className="w-full md:w-1/2 relative h-50">
              <Image
                src="/logos/payment.png"
                alt="Verve Payment Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2 relative h-50">
              <Image
                src="/logos/paypal-payments.png"
                alt="PayPal Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Example Payment Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Paystack Button */}
            <Link
              href="/paystack-checkout"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Make Payment Via Paystack
            </Link>
            {/* PayPal */}

            <Link
              href="/paypal-checkout"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Make Payment Via PayPal
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
