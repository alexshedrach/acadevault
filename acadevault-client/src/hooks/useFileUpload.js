import { useState } from "react";

export default function useFileUpload({
  multiple = false,
  maxSizeMB = 5,
  allowedTypes = [],
} = {}) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    if (allowedTypes.length && !allowedTypes.includes(file.type)) {
      return `Unsupported file type: ${file.type}`;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File ${file.name} exceeds ${maxSizeMB}MB limit`;
    }

    return null;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const errors = selectedFiles.map(validateFile).filter(Boolean);

    if (errors.length) {
      setError(errors[0]); // Show first error
      return;
    }

    setError(null);
    setFiles(multiple ? selectedFiles : [selectedFiles[0]]);
  };

  const resetFiles = () => {
    setFiles([]);
    setError(null);
  };

  return {
    files,
    error,
    handleFileChange,
    resetFiles,
  };
}
