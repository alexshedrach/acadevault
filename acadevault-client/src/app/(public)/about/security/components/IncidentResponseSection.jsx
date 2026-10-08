import React from 'react'



const IncidentResponseSection = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
        <AlertTriangle className="text-yellow-600 w-8 h-8" />
        Incident Response
      </h2>
      <p className="text-base text-gray-700 max-w-3xl">
        In the unlikely event of a security incident, we act swiftly to protect
        our users.
      </p>
      <ul className="list-disc list-inside text-base text-gray-700">
        <li>24/7 incident monitoring and response team.</li>
        <li>Transparent communication with affected users.</li>
        <li>Post-incident analysis to prevent recurrence.</li>
      </ul>
      <p className="text-base text-gray-700">
        Report vulnerabilities to{" "}
        <Link
          href="mailto:security@acadevault.com"
          className="text-blue-600 underline"
        >
          security@acadevault.com
        </Link>
        .
      </p>
    </div>
  </section>
);

export default IncidentResponseSection