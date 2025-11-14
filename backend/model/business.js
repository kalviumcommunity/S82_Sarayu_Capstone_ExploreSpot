const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  description: String,
  contactInfo: String,
  imageUrl: String,
});

module.exports = mongoose.model("Business", BusinessSchema);
