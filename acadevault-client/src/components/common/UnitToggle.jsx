"use client";

import { FileTextIcon, BookOpenIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export default function UnitToggle({ currentUnit, onToggle }) {
  return (
    <div className="inline-flex bg-gray-100 rounded-md p-1 border border-gray-300">
      {[
        { type: "words", icon: FileTextIcon },
        { type: "pages", icon: BookOpenIcon },
      ].map(({ type, icon: Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => onToggle(type)}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition",
            currentUnit === type
              ? "bg-white shadow text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          )}
          aria-pressed={currentUnit === type}
          aria-label={`Switch to ${type}`}
        >
          <Icon className="w-4 h-4" />
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}

// import { FileTextIcon, BookOpenIcon } from "lucide-react";
// import { cn } from "@/utils/cn";

// export default function UnitToggle({ currentUnit, onToggle }) {
//   return (
//     <div className="inline-flex bg-gray-100 rounded-md p-1 border border-gray-300">
//       {[
//         { type: "words", icon: FileTextIcon },
//         { type: "pages", icon: BookOpenIcon },
//       ].map(({ type, icon: Icon }) => (
//         <button
//           key={type}
//           type="button"
//           onClick={() => onToggle(type)}
//           className={cn(
//             "flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition",
//             currentUnit === type
//               ? "bg-white shadow text-blue-600"
//               : "text-gray-500 hover:text-gray-800"
//           )}
//           aria-pressed={currentUnit === type}
//           aria-label={`Switch to ${type}`}
//         >
//           <Icon className="w-4 h-4" />
//           {type.charAt(0).toUpperCase() + type.slice(1)}
//         </button>
//       ))}
//     </div>
//   );
// }
