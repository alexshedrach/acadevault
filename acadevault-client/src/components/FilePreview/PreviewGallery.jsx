"use client";

import { useState } from "react";
import PreviewDocument from "./PreviewDocument";
import { Modal } from "../ui/Modal";
import FileViewer from "./FileViewer";

export default function PreviewGallery({ previewFiles, material }) {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!previewFiles?.length) return null;

  return (
    <>
      {/* <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📄 Preview Files
      </h3> */}

      <div className="bg-blue-50/40 border border-blue-100 rounded-md -mt-4 shadow-sm">
        {previewFiles.map((file) => (
          <PreviewDocument
            key={file._id}
            file={file}
            material={material}
            onPreview={(f) => setSelectedFile(f)}
          />
        ))}
      </div>

      {/* Single, full-screen modal with one scrollbar */}
      <Modal
        isOpen={!!selectedFile}
        onClose={() => setSelectedFile(null)}
        size="full"
        theme="light"
        // closeButton
        disableBackdropClose={false}
        className="p-0"
      >
        {selectedFile && (
          <div className="flex flex-col h-full">
            {/* Fixed Header */}
            <header className="flex items-center justify-between px-6 py-2 flex-shrink-0">
              <h2 className="text-xl font-semibold truncate">
                {selectedFile.fileName}
              </h2>
            </header>

            {/* Scrolling Body */}
            <div className="flex-1 overflow-auto">
              <FileViewer file={selectedFile} />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import FilePreviewModal from "./FilePreviewModal";

// export default function PreviewGallery({ files }) {
//   const [selectedFile, setSelectedFile] = useState(null);

//   if (!files?.length) return null;

//   return (
//     <section>
//       <h2 className="text-xl font-medium mb-4">Preview Files</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {files.map((file) => (
//           <div
//             key={file._id}
//             className="border rounded p-2 cursor-pointer hover:shadow-lg"
//             onClick={() => setSelectedFile(file)}
//           >
//             <span className="text-blue-600 hover:underline">
//               {file.fileName} ({Math.round(file.fileSize / 1024)} KB)
//             </span>
//           </div>
//         ))}
//       </div>

//       {selectedFile && (
//         <FilePreviewModal
//           file={selectedFile}
//           onClose={() => setSelectedFile(null)}
//         />
//       )}
//     </section>
//   );
// }
