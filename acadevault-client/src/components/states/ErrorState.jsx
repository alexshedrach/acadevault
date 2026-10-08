import React from "react";
import { AlertTriangle, ShieldOff, ServerCrash } from "lucide-react";
import clsx from "clsx";

/**
 * Reusable and production-grade error state UI component.
 *
 * @param {string} title - Main error title (defaults to "Something went wrong")
 * @param {string} message - Optional detailed error message or description
 * @param {React.ReactNode} icon - Optional icon (Lucide or custom JSX)
 * @param {React.ReactNode} action - Optional retry button, link, etc.
 * @param {string} variant - 'generic' | 'permission' | 'server' (presets)
 * @param {string} className - Additional custom class names
 */
const ErrorState = ({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  icon,
  action,
  variant = "generic",
  className = "",
}) => {
  const presetIcon = {
    generic: <AlertTriangle size={48} className="text-red-500" />,
    permission: <ShieldOff size={48} className="text-orange-500" />,
    server: <ServerCrash size={48} className="text-purple-500" />,
  };

  return (
    <div
      role="alert"
      className={clsx(
        "flex flex-col items-center justify-center text-center px-6 py-16 text-gray-600",
        className
      )}
    >
      <div className="mb-5">
        {icon || presetIcon[variant] || presetIcon.generic}
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      {message && <p className="text-sm max-w-md mb-4">{message}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export default ErrorState;

// 🧪 Example Usage

// 🔁 API Retry Case
// <ErrorState
//   title="Failed to Load Materials"
//   message="Check your internet connection or try refreshing the page."
//   action={
//     <button
//       onClick={refetch}
//       className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//     >
//       Retry
//     </button>
//   }
// />

// 🚫 Permission Denied
// <ErrorState
//   variant="permission"
//   title="Access Denied"
//   message="You don’t have permission to view this content."
//   action={
//     <a
//       href="/support"
//       className="mt-2 inline-block text-blue-600 hover:underline"
//     >
//       Contact Support
//     </a>
//   }
// />

// 💥 Internal Server Error
// <ErrorState
//   variant="server"
//   title="Server Error"
//   message="Our systems seem to be having a hiccup. Please try again later."
// />

// 🛠️ Custom Icon Example
// <ErrorState
//   title="Verification Failed"
//   message="The token has expired or is invalid."
//   icon={<AlertTriangle size={48} className="text-yellow-500" />}
//   action={
//     <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded">
//       Resend Email
//     </button>
//   }
// />
