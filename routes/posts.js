const express = require('express');
const router = express.Router();

let posts = [];

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});


// POST create new post
router.post('/', (req, res) => {
  const newPost = { id: Date.now(), ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});



// PUT update post
router.put('/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.map(post => post.id === postId ? { ...post, ...req.body } : post);
  res.json({ message: 'Post updated', id: postId });
});

module.exports = router;
