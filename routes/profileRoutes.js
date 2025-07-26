const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
//const { uploadProfileImage } = require('../controllers/profileController');
const profileController = require('../controllers/profileController');
//const { protect } = require('../middlewares/authMiddleware');

//router.post('/upload-profile', protect, upload.single('profile'), uploadProfileImage);

// Custom upload routes
router.post('/upload-image', upload.single('image'), profileController.uploadImageAdvanced);
router.post('/upload-video', upload.single('video'), profileController.uploadVideo);

module.exports = router;
