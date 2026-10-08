import { FileCheck2 } from 'lucide-react';
import React from 'react'

const VerificationProcessSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
        <FileCheck2 className="text-blue-600 w-8 h-8" />
        Material Verification Process
      </h2>
      <p className="text-gray-600 max-w-3xl">
        Every academic material on Acadavault undergoes rigorous checks to
        ensure authenticity and quality.
      </p>
      <ul className="grid md:grid-cols-2 gap-6 text-gray-700 text-base">
        <li className="flex gap-2">
          <span className="font-semibold">Manual Review:</span> Our academic
          team reviews each submission for accuracy and relevance.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">Institutional Tags:</span> Materials
          are tagged with institution, department, and course details.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">Plagiarism Scan:</span> Automated
          originality checks using advanced tools.
        </li>
        <li className="flex gap-2">
          <span className="font-semibold">Proof-of-Authenticity:</span>{" "}
          Contributors may provide lecture notes or authorship evidence.
        </li>
      </ul>
    </div>
  </section>
);

export default VerificationProcessSection