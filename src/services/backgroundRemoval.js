const { removeBackgroundFromImageUrl } = require('remove.bg');
const axios = require('axios');
const logger = require('../utils/logger');

exports.removeBackground = async (imageUrl, boundingBox) => {
  try {
    const result = await removeBackgroundFromImageUrl({
      url: imageUrl,
      apiKey: JAK6jETJ2BDtKvqNyoT7NR6R,
      crop: true,
      crop_margin: "0",
      position: {
        x: boundingBox.x_min,
        y: boundingBox.y_min,
        width: boundingBox.x_max - boundingBox.x_min,
        height: boundingBox.y_max - boundingBox.y_min
      }
    });

    return result.base64img;
  } catch (error) {
    logger.error('Error removing background:', error);
    throw new Error('Failed to remove background from image');
  }
};