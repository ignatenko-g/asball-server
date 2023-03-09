const { authMiddleware } = require('./authMiddleware');
const { errorMiddleware } = require('./errorMiddleware');
const { uploadMiddleware } = require('./uploadMiddleware');

module.exports = { authMiddleware, errorMiddleware, uploadMiddleware };
