import React from "react";
import Container from "../layout/Container";

const VendorRegisgrationForm = ({
  formData,
  handleInputChange,
  handleExpertiseChange,
  handleFileChange,
  handleNextStep,
  handleSubmit,
  step,
  setStep,
  expertiseOptions,
}) => (
  <section className="py-16 bg-gray-100">
    <Container className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Vendor Registration
      </h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <span
            className={`text-sm font-semibold ${
              step >= 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Step 1: Personal Info
          </span>
          <span
            className={`text-sm font-semibold ${
              step >= 2 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Step 2: Expertise
          </span>
          <span
            className={`text-sm font-semibold ${
              step >= 3 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Step 3: Credentials
          </span>
        </div>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                aria-label="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                aria-label="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                aria-label="Phone number"
              />
            </div>
            <button
              onClick={handleNextStep}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Areas of Expertise
              </label>
              <div className="mt-2 space-y-2">
                {expertiseOptions.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.expertise.includes(option)}
                      onChange={handleExpertiseChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      id={option}
                    />
                    <label
                      htmlFor={option}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                aria-label="Years of experience"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Credentials (Optional)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-1 text-gray-700"
                aria-label="Upload credentials"
              />
              {formData.credentials && (
                <p className="text-sm text-gray-600">
                  Selected: {formData.credentials.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                aria-label="Bio"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  </section>
);

export default VendorRegisgrationForm;
