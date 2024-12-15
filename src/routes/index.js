const express = require('express');
const { processImage } = require('../controllers/imageController');
const validateRequest = require('../middleware/validateRequest');
const { imageSchema } = require('../validators/imageValidator');

const router = express.Router();

router.post('/remove-background', validateRequest(imageSchema), processImage);

module.exports = router;