"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function UnauthorizedClient() {
  const pathname = usePathname();

  useEffect(() => {
    console.warn(`Unauthorized access attempt to: ${pathname}`);
  }, [pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">401</h1>
        <h2 className="text-xl font-semibold mb-2">Unauthorized Access</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          You don’t have the required permissions to view this page.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded"
          >
            Go to Homepage
          </Link>

          <Link
            href="/login"
            className="inline-block bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium px-6 py-2 rounded"
          >
            Login Again
          </Link>
        </div>
      </div>
    </main>
  );
}
