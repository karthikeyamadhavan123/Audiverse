const express = require('express');
const router = express.Router();
const jwt = require('../jwt/jwt');
const upload = require('../util/cloudinary');
const SongController = require('../Controllers/SongController');

router.post('/new', jwt.verifyToken, upload.single('image'), SongController.newSong);
router.get('/', jwt.verifyToken, SongController.getSongs);
router.get('/:id',jwt.verifyToken,SongController.getSingleSong)

module.exports = router;
