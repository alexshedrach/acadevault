import React from 'react'


const UserResponsibilitiesSection = () => (
  <section className="py-16 bg-gray-100">
    <div className="container mx-auto px-4 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
        <UserCog className="text-teal-600 w-8 h-8" />
        Your Role in Security
      </h2>
      <p className="text-base text-gray-700 max-w-3xl">
        Help us keep Acadavault secure by following best practices.
      </p>
      <ul className="list-disc list-inside text-base text-gray-700">
        <li>
          Use strong, unique passwords and enable two-factor authentication.
        </li>
        <li>Avoid sharing sensitive information or account credentials.</li>
        <li>Log out from shared or public devices after use.</li>
        <li>Report suspicious activity immediately.</li>
      </ul>
    </div>
  </section>
);

export default UserResponsibilitiesSection