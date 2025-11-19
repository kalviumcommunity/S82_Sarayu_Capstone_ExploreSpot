const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Auto-create uploads folder if missing
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📂 'uploads' folder created automatically.");
}

// Static folder to serve uploaded images
app.use("/uploads", express.static(uploadPath));

// ROUTES IMPORTS
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otpRoutes");
const userRoutes = require("./routes/user");
const destinationRoutes = require("./routes/destination");
const businessRoutes = require("./routes/business");
const travelPostRoutes = require("./routes/travelpost");
const spotsRoutes = require("./routes/spotsRoutes");
const aiPlanner = require("./routes/aiPlanner");

// ROUTE MOUNTING
app.use("/api", authRoutes);
app.use("/api2", otpRoutes);
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/travelpost", travelPostRoutes);
app.use("/api/ai-planner", aiPlanner);

// Mount the spots route (ShareExperience)
app.use("/spots", spotsRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 🧪 Prevent MongoDB + server listen during tests
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      // ❌ Removed process.exit(1) → so Jest won't crash
    });
}

module.exports = app;
