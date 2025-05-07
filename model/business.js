const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  location: String,
  contactInfo: String,
  imageUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Business", businessSchema);
