import { Lock } from 'lucide-react';
import React from 'react'

const SecurityMeasuresSection = () => (
  <section className="py-16 bg-gray-100">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
        <Lock className="text-red-600 w-8 h-8" />
        Data Security Measures
      </h2>
      <p className="text-gray-600 max-w-3xl">
        We employ state-of-the-art technologies to safeguard your data and
        transactions.
      </p>
      <ul className="grid md:grid-cols-2 gap-6 text-gray-700 text-base">
        <li className="flex gap-2">
          <span className="font-semibold">Encrypted Access:</span> All
          interactions are secured with HTTPS/TLS encryption.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">Payment Gateways:</span> Secure
          transactions via trusted providers like Stripe and Paystack.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">Private Media Handling:</span> Digital
          materials are watermarked and delivered via secure links.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">Fraud Prevention:</span> Multi-layered
          account verification and real-time monitoring.
        </li>
      </ul>
    </div>
  </section>
);

export default SecurityMeasuresSection