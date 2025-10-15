// backend/routes/spotsRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Temporary in-memory data (replace with DB later)
let spots = [];

// GET all spots
router.get("/", (req, res) => {
  res.json(spots);
});

// POST new spot
router.post("/", upload.single("image"), (req, res) => {
  const { name, location, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newSpot = {
    id: Date.now(),
    name,
    location,
    description,
    imageUrl,
  };

  spots.push(newSpot);
  res.status(201).json(newSpot);
});

module.exports = router;
