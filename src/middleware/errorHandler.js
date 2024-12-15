const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.isJoi) {
    return res.status(400).json({
      error: err.details[0].message
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};