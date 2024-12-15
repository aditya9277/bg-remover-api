const { removeBackgroundFromImageUrl } = require('remove.bg');
const axios = require('axios');
const logger = require('../utils/logger');

exports.removeBackground = async (imageUrl, boundingBox) => {
  try {
    if (boundingBox.x_max <= boundingBox.x_min || boundingBox.y_max <= boundingBox.y_min) {
      throw new Error('Invalid bounding box dimensions');
    }

    const roi = `${boundingBox.x_min}px ${boundingBox.y_min}px ${boundingBox.x_max}px ${boundingBox.y_max}px`;

    const result = await removeBackgroundFromImageUrl({
      url: imageUrl,  
      apiKey: 'JAK6jETJ2BDtKvqNyoT7NR6R',  
      crop: true,  
      crop_margin: "0", 
      roi: roi,  
      position: "original", 
    });

    return result.base64img;  
  } catch (error) {
    logger.error('Error removing background:', error.message || error);
    throw new Error('Failed to remove background from image');
  }
};
