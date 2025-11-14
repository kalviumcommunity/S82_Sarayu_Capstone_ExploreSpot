const express = require("express");
const router = express.Router();
const Business = require("../model/business");
const multer = require("multer");
const path = require("path");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// 🟢 GET all promoted businesses
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🟢 POST new business promotion
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category, location, description, contact } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const business = new Business({
      name,
      category,
      location,
      description,
      contactInfo: contact,
      imageUrl,
    });

    await business.save();

    res.status(201).json(business);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create business" });
  }
});

module.exports = router;
