import React from 'react'


const ContactSecurityTeamSection = () => (
  <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
    <div className="container mx-auto px-4 text-center space-y-6">
      <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
        <Mail className="w-8 h-8" />
        Contact Our Security Team
      </h2>
      <p className="text-base max-w-xl mx-auto">
        Have a security concern or found a vulnerability? Reach out to us
        immediately.
      </p>
      <Link href="mailto:security@acadevault.com">
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition duration-300">
          Report a Security Issue
        </button>
      </Link>
    </div>
  </section>
);
  

export default ContactSecurityTeamSection