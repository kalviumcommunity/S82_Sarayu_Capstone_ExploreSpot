const mongoose = require("mongoose");

const travelPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  imageUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("TravelPost", travelPostSchema);
