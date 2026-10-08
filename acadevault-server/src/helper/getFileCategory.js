// Helper function to determine file category
export const getFileCategory = (mimeType) => {
  if (!mimeType) return 'other';

  const mimeCategory = mimeType.split('/')[0];

  switch (mimeCategory) {
    case 'image':
      return 'image';
    case 'video':
      return 'video';
    case 'audio':
      return 'audio';
    case 'application':
      return 'document';
    default:
      return 'other';
  }
};

// export const getFileCategory = (mimeType) => {
//   const mimeTypeCategory = mimeType.split("/")[0];
//   switch (mimeTypeCategory) {
//     case "image":
//       return "image";
//     case "video":
//       return "video";
//     case "audio":
//       return "audio";
//     case "application":
//       return "document"; // Treat application/* as document
//     default:
//       return "other"; // Fallback for unsupported types
//   }
// };
