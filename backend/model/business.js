const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String, // e.g., hotel, restaurant, guide
  location: String,
  contactInfo: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Business", businessSchema);
