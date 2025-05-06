const express = require("express");
const router = express.Router();
const Business = require("../model/business");

// GET all businesses
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// POST a new business
router.post("/", async (req, res) => {
  const { name, type, location, contactInfo, imageUrl }=req.body;
  try {
    const business = new Business({ name, type, location, contactInfo, imageUrl });
    await business.save();
    res.status(201).json(business);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// PUT (update) a business listing
router.put("/:id", async (req, res) => {
  const { name, description, location, contactInfo, imageUrl } = req.body;
  
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    business.name = name || business.name;
    business.description = description || business.description;
    business.location = location || business.location;
    business.contactInfo = contactInfo || business.contactInfo;
    business.imageUrl = imageUrl || business.imageUrl;

    await business.save();
    res.json({data:business});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
