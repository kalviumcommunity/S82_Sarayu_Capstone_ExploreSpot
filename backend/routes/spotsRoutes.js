const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Spot = require("../model/Spot");  // DB Model

const router = express.Router();

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// 📌 GET All Spots
router.get("/", async (req, res) => {
  try {
    const spots = await Spot.find().sort({ createdAt: -1 });
    res.json(spots);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch spots" });
  }
});

// 📌 CREATE New Spot
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
    res.status(500).json({ error: "Failed to create spot" });
  }
});

// ❌ DELETE Spot
router.delete("/:id", async (req, res) => {
  try {
    const deletedSpot = await Spot.findByIdAndDelete(req.params.id);
    if (!deletedSpot) return res.status(404).json({ error: "Spot not found" });

    res.json({ message: "Spot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// ✏️ UPDATE Spot
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedSpot = await Spot.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedSpot) {
      return res.status(404).json({ error: "Spot not found" });
    }

    res.json(updatedSpot);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
