import { UserCheck2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


const ContributorAccountabilitySection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
        <UserCheck2 className="text-purple-600 w-8 h-8" />
        Contributor Accountability
      </h2>
      <p className="text-base text-gray-700">
        Our contributors are held to strict academic integrity standards,
        ensuring trustworthy content.
      </p>
      <ul className="list-disc list-inside text-base text-gray-700">
        <li>Only original or publicly available content is accepted.</li>
        <li>Repeat violations result in permanent account suspension.</li>
        <li>
          Buyers can report suspicious content directly from material pages.
        </li>
      </ul>
      <p className="text-base text-gray-700">
        Learn more in our{" "}
        <Link href="/terms" className="text-blue-600 underline">
          Terms of Use
        </Link>
        .
      </p>
    </div>
  </section>
);


export default ContributorAccountabilitySection