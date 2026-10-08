"use client";

import React, { useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { Modal } from "@/components/ui/Modal";

export default function SearchModal({ isOpen, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={null}
      draggable={false}
      theme="grass"
      size="xl"
      disableBackdropClose={false}
      className="p-0 rounded-xl shadow-xl z-[9999]"
    >
      <div className="w-full h-full flex flex-col bg-[#1e1e2f] text-white rounded-xl overflow-hidden">
        {/* Top Search Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-[#2c2c3c]">
          <BiSearch className="text-lg text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation"
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
          />
          <kbd className="ml-auto text-xs text-gray-400 bg-white/10 border border-white/20 rounded px-2 py-0.5">
            esc
          </kbd>
        </div>

        {/* Body - No recent searches */}
        <div className="flex-1 px-6 py-12 text-center text-gray-400 text-sm">
          No recent searches
        </div>

        {/* Footer - Algolia Attribution */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end text-xs text-gray-500">
          Search by{" "}
          <a
            href="https://www.algolia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 ml-1 text-white hover:underline"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 512 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <path d="M256 0C114.837 0 0 114.837 0 256s114.837 256 256 256 256-114.837 256-256S397.163 0 256 0zm90.312 332.47c0 6.487-2.94 9.43-9.428 9.43H175.254c-6.49 0-9.43-2.943-9.43-9.43v-36.406c0-6.49 2.94-9.43 9.43-9.43h161.63c6.487 0 9.428 2.94 9.428 9.43v36.405z" />
            </svg>
            Algolia
          </a>
        </div>
      </div>
    </Modal>
  );
}

// "use client";

// import React, { useEffect, useRef } from "react";
// import { BiSearch } from "react-icons/bi";
// import { Modal } from "@/components/ui/Modal"; // Update to your actual import path

// export default function SearchModal({ isOpen, onClose }) {
//   const inputRef = useRef(null);

//   // Autofocus the input when modal opens
//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen]);

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title={null}
//       draggable={false}
//       theme="light"
//       size="xl"
//       className="p-4"
//       disableBackdropClose={false}
//     >
//       <div className="flex items-center gap-2 border border-gray-300 dark:border-neutral-700 px-4 py-2 rounded-md">
//         <BiSearch className="text-lg text-gray-500 dark:text-gray-400" />
//         <input
//           type="text"
//           ref={inputRef}
//           placeholder="Search materials, authors, topics..."
//           className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-white placeholder:text-gray-400"
//         />
//       </div>

//       {/* Future autocomplete results */}
//       <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
//         {["Machine Learning", "Quantum Computing", "Climate Change"].map(
//           (item, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 console.log(`Search: ${item}`);
//                 onClose(); // Close the modal
//               }}
//               className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
//             >
//               {item}
//             </button>
//           )
//         )}
//       </div>
//     </Modal>
//   );
// }
