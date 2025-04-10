const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables first
dotenv.config();

const app = express();
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otpRoutes");

app.use("/api", authRoutes);
app.use("/api", otpRoutes); // ⚠️ Make sure this file exists and exports a router

// Global Error Handling Middleware (keep it at the end)
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
      console.log(` Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection failed", err);
  });
