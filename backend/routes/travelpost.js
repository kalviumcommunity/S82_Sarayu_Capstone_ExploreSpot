const express = require("express");
const router = express.Router();
const TravelPost = require("../model/travelpost");

// GET all travel posts
router.get("/", async (req, res) => {
  try {
    const posts = await TravelPost.find().populate("createdBy");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new travel post
router.post("/", async (req, res) => {
  const { title, description, location, imageUrl, createdBy } = req.body;
  try {
    const post = new TravelPost({ title, description, location, imageUrl, createdBy });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// PUT (update) a travel post
router.put("/:id", async (req, res) => {
    const { title, description, location, imageUrl } = req.body;
    
    try {
      // Find the travel post by ID
      const post = await TravelPost.findById(req.params.id);
      
      // If the post doesn't exist, return a 404 error
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Update the travel post fields (only update if new data is provided)
      post.title = title || post.title;
      post.description = description || post.description;
      post.location = location || post.location;
      post.imageUrl = imageUrl || post.imageUrl;
  
      // Save the updated travel post
      await post.save();
      
      // Respond with the updated post
      res.json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

module.exports = router;
