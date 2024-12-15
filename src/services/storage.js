const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// Directory for storing processed images in Render
const storageDir = path.join('/tmp', 'processed-images');

// Ensure the storage directory exists
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

exports.saveToRenderStorage = async (imageBuffer) => {
  try {
    const timestamp = Date.now();
    const fileName = `processed-image-${timestamp}.png`;
    const filePath = path.join(storageDir, fileName);

    // Save the image buffer to the storage directory
    fs.writeFileSync(filePath, imageBuffer);

    // Render can serve files statically; construct a public URL
    const publicUrl = `/images/${fileName}`;

    logger.info(`Image saved at ${filePath} with public URL ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    logger.error('Error saving image to storage:', error);
    throw new Error('Failed to save processed image');
  }
};
