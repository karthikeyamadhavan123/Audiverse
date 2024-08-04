const express = require('express');
const router = express.Router();
const jwt = require('../jwt/jwt'); // JWT middleware for token verification
const upload = require('../util/cloudinary.js'); // Cloudinary setup for file uploads
const AudioController = require('../Controllers/AudioControler.js');


router.post('/:userId/:songId/new', jwt.verifyToken, upload.single('audio'), AudioController.newAudio);
router.get('/:songId', jwt.verifyToken,  AudioController.getAudio);
router.delete('/:userId/:songId/delete/:audioId', jwt.verifyToken,  AudioController.deleteAudio);

module.exports = router;
