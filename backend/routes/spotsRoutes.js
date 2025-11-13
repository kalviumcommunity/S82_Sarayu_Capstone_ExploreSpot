const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Spot = require("../model/Spot");  // ⬅ import Spot model

const router = express.Router();

// Create uploads folder if not exists
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// GET all spots from MongoDB
router.get("/", async (req, res) => {
  try {
    const spots = await Spot.find().sort({ createdAt: -1 });
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spots" });
  }
});

// POST new spot to MongoDB
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newSpot = new Spot({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      imageUrl,
    });

    await newSpot.save();

    res.status(201).json(newSpot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create spot" });
  }
});

// DELETE a spot
router.delete("/:id", async (req, res) => {
  try {
    const deletedSpot = await Spot.findByIdAndDelete(req.params.id);
    if (!deletedSpot) return res.status(404).json({ error: "Spot not found" });

    res.json({ message: "Spot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
