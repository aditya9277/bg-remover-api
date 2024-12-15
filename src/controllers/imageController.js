const { removeBackground } = require('../services/backgroundRemoval');
const { saveToRenderStorage } = require('../services/storage');
const logger = require('../utils/logger');
const path = require('path');

exports.processImage = async (req, res, next) => {
  try {
    const { image_url, bounding_box } = req.body;

    const processedImageBuffer = await removeBackground(image_url, bounding_box);

    const processedImageUrl = await saveToRenderStorage(processedImageBuffer);

    res.json({
      original_image_url: image_url,
      processed_image_url: "https://hehe-1-n40u.onrender.com" + processedImageUrl
    });
  } catch (error) {
    logger.error('Error processing image:', error);
    next(error);
  }
};
