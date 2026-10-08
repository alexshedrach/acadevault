import React from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Flexible, accessible, production-grade EmptyState component.
 *
 * @param {string} title - Headline (required)
 * @param {string} message - Supportive text (required)
 * @param {React.ReactNode} icon - Optional custom icon
 * @param {React.ReactNode} action - Optional CTA (button, link, etc.)
 * @param {string} className - Optional container class overrides
 * @param {string} size - Size variant: 'sm' | 'md' | 'lg'
 * @param {string} alignment - 'center' (default) | 'left'
 * @param {boolean} border - Whether to wrap with a subtle border
 */
const EmptyState = ({
  title,
  message,
  icon,
  action,
  className = "",
  size = "md",
  alignment = "center",
  border = false,
}) => {
  const sizeClasses = {
    sm: "py-8 px-4 text-sm",
    md: "py-16 px-6 text-base",
    lg: "py-24 px-8 text-lg",
  };

  const textAlign =
    alignment === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col justify-center",
        textAlign,
        sizeClasses[size],
        border && "border border-dashed border-gray-300 rounded-lg bg-gray-50",
        "text-gray-500",
        className
      )}
    >
      <div className="mb-5">
        {icon || <Inbox size={48} className="text-blue-500" />}
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="max-w-md mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;

// 🧩 Example Usage Variants

// 🟡 For Material Listing (your original case):

{
  /* <EmptyState
    title="No Academic Materials Found"
    message="Try adjusting your filters or search terms. You can also explore other shops."
    icon={<FileQuestion size={48} className="text-yellow-500" />}
  />; */
}

{
  /* <EmptyState
    title="No Materials"
    message="Upload your first material to get started."
    icon={<FileQuestion size={48} className="text-purple-500" />}
    action={
      <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
        Upload Material
      </button>
    }
  />; */
}

// 🟣 For Reviews:
{
  /* <EmptyState
    title="No Reviews Yet"
    message="This shop hasn’t been reviewed yet. Be the first to share your thoughts."
    icon={<Star size={48} className="text-amber-500" />}
  />; */
}

// 🔵 For Contact or Messages:
{
  /* <EmptyState
    title="No Messages"
    message="You haven’t received any messages yet. Messages from visitors will appear here."
    icon={<MessageSquare size={48} className="text-blue-500" />}
  />; */
}

// 🔍 For Search:
{
  /* <EmptyState
    title="No Results Found"
    message="We couldn’t find anything matching your query. Try different keywords or filters."
    icon={<Search size={48} className="text-red-400" />}
  />; */
}
