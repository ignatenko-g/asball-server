const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const fileExt = path.parse(file.originalname).ext;
    const newFilename = uuidv4() + fileExt;

    cb(null, newFilename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = {
  uploadMiddleware: multer({
    storage,
    fileFilter,
  }),
};
