import React from 'react'

export default function PaymentFAQs() {
    const faqs = [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept major credit/debit cards (Visa, MasterCard, Verve, American Express) as well as bank transfers.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely. Our platform uses advanced encryption and secure servers to ensure your data is fully protected.",
      },
      {
        question: "When will I receive my confirmation email?",
        answer:
          "You will receive a confirmation email within 10 minutes after your payment. If you don't see it, please check your spam folder.",
      },
      {
        question: "What should I do if my payment doesn't reflect?",
        answer:
          "If your payment status does not update within 30 minutes, please contact our support team immediately.",
      },
    ];
  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-gray-950 font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <details key={index} className="p-4 rounded-lg shadow">
              <summary className="font-semibold text-blue-800 cursor-pointer">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
