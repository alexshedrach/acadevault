"use client";

import Image from "next/image";

export default function SecuredPaymentGateways() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Secured Payment Gateways
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          We partner with industry‑leading payment processors to ensure that
          every transaction is safe and secure. Our platform uses the latest
          encryption standards, so you can shop with confidence.
        </p>

        {/* Payment Logos */}
        <div className="flex flex-wrap justify-center gap-8">
          {/* Example: Verve */}
          <div className="w-32 h-20 relative">
            <Image
              src="/logos/payment.png"
              alt="Verve Payment Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 200px"
            />
          </div>
          {/* Example: PayPal */}
          <div className="w-32 h-20 relative">
            <Image
              src="/logos/paypal-payments.png"
              alt="PayPal Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 200px"
            />
          </div>
          {/* Example: Visa */}
          <div className="w-32 h-20 relative">
            <Image
              src="/media/logo6.jpg"
              alt="Visa Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 200px"
            />
          </div>
          {/* Example: MasterCard */}
          <div className="w-32 h-20 relative">
            <Image
              src="/media/logo1.png"
              alt="MasterCard Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 200px"
            />
          </div>
          {/* Example: American Express */}
          <div className="w-32 h-20 relative">
            <Image
              src="/media/trust-badge-ssl.png"
              alt="American Express Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 200px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
