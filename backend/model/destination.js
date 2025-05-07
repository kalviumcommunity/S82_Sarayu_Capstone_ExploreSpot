const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: String,
  description: String,
  imageUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // relationship added
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Destination", destinationSchema);
