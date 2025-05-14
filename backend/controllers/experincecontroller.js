const path = require('path');

const shareExperience = (req, res) => {
  const { name, location, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const newExperience = {
    name,
    location,
    description,
    image,
  };

  console.log("Received Experience:", newExperience);

  // Here you can save to DB instead of sending response
  res.status(200).json({
    message: "Experience shared successfully",
    data: newExperience
  });
};

module.exports = {
  shareExperience
};
