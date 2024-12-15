const { removeBackground } = require('../services/backgroundRemoval');
const { saveToRenderStorage } = require('../services/storage');
const logger = require('../utils/logger');
const path = require('path');

exports.processImage = async (req, res, next) => {
  try {
    const { image_url, bounding_box } = req.body;

    // Process image and remove background
    const processedImageBuffer = await removeBackground(image_url, bounding_box);

    // Save processed image to Render's storage
    const processedImageUrl = await saveToRenderStorage(processedImageBuffer);

    res.json({
      original_image_url: image_url,
      processed_image_url: processedImageUrl
    });
  } catch (error) {
    logger.error('Error processing image:', error);
    next(error);
  }
};
