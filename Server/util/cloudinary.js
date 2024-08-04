const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Ensure environment variables are loaded
require('dotenv').config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
 
    let folder = 'songs'; // Default folder
    if (file.mimetype.startsWith('image/')) {
      folder = 'images';
    } else if (file.mimetype.startsWith('audio/')) {
      folder = 'audio';
      return {
        folder: folder,
        resource_type: 'video', // or 'raw' depending on your use case
        allowed_formats: ['mp3', 'm4a','mp4']
      };
    }
    
    return {
      folder: folder,
      allowed_formats:(folder==='images'?['jpg','png']:['mp3','m4a'])// Notice 'mp4' is added
    };
  }
});

const upload = multer({ storage: storage });



module.exports = upload;
