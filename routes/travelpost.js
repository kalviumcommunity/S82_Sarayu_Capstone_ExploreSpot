const express = require("express");
const router = express.Router();
const TravelPost = require("../model/travelpost");
const { isAuthenticated } = require("../middleware/auth"); // Ensure this path is correct

// GET all travel posts
router.get("/", async (req, res) => {
  try {
    const posts = await TravelPost.find().populate("createdBy", "username email"); // Populate user info
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new travel post (requires authentication)
router.post("/", isAuthenticated, async (req, res) => {
  const { title, description, location, imageUrl } = req.body;

  try {
    const post = new TravelPost({
      title,
      description,
      location,
      imageUrl,
      createdBy: req.user._id, // Created by the authenticated user
    });

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
    const post = await TravelPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title || post.title;
    post.description = description || post.description;
    post.location = location || post.location;
    post.imageUrl = imageUrl || post.imageUrl;

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
