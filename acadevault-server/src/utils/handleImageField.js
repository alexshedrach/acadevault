import AppError from "./HandleAppErrors.js";

/**
 * Handle both Cloudinary public_id and external image URLs dynamically.
 * @param {string | object} imageData - The image data (either a URL or an object with public_id).
 * @returns {object} - An object containing `public_id` and `url` for the image.
 */
function handleImageField(imageData) {
  const result = {};

  if (typeof imageData === "string") {
    // If it's a string, it's an external image URL
    result.url = imageData; // Store the external URL
  } else if (imageData && imageData.public_id) {
    // If it's an object with a Cloudinary public_id, store the public_id and construct the URL
    result.public_id = imageData.public_id;
    result.url = `https://res.cloudinary.com/demo/image/upload/${imageData.public_id}`; // Construct URL from public_id
  } else {
    throw new AppError(
      "Invalid image data provided. It should either be a URL or an object with a public_id.",
      400
    );
  }

  return result;
}

export default handleImageField;
