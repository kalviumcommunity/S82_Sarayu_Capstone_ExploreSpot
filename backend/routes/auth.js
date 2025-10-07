const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
const sendOtp = require("../utils/sendOtp");
const otpStore = require("../utils/otpStore");

const router = express.Router();

// --- LOGIN ROUTES ---

// GET login test route
router.get("/login", (req, res) => {
  res.status(200).send("Login page ready");
});

// POST login
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

// --- OTP ROUTES ---

// POST send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const otp = await sendOtp(email);

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // OTP valid for 5 minutes
    };

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});


// POST verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOtpData = otpStore[email];

  if (!storedOtpData)
    return res.status(400).json({ success: false, message: "No OTP found for this email." });

  if (Date.now() > storedOtpData.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: "OTP expired." });
  }

  if (storedOtpData.otp !== otp)
    return res.status(400).json({ success: false, message: "Invalid OTP." });

  delete otpStore[email];
  res.json({ success: true, message: "OTP verified successfully." });
});

// --- SIGNUP ROUTES ---

// GET signup test route
router.get("/signup", (req, res) => {
  res.status(200).send("Signup page ready");
});

// POST signup
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

// --- PROTECTED USER INFO ROUTE ---

// GET /me
router.get("/me", isAuthenticated, async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
