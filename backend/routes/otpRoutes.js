const express = require('express');
const router = express.Router();
const sendOtp = require('../utils/sendOtp');
const otpStore = require('../utils/otpStore'); 

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = await sendOtp(email);

  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  res.json({ success: true, message: "OTP sent to email" });
});

module.exports = router; 