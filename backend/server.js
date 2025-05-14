const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Static folder to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otpRoutes");
const userRoutes = require("./routes/user");
const destinationRoutes = require("./routes/destination");
const businessRoutes = require("./routes/business");
const travelPostRoutes = require("./routes/travelpost");
const experienceRoutes = require("./routes/experienceRoutes"); // 🔹 NEW

// Mount routes
app.use("/api", authRoutes);
app.use("/api2", otpRoutes);
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/travelpost", travelPostRoutes);
app.use("/api/experience", experienceRoutes); // 🔹 NEW

// Global Error Handler (keep at the end)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });
