"use client";

import { Modal } from "../ui/Modal";
import FileViewer from "./FileViewer";

/**
 * <FilePreviewModal>
 *
 * Production-grade file preview modal using reusable Modal.
 * Handles all file types via FileViewer.
 */
export default function FilePreviewModal({ file, onClose }) {
  if (!file) return null;

  return (
    <Modal
      isOpen
      onClose={onClose}
      size="xl"
      theme="light"
      closeButton
      disableBackdropClose={false}
      className="overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold truncate">{file.fileName}</h2>
          {/* Optional: Display file type or path */}
          {/* <p className="text-sm text-gray-500">{file.fileType || 'File preview'}</p> */}
        </div>
      </div>

      {/* Body: Delegate everything to FileViewer */}
     
        <FileViewer file={file} />
  
    </Modal>
  );
}
