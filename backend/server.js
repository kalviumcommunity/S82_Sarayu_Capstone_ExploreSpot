const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// ---------------- UPLOADS ----------------
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
app.use("/uploads", express.static(uploadPath));

// ---------------- ROUTES ----------------
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otpRoutes");
const userRoutes = require("./routes/user");
const destinationRoutes = require("./routes/destination");
const businessRoutes = require("./routes/business");
const travelPostRoutes = require("./routes/travelpost");
const spotsRoutes = require("./routes/spotsRoutes");
const aiPlannerRoutes = require("./routes/aiPlanner");
const aiDescriptionRoutes = require("./routes/aiDescription");

app.use("/api", authRoutes);
app.use("/api2", otpRoutes);
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/travelpost", travelPostRoutes);
app.use("/spots", spotsRoutes);

// 🔥 UNIFIED AI ROUTES
app.use("/api/ai", aiPlannerRoutes);
app.use("/api/ai", aiDescriptionRoutes);

// ---------------- ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ---------------- DB + SERVER ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB error:", err));

module.exports = app;
