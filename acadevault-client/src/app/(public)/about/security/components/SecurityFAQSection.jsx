import React from 'react'





const SecurityFAQSection = () => {
  const faqs = [
    {
      question: "How do you protect my payment information?",
      answer:
        "We use PCI DSS-compliant payment gateways like Stripe and Paystack, ensuring your payment details are encrypted and never stored on our servers.",
    },
    {
      question: "What happens if I find suspicious content?",
      answer:
        "You can report it directly from the material page. Our team investigates within 24 hours and takes appropriate action.",
    },
    {
      question: "Is my personal data shared with third parties?",
      answer:
        "No, your data is only used to provide our services and is protected under GDPR and our Privacy Policy.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <HelpCircle className="text-blue-600 w-8 h-8" />
          Security FAQs
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <summary className="font-semibold text-base cursor-pointer">
                {faq.question}
              </summary>
              <p className="text-gray-700 text-base mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
  

export default SecurityFAQSection