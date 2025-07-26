const User = require('../models/User');
const path = require('path');

exports.uploadSimple = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // File type check (allow only images)
  const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
  const ext = path.extname(req.file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return res.status(400).json({ message: 'Invalid file type. Only images allowed.' });
  }

  // Optional: Rename file or move it if needed
  res.json({
    message: 'File uploaded successfully',
    originalname: req.file.originalname,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
};

// For uploadimages
exports.uploadImageAdvanced = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded '});
  }

  res.json({
    message: 'Image uploaded sucessfully',
    file: {
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
};

// For uploadedvideos
exports.uploadVideo = (req, res) => {
  if (!req.file) {
    return res.status(500).json({ message: 'No video uploaded'});
  }

  // Optional check MIME type again if needed
  const allowedVideoTypes = /mp4|mov/;
  const ext = path.extname(req.file.originalname).toLowerCase();
  if (!allowedVideoTypes.test(ext)) {
    return res.status(400).json({ message: 'Invalid video format' })
  }
  res.json({
    message: 'Video uploaded sucessfully',
    file: {
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
};

/*exports.uploadProfileImage = async (req, res) => {
try {
    const userId = req.user._id;
    const profilePath = req.file.path;

const user = await User.findByIdAndUpdate (
    userId,
    { profileImage: profilePath},
    { new: true }
);
res.json({
    message: 'Profile image uploaded successfully',
    profileImage: user.profileImage
});
} catch (error) {
    res.status(500).json({ error: 'Failed to upload profile image'});
  }
};*/