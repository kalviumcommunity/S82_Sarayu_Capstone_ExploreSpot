const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Spot", SpotSchema);
