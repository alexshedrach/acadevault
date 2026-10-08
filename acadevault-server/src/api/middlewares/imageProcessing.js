import sharp from "sharp";
import AppError from "../../utils/HandleAppErrors.js";

// Image Processing Presets
const IMAGE_PRESETS = {
  profilePicture: {
    resizeOptions: { width: 300, height: 300, fit: "cover" },
    format: "webp",
    quality: 90,
    folder: "images/profiles",
  },
  thumbnail: {
    resizeOptions: { width: 150, height: 150, fit: "cover" },
    format: "jpeg",
    quality: 80,
    folder: "images/thumbnails",
  },
  banner: {
    resizeOptions: { width: 1200, height: 400, fit: "contain" },
    format: "jpeg",
    quality: 85,
    folder: "images/banners",
  },
  logo: {
    resizeOptions: { width: 300, height: 300, fit: "cover" },
    format: "webp",
    quality: 90,
    folder: "images/logos",
  },
  galleryImage: {
    resizeOptions: { width: 800, height: 600, fit: "cover" },
    format: "png",
    quality: 100,
    folder: "images/gallery",
  },
  original: {
    resizeOptions: null,
    format: null,
    quality: null,
    folder: "images/originals",
  },
};

// Middleware for Image Processing
export const processImage = () => async (req, res, next) => {
  try {
    // Handle both `req.file` (single) and `req.files` (multiple)
    const files = req.files
      ? Object.values(req.files).flat()
      : req.file
        ? [req.file]
        : null;

    if (!files || files.length === 0) {
      return next(new AppError("No file uploaded.", 400));
    }

    // Process each file using the appropriate preset
    const processedFiles = await Promise.all(
      files.map(async (file) => {
        if (!file.mimetype.startsWith("image/")) {
          throw new AppError(
            `Invalid file type: ${file.originalname}. Only image files are allowed.`,
            400
          );
        }

        // Determine the preset based on the file field name
        const presetName = file.fieldname; // e.g., 'logo', 'banner'
        const preset = IMAGE_PRESETS[presetName];

        if (!preset) {
          throw new AppError(
            `Invalid preset name for field "${file.fieldname}".`,
            400
          );
        }

        const { resizeOptions, format, quality, folder } = preset;

        const sharpInstance = sharp(file.buffer);

        if (resizeOptions) {
          sharpInstance.resize(resizeOptions);
        }

        if (format) {
          sharpInstance.toFormat(format, { quality });
        }

        const processedBuffer = await sharpInstance.toBuffer();

        // Return processed file details
        return {
          ...file,
          buffer: processedBuffer,
          folder,
          mimetype: `image/${format || file.mimetype.split("/")[1]}`,
          originalname: file.originalname.replace(
            /\.[^/.]+$/,
            `.${format || file.originalname.split(".").pop()}`
          ),
        };
      })
    );

    // Update `req.files` or `req.file` with processed data
    if (req.files) {
      req.files = processedFiles.reduce((acc, file) => {
        acc[file.fieldname] = acc[file.fieldname] || [];
        acc[file.fieldname].push(file);
        return acc;
      }, {});
    } else {
      req.file = processedFiles[0];
    }

    next();
  } catch (error) {
    console.error("Image processing error:", error.message);
    next(new AppError(`Image processing error: ${error.message}`, 500));
  }
};
