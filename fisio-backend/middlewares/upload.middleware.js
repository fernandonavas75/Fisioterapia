// middlewares/upload.middleware.js
const multer = require('multer');
const path = require('path');


const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith('.json')) {
      return cb(new Error('Solo se permiten archivos .json'), false);
    }
    cb(null, true);
  }
});
/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.json') {
    return cb(new Error('Solo se permiten archivos .json'), false);
  }
  cb(null, true);
};

//const upload = multer({ storage, fileFilter });
*/
module.exports = upload;
