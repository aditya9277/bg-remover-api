const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
// Directory for storing processed images in Render
const storageDir = path.join('/tmp', 'processed-images');
//const storageDir = path.join(__dirname, '../public/images');
//To make it run on local and save processed image to localsystem, remove line 5 and use line 6
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

exports.saveToRenderStorage = async (imageBuffer) => {
  try {
    const timestamp = Date.now();
    const fileName = `processed-image-${timestamp}.png`;
    const filePath = path.join(storageDir, fileName);

    if (imageBuffer.startsWith('data:image/png;base64,')) {
      imageBuffer = imageBuffer.replace(/^data:image\/png;base64,/, '');
    }
    const imageDataBuffer = Buffer.from(imageBuffer, 'base64');
    fs.writeFileSync(filePath, imageDataBuffer);

    const publicUrl = `/images/${fileName}`;
    logger.info(`Image saved at ${filePath} with public URL ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    logger.error('Error saving image to local storage:', error);
    throw new Error('Failed to save processed image');
  }
};



//for testing purpose
// //working 1
// exports.saveToRenderStorage = async (imageBuffer) => {
//   try {
//     const timestamp = Date.now();
//     const fileName = `processed-image-${timestamp}.png`;
//     const filePath = path.join(storageDir, fileName);

//     // Save the image buffer to the storage directory
//     fs.writeFileSync(filePath, imageBuffer);
//     logger.info(`Saving image to path: ${filePath}`);


//     // Render can serve files statically; construct a public URL
//     const publicUrl = `/images/${fileName}`;

//     logger.info(`Image saved at ${filePath} with public URL ${publicUrl}`);
//     return publicUrl;
//   } catch (error) {
//     logger.error('Error saving image to storage:', error);
//     throw new Error('Failed to save processed image');
//   }
// };
// const fs = require('fs');
// const path = require('path');
// const logger = require('../utils/logger');

// // Directory for storing processed images locally (inside 'public/images' folder)
// const storageDir = path.join(__dirname, '../public/images');

// // Ensure the storage directory exists
// if (!fs.existsSync(storageDir)) {
//   fs.mkdirSync(storageDir, { recursive: true });
// }