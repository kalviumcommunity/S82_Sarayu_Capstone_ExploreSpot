const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
});

module.exports = mongoose.model("Business", businessSchema);
