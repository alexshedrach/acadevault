// Middleware to attach file metadata to req.processedFiles
export const attachFileMetadata = () => (req, res, next) => {
  const processFile = (file) => ({
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    buffer: file.buffer,
    fieldName: file.fieldname,
    encoding: file.encoding,
  });

  const processedFiles = {};

  if (req.file) {
    req.processedFiles = processFile(req.file);
  } else if (req.files && Array.isArray(req.files)) {
    req.processedFiles = req.files.map(processFile);
  } else if (req.files && typeof req.files === 'object') {
    for (const field in req.files) {
      processedFiles[field] = req.files[field].map(processFile);
    }
    req.processedFiles = processedFiles;
  }

  next();
};
