import React, { useMemo } from "react";
import { DownloadCloud } from "lucide-react";


/**
 * Renders a “What’s Included” section listing downloadable resources.
 * 
 * - Uses the provided `items` array if non-empty, otherwise `fallback`.
 * - Automatically hides if no resources are available.
 * - Accessible headings and list semantics.
 */
export const IncludedResources = React.memo(
  ({ items = [], fallback = [] }) => {
    // Determine the array to render (props take precedence over fallback)
    const resolvedItems = useMemo(
      () => (items.length > 0 ? items : fallback),
      [items, fallback]
    );

    // If we have no items at all, bail out
    if (resolvedItems.length === 0) {
      return null;
    }

    return (
      <section
        aria-labelledby="included-resources-heading"
        className="mt-6 bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        {/* Section header with icon */}
        <h2
          id="included-resources-heading"
          className="text-xl font-semibold mb-4 text-gray-900 flex items-center"
        >
          <DownloadCloud
            className="w-6 h-6 text-green-600 mr-2"
            aria-hidden
          />
          What’s Included
        </h2>

        {/* Resource list */}
        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-800"
        >
          {resolvedItems.map((file, idx) => (
            <li
              key={`${file}-${idx}`}
              className="flex items-center gap-2"
              role="listitem"
            >
              <DownloadCloud
                className="w-4 h-4 text-green-600"
                aria-hidden
              />
              <span>{file}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

export default IncludedResources;
