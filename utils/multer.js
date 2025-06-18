const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});

// Multer Middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max size
  },
});

module.exports = upload;
