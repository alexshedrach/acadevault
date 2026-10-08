"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">
        The page you are looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
