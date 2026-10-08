import React from 'react'


const ComplianceCertificationsSection = () => (
  <section className="py-16 bg-gray-100">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
        <Award className="text-green-600 w-8 h-8" />
        Compliance & Certifications
      </h2>
      <p className="text-base text-gray-700 max-w-3xl">
        Acadavault adheres to global standards to protect your privacy and data.
      </p>
      <ul className="grid md:grid-cols-2 gap-6 text-gray-700 text-base">
        <li className="flex gap-2">
          <span className="font-semibold">GDPR Compliance:</span> We follow EU
          regulations for data protection.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">ISO 27001:</span> Certified for
          information security management.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">PCI DSS:</span> Compliant for secure
          payment processing.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">Regular Audits:</span> Independent
          security audits conducted annually.
        </li>
      </ul>
    </div>
  </section>
);

export default ComplianceCertificationsSection