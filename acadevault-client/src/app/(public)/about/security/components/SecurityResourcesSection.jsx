import React from 'react'


const SecurityResourcesSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
        <BookCheck className="text-green-600 w-8 h-8" />
        Security Resources
      </h2>
      <p className="text-base text-gray-700 max-w-3xl">
        Learn more about staying safe on Acadavault with our guides and
        resources.
      </p>
      <ul className="list-disc list-inside text-base text-gray-700">
        <li>
          <Link
            href="/blog/protecting-your-account"
            className="text-blue-600 underline"
          >
            How to Protect Your Acadavault Account
          </Link>
        </li>
        <li>
          <Link
            href="/blog/spotting-fraudulent-content"
            className="text-blue-600 underline"
          >
            Spotting and Reporting Fraudulent Content
          </Link>
        </li>
        <li>
          <Link
            href="/blog/understanding-encryption"
            className="text-blue-600 underline"
          >
            Understanding Data Encryption
          </Link>
        </li>
      </ul>
    </div>
  </section>
);

export default SecurityResourcesSection