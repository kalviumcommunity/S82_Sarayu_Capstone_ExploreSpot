const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { shareExperience } = require('../controllers/experincecontroller');

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Route to handle experience sharing
router.post('/spots', upload.single('image'), shareExperience);

module.exports = router;
