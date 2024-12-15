const { removeBackgroundFromImageUrl } = require('remove.bg');
const axios = require('axios');
const logger = require('../utils/logger');

exports.removeBackground = async (imageUrl, boundingBox) => {
  try {
    // Validate the bounding box dimensions
    if (boundingBox.x_max <= boundingBox.x_min || boundingBox.y_max <= boundingBox.y_min) {
      throw new Error('Invalid bounding box dimensions');
    }

    // Format the roi parameter as <x1> <y1> <x2> <y2> (in pixels)
    const roi = `${boundingBox.x_min}px ${boundingBox.y_min}px ${boundingBox.x_max}px ${boundingBox.y_max}px`;

    // Call remove.bg API to remove the background from the image at the given URL
    const result = await removeBackgroundFromImageUrl({
      url: imageUrl,  // Use the image URL (make sure the image is publicly accessible)
      apiKey: 'JAK6jETJ2BDtKvqNyoT7NR6R',  // Your actual API key
      crop: true,  // Ensure the image is cropped
      crop_margin: "0",  // Optional: Can be adjusted if you want a margin around the cropped area
      roi: roi,  // Pass the bounding box as the region of interest
      position: "original",  // Keep the original position of the subject after cropping
    });

    return result.base64img;  // Return the base64 image from remove.bg
  } catch (error) {
    logger.error('Error removing background:', error.message || error);
    throw new Error('Failed to remove background from image');
  }
};
