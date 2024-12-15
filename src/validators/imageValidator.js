const Joi = require('joi');

exports.imageSchema = Joi.object({
  image_url: Joi.string()
    .uri()
    .required()
    .messages({
      'string.uri': 'Invalid image URL format',
      'any.required': 'Image URL is required'
    }),
  bounding_box: Joi.object({
    x_min: Joi.number().integer().min(0).required(),
    y_min: Joi.number().integer().min(0).required(),
    x_max: Joi.number().integer().min(Joi.ref('x_min')).required(),
    y_max: Joi.number().integer().min(Joi.ref('y_min')).required()
  }).required()
});