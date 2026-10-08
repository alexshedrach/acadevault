"use client";

import { truncateText } from "@/helpers/truncateText";
import PropTypes from "prop-types";
import { memo } from "react";

/** ContentSection
 * Renders material metadata: department, degree, level, title, summary/description, format details.
 */
export const Content = memo(function Content({
  title,
  deptName,
  degreeLabel,
  levelLabel,
  typeLabel,
  deliveryLabel,
  pageCount,
  summary,
  description,
  showMeta,
  showSummary,
}) {
  return (
    <div className="flex flex-col flex-1 py-2 px-4">
      <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-3">
        {title}
      </h3>

      {showSummary && (summary || description) && (
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {summary ?? description}
        </p>
      )}
      {showMeta && (
        <>
          <div className="text-xs text-gray-500 mb-1 border-t border-gray-300 pt-1">
            {truncateText(` ${deptName} • ${degreeLabel} (${levelLabel})`, 43)}
          </div>

          <div className="text-xs text-gray-500 border-b border-gray-300 pb-1">
            {typeLabel} • {deliveryLabel} • {pageCount} pages
          </div>
        </>
      )}

      {(showMeta || showSummary) && <div className="h-1" />}
    </div>
  );
});
Content.displayName = "Content";
Content.propTypes = {
  title: PropTypes.string.isRequired,
  deptName: PropTypes.string,
  degreeLabel: PropTypes.string,
  levelLabel: PropTypes.string,
  typeLabel: PropTypes.string,
  deliveryLabel: PropTypes.string,
  pageCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  summary: PropTypes.string,
  description: PropTypes.string,
  showMeta: PropTypes.bool,
  showSummary: PropTypes.bool,
};

// "use client";

// import React, { memo } from "react";
// import PropTypes from "prop-types";
// import { truncateText } from "@/helpers/truncateText";

// // Content is responsible for:
// //  • “department • degree (level)” (if showMeta === true)
// //  • Title (always shown)
// //  • Either “summary” or “description” (based on flags)
// //  • “Type • Delivery • Pages”
// const Content = ({ material, showMeta, showSummary, showDescription }) => {
//   const {
//     title,
//     department,
//     academicLevel,
//     academicDegree,
//     materialType,
//     deliveryFormat,
//     digitalContent,
//     summary,
//     description,
//   } = material;

//   // Fallback labels
//   const deptName = department?.name || "Unknown Department";
//   const levelLabel = academicLevel || "N/A";
//   const degreeLabel = academicDegree || "N/A";
//   const typeLabel = materialType || "Material";
//   const deliveryLabel =
//     deliveryFormat === "digital" ? "Digital Download" : "Physical Copy";
//   const pageCount = digitalContent?.pageCount ?? "N/A";

//   return (
//     <div className="flex flex-col flex-1 p-4">
//       {showMeta && (
//         <div className="text-xs text-gray-500 mb-1">
//           {deptName} • {degreeLabel} ({levelLabel})
//         </div>
//       )}

//       <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
//         {title}
//       </h3>

//       {showSummary && (
//         <p className="text-sm text-gray-600 mb-2 line-clamp-2">
//           {truncateText(summary || description, 100)}
//         </p>
//       )}

//       {showDescription && !showSummary && (
//         <p className="text-sm text-gray-600 mb-2 line-clamp-2">
//           {truncateText(description || summary, 100)}
//         </p>
//       )}

//       {(showMeta || showSummary || showDescription) && <div className="h-1" />}

//       <div className="text-xs text-gray-500">
//         {typeLabel} • {deliveryLabel} • {pageCount} pages
//       </div>
//     </div>
//   );
// };

// Content.propTypes = {
//   material: PropTypes.shape({
//     title: PropTypes.string,
//     department: PropTypes.shape({ name: PropTypes.string }),
//     academicLevel: PropTypes.string,
//     academicDegree: PropTypes.string,
//     materialType: PropTypes.string,
//     deliveryFormat: PropTypes.string,
//     digitalContent: PropTypes.shape({
//       pageCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     }),
//     summary: PropTypes.string,
//     description: PropTypes.string,
//   }).isRequired,

//   showMeta: PropTypes.bool,
//   showSummary: PropTypes.bool,
//   showDescription: PropTypes.bool,
// };

// Content.defaultProps = {
//   showMeta: true,
//   showSummary: true,
//   showDescription: false,
// };

// export default memo(Content);
