// backend/routes/spotsRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// 🟢 Create uploads folder automatically if missing
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log("📂 'uploads' folder created automatically.");
}

// 🟢 Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // absolute path to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 🟢 Temporary in-memory storage
let spots = [];

// =====================
// GET all spots
// =====================
router.get("/", (req, res) => {
  res.json(spots);
});

// =====================
// POST new spot
// =====================
router.post("/", upload.single("image"), (req, res) => {
  try {
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
  } catch (err) {
    console.error("❌ Error uploading spot:", err);
    res.status(500).json({ error: "Failed to create spot" });
  }
});

module.exports = router;
