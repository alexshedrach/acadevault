"use client";

import { useState } from "react";

/**
 * GuestCheckoutForm
 * Allows unauthenticated users to checkout with basic info.
 */
export default function GuestCheckoutForm({ onSubmit, onCancel }) {
  const [guestEmail, setGuestEmail] = useState("");
  const [guestFullName, setGuestFullName] = useState("");
  const [guestPhoneNumber, setGuestPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!guestEmail || !validateEmail(guestEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!guestFullName.trim()) {
      setError("Full name is required.");
      return;
    }

    setError(null);
    onSubmit({ guestEmail, guestFullName, guestPhoneNumber });
  };

  const resetError = () => {
    if (error) setError(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Continue as Guest
      </h2>

      {error && (
        <div
          role="alert"
          className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="guestEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="guestEmail"
            name="guestEmail"
            value={guestEmail}
            onChange={(e) => {
              setGuestEmail(e.target.value);
              resetError();
            }}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. john.doe@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="guestFullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="guestFullName"
            name="guestFullName"
            value={guestFullName}
            onChange={(e) => {
              setGuestFullName(e.target.value);
              resetError();
            }}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Jane Doe"
            required
          />
        </div>

        <div>
          <label
            htmlFor="guestPhoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number{" "}
            <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            type="tel"
            id="guestPhoneNumber"
            name="guestPhoneNumber"
            value={guestPhoneNumber}
            onChange={(e) => {
              setGuestPhoneNumber(e.target.value);
              resetError();
            }}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. +234 812 345 6789"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
