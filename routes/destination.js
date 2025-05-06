const express = require("express");
const router = express.Router();
const Destination = require("../model/destination");

// GET all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
     res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new destination
router.post("/", async (req, res) => {
  const { name, country, description, imageUrl }=req.body;
  try {
    const destination = new Destination({ name, country, description, imageUrl });
    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
  



// PUT (update) a destination
router.put("/:id", async (req, res) => {
  const { name, description, location, imageUrl } = req.body;
  
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    destination.name = name || destination.name;
    destination.description = description || destination.description;
    destination.location = location || destination.location;
    destination.imageUrl = imageUrl || destination.imageUrl;

    await destination.save();
    res.json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});




module.exports = router;
