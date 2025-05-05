const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

// GET route for login (for testing)
router.get("/login", (req, res) => {
  res.status(200).send("Login page is ready");
});

// POST route for login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("Email and password are required", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return next(new ErrorHandler("User not found", 400));

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      return next(new ErrorHandler("Invalid credentials", 400));

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET route for signup (for testing)
router.get("/signup", (req, res) => {
  res.status(200).send("Signup page is ready");
});

// POST route for signup
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password)
      return next(new ErrorHandler("All fields are required", 400));

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(new ErrorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Protected route example
router.get("/me", isAuthenticated, async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
